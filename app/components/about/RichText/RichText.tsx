import { Fragment, ReactElement } from "react";
import Link from "next/link";

type RichTextProps = {
  segments: AboutTextSegment[];
};

/**
 * Renders an array of AboutTextSegment as inline content: plain text, bold runs
 * (<strong>), internal links (Next <Link>), or external links (new-tab <a>).
 * Lets About-page copy live as data in about.constants.ts while components stay
 * focused on layout.
 */
const RichText = ({ segments }: RichTextProps): ReactElement => (
  <>
    {segments.map((segment, index) => {
      if (segment.href) {
        if (segment.external) {
          return (
            <a key={index} href={segment.href} target="_blank" rel="noopener noreferrer">
              {segment.text}
            </a>
          );
        }

        return (
          <Link key={index} href={segment.href}>
            {segment.text}
          </Link>
        );
      }

      if (segment.bold) {
        return <strong key={index}>{segment.text}</strong>;
      }

      return <Fragment key={index}>{segment.text}</Fragment>;
    })}
  </>
);

export default RichText;
