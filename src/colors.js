// Terminal Dimensions, ANSI Styling & Screen Management

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  inverse: "\x1b[7m",
  blink: "\x1b[5m",

  // Red Spectrum
  neonRed: "\x1b[38;5;196m",
  brightRed: "\x1b[91m",
  crimson: "\x1b[38;5;160m",
  scarlet: "\x1b[38;5;203m",
  bloodRed: "\x1b[38;5;124m",
  deepRed: "\x1b[38;5;88m",
  darkBurgundy: "\x1b[38;5;52m",
  red: "\x1b[31m",

  // Accent & Contrast
  brightWhite: "\x1b[97m",
  pureWhite: "\x1b[38;5;231m",
  gray: "\x1b[90m",
  lightGray: "\x1b[38;5;250m",
  midGray: "\x1b[38;5;242m",
  darkCharcoal: "\x1b[38;5;236m",
  deepCharcoal: "\x1b[38;5;233m",
  black: "\x1b[30m",

  // Warning & Highlights
  amber: "\x1b[38;5;214m",
  gold: "\x1b[38;5;220m",
  cyan: "\x1b[38;5;51m",
  matrixGreen: "\x1b[38;5;46m",

  // Backgrounds
  bgNeonRed: "\x1b[48;5;196m",
  bgBrightRed: "\x1b[101m",
  bgCrimson: "\x1b[48;5;160m",
  bgDarkRed: "\x1b[48;5;52m",
  bgBloodRed: "\x1b[48;5;88m",
  bgCharcoal: "\x1b[48;5;235m",
  bgDarkCharcoal: "\x1b[48;5;233m",
  bgWhite: "\x1b[47m",
  bgBlack: "\x1b[40m",
};

// Complete screen & scrollback buffer wiper (prevents duplicate scrolling copies)
function clearScreen() {
  process.stdout.write("\x1b[3J\x1b[H\x1b[2J");
}

// Get current terminal columns, responsive safe width
function getTermWidth() {
  const cols = process.stdout.columns || 80;
  return Math.max(60, Math.min(cols - 2, 100));
}

function line(char = "─", len = null) {
  const targetLen = len !== null ? len : getTermWidth();
  return char.repeat(Math.max(10, targetLen));
}

function badge(text, bgColor = c.bgNeonRed, fgColor = c.brightWhite) {
  return `${bgColor}${fgColor}${c.bold} ${text} ${c.reset}`;
}

function statusDot(isLive = true) {
  return isLive ? `${c.neonRed}${c.bold}●${c.reset}` : `${c.gray}○${c.reset}`;
}

module.exports = {
  c,
  clearScreen,
  getTermWidth,
  line,
  badge,
  statusDot,
};
