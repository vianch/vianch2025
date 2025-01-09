"use client";

import { FC, useState, KeyboardEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* Styles */
import styles from "./Terminal.module.css";

/* Constants */
import { EventNames, KeyNames } from "@/lib/constants/ui.constants";
import {
  commands,
  commandsText,
  allowedRedirects,
  terminalStates,
} from "@/lib/constants/terminal.constants";

/* Components */
import TerminalLine from "./TerminalLine";

type TerminalProps = {
  state?: TerminalStates;
  prompt?: string;
  initialMessage?: string[];
};

const Terminal: FC<TerminalProps> = ({
  state = terminalStates.null,
  prompt = commandsText.prompt,
  initialMessage = commandsText.initialMessage,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(initialMessage);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const clearHistory = () => {
    setHistory([]);
    setInput("");
  };

  const setNewHistory = (newHistory: string[]) => {
    setHistory(newHistory);
    setInput("");
  };

  const handleRedirect = (commandLine: string, newHistory: string[]): void => {
    const redirectUrl = commandLine.split(" ")[1];

    if (!redirectUrl) {
      newHistory.push(commandsText.parameterMissing);
      return;
    }

    if (!allowedRedirects.includes(redirectUrl)) {
      newHistory.push(commandsText.notAllowed(redirectUrl ?? ""));
      return;
    }

    router.push(`/${redirectUrl}`);
  };

  const handleCommand = (commandLine: string) => {
    const command = commandLine.split(" ")[0];
    const newHistory = [
      ...history,
      commandsText.lastMessage(commandLine, styles.validCommand, commandsText.prompt),
    ];

    switch (command.toLowerCase()) {
      case commands.clear:
      case commands.cls:
        clearHistory();
        return;

      case commands.redirect:
        handleRedirect(commandLine, newHistory);
        break;

      case commands.skills:
        newHistory.push(...commandsText.skills(styles.skills));
        break;
      default:
        if (!command) return;

        const commandResponse = {
          [commands.help]: commandsText.help,
          [commands.welcome]: commandsText.initialMessage,
          [commands.contact]: commandsText.contact,
        }[command.toLowerCase()];

        newHistory.push(...(commandResponse ?? commandsText.notFound(command)));
    }

    setNewHistory(newHistory);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === KeyNames.Enter) {
      handleCommand(input);
    }
  };

  const autoScroll = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    autoScroll();
  }, [history]);

  useEffect(() => {
    if (state === terminalStates.active) {
      handleCommand(commands.contact);
      inputRef.current?.focus();
      terminalRef.current?.focus();
    }
  }, [state, inputRef]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleFocusLoss = () => {
      inputRef.current?.focus();
    };

    const handleArrowKeys = (event: Event) => {
      const keyEvent = event as unknown as KeyboardEvent;

      if (keyEvent.key === KeyNames.ArrowUp || keyEvent.key === KeyNames.ArrowDown) {
        event.preventDefault();
      }
    };

    document.addEventListener(EventNames.Click, handleFocusLoss);
    document.addEventListener(EventNames.KeyDown, handleArrowKeys);

    return () => {
      document.removeEventListener(EventNames.Click, handleFocusLoss);
      document.removeEventListener(EventNames.KeyDown, handleArrowKeys);
    };
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.terminal}>
        <div className={styles.window}>
          {/* Top bar */}
          <div className={styles.titlebar}>
            <div className={styles.buttons}>
              <div className={styles.close} />
              <div className={styles.minimize} />
              <div className={styles.zoom} />
            </div>

            <div className={styles.title}>{prompt}</div>
          </div>

          <div className={styles.field} ref={terminalRef}>
            {history.map((line, i) => (
              <div key={i} className={styles.line}>
                <TerminalLine>{line}</TerminalLine>
              </div>
            ))}

            <div className={styles.inputLine}>
              <span className={styles.prompt}>$ {prompt} </span>
              <div className={styles.inputWrapper}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                  spellCheck="false"
                  maxLength={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
