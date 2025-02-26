"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheckBig, CircleX } from "lucide-react";
import Link from "next/link";

function Page() {
  const params = useSearchParams();
  const token = params.get("token");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Run the request as soon as the component is rendered
  useEffect(() => {
    if (token && loading) {
      fetch("/api/email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      })
        .then((res) => res.json())
        .then(({ data, error }) => {
          if (error) {
            console.log("ERROR:", error);
            setError("Invalid or expired verification link");
            setSuccess(false); // Ensure success message is not shown
          } else {
            setSuccess(true);
            setError(null); // Clear any error message
          }
          setLoading(false);
        })
        .catch((error) => {
          setError("An error occurred while verifying your email.");
          console.log("An error occurred while verifying your email.", error);
          setSuccess(false); // Ensure success message is not shown
          setLoading(false);
        });
    }
  }, [token, loading]);

  return (
    <div className="flex justify-center items-center mt-52 md:my-72">
      {loading && (
        <div className="text-white">
          <div
            className="w-12 h-12 rounded-full animate-spin
                      border-2 border-solid border-gray border-t-transparent"
          ></div>
        </div>
      )}

      {!loading && error && (
        <div className="text-white flex flex-col items-center">
          <CircleX size={48} className="text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {!loading && success && (
        <Link href="/log-in" className="text-white flex flex-col items-center">
          <CircleCheckBig size={48} className="text-green-400" />
          <span>Email verification successful! You can now log in.</span>
          <button className="flex mt-3 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

export default function EmailVerification() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
