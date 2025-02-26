import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/Provider";
import Providers from "@/components/Providers";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script";

import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

import { checkSubscription } from "@/actions/checkSubscription";

import Sidenav from "@/components/sidenav";

/* import { Analytics } from "@vercel/analytics/react";*/

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Fendous",
  description: "Fendous ChatBot",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { plan, trialEnded, error } = await checkSubscription();

  return (
    <html lang={"en"}>
      <head>
        <meta
          name="google-site-verification"
          content="ptJxCLYfmTYhHgkmeCH5dmasyF2iHTBHLSNOhz_tu2Q"
        />

        <Script
          src={"https://www.googletagmanager.com/gtag/js?id=G-FWFLP8QBSE"}
        ></Script>

        <Script>
          {`  window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FWFLP8QBSE');
            `}
        </Script>

        <Script id="gtm-script">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M9VQF8PF');
        `}
        </Script>
        <Script src="https://www.googletagmanager.com/ns.html?id=GTM-M9VQF8PF"></Script>
      </head>
      <body
        className={cn(
          "flex flex-col justify-between min-h-screen bg-background font-sans font-light antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <Toaster position="top-center" richColors />
          {plan && <Sidenav />}
          {trialEnded && !["advanced", "starter", "custom"].includes(plan) && (
            <div className="fixed top-0 left-0 w-full bg-indigo-600 px-4 py-1 mb-1 text-white">
              <p className="text-center text-sm font-medium">
                Your free trial period has expired, please upgrade to a paid
                plan to continue.
              </p>
            </div>
          )}

          <Navbar />
          <Providers>
            {children}
            {/*<Analytics debug={false} mode={"production"} />;*/}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
