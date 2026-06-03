/**
 * Shared props for every reusable SVG icon under app/components/icons.
 * `fill` is the single colour input: filled icons apply it to `fill`, outline
 * icons apply it to `stroke`. Pass "currentColor" to inherit the parent colour.
 */
type Icon = {
  className: string;
  fill: string;
  height: string;
  onClick?: () => void;
  width: string;
};
