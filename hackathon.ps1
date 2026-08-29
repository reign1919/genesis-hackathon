# Genesis Hackathon CLI Launcher for Windows PowerShell
$ErrorActionPreference = "Stop"

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js is required to run the Genesis Hackathon CLI." -ForegroundColor Red
    Write-Host "Please install Node.js (v14+) from https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Run directly from GitHub repository via npx
npx --yes github:reign1919/genesis-hackathon
