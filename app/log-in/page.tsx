"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";

import { checkEmailVerifiedOrUserExists } from "@/actions/checkEmailVerified";

let isVerified: boolean = false;
let userExists: boolean = false;

async function getUserVerified(email: string) {
  const { exists, verified } = await checkEmailVerifiedOrUserExists(email);
  // @ts-ignore
  isVerified = verified;
  userExists = exists;
}
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [generalError, setGeneralError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    console.log("Submitting.......");
    e.preventDefault();
    setLoading(true);
    setGeneralError("");
    setEmailError("");
    setPasswordError("");

    try {
      if (!user.email || !user.password) {
        if (!user.email) setEmailError("Email is required");
        if (!user.password) setPasswordError("Password is required");
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setEmailError("Invalid email address");
        return;
      }

      await getUserVerified(user.email);

      if (!userExists) {
        setGeneralError("User with given email not found.");
        return;
      }
      if (!isVerified) {
        setGeneralError("Please verify your email to continue logging in.");
        return;
      }

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/aichat");
        router.refresh();
      }

      if (res?.error) {
        setGeneralError(res.error || "An error occurred during sign-in");
      }
    } catch (error) {
      setGeneralError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {generalError && (
            <h2 className="flex gap-2 pb-2 justify-center text-red-500">
              <TriangleAlert color="#c33737" /> {generalError}
            </h2>
          )}
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
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
                  value={user.email}
                  onChange={handleInputChange}
                  className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder="**********"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <div
                    className="w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-gray border-t-transparent"
                  ></div>
                ) : (
                  "Sign in"
                )}
              </button>
              <button
                onClick={() => signIn("google")}
                className="flex mt-3 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in with
                <Image
                  src="/google.png"
                  alt="google"
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link
              href="/forgot-password"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/registration"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start To fill the form here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
