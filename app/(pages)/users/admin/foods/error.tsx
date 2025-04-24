/// The error.tsx file can be used to define a UI boundary for a route segment.
/// It serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users.

"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}

/// While error.tsx is useful for catching uncaught exceptions,
/// notFound can be used when you try to fetch a resource that doesn't exist.
/// notFound will take precedence over error.tsx,
/// so you can reach out for it when you want to handle more specific errors!
