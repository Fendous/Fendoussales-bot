import {
  SecondSolutionHelps,
  SolutionHelps,
  ThirdSolutionHelps,
} from "@/constant";
import Image from "next/image";

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-indigo-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">
                Specifically, Fendous AI Chatbot can help businesses with the
                following project management tasks:
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-20 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className="w-[60rem]  rounded-xl  sm:w-[57rem]"
            src="/solution.png"
            alt="img"
            height={400}
            width={400}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-indigo-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              />
            </svg>
          </div>
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg ">
              <ul
                role="list"
                className="mt-8 space-y-8 text-gray-600 bg-[#160d6c] p-8 rounded-md"
              >
                {SolutionHelps.map((help, index) => (
                  <li className="flex flex-col gap-x-3" key={index}>
                    <span className="text-extrabold text-xl text-indigo-400">
                      {help.span}
                    </span>
                    <strong className="font-semibold text-gray-200">
                      {help.strong}
                    </strong>
                  </li>
                ))}
              </ul>
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                  className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-indigo-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                      width={200}
                      height={200}
                      x="50%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                    <path
                      d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                      strokeWidth={0}
                    />
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                  />
                </svg>
              </div>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                Fendous AI Chatbot can also help businesses with the following
                CRM tasks:
              </h2>

              <ul role="list" className="mt-8 space-y-8 text-gray-600 ">
                {SecondSolutionHelps.map((help, index) => (
                  <li className="flex flex-col gap-x-3" key={index}>
                    <span className="text-extrabold text-xl text-indigo-600">
                      {help.span}
                    </span>
                    <strong className="font-semibold text-gray-900">
                      {help.strong}
                    </strong>
                  </li>
                ))}
              </ul>

              <p className="mt-6">
                Overall, Fendous AI Chatbot is a powerful tool that can help
                businesses of all sizes to improve their project management and
                CRM processes. It offers a variety of features that can help
                businesses to automate tasks, improve communication and
                collaboration, and gain real-time insights.
              </p>
            </div>
            <div className="lg:pr-4 mt-10 bg-[#160d6c] p-8 rounded-md">
              <div className="lg:max-w-lg">
                <p className="text-xl font-semibold  text-gray-200">
                  Here are some specific examples of how Fendous AI Chatbot can
                  be used to improve project management and CRM processes:
                </p>
              </div>
              <ul role="list" className="mt-8 space-y-8 text-gray-300">
                {ThirdSolutionHelps.map((help, index) => (
                  <li className="flex flex-col gap-x-3 m-3" key={index}>
                    <span className="text-extrabold mb-4 text-indigo-400">
                      {help.span}
                    </span>
                    <strong className=" text-gray-300">{help.strong}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
