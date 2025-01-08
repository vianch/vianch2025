export const helpCommands = [
  "Available commands:",
  "- help: Show this help message",
  "- clear: Clear terminal",
];

export const commands = {
  help: helpCommands,
  notFound: (command: string) => [`Command not found: ${command}`],
  clear: [],
};
