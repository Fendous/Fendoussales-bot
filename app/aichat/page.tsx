import ChatBot from "@/components/ChatBot";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { checkSubscription } from "@/actions/checkSubscription";
import { redirect } from "next/navigation";

const Page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-8">
        {/* Image here */}
        <div className="relative isolate overflow-hidden py-24 sm:py-24 mt-16">
          <Image
            className="ml-24"
            src="/hand.png"
            width={500}
            height={400}
            alt="AI BOT"
            priority
          />
        </div>
        <div className="flex flex-col h-screen">
          <ChatBot
            heading="Fendous AI"
            content="Welcome to the future of interaction! Step into a world where curiosity meets innovation, where every query sparks 
            a journey of discovery. Fendous AI Chatbot awaits, ready to unravel mysteries, tackle challenges, and ignite your imagination. 
            Let's embark on this captivating adventure together, where the boundaries of possibility are redefined with every conversation.
            Welcome aboard!"
            bullets={[]}
          />
          <div className="relative isolate overflow-hidde mb-52">
            <div
              className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
              aria-hidden="true"
            >
              <div />
            </div>
            <div>
              <div />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-xl tracking-tight text-gray-50 sm:text-xl ">
                  Continue with our specialsed CRM or Project Management AI
                  ChatBots.
                </h2>
                <p className="flex gap-12 mt-4 text-xl leading-8 text-white">
                  <Link
                    href="/crm"
                    className="flex items-center justify-center h-12 px-6 py-4 bg-[#CB6CE6] rounded cursor-pointer hover:bg-pink-500"
                  >
                    CRM BOT
                  </Link>
                  <Link
                    href="/pm"
                    className="flex items-center justify-center h-12 px-6 py-4 bg-[#CB6CE6] rounded cursor-pointer hover:bg-pink-500"
                  >
                    PM BOT
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function AIChat() {
  //TODO: Verify that users have the correct access level based on current plan

  const { plan, trialEnded, error } = await checkSubscription();
  // Check current path and if its authed the redirect to pricing
  if (plan === "no_plan") {
    return redirect("/pricing");
    //  redirect to pricing page with message that the free trial period ended
  }
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
