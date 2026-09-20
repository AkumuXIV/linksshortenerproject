"use client";

import type { Link } from "@/db/schema";
import { DeleteLinkDialog } from "./delete-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";

export function LinkListItem({ link }: { link: Link }) {
  return (
    <li className="rounded-xl border bg-card p-4 text-card-foreground">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="font-medium">/{link.shortCode}</p>
          <p className="truncate text-sm text-muted-foreground">{link.url}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <EditLinkDialog link={link} />
          <DeleteLinkDialog link={link} />
        </div>
      </div>
    </li>
  );
}
