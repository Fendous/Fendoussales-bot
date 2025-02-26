import { solutionPosts } from "@/constant";
import Link from "next/link";

export default function Example() {
  return (
    <div className="solution py-20 sm:py-32 mt-10">
      <div className="mx-auto px-6 lg:px-20">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
            Fendous AI Chatbot is
          </h2>
          <p className="mt-2 text-xl text-bold leading-8 text-gray-400">
            a powerful tool that can help businesses of all sizes improve their
            project management and CRM processes. It offers a variety of
            features that can help businesses to:
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10  lg:mx-0 lg:max-w-none lg:grid-cols-3 bg-green-0">
          {solutionPosts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col rounded-xl pt-6 pb-20 px-4  items-start justify-between bg-indigo-800"
            >
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-200 group-hover:text-pink-3">
                  <Link href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 text-lg leading-6 text-gray-400">
                  {post.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
