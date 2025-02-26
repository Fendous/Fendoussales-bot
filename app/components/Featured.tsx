import { includedFeatures, paragraphs } from "@/constant";
import { BoltIcon, CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Example() {
  return (
    <div className=" bg-gray-300  py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 first-letter:">

        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Unleash the Power of AI
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Fendous AI Chatbot harnesses the power of artificial intelligence to
            deliver a range of transformative benefits:
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 featured  ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
  
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-300">
              Lifetime membership
            </h3>

            {paragraphs.map((paragraph, index) => (
              <p
                className="mt-6 text-base leading-7 flex text-gray-300"
                key={index}
              >
                <BoltIcon className="w-[20px] mr-2 text-yellow-300" />
                {paragraph.text}
              </p>
            ))}

            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-white">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-200 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none font-bold text-green-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 ">
            <Image
            height={400}
            width={400}
              src="/chatbotBackground.png"
              alt="chatbotBackground"
              className="mt-2 p-7 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
