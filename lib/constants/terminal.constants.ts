import { todayDate, todayTime } from "@/lib/utils/date.utils";

export const helpCommands = [
  "Available commands:",
  "- [clear] / [cls]  : Clear terminal",
  "- [contact]        : Show contact information",
  "- [help]           : Show this help message",
  "- [skills]         : Show skills",
  "- [welcome]        : Initial message",
  "- [redirect] { gallery | styleguide | playground | / }: Redirect to a specific URL",
];

const initialMessage = [
  "Welcome to VIANCH portfolio",
  `Today is ${todayDate()} - ${todayTime()}`,
  "Type [help] for a list of supported commands.",
  "",
];

const contactCommands = [
  "Contact information:",
  "- Email: <a href='mailto:hello@vianch.com'>hello@vianch.com</a>",
  "- LinkedIn:<a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/vianch'>https://www.linkedin.com/in/vianch</a>",
  "- GitHub:<a target='_blank' rel='noopener noreferrer' href='https://github.com/vianch'>https://github.com/vianch</a>",
  "- Instagram:<a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/_vianch'>https://www.instagram.com/_vianch</a>",
];

const skillsCommands = (style: string): string[] => [
  `<div class='${style}'>Languages: </div>TypeScript, GO, Python, C++`,
  `<div class='${style}'>Favorite Technologies: </div>GraphQL, REST, CirecleCI, Jest, React, 
Express, MongoDB, PostgreSQL, Docker, AWS, Azure,
Vercel, Node.js, Yarn or Deno or Bun`,
  `<div class='${style}'>Actual Frameworks: </div>Next.js, Jest, Cypress, Storybook`,
  `<div class='${style}'>Favorite Tools / IDEs: </div>GitHub, Cursor, WebStorm, Figma,
Photoshop, Lightroom,
a notebook, my camera`,
];

export const commandsText = {
  contact: contactCommands,
  clear: [],
  help: helpCommands,
  initialMessage,
  notFound: (command: string) => [`Command not found: ${command}`],
  notAllowed: (command: string) => `Command not allowed ${command}`,
  parameterMissing: "Parameter missing",
  lastMessage: (command: string, style: string, prompt: string): string =>
    `<span class=${style}>$ ${prompt}</span> ${command}`,
  prompt: "guest@vianch: ~",
  skills: (style: string) => skillsCommands(style),
};

export const commands = {
  clear: "clear",
  cls: "cls",
  help: "help",
  contact: "contact",
  redirect: "redirect",
  skills: "skills",
  welcome: "welcome",
};

export const terminalStates = {
  active: "active",
  inactive: "inactive",
  null: null,
};

export const allowedRedirects = ["gallery", "styleguide", "playground", "/"];

export const commandsList = Object.values(commands);
