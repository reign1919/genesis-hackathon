// Terminal Animation Utilities for Genesis Hackathon CLI
// Smooth character-by-character typewriter & art line stream

const { c } = require("./colors");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Print text with typewriter character-by-character effect
async function typewriter(text, speedMs = 12, style = "") {
  for (let i = 0; i < text.length; i++) {
    process.stdout.write(style + text[i] + c.reset);
    await sleep(speedMs);
  }
}

// Typewriter a whole line and append newline
async function typewriterLine(text, speedMs = 10, style = "") {
  await typewriter(text, speedMs, style);
  process.stdout.write("\n");
}

// Stream array of lines sequentially with deliberate typewriter delay
async function streamLines(lines, delayMs = 35, style = "") {
  for (const line of lines) {
    console.log(style + line + c.reset);
    await sleep(delayMs);
  }
}

// Red Matrix Cyber Decoder Easter Egg Animation
async function playMatrixAnimation(durationMs = 1800) {
  console.clear();
  process.stdout.write("\x1b[?25l"); // Hide cursor
  const chars = "0123456789ABCDEFGENESISX_#*<>[]{}+=-~$!%&";
  const width = Math.min(process.stdout.columns || 80, 80);

  const start = Date.now();
  while (Date.now() - start < durationMs) {
    let rowStr = "";
    for (let i = 0; i < width; i++) {
      if (Math.random() > 0.6) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const color =
          Math.random() > 0.85
            ? c.brightWhite
            : Math.random() > 0.4
            ? c.neonRed
            : c.bloodRed;
        rowStr += `${color}${char}${c.reset}`;
      } else {
        rowStr += " ";
      }
    }
    console.log(rowStr);
    await sleep(40);
  }

  console.log(
    `\n  ${c.bold}${c.brightWhite}${c.bgNeonRed} [ DECRYPTION COMPLETE // ACCESS GRANTED ] ${c.reset}\n`
  );
  await sleep(600);
}

module.exports = {
  sleep,
  typewriter,
  typewriterLine,
  streamLines,
  playMatrixAnimation,
};
