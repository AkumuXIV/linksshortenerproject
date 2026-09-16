import { auth } from "@clerk/nextjs/server";
import { SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <main className="flex flex-1 justify-center px-6 py-16">
      <div className="w-full max-w-5xl space-y-12">
        <section className="space-y-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Linksshortenerproject
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Shorten links and manage everything in one dashboard
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Create clean short URLs, keep your links organized, and share them
            faster with a focused workflow built for speed.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SignUpButton mode="modal">
              <Button size="lg">Get started</Button>
            </SignUpButton>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border bg-card p-6 text-card-foreground">
            <h2 className="text-lg font-semibold">Fast link creation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Turn long URLs into short, shareable links in seconds.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-6 text-card-foreground">
            <h2 className="text-lg font-semibold">Centralized dashboard</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep all your links in one place and manage them without friction.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-6 text-card-foreground">
            <h2 className="text-lg font-semibold">Built-in authentication</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Securely access your workspace and continue right where you left
              off.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border bg-muted/40 p-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to shorten your first link?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Create an account and start building your personal link library.
          </p>
        </section>
      </div>
    </main>
  );
}
