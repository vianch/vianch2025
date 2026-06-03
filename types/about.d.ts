/* Data shapes for the About page content centralised in about.constants.ts. */

type AboutIconKey = "camera" | "code" | "spark";

type AboutDiscipline = {
  description: string;
  iconKey: AboutIconKey;
  tags: string[];
  title: string;
};

type AboutFact = {
  label: string;
  value: string;
};

type AboutSectionCopy = {
  description?: string;
  eyebrow: string;
  title: string;
};

type AboutStat = {
  label: string;
  suffix: string;
  value: number;
};

/**
 * A run of rich text. A segment is plain text by default; `bold` wraps it in
 * <strong>, and `href` turns it into a link (internal Next <Link> unless
 * `external` is set, which renders a new-tab <a>).
 */
type AboutTextSegment = {
  bold?: boolean;
  external?: boolean;
  href?: string;
  text: string;
};
