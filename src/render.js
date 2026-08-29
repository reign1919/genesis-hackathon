// Terminal view renderer for Genesis Hackathon CLI
// Theme: High-Contrast Red & Black | Clean Terminal Dashboard | Zero Emojis

const { c, line, badge, statusDot, getTermWidth, clearScreen } = require("./colors");
const { typewriter, typewriterLine, sleep } = require("./animation");
const { renderStackedDualBanner, animateStackedDualBanner } = require("./art");

// Countdown calculator to Sept 24, 2026 08:30:00
function getCountdownString() {
  const targetDate = new Date("2026-09-24T08:30:00");
  const now = new Date();
  const diffMs = targetDate - now;

  if (diffMs <= 0) {
    return `${c.bold}${c.neonRed}HACKATHON IN PROGRESS${c.reset}`;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diffMs / (1000 * 60)) % 60);
  const secs = Math.floor((diffMs / 1000) % 60);

  return `${c.bold}${c.brightWhite}${days}d ${hours}h ${mins}m ${secs}s${c.reset}`;
}

// Live Status Bar Header
function renderHeader(config) {
  const timeNow = new Date().toLocaleTimeString("en-US", { hour12: false });
  const countdown = getCountdownString();

  console.log(
    `  ${statusDot(true)} ${c.bold}${c.brightWhite}GENESIS FEST 2026${c.reset}  ${c.dim}|${c.reset}  ` +
      `${c.dim}TIME: ${c.brightWhite}${timeNow}${c.reset}  ${c.dim}|${c.reset}  ` +
      `${c.dim}STARTS IN: ${countdown}  ${c.dim}|${c.reset}  ` +
      `${c.dim}PORTAL: ${c.underline}${c.scarlet}${config.website}${c.reset}`
  );
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);
}

// 1. Announcements
function renderAnnouncements(config) {
  if (!config.announcements || !config.announcements.length) return;
  console.log(`\n  ${c.bold}${c.neonRed}:: LIVE ANNOUNCEMENTS${c.reset}`);
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);

  config.announcements.forEach((a) => {
    const tagBadge = badge(a.tag || "NOTICE", c.bgNeonRed, c.brightWhite);
    const timeStr = a.time ? `${c.dim}[${a.time}]${c.reset} ` : "";
    console.log(`    ${tagBadge} ${timeStr}${c.brightWhite}${a.text}${c.reset}`);
  });
}

// 2. Challenge Tracks
function renderTopics(config) {
  if (!config.topics || !config.topics.length) return;
  console.log(`\n  ${c.bold}${c.neonRed}:: CHALLENGE TRACKS & TOPICS${c.reset}`);
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);

  config.topics.forEach((t) => {
    console.log(`    ${c.bold}${c.neonRed}>${c.reset} ${c.bold}${c.brightWhite}${t.name}${c.reset}`);
    if (t.desc) {
      console.log(`      ${c.dim}${t.desc}${c.reset}`);
    }
  });
}

// 3. Event Timeline & Official Protocol
function renderSchedule(config) {
  if (!config.timeline) return;
  console.log(`\n  ${c.bold}${c.neonRed}:: EVENT TIMELINE & HACKATHON PROTOCOL${c.reset}`);
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);

  if (config.timeline.schedule) {
    config.timeline.schedule.forEach((item) => {
      console.log(`\n    ${c.bold}${c.bgDarkRed}${c.brightWhite} [ ${item.day.toUpperCase()} ] ${c.reset}`);
      console.log(`      ${c.bold}${c.neonRed}${item.time.padEnd(20)}${c.reset} ${c.brightWhite}${item.title}${c.reset}`);
    });
  }

  if (config.timeline.notice && config.timeline.notice.length) {
    console.log(`\n    ${c.dim}${c.red}${line("·", Math.min(getTermWidth(), 70))}${c.reset}`);
    console.log(`    ${c.bold}${c.neonRed}OFFICIAL PARTICIPATION DIRECTIVE:${c.reset}`);
    config.timeline.notice.forEach((note) => {
      console.log(`    ${c.dim}*${c.reset} ${c.lightGray}${note}${c.reset}`);
    });
  }
}

// 4. Tech Sponsors (Clean & Empty)
function renderTechSponsors(config) {
  console.log(`\n  ${c.bold}${c.neonRed}:: TECH SPONSORS${c.reset}`);
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);
  console.log(`    ${c.dim}Official updates and partner announcements will be published on the portal:${c.reset}`);
  console.log(`    ${c.bold}${c.scarlet}${config.website}${c.reset}`);
}

// 5. Judging Rubric
function renderJudgingRubric(config) {
  if (!config.judgingRubric || !config.judgingRubric.length) return;
  console.log(`\n  ${c.bold}${c.neonRed}:: JUDGING RUBRIC & EVALUATION CRITERIA${c.reset}`);
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);

  let totalStandard = 0;
  let totalBonus = 0;

  config.judgingRubric.forEach((r) => {
    if (r.isBonus) {
      totalBonus += r.points;
      const scoreBadge = badge(`+${r.points} PTS BONUS`, c.bgCrimson, c.brightWhite);
      console.log(`    ${scoreBadge} ${c.bold}${c.amber}${r.criteria}${c.reset}`);
    } else {
      totalStandard += r.points;
      const scoreBadge = badge(`${r.points} PTS`, c.bgDarkRed, c.brightWhite);
      console.log(`    ${scoreBadge} ${c.bold}${c.brightWhite}${r.criteria}${c.reset}`);
    }
    if (r.desc) {
      console.log(`      ${c.dim}${r.desc}${c.reset}`);
    }
  });

  console.log(`\n    ${c.dim}${c.red}${line("·", Math.min(getTermWidth(), 70))}${c.reset}`);
  console.log(
    `    ${c.bold}${c.neonRed}Total Score Pool:${c.reset} ${c.bold}${c.brightWhite}${totalStandard} Points${c.reset} ` +
      `${c.dim}+${c.reset} ${c.bold}${c.amber}${totalBonus} Bonus Points${c.reset} ` +
      `${c.dim}(Max Possible: ${totalStandard + totalBonus})${c.reset}`
  );
}

// Footer
function renderFooter(config) {
  console.log(`\n  ${c.dim}${c.red}${line("─")}${c.reset}`);
  console.log(
    `  ${c.bold}${c.bgNeonRed}${c.brightWhite} [ PRESS 'E' TO EXIT ] ${c.reset}  ` +
      `${c.dim}│ Portal: ${c.underline}${c.scarlet}${config.website}${c.reset}  ` +
      `${c.dim}│ Replay: ${c.brightWhite}[R]${c.reset}`
  );
  console.log("");
}

// Static Full Dashboard
function renderDashboard(config) {
  clearScreen();
  renderStackedDualBanner();
  renderHeader(config);
  renderAnnouncements(config);
  renderTopics(config);
  renderSchedule(config);
  renderTechSponsors(config);
  renderJudgingRubric(config);
  renderFooter(config);
}

// Full Typewriter Animated Dashboard
async function renderAnimatedDashboard(config) {
  clearScreen();

  // 1. Stream in ASCII Art
  await animateStackedDualBanner(25);
  await sleep(80);

  // 2. Header
  renderHeader(config);
  await sleep(80);

  // 3. Announcements (Typewriter)
  console.log(`\n  ${c.bold}${c.neonRed}:: LIVE ANNOUNCEMENTS${c.reset}`);
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);
  for (const a of config.announcements) {
    const tagBadge = badge(a.tag || "NOTICE", c.bgNeonRed, c.brightWhite);
    const timeStr = a.time ? `${c.dim}[${a.time}]${c.reset} ` : "";
    process.stdout.write(`    ${tagBadge} ${timeStr}`);
    await typewriterLine(a.text, 8, `${c.brightWhite}`);
    await sleep(35);
  }
  await sleep(60);

  // 4. Tracks & Topics (Typewriter)
  console.log(`\n  ${c.bold}${c.neonRed}:: CHALLENGE TRACKS & TOPICS${c.reset}`);
  console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);
  for (const t of config.topics) {
    process.stdout.write(`    ${c.bold}${c.neonRed}>${c.reset} `);
    await typewriterLine(t.name, 6, `${c.bold}${c.brightWhite}`);
    if (t.desc) {
      process.stdout.write(`      `);
      await typewriterLine(t.desc, 4, `${c.dim}`);
    }
    await sleep(35);
  }
  await sleep(60);

  // 5. Timeline & Protocol (Typewriter)
  if (config.timeline) {
    console.log(`\n  ${c.bold}${c.neonRed}:: EVENT TIMELINE & HACKATHON PROTOCOL${c.reset}`);
    console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);
    if (config.timeline.schedule) {
      for (const item of config.timeline.schedule) {
        console.log(`\n    ${c.bold}${c.bgDarkRed}${c.brightWhite} [ ${item.day.toUpperCase()} ] ${c.reset}`);
        process.stdout.write(`      ${c.bold}${c.neonRed}${item.time.padEnd(20)}${c.reset} `);
        await typewriterLine(item.title, 6, `${c.brightWhite}`);
        await sleep(30);
      }
    }
    if (config.timeline.notice) {
      console.log(`\n    ${c.dim}${c.red}${line("·", Math.min(getTermWidth(), 70))}${c.reset}`);
      console.log(`    ${c.bold}${c.neonRed}OFFICIAL PARTICIPATION DIRECTIVE:${c.reset}`);
      for (const note of config.timeline.notice) {
        process.stdout.write(`    ${c.dim}*${c.reset} `);
        await typewriterLine(note, 4, `${c.lightGray}`);
        await sleep(25);
      }
    }
  }
  await sleep(60);

  // 6. Tech Sponsors
  renderTechSponsors(config);
  await sleep(60);

  // 7. Judging Rubric (Typewriter)
  if (config.judgingRubric) {
    console.log(`\n  ${c.bold}${c.neonRed}:: JUDGING RUBRIC & EVALUATION CRITERIA${c.reset}`);
    console.log(`  ${c.dim}${c.red}${line("─")}${c.reset}`);

    let totalStandard = 0;
    let totalBonus = 0;

    for (const r of config.judgingRubric) {
      if (r.isBonus) {
        totalBonus += r.points;
        const scoreBadge = badge(`+${r.points} PTS BONUS`, c.bgCrimson, c.brightWhite);
        process.stdout.write(`    ${scoreBadge} `);
        await typewriterLine(r.criteria, 6, `${c.bold}${c.amber}`);
      } else {
        totalStandard += r.points;
        const scoreBadge = badge(`${r.points} PTS`, c.bgDarkRed, c.brightWhite);
        process.stdout.write(`    ${scoreBadge} `);
        await typewriterLine(r.criteria, 6, `${c.bold}${c.brightWhite}`);
      }
      if (r.desc) {
        process.stdout.write(`      `);
        await typewriterLine(r.desc, 4, `${c.dim}`);
      }
      await sleep(20);
    }

    console.log(`\n    ${c.dim}${c.red}${line("·", Math.min(getTermWidth(), 70))}${c.reset}`);
    console.log(
      `    ${c.bold}${c.neonRed}Total Score Pool:${c.reset} ${c.bold}${c.brightWhite}${totalStandard} Points${c.reset} ` +
        `${c.dim}+${c.reset} ${c.bold}${c.amber}${totalBonus} Bonus Points${c.reset} ` +
        `${c.dim}(Max Possible: ${totalStandard + totalBonus})${c.reset}`
    );
  }
  await sleep(60);

  // 8. Footer
  renderFooter(config);
}

module.exports = {
  renderHeader,
  renderAnnouncements,
  renderTopics,
  renderSchedule,
  renderTechSponsors,
  renderJudgingRubric,
  renderFooter,
  renderDashboard,
  renderAnimatedDashboard,
};
