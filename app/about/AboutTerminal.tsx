"use client";

import { useSearchParams } from "next/navigation";
import { ReactElement, Suspense } from "react";

/* Components */
import Terminal from "../components/Terminal/Terminal";
import Loading from "../components/Loading/Loading";

/* Styles */
import styles from "./page.module.css";

const AboutContent = (): ReactElement => {
  const searchParams = useSearchParams();
  const contact = searchParams.get("contact") as TerminalStates;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Terminal state={contact} />
      </main>
    </div>
  );
};

const AboutTerminal = (): ReactElement => {
  return (
    <Suspense fallback={<Loading />}>
      <AboutContent />
    </Suspense>
  );
};

export default AboutTerminal;
