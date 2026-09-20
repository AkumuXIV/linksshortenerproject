import { and, desc, eq } from "drizzle-orm";
import db from "@/db";
import { links } from "@/db/schema";

const SHORT_CODE_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SHORT_CODE_LENGTH = 7;
const MAX_SHORT_CODE_ATTEMPTS = 5;

function generateShortCode() {
  let code = "";
  for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
    code +=
      SHORT_CODE_ALPHABET[Math.floor(Math.random() * SHORT_CODE_ALPHABET.length)];
  }
  return code;
}

export async function getLinksForUser(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return link;
}

export async function createLink(userId: string, url: string) {
  for (let attempt = 0; attempt < MAX_SHORT_CODE_ATTEMPTS; attempt++) {
    const shortCode = generateShortCode();

    // avoid relying on the DB unique constraint error to detect collisions
    const existing = await db
      .select({ id: links.id })
      .from(links)
      .where(eq(links.shortCode, shortCode))
      .limit(1);

    if (existing.length > 0) continue;

    const [link] = await db
      .insert(links)
      .values({ shortCode, url, userId })
      .returning();

    return link;
  }

  throw new Error("Could not generate a unique short code. Please try again.");
}

export async function updateLinkUrl(userId: string, id: number, url: string) {
  // scope by userId so a user can only update their own links
  const [link] = await db
    .update(links)
    .set({ url, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();

  return link;
}

export async function deleteLink(userId: string, id: number) {
  // scope by userId so a user can only delete their own links
  const [link] = await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();

  return link;
}
