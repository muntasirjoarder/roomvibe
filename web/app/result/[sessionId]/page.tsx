import Link from "next/link";

export default async function ResultPage({
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ filename?: string }>;
}) {
  const { filename } = await searchParams;

  return (
    <main className="flex flex-col flex-1 px-6 py-12 sm:px-8 sm:py-16">
      <div className="fixed top-4 right-6 text-micro uppercase text-mute">WIP</div>
      <div className="max-w-sm sm:max-w-md w-full mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2 text-center">
          <div className="text-5xl">✓</div>
          <h1 className="font-sans text-title-xl text-ink">
            Photo received
          </h1>
          {filename && (
            <p className="text-caption text-mute break-all">
              {decodeURIComponent(filename)}
            </p>
          )}
          <p className="text-caption text-mute">
            Recommendations coming soon — this is the walking skeleton.
          </p>
        </div>

        <Link
          href="/upload"
          className="inline-flex items-center justify-center w-full bg-surface text-ink border border-stone-line py-4 px-6 rounded-2xl text-body font-semibold tracking-tight active:scale-[0.97] hover:bg-stone-soft transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload another photo
        </Link>
      </div>
    </main>
  );
}
