import { KeyNames } from "@/constants/ui.constants";

declare global {
  type KeyNames = (typeof KeyNames)[keyof typeof KeyNames];
  type EventNames = (typeof EventNames)[keyof typeof EventNames];
}
