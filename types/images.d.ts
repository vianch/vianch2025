type FocusArea =
  | "center"
  | "top"
  | "right"
  | "left"
  | "bottom"
  | "top_right"
  | "top_left"
  | "bottom_right"
  | "bottom_left"
  | "face"
  | "faces";
type FitType = "pad" | "fill" | "scale" | "crop" | "thumb";

interface ImageConfig {
  q?: number;
  f?: FocusArea;
  fit?: FitType;
  h?: number;
}
