"use client";
import { updateUserModel } from "@/actions/updatemodels";

const Page = () => {
  async function handleClick() {
    await updateUserModel();
  }

  return (
    <div className="flex w-full h-full justify-center items-center mt-24">
      <button className="p-2 bg-red-200" onClick={handleClick}>
        PRESS
      </button>

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="contact_name" className="text-white">
              Contact name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="business_name" className="text-white">
              Business name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-white">
              Business Email <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="text-white">
              Phone number <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="title" className="text-white">
              Title <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function TestPage() {
  return <Page />;
}
