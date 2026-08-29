# GENESIS HACKATHON CLI // TERMINAL COMPANION

A clean, responsive **Red & Black** terminal HUD for GENESIS HACKATHON 2026.

Features bold **GENESIS** artwork, 48hr hackathon pixel typography, typewriter stream animations, live countdown timers, official timeline directives, and clean collapse-on-exit functionality.

---

## ⚡ Instant One-Liner Run (Zero Install)

### For Mac & Linux:
```bash
curl -sSL https://raw.githubusercontent.com/reign1919/genesis-hackathon/main/hackathon.sh | bash
```

### For Windows (PowerShell):
```powershell
irm https://raw.githubusercontent.com/reign1919/genesis-hackathon/main/hackathon.ps1 | iex
```

---

## 🎮 Controls

| Key | Action |
|:---:|---|
| **`E`** / **`e`** | **Exit & Collapse** (Clears terminal cleanly back to prompt) |
| **`R`** / **`r`** | **Re-play** the typewriter stream animation |

---

## 📅 Official Hackathon Timeline & Directives

- **Thursday, 24th September (08:30 AM):** Hackathon commences & Challenge Topics released live. Participants develop remotely from home during the initial build phase.
- **Friday, 25th September (11:30 PM Sharp):** Mandatory submission deadline for the finalized Tech Stack Document via the event portal.
- **Saturday, 26th September (On-Campus):** All participants must report to school with their laptops, chargers, and presentation hardware for live exhibitions, demos, and judging.

---

## 🚀 Local Development / Running Locally

### 1. Run the Dashboard
```bash
node bin/cli.js
# or
npm start
```

### 2. Direct Section Flags
```bash
node bin/cli.js --quick          # Skip animation on launch
node bin/cli.js --rubric         # Show Judging Rubric only
node bin/cli.js --schedule       # Show Timeline only
node bin/cli.js --topics         # Show Tracks only
node bin/cli.js --announcements  # Show Announcements only
node bin/cli.js --help           # Show CLI Options
```

---

## 🌐 Official Event Portal

- **Event URL:** [https://genesisfest.ivwschool.com/events](https://genesisfest.ivwschool.com/events)
