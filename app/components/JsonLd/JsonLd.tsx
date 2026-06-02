import { ReactElement } from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders a JSON-LD structured data block as a real
 * `<script type="application/ld+json">` tag so search engines parse it.
 *
 * Note: Next.js `metadata.other` cannot emit script tags, so structured data
 * must be rendered as a component like this rather than through the Metadata API.
 * The payload is built from app-controlled constants (never user input).
 */
const JsonLd = ({ data }: JsonLdProps): ReactElement => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export default JsonLd;
