import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksForUser } from "@/data/links";
import { CreateLinkDialog } from "./create-link-dialog";
import { LinkListItem } from "./link-list-item";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userLinks = await getLinksForUser(userId);

  return (
    <main className="flex flex-1 justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">Your links</h1>
          <CreateLinkDialog />
        </div>

        {userLinks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven&apos;t created any links yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {userLinks.map((link) => (
              <LinkListItem key={link.id} link={link} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
