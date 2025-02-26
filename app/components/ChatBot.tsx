"use client";
import { useSession } from "next-auth/react";

interface InfoProps {
  heading: string;
  content: string;
  bullets: string[];
}
export default function Example({ heading, content, bullets }: InfoProps) {
  const { data: session } = useSession();
  return (
    <div className="relative isolate h-screen  pb-12 sm:pt-24 mt-16">
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div />
      </div>
      <div>
        <div />
      </div>
      <div className="mx-auto max-w-4xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          {session && (
            <span className="text-xl text-white">
              Hello{", "}
              {session.user?.name?.split(" ")[0]}
            </span>
          )}
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-[#CB6CE6]">{heading}</span> 
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">{content}</p>
          {bullets.length > 0 && (
            <p className="text-lg mt-4 text-[#CB6CE6]">I can help you with:</p>
          )}

          <ul className="text-gray-300 ml-6 list-disc">
            {bullets.map((bullet: string, index: number) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
