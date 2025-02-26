"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useServerInsertedHTML } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { CircleHelp, EyeOff, Eye } from "lucide-react";
import { checkEmailVerifiedOrUserExists } from "@/actions/checkEmailVerified";

let userExists: boolean = false;
async function checkUserExists(email: string) {
  const { exists } = await checkEmailVerifiedOrUserExists(email);
  userExists = exists;
}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showTooltip, setShowTooltip] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    password2: false,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  type TooltipState = {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    password: boolean;
    password2: boolean;
  };

  const toggleTooltip = (field: keyof TooltipState) => {
    setShowTooltip((prev: TooltipState) => {
      const newTooltipState = Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof TooltipState] = false;
        return acc;
      }, {} as TooltipState);

      return {
        ...newTooltipState,
        [field]: !prev[field],
      };
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".tooltip-target")) {
      setShowTooltip({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        password2: false,
      });
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(event.target.checked);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const validateFields = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
    };
    const nameRegex = /^[a-zA-Z]{2,50}$/;

    if (!nameRegex.test(user.firstName.trim())) {
      newErrors.firstName =
        "First name should only contain letters and be at least 2 characters long and maximum 50 characters.";
    }

    if (!nameRegex.test(user.lastName.trim())) {
      newErrors.lastName =
        "Last name should only contain letters and be at least 2 characters long and maximum 50 characters.";
    }

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(user.email.trim())) {
      newErrors.email = "Invalid email address.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{12,15}$/;

    if (!passwordRegex.test(user.password)) {
      newErrors.password =
        "Password must be 12-15 characters long, including at least 1 number, both lower and upper case letters, and at least 1 special character (e.g. _, #, ?!)";
    }

    if (user.password.trim() !== user.password2.trim()) {
      newErrors.password2 = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!validateFields()) {
      setLoading(false);
      return;
    }

    await checkUserExists(user.email);
    if (userExists) {
      setGeneralError(
        "This email address is already registered. Please try logging in or use a different email address!"
      );
      setLoading(false);
      return;
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    try {
      const res = await axios.post("/api/register", {
        ...user,
        email: user.email.toLowerCase(),
        name: fullName,
      });
      if (res.status === 200 || res.status === 201) {
        setError("");
        setSuccess(true);
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
        });
        setCheckboxChecked(false);
      } else {
      }
    } catch (error: any) {
      console.log("ERROR:", error.error);
      setError("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-white">
            Registration Form
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Registration successful! </strong>
              <span className="block sm:inline">
                Please check your email to verify your account.
              </span>
            </div>
          )}
          {generalError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{generalError} </span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit} method="POST">
            <div className="relative tooltip-target">
              <label className="block text-sm font-medium leading-6 text-white">
                First Name{" "}
                <CircleHelp
                  size={14}
                  className="inline ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => toggleTooltip("firstName")}
                />
              </label>

              {showTooltip.firstName && (
                <div className="absolute top-0 left-full ml-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                  First name should only contain letters and be at least 2
                  characters long and maximum 50 characters.
                </div>
              )}
              <div className="">
                <input
                  type="text"
                  placeholder="John"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  className="block w-full p-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div className="relative tooltip-target">
              <label className="block text-sm font-medium leading-6 text-white">
                Last Name{" "}
                <CircleHelp
                  size={14}
                  className="inline ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => toggleTooltip("lastName")}
                />
              </label>

              {showTooltip.lastName && (
                <div className="absolute top-0 left-full ml-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                  Last name should only contain letters and be at least 2
                  characters long and maximum 50 characters.
                </div>
              )}
              <div className="">
                <input
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  className="block w-full p-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="relative tooltip-target">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address{" "}
                <CircleHelp
                  size={14}
                  className="inline ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => toggleTooltip("email")}
                />
              </label>

              {showTooltip.email && (
                <div className="absolute top-0 left-full ml-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                  Please enter a valid email address.
                </div>
              )}
              <div className="">
                <input
                  type="email"
                  placeholder="example@email.com"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className="block w-full p-3 rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="relative tooltip-target">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password{" "}
                  <CircleHelp
                    size={14}
                    className="inline ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => toggleTooltip("password")}
                  />
                </label>
              </div>
              {showTooltip.password && (
                <div className="absolute top-0 left-full ml-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                  Password must be at least 12 characters, including at least 1
                  number, both lower and upper case letters, and at least 1
                  special character e.g. _, #, ?!
                </div>
              )}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  // value={user.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="block w-full p-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Add pr-10 to give space for the icon
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="relative tooltip-target">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Confirm Password{" "}
                  <CircleHelp
                    size={14}
                    className="inline ml-2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => toggleTooltip("password2")}
                  />
                </label>
              </div>
              {showTooltip.password2 && (
                <div className="absolute top-0 left-full ml-2 w-48 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                  Please ensure passwords match.
                </div>
              )}
              <div className="relative">
                <input
                  id="password2"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password2"
                  // value={user.password2}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="block w-full p-3 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Add pr-10 to give space for the icon
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {errors.password2 && (
                  <p className="text-red-500 text-sm">{errors.password2}</p>
                )}
              </div>
            </div>

            <div className="text-white ">
              <input
                type="checkbox"
                checked={checkboxChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
                required
              />
              By signing up, you accept our{" "}
              <Link href={"https://fendous.dk/terms"} className="text-red-400">
                Terms of Service
              </Link>{" "}
              and our{" "}
              <Link
                href={"https://fendous.dk/privacy-policy"}
                className="text-red-400"
              >
                Privacy Policy
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>
          <div>
            <button
              onClick={() => signIn("google")}
              className="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up with
              <Image
                src="/google.png"
                alt="google"
                width={20}
                height={20}
                className="ml-2"
              />
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/log-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
