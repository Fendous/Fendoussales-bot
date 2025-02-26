"use client";

import { footerLink, otherlinks, socialMedialinks } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TermsAndConditions } from "./TermsAndConditions";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6 text-white">
      <div className="container mx-auto px-1">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-2">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="-ml-2">
              <Image src="/logo.png" width={150} height={100} alt="logo" />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Social Media
                </span>
                <ul className="list-unstyled">
                  {socialMedialinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <li key={index}>
                        <Link
                          target="_blank"
                          className="text-blueGray-600 hover:text-blueGray-800 m-2 flex font-semibold  pb-2 text-sm"
                          href={link.href}
                        >
                          <Icon size={20} />
                          <p className="ml-2">{link.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Get in touch
                </span>

                {isModalOpen && <TermsAndConditions closeModal={closeModal} />}
                {footerLink.map((link) => (
                  <ul className="list-unstyled" key={link.linkName}>
                    <li>
                      <button>
                        <Link
                          target="_blank"
                          className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                          href={link.linkHref}
                        >
                          {link.linkName}
                        </Link>
                      </button>
                    </li>
                  </ul>
                ))}
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Legal terms
                </span>

                {isModalOpen && <TermsAndConditions closeModal={closeModal} />}
                {otherlinks.map((link) => (
                  <ul className="list-unstyled" key={link.linkName}>
                    <li>
                      <button>
                        <Link
                          target="_blank"
                          className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                          href={link.linkHref}
                        >
                          {link.linkName}
                        </Link>
                      </button>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1 flex flex-row items-center justify-center">
              <div className="mx-2">
                <button className="mr-2" onClick={openModal}>
                  Accept Terms
                </button>
                | Copyright © 2025 All rights reserved - Fendous Sustainable
                Solutions
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
