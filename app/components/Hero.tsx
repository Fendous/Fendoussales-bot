"use client";
import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import { AnimatedBeamMultipleOutputs } from "@/components/AnimatedBeam";
import { OrbitingCirclesDemo } from "./RotatingCircles";

const Hero = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="pt-12">
        <div className="text-center py-36 w-full mx-auto">
          <h1 className="text-4xl tracking-tight text-gray-300 sm:text-6xl">
            {/* <Typewriter
              options={{
                strings: [
                  "<strong>Fendous AI Chatbot</strong> Your AI-Powered Ally for Streamlined Project Leading Software and CRM",
                ],
                autoStart: true,
                loop: true,
              }}
            /> */}
            <strong>Fendous AI Chatbot</strong> Your AI-Powered Ally for
            Streamlined Project Leading Software and CRM
          </h1>
          <p className="mt-6 leading-8 text-gray-300">
            In today's dynamic business landscape, efficiency and customer
            satisfaction are paramount.Fendous AI Chatbot emerges as a
            revolutionary solution, empowering businesses to streamline
            projectmanagement and CRM processes with unparalleled efficiency
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/registration"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
            <Link
              href="/log-in"
              className="text-sm font-semibold leading-6 text-gray-200"
            >
              Free 7 days and no card required
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-around mt-16 mb-8 py-12 px-12 bg-black bg-transparent/40">
          <div className="">
            <div className="text-white text-5xl">
              Move data between multiple apps seamlessly.
            </div>
            <div className="text-white text-xl font-thin mt-8">
              AI powered data integrations across all you connected applications
              for seamless and neat workflow.
            </div>
          </div>
          <AnimatedBeamMultipleOutputs className="w-full m-1" />
        </div>
        {/* <div className="flex items-center justify-around py-12 mb-4 bg-black bg-transparent/40">
          <OrbitingCirclesDemo />
          <div className="text-white text-5xl">
            Integrate all your favourite tools.
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
