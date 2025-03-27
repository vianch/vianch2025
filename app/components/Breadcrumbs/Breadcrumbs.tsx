import { ReactElement } from "react";
import Link from "next/link";

type BreadcrumbsProps = {
  path: string;
  slug: string;
};

const Breadcrumbs = ({ path, slug }: BreadcrumbsProps): ReactElement => {
  return (
    <div>
      <Link href="/">Home/</Link>

      <Link href={`/${path}`}>{path}/</Link>
      <span>{slug}</span>
    </div>
  );
};

export default Breadcrumbs;
