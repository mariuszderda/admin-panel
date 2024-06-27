"use client";

import { Header } from "@/components/header/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    // @ts-ignore @ts-expect-error
  }, [error]);
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="flex h-full flex-col items-center justify-center">
        <h2 className="text-center">Something went wrong!</h2>
        <h3 className="text-center">{error.message}</h3>
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => router.back()
          }
        >
          Back
        </button>
      </main>
    </>
  );
}
