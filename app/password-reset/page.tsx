"use client";
import React, { ChangeEvent, FormEvent, useState, Suspense } from "react";
import Link from "next/link";
import { TriangleAlert, Eye, EyeOff } from "lucide-react";

import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();

  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (form.password1.value !== form.password2.value) {
      setError(true);
      setMessage("Please make sure passwords match.");
      return;
    }

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token) {
      setError(true);
      setMessage("Missing reset token.");
      return;
    }

    if (!email) {
      setError(true);
      setMessage("Missing email.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(false);

    const body = JSON.stringify({
      email: email,
      token: token,
      password: form.password1.value,
    });

    try {
      const res = await fetch("/api/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();

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
    } finally {
      setLoading(false);
      setPassword1("");
      setPassword2("");
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white">
            Password change
          </h2>
        </div>

        {message && (
          <div
            className={`sm:mx-auto sm:w-full sm:max-w-xl mt-4 gap-2 flex items-center justify-center ${
              error ? "text-red-500" : "text-green-500"
            }`}
          >
            {error && (
              <TriangleAlert className="text-red-500" strokeWidth={1.7} />
            )}
            {message}
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit} method="POST">
            <div>
              <label
                htmlFor="password1"
                className="block text-sm font-medium leading-6 text-white"
              >
                New password
              </label>
              <div className="mt-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  name="password1"
                  value={password1}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.target;
                    setPassword1(value);
                  }}
                  required
                  autoComplete="new-password"
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password2"
                className="block text-sm font-medium leading-6 text-white"
              >
                Confirm new password
              </label>
              <div className="mt-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  name="password2"
                  value={password2}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.target;
                    setPassword2(value);
                  }}
                  required
                  autoComplete="new-password"
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              {showPassword ? (
                <Eye
                  className="ml-1 cursor-pointer"
                  size={20}
                  color="#f2f2f2"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOff
                  className="ml-1 cursor-pointer"
                  size={20}
                  color="#f2f2f2"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              Show password
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}
              >
                {loading && (
                  <div className="w-5 h-5 rounded-full animate-spin border-2 border-solid border-gray border-t-transparent"></div>
                )}
                <span>Send</span>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/log-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default function PasswordResetPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
