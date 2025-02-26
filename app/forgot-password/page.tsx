"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(false);

    try {
      const res = await fetch("/api/password-reset-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(true);
        setMessage(data.error || "An error occurred, please try again.");
      } else {
        setMessage(data.message);
      }
    } catch (error: any) {
      console.log("Error:", error.message);
      setError(true);
      setMessage("An error occurred, please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white">
            FendousAI password reset
          </h2>
        </div>

        {message && (
          <div
            className={`sm:mx-auto sm:w-full sm:max-w-sm mt-4 h-12 flex items-center ${
              error ? "text-red-500" : "text-green-500"
            }`}
          >
            {error && (
              <TriangleAlert className="text-red-500" strokeWidth={1.7} />
            )}
            {message}
          </div>
        )}

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}
              >
                {loading && (
                  <div
                    className="w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-gray border-t-transparent"
                  ></div>
                )}
                
                Send
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/log-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
