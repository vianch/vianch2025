"use client";

import { usePathname } from "next/navigation";

/* Components */
import Terminal from "./components/Terminal/Terminal";

/* Styles */
import styles from "./page.module.css";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Terminal
          initialMessage={[
            `Error 404: Page ${pathname} not found`,
            "The requested URL was not found on this server.",
            "",
            "Available commands:",
            "- [help]: Show available commands",
            "- [redirect /]: Return to homepage",
            "",
            "Type a command to continue...",
          ]}
        />
      </main>
    </div>
  );
}
