"use client";
// TODO:
// - events in a enum or object with type
// - avoid using letters as a parameter
// - Add a command to open a new window

import { FC, useState, KeyboardEvent, useEffect, useRef } from "react";

/* Styles */
import styles from "./Terminal.module.css";

/* Constants */
import { EventNames, KeyNames } from "@/constants/ui.constants";
import { commands } from "@/constants/terminal.constants";

type TerminalProps = {
  prompt?: string;
  initialMessage?: string[];
};

const Terminal: FC<TerminalProps> = ({
  prompt = "guest@vianch: ~",
  initialMessage = ["Welcome to VIANCH portfolio", "- Type help for a list of supported commands."],
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(initialMessage);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (command: string) => {
    const newHistory = [...history, `➜ ~ ${command}`];

    switch (command.toLowerCase()) {
      case "help":
        newHistory.push(...commands.help);
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        if (command) {
          newHistory.push(...commands.notFound(command));
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
              <span className={styles.prompt}>➜ ~ </span>
              <div className={styles.inputWrapper}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                  autoFocus
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
