import { ReactElement } from "react";
import Link from "next/link";

/* Styles */
import styles from "./Breadcrumbs.module.css";

type BreadcrumbsProps = {
  path: string;
  slug: string;
};

const Breadcrumbs = ({ path, slug }: BreadcrumbsProps): ReactElement => {
  return (
    <div className={styles.breadcrumbs}>
      <Link href="/">Home/</Link>

      <Link href={`/${path}`}>{path}/</Link>
      <span>{slug}</span>
    </div>
  );
};

export default Breadcrumbs;
