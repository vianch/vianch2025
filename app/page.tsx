import { ReactElement } from "react";
import { notFound } from "next/navigation";

/* API */
import { getPage } from "@/lib/api/gallery";

/* Components */
import HomePage from "./HomePage";

export default async function Page(): Promise<ReactElement> {
  const pageResponse = await getPage({ slug: "home" });
  const pageData = pageResponse.items[0];

  if (!pageData?.collectionsCollection?.total) {
    notFound();
  }

  return (
    <main className="container container-padding-lg">
      <HomePage collections={pageData.collectionsCollection.items ?? []} />
    </main>
  );
}
