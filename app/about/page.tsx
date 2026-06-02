import { ReactElement } from "react";
import type { Metadata } from "next";
import Link from "next/link";

/* Components */
import AboutTerminal from "./AboutTerminal";
import JsonLd from "../components/JsonLd/JsonLd";

/* Constants */
import { Employer, OgType, Projects, SocialLinks } from "@/lib/constants/seo.constants";

/* Utils */
import { generateMetadata as generateSeoMetadata } from "@/lib/utils/seo.utils";
import {
  buildSchemaGraph,
  getBreadcrumbNode,
  getPersonNode,
  getProfilePageNode,
} from "@/lib/utils/structured-data.utils";

/* Styles */
import styles from "./About.module.css";

export const metadata: Metadata = generateSeoMetadata({
  title: "About",
  description:
    "About Victor Chavarro (VIANCH) — a London-based photographer and full-stack software engineer, " +
    "Senior Software Engineer at TodayTix Group and owner of vianch.com.",
  canonicalUrl: "/about",
  ogType: OgType.Profile,
});

const aboutSchema = buildSchemaGraph([
  getPersonNode(),
  getProfilePageNode(),
  getBreadcrumbNode([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
]);

const techStack = [
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "NestJS",
  "GraphQL",
  "Redis",
  "Groovy",
  "Tailwind CSS",
  "LLMs & MCP",
  "Datadog",
  "Vercel",
];

const AboutPage = (): ReactElement => {
  return (
    <>
      <JsonLd data={aboutSchema} />

      <section className={styles.bio}>
        <h1 className={styles.name}>
          Victor Chavarro <span className={styles.alias}>— VIANCH</span>
        </h1>

        <p className={styles.lead}>
          I&apos;m Victor — a full-stack engineer and photographer based in London, owner of{" "}
          <Link href="/">vianch.com</Link>, and a Senior Software Engineer at{" "}
          <a href={Employer.url} target="_blank" rel="noopener noreferrer">
            {Employer.name}
          </a>
          .
        </p>

        <p>
          At TodayTix I work across the stack. On the front end I build Portal, our partner-facing
          Next.js, React, Tailwind and TypeScript app; on the back end I maintain Platform, the core
          commerce service that powers orders, payments, inventory, and ticketing across the group.
          I own my work end to end — scoping and managing my own tasks, issues, and stories, and
          staying accountable for everything I ship. Clean, scalable code and interfaces that feel
          obvious to use are non-negotiable for me.
        </p>

        <p>
          My current focus is AI-assisted engineering, and I build the tooling as much as I use it.
          Together with my team I create and evolve a full agentic toolkit on Claude Code: a
          marketplace of plugins with 30+ specialized skills and agents, custom MCP servers
          (including a knowledge-graph &ldquo;memory palace&rdquo;), multi-agent orchestration, and
          automated pipelines for code review, PR triage, and AI supply-chain security.
        </p>

        <p>
          When I&apos;m not shipping code, I&apos;m behind a camera. As VIANCH I shoot street,
          cultural, and travel photography — you can explore the collections across{" "}
          <Link href="/">this site</Link>.
        </p>

        <h2 className={styles.sectionTitle}>Open source</h2>
        <ul className={styles.list}>
          {Projects.map((project) => (
            <li key={project.url}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.projectName}>{project.label}</span>
              </a>{" "}
              — <span className={styles.projectDescription}>{project.description}</span>
            </li>
          ))}
        </ul>

        <h2 className={styles.sectionTitle}>Tech I work with</h2>
        <ul className={styles.tags}>
          {techStack.map((tech) => (
            <li key={tech} className={styles.tag}>
              {tech}
            </li>
          ))}
        </ul>

        <h2 className={styles.sectionTitle}>Find me</h2>
        <ul className={styles.socialLinks}>
          {SocialLinks.map((social) => (
            <li key={social.url}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.terminalSection}>
        <AboutTerminal />
      </section>
    </>
  );
};

export default AboutPage;
