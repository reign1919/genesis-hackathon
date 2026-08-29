// ============================================================
//  GENESIS HACKATHON 2026 CONFIGURATION
//  Theme: RED & BLACK | Clean, High-Contrast, Zero Emojis
// ============================================================

module.exports = {
  // Hackathon Identity
  hackathonName: "GENESIS HACKATHON 2026",
  tagline: "48 hours. Build the future. Break boundaries.",
  packageName: "hackathon-cli",
  website: "https://genesisfest.ivwschool.com/events",

  // Theme & Styling
  theme: "red-black",

  // Tracks & Challenge Topics (Updated live on kickoff)
  topics: [
    {
      name: "Track 1 // Agentic AI & Autonomous Systems",
      desc: "Local LLMs, autonomous agent workflows, developer tools & multimodal interfaces",
    },
    {
      name: "Track 2 // Climate, Energy & Sustainable Tech",
      desc: "Carbon intelligence, resource optimization, clean tech & circular systems",
    },
    {
      name: "Track 3 // Health, Bio & Accessibility Tech",
      desc: "Assistive interfaces, clinical workflow tools & wellness intelligence",
    },
    {
      name: "Track 4 // Open Innovation & Decentralized Tech",
      desc: "High-impact open source tools, Web3 protocols & creative computing",
    },
  ],

  // Live Announcements
  announcements: [
    {
      tag: "LIVE",
      time: "Thursday 08:30 AM",
      text: "Hackathon officially begins. Challenge topics updated live.",
    },
    {
      tag: "DEADLINE",
      time: "Friday 11:30 PM",
      text: "Mandatory Tech Stack Document submission deadline via portal.",
    },
    {
      tag: "EXPO",
      time: "Saturday 26th",
      text: "In-person project demos at school. Bring laptops and all required devices.",
    },
  ],

  // Event Timeline & Protocol
  timeline: {
    schedule: [
      {
        day: "Thursday, 24th September",
        time: "08:30 AM",
        title: "Hackathon Commences & Challenge Topics Released Live",
      },
      {
        day: "Friday, 25th September",
        time: "11:30 PM (MAXIMUM)",
        title: "MANDATORY DEADLINE: Tech Stack Document Submission",
      },
      {
        day: "Saturday, 26th September",
        time: "On-Campus",
        title: "In-Person Project Expo, Live Demonstrations & Final Judging",
      },
    ],
    notice: [
      "REMOTE DEVELOPMENT: Participants will be coding and developing their projects remotely from home during the initial build phase.",
      "TECH STACK SUBMISSION: Teams must submit their finalized Tech Stack Document on Friday, 25th September by 11:30 PM sharp.",
      "CAMPUS REPORTING: On Saturday, 26th September, all participants must report to school with their laptops, chargers, and presentation devices for live project exhibitions.",
    ],
  },

  // Tech Sponsors (Kept clean & empty as requested)
  techSponsors: {
    portalLink: "https://genesisfest.ivwschool.com/events",
  },

  // Judging Rubric Breakdown (105 Base + 20 Bonus = 125 Total)
  judgingRubric: [
    {
      criteria: "Functionality and technical execution",
      points: 30,
      desc: "Robustness, code quality, technical complexity and functional execution",
    },
    {
      criteria: "UI/UX",
      points: 30,
      desc: "Visual aesthetics, usability, responsiveness and user experience polish",
    },
    {
      criteria: "Demo and presentation",
      points: 15,
      desc: "Clarity of walkthrough, live demonstration effectiveness and pitch",
    },
    {
      criteria: "Originality",
      points: 10,
      desc: "Novelty of concept, creative thinking and differentiation",
    },
    {
      criteria: "Idea and solution to the problem",
      points: 10,
      desc: "Depth of problem validation, real-world utility and viability",
    },
    {
      criteria: "Github Code Hygiene and knowledge of code blocks",
      points: 10,
      desc: "Clean commit history, structured modules, documentation and code understanding",
    },
    {
      criteria: "BONUS // Round 2 Problem Solving",
      points: 20,
      desc: "Advanced problem-solving challenge performance and adaptive execution",
      isBonus: true,
    },
  ],
};
