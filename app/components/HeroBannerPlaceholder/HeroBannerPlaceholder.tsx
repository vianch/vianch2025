import { FC } from "react";

/* Styles */
import defaultStyles from "./HeroBannerPlaceholder.module.css";

type HeroBannerPlaceholderProps = {
  variant?: "default" | "secondary";
};

const HeroBannerPlaceholder: FC<HeroBannerPlaceholderProps> = ({ variant = "default" }) => {
  return (
    <section className={`${defaultStyles.banner} ${defaultStyles[variant]}`}>
      <div className={defaultStyles.texts}>
        <div className={`${defaultStyles.placeholder} ${defaultStyles.title}`} />
        <div className={`${defaultStyles.placeholder} ${defaultStyles.year}`} />
        <div className={`${defaultStyles.placeholder} ${defaultStyles.description}`} />
      </div>
      <div className={defaultStyles.figure}>
        <div className={defaultStyles.image} />
      </div>
    </section>
  );
};

export default HeroBannerPlaceholder;
