import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <p className="mt-4 text-xl text-gray-600">Page not found</p>
            <Link href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
