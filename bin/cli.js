#!/usr/bin/env node

// ============================================================
//  GENESIS HACKATHON CLI
//  Theme: RED & BLACK | Clean Terminal Dashboard
// ============================================================

const readline = require("readline");
const config = require("../src/config");
const { c, line, clearScreen } = require("../src/colors");
const {
  renderDashboard,
  renderAnimatedDashboard,
  renderTopics,
  renderSchedule,
  renderTechSponsors,
  renderJudgingRubric,
  renderAnnouncements,
} = require("../src/render");

// Parse Command Line Arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    quick: false,
    topicsOnly: false,
    scheduleOnly: false,
    sponsorsOnly: false,
    rubricOnly: false,
    announcementsOnly: false,
    help: false,
    version: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-h" || arg === "--help") options.help = true;
    else if (arg === "-v" || arg === "--version") options.version = true;
    else if (arg === "-q" || arg === "--quick" || arg === "--no-anim") options.quick = true;
    else if (arg === "-t" || arg === "--topics") options.topicsOnly = true;
    else if (arg === "-s" || arg === "--schedule") options.scheduleOnly = true;
    else if (arg === "-p" || arg === "--sponsors") options.sponsorsOnly = true;
    else if (arg === "-j" || arg === "--rubric") options.rubricOnly = true;
    else if (arg === "-m" || arg === "--announcements") options.announcementsOnly = true;
  }

  return options;
}

// Clean exit handler — collapses screen completely
function exitApp() {
  process.stdout.write("\x1b[?25h"); // Restore terminal cursor
  clearScreen();
  process.exit(0);
}

async function startInteractiveLoop(skipAnim = false) {
  let isAnimating = false;
  let lastCols = process.stdout.columns;
  let lastRows = process.stdout.rows;

  // Configure stdin for raw keypress events
  if (process.stdin.isTTY) {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
  }

  // Handle Terminal Window Resize
  process.stdout.on("resize", () => {
    if (!isAnimating && (process.stdout.columns !== lastCols || process.stdout.rows !== lastRows)) {
      lastCols = process.stdout.columns;
      lastRows = process.stdout.rows;
      renderDashboard(config);
    }
  });

  // Initial render
  if (skipAnim) {
    renderDashboard(config);
  } else {
    isAnimating = true;
    await renderAnimatedDashboard(config);
    isAnimating = false;
  }

  // Keypress listener
  process.stdin.on("keypress", async (str, key) => {
    // Exit on E / e / Ctrl+C / Escape
    if (
      (key && key.ctrl && key.name === "c") ||
      str === "e" ||
      str === "E" ||
      (key && key.name === "escape")
    ) {
      exitApp();
    }

    if (isAnimating) return;

    // Replay animation on R
    if (str === "r" || str === "R") {
      isAnimating = true;
      await renderAnimatedDashboard(config);
      isAnimating = false;
    }
  });

  // Handle process termination signals
  process.on("SIGINT", exitApp);
  process.on("SIGTERM", exitApp);
}

async function main() {
  const options = parseArgs();
  const pkg = require("../package.json");

  if (options.version) {
    console.log(`${pkg.name || "hackathon-cli"} v${pkg.version || "1.0.0"}`);
    return;
  }

  if (options.help) {
    console.log(`
${c.bold}${c.neonRed}GENESIS HACKATHON CLI // COMMAND REFERENCE${c.reset}
${c.dim}${c.red}${line("─", 60)}${c.reset}

${c.bold}USAGE:${c.reset}
  node bin/cli.js [options]
  npx hackathon-cli [options]

${c.bold}CONTROLS:${c.reset}
  ${c.neonRed}[ E ]${c.reset}         Exit & Collapse CLI
  ${c.neonRed}[ R ]${c.reset}         Re-play Typewriter Animation

${c.bold}OPTIONS:${c.reset}
  ${c.neonRed}-q, --quick${c.reset}          Skip stream animation on launch
  ${c.neonRed}-t, --topics${c.reset}         Show challenge tracks only
  ${c.neonRed}-s, --schedule${c.reset}       Show event timeline only
  ${c.neonRed}-p, --sponsors${c.reset}       Show tech sponsors only
  ${c.neonRed}-j, --rubric${c.reset}         Show judging rubric only
  ${c.neonRed}-m, --announcements${c.reset}  Show live announcements only
  ${c.neonRed}-h, --help${c.reset}          Display this guide
`);
    return;
  }

  // Direct section filters (non-interactive)
  if (options.topicsOnly) return renderTopics(config);
  if (options.scheduleOnly) return renderSchedule(config);
  if (options.sponsorsOnly) return renderTechSponsors(config);
  if (options.rubricOnly) return renderJudgingRubric(config);
  if (options.announcementsOnly) return renderAnnouncements(config);

  // Start Interactive Loop
  await startInteractiveLoop(options.quick);
}

main();
