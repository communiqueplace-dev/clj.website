# C.L Khanna Jewellers - deploy helper
# -------------------------------------
# 1) Rebuilds bundle.js from its source files
# 2) Auto-increments the service-worker cache version (clj-vN -> clj-v(N+1))
#    so browsers fetch the fresh bundle.js / style.css instead of stale caches
# 3) Optionally commits + pushes (pass -Push)
#
# Usage:
#   ./deploy.ps1            # rebuild + bump only
#   ./deploy.ps1 -Push      # rebuild + bump, then git add/commit/push

param([switch]$Push)

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

# --- 1) Rebuild bundle.js (catalog + shop + app + cms, in this order) ---
# Read/write as UTF-8 (no BOM) explicitly. Windows PowerShell's Get-Content
# defaults to ANSI for files without a BOM, which double-encodes characters
# like - / · / ₹ / … into mojibake — so we must specify the encoding.
$parts = 'catalog.js','shop.js','app.js','cms.js'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$combined  = ($parts | ForEach-Object {
  [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot $_), $utf8NoBom)
}) -join ''
[System.IO.File]::WriteAllText((Join-Path $PSScriptRoot 'bundle.js'), $combined, $utf8NoBom)
Write-Host "bundle.js rebuilt ($((Get-Item bundle.js).Length) bytes)"

# --- 1a) Minify bundle.js (compress + mangle locals only; top-level globals
# are preserved by default so page-init.js / *-page.js still call them by name) ---
npx --yes terser bundle.js -c -m -o bundle.min.js
if ($LASTEXITCODE -ne 0) { throw "terser minify failed" }
Move-Item -Force bundle.min.js bundle.js
Write-Host "bundle.js minified ($((Get-Item bundle.js).Length) bytes)"

# --- 1b) Regenerate static per-product SEO pages + sitemap from catalog.js ---
node gen-product-pages.js
if ($LASTEXITCODE -ne 0) { throw "product page generation failed" }

# --- 2) Bump service-worker cache version ---
$sw = Get-Content 'sw.js' -Raw
if ($sw -match "const CACHE = 'clj-v(\d+)';") {
    $next = [int]$Matches[1] + 1
    $sw = $sw -replace "const CACHE = 'clj-v\d+';", "const CACHE = 'clj-v$next';"
    Set-Content -Path 'sw.js' -Value $sw -NoNewline -Encoding utf8
    Write-Host "sw.js cache bumped -> clj-v$next"
} else {
    Write-Warning "Could not find 'const CACHE = ...' in sw.js - version NOT bumped."
}

# --- 3) Optional git push ---
if ($Push) {
    # --- SAFETY LATCH ---------------------------------------------------------
    # Refuse to deploy if the working folder appears to have lost files (e.g. it
    # was sitting in a temp dir that got cleaned). Prevents accidentally
    # committing mass deletions that would break the live site.
    $critical = @('CNAME','robots.txt','bundle.js','style.css','index.html','sw.js','assets/logo-main.png')
    $missing  = $critical | Where-Object { -not (Test-Path (Join-Path $PSScriptRoot $_)) }
    if ($missing) {
        throw "DEPLOY ABORTED: critical files missing from the working folder -> $($missing -join ', '). Nothing was committed or pushed. (Did the folder get cleaned or moved? Restore the files first.)"
    }
    $deleted = @(git diff --name-only --diff-filter=D HEAD)
    if ($deleted.Count -gt 3) {
        Write-Host "Files that would be DELETED ($($deleted.Count)):"
        $deleted | ForEach-Object { Write-Host "  - $_" }
        throw "DEPLOY ABORTED: $($deleted.Count) files would be deleted (safety limit is 3). This usually means the working folder lost files. Nothing was committed or pushed."
    }
    # --------------------------------------------------------------------------

    git add -A
    git commit -m "Deploy: rebuild bundle + bump SW cache"
    git push
    Write-Host "Pushed to remote."
} else {
    Write-Host "Done. Review changes, then run with -Push (or git push) to deploy."
}
