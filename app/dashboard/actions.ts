"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createLink as createLinkRecord,
  deleteLink as deleteLinkRecord,
  updateLinkUrl,
} from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().trim().min(1, "URL is required").url("Enter a valid URL"),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().trim().min(1, "URL is required").url("Enter a valid URL"),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

type ActionResult = { success: true } | { success: false; error: string };

export async function createLink(
  input: CreateLinkInput
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in to create a link." };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    await createLinkRecord(userId, parsed.data.url);
  } catch {
    return { success: false, error: "Failed to create link. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateLink(
  input: UpdateLinkInput
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in to edit a link." };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    const updated = await updateLinkUrl(userId, parsed.data.id, parsed.data.url);
    if (!updated) {
      return {
        success: false,
        error: "Link not found or you do not have permission to edit it.",
      };
    }
  } catch {
    return { success: false, error: "Failed to update link. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteLink(
  input: DeleteLinkInput
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in to delete a link." };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  try {
    const deleted = await deleteLinkRecord(userId, parsed.data.id);
    if (!deleted) {
      return {
        success: false,
        error: "Link not found or you do not have permission to delete it.",
      };
    }
  } catch {
    return { success: false, error: "Failed to delete link. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
