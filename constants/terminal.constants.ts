import { todayDate, todayTime } from "@/utils/date.utils";

export const helpCommands = [
  "Available commands:",
  "- clear / cls : Clear terminal",
  "- help: Show this help message",
  "- info: Show contact information",
  "- welcome: Initial message",
];

const initialMessage = [
  "Welcome to VIANCH portfolio",
  `Today is ${todayDate()} - ${todayTime()}`,
  "Type [help] for a list of supported commands.",
  "",
];

const infoCommands = [
  "Contact information:",
  "- Email: <a href='mailto:hello@vianch.com'>hello@vianch.com</a>",
  "- LinkedIn:<a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/vianch'>https://www.linkedin.com/in/vianch</a>",
  "- GitHub:<a target='_blank' rel='noopener noreferrer' href='https://github.com/vianch'>https://github.com/vianch</a>",
  "- Instagram:<a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/_vianch'>https://www.instagram.com/_vianch</a>",
];

export const commandsText = {
  clear: [],
  help: helpCommands,
  initialMessage,
  info: infoCommands,
  notFound: (command: string) => [`Command not found: ${command}`],
  lastMessage: (command: string, style: string, prompt: string): string =>
    `<span class=${style}>$ ${prompt}</span> ${command}`,
  prompt: "guest@vianch: ~",
};

export const commands = {
  clear: "clear",
  cls: "cls",
  help: "help",
  info: "info",
  welcome: "welcome",
};

export const commandsList = Object.values(commands);
