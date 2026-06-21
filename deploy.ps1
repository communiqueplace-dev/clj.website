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
    git add -A
    git commit -m "Deploy: rebuild bundle + bump SW cache"
    git push
    Write-Host "Pushed to remote."
} else {
    Write-Host "Done. Review changes, then run with -Push (or git push) to deploy."
}
