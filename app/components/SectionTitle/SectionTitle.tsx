import { FC } from "react";

type SectionTitleProps = {
  title: string;
  description?: string;
};

const SectionTitle: FC<SectionTitleProps> = ({ title, description = null }) => {
  return (
    <>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </>
  );
};

export default SectionTitle;
