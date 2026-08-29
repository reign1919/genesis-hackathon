#!/usr/bin/env bash
set -e

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required to run the Genesis Hackathon CLI."
  echo "Please install Node.js (v14+) from https://nodejs.org or via package manager."
  exit 1
fi

# Run directly from GitHub repository via npx
npx --yes github:reign1919/genesis-hackathon
