"use client";

import Link from "next/link";
import React from "react";

interface ModalProps {
  closeModal: () => void;
}

export const TermsAndConditions: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#0d0f50] outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-center  p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Website Terms and Conditions of Use
              </h3>
            </div>
            {/*body*/}
            <div className="container mx-auto my-8 p-8 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Website Terms and Conditions
              </h2>

              <section className="mb-6">
                <h3 className="text-lg font-bold mb-2">Terms</h3>
                <p>
                  By accessing www.fendous.dk, you agree to these terms.
                  Materials on this site are protected by copyright and
                  trademark law.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-bold mb-2">Use License</h3>
                <p>
                  Temporary, non-commercial download granted. Don't modify,
                  copy, or reverse engineer. Violations terminate the license.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-bold mb-2">Governing Law</h3>
                <p>
                  Claims related to Fendous Project Management Software are
                  governed by the laws of dk.
                </p>
              </section>
              <button className="text-rose-500 text-extrabold">

               <Link href="https://fendous.dk/terms">
               Read full Terms
               </Link>
              </button>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-indigo-900 text-white hover:bg-indigo-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  closeModal();
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
