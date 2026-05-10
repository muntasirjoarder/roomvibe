import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <div className="max-w-sm sm:max-w-md w-full mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-display text-ink">
            Your room,<br />
            redesigned.
          </h1>
          <p className="text-body-lg text-ink-muted">
            Upload a photo. Get two redesigns — one to dream about, one you can
            actually do this weekend.
          </p>
        </div>

        <Link
          href="/upload"
          className="inline-flex items-center justify-center w-full bg-clay-500 text-canvas py-4 px-6 rounded-2xl text-body font-semibold tracking-tight active:scale-[0.97] active:bg-clay-700 hover:bg-clay-600 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Redesign my room
        </Link>

        <p className="text-caption text-mute text-center">
          Bedrooms &amp; living rooms · AU only
        </p>
      </div>
    </main>
  );
}
