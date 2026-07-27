"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Something went wrong!</h1>
            <p className="mt-4 text-lg text-gray-600">{error.message}</p>
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try again
              </button>
              <Link href="/" className="px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400">
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
