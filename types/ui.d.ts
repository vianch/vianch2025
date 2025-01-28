import { ErrorMessages, ErrorTypes } from "@/lib/constants/contentful.constants";
import { terminalStates } from "@/lib/constants/terminal.constants";
import { KeyNames } from "@/lib/constants/ui.constants";

declare global {
  type KeyNames = (typeof KeyNames)[keyof typeof KeyNames];
  type EventNames = (typeof EventNames)[keyof typeof EventNames];
  type TerminalStates = (typeof terminalStates)[keyof typeof terminalStates];
  type ErrorTypes = (typeof ErrorTypes)[keyof typeof ErrorTypes];
  type ErrorMessages = (typeof ErrorMessages)[keyof typeof ErrorMessages];
}
