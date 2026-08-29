// ASCII Art Banners Collection for GENESIS HACKATHON
// Prominent GENESIS block banner on top + 48hr Hackathon banner below

const { c } = require("./colors");
const { streamLines, sleep } = require("./animation");

function cleanArt(raw) {
  return raw.replace(/^\n+|\n+$/g, "");
}

// Banner 1: GENESIS Bold Block Typography (6 Lines tall, high visual prominence)
const artGenesis = cleanArt(String.raw`
 ██████╗ ███████╗███╗   ██╗███████╗███████╗██╗███████╗
██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔════╝██║██╔════╝
██║  ███╗█████╗  ██╔██╗ ██║█████╗  ███████╗██║███████╗
██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ╚════██║██║╚════██║
╚██████╔╝███████╗██║ ╚████║███████╗███████║██║███████║
 ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝╚══════╝
`);

// Banner 2: 48 HR HACKATHON Pixel Typography
const art48HrHackathon = cleanArt(String.raw`
██  ██ ▄████▄ ██  ██ ▄▄▄▄    ██  ██  ▄▄▄   ▄▄▄▄ ▄▄ ▄▄  ▄▄▄ ▄▄▄▄▄▄ ▄▄ ▄▄  ▄▄▄  ▄▄  ▄▄ 
▀█████ ██▄▄██ ██████ ██▄█▄   ██████ ██▀██ ██▀▀▀ ██▄█▀ ██▀██  ██   ██▄██ ██▀██ ███▄██ 
    ██ ▀█▄▄█▀ ██  ██ ██ ██   ██  ██ ██▀██ ▀████ ██ ██ ██▀██  ██   ██ ██ ▀███▀ ██ ▀██ 
`);

// Static renderers
function renderGenesisArt() {
  return `${c.bold}${c.neonRed}${artGenesis}${c.reset}`;
}

function render48HrArt() {
  return `${c.bold}${c.scarlet}${art48HrHackathon}${c.reset}`;
}

function renderStackedDualBanner() {
  console.log(renderGenesisArt());
  console.log("");
  console.log(render48HrArt());
}

// Animated stream renderer
async function animateStackedDualBanner(speedMs = 25) {
  const lines1 = artGenesis.split("\n");
  await streamLines(lines1, speedMs, `${c.bold}${c.neonRed}`);
  console.log("");
  await sleep(60);
  const lines2 = art48HrHackathon.split("\n");
  await streamLines(lines2, speedMs, `${c.bold}${c.scarlet}`);
}

module.exports = {
  artGenesis,
  art48HrHackathon,
  renderGenesisArt,
  render48HrArt,
  renderStackedDualBanner,
  animateStackedDualBanner,
};
