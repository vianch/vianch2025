"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/* Components */
import Terminal from "../components/Terminal/Terminal";

/* Styles */
import styles from "./page.module.css";
import Loading from "../components/Loading/Loading";

function AboutContent() {
  const searchParams = useSearchParams();
  const contact = searchParams.get("contact") as TerminalStates;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Terminal state={contact} />
      </main>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AboutContent />
    </Suspense>
  );
}
