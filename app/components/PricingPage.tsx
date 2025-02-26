"use client";
import React, { useRef, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

const PricingPage = () => {
  const [email, setEmail] = useState("");
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_whkkx9s",
          "template_v8t25oc",
          form.current,
          "vCBZ2HG9jEq0o9Tr-"
        )
        .then(
          (result) => {
            console.log(result.text);
            setEmail("");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden  px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              With Fendous Chatbot
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Unlock exclusive perks with our subscription plans, including
              premium features and priority support. Streamline tasks and
              elevate your interaction with our efficient chatbot for
              personalized assistance.
            </p>

            <form className="mt-5" ref={form} onSubmit={sendEmail}>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-white border-2
                  
                     transition delay-150  hover:shadow-lg hover:shadow-indigo-300/40 .
                 border-purple-400 rounded-lg bg-transparent"
                  placeholder="Submit Your Email to Subscribe"
                  required
                />
                <button
                  type="submit"
                  className="text-gray-200 absolute end-2.5 bottom-2.5 transition bg-indigo-600 hover:bg-indigo-400  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PricingPage;
