import { todayDate, todayTime } from "@/utils/date.utils";

export const helpCommands = [
  "Available commands:",
  "- help / -h: Show this help message",
  "- clear / cls / -c: Clear terminal",
  "- welcome: Initial message",
];

const initialMessage = [
  "Welcome to VIANCH portfolio",
  `Today is ${todayDate()} - ${todayTime()}`,
  "Type help for a list of supported commands.",
  "",
];

export const commandsText = {
  clear: [],
  help: helpCommands,
  initialMessage,
  notFound: (command: string) => [`Command not found: ${command}`],
  prompt: "guest@vianch: ~",
};

export const commands = {
  help: "help",
  clear: "clear",
  cls: "cls",
  welcome: "welcome",
};

export const commandsList = Object.values(commands);
