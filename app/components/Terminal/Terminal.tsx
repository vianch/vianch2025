"use client";

import { FC, useState, KeyboardEvent, useEffect, useRef } from "react";

/* Styles */
import styles from "./Terminal.module.css";

/* Constants */
import { EventNames, KeyNames } from "@/constants/ui.constants";
import { commands, commandsText, commandsList } from "@/constants/terminal.constants";

type TerminalProps = {
  prompt?: string;
  initialMessage?: string[];
};

const Terminal: FC<TerminalProps> = ({
  prompt = commandsText.prompt,
  initialMessage = commandsText.initialMessage,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(initialMessage);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearHistory = () => {
    setHistory([]);
    setInput("");
  };

  const handleCommand = (command: string) => {
    const newHistory = [...history, `$ ${command}`];

    switch (command.toLowerCase()) {
      case commands.help:
        newHistory.push(...commandsText.help);
        break;
      case commands.clear:
      case commands.cls:
        clearHistory();
        return;
      case commands.welcome:
        newHistory.push(...commandsText.initialMessage);
        break;
      default:
        if (command) {
          newHistory.push(...commandsText.notFound(command));
        }
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === KeyNames.Enter) {
      handleCommand(input);
    }
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Add new useEffect for focus management
  useEffect(() => {
    inputRef.current?.focus();

    // Re-focus when input loses focus
    const handleFocusLoss = () => {
      inputRef.current?.focus();
    };

    document.addEventListener(EventNames.Click, handleFocusLoss);

    return () => {
      document.removeEventListener(EventNames.Click, handleFocusLoss);
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
                {line}
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
                  className={`${styles.input} ${commandsList.includes(input) ? styles.validCommand : ""}`}
                  spellCheck="false"
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
