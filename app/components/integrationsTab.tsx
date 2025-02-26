"use client";
import { generateAuthUrl, saveAuthToken } from "@/actions/integrations/google";
import { getActiveScopes } from "@/actions/getActiveScopes";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ToggleSwitch from "./switchButton";

const Page = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialScopes, setInitialScopes] = useState<string[]>([]);

  const scopesList = [
    {
      name: "Gmail",
      link: "https://www.googleapis.com/auth/gmail.send",
      image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 48 48"
        >
          <path
            fill="#4caf50"
            d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
          ></path>
          <path
            fill="#1e88e5"
            d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
          ></path>
          <polygon
            fill="#e53935"
            points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
          ></polygon>
          <path
            fill="#c62828"
            d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
          ></path>
          <path
            fill="#fbc02d"
            d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Google drive",
      link: "https://www.googleapis.com/auth/drive",
      image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 48 48"
        >
          <path
            fill="#1e88e5"
            d="M38.59,39c-0.535,0.93-0.298,1.68-1.195,2.197C36.498,41.715,35.465,42,34.39,42H13.61 c-1.074,0-2.106-0.285-3.004-0.802C9.708,40.681,9.945,39.93,9.41,39l7.67-9h13.84L38.59,39z"
          ></path>
          <path
            fill="#fbc02d"
            d="M27.463,6.999c1.073-0.002,2.104-0.716,3.001-0.198c0.897,0.519,1.66,1.27,2.197,2.201l10.39,17.996 c0.537,0.93,0.807,1.967,0.808,3.002c0.001,1.037-1.267,2.073-1.806,3.001l-11.127-3.005l-6.924-11.993L27.463,6.999z"
          ></path>
          <path
            fill="#e53935"
            d="M43.86,30c0,1.04-0.27,2.07-0.81,3l-3.67,6.35c-0.53,0.78-1.21,1.4-1.99,1.85L30.92,30H43.86z"
          ></path>
          <path
            fill="#4caf50"
            d="M5.947,33.001c-0.538-0.928-1.806-1.964-1.806-3c0.001-1.036,0.27-2.073,0.808-3.004l10.39-17.996 c0.537-0.93,1.3-1.682,2.196-2.2c0.897-0.519,1.929,0.195,3.002,0.197l3.459,11.009l-6.922,11.989L5.947,33.001z"
          ></path>
          <path
            fill="#1565c0"
            d="M17.08,30l-6.47,11.2c-0.78-0.45-1.46-1.07-1.99-1.85L4.95,33c-0.54-0.93-0.81-1.96-0.81-3H17.08z"
          ></path>
          <path
            fill="#2e7d32"
            d="M30.46,6.8L24,18L17.53,6.8c0.78-0.45,1.66-0.73,2.6-0.79L27.46,6C28.54,6,29.57,6.28,30.46,6.8z"
          ></path>
        </svg>
      ),
    },

    {
      name: "Google calendar",
      link: "https://www.googleapis.com/auth/calendar",
      image: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 48 48"
        >
          <rect width="22" height="22" x="13" y="13" fill="#fff"></rect>
          <polygon
            fill="#1e88e5"
            points="25.68,20.92 26.688,22.36 28.272,21.208 28.272,29.56 30,29.56 30,18.616 28.56,18.616"
          ></polygon>
          <path
            fill="#1e88e5"
            d="M22.943,23.745c0.625-0.574,1.013-1.37,1.013-2.249c0-1.747-1.533-3.168-3.417-3.168 c-1.602,0-2.972,1.009-3.33,2.453l1.657,0.421c0.165-0.664,0.868-1.146,1.673-1.146c0.942,0,1.709,0.646,1.709,1.44 c0,0.794-0.767,1.44-1.709,1.44h-0.997v1.728h0.997c1.081,0,1.993,0.751,1.993,1.64c0,0.904-0.866,1.64-1.931,1.64 c-0.962,0-1.784-0.61-1.914-1.418L17,26.802c0.262,1.636,1.81,2.87,3.6,2.87c2.007,0,3.64-1.511,3.64-3.368 C24.24,25.281,23.736,24.363,22.943,23.745z"
          ></path>
          <polygon
            fill="#fbc02d"
            points="34,42 14,42 13,38 14,34 34,34 35,38"
          ></polygon>
          <polygon
            fill="#4caf50"
            points="38,35 42,34 42,14 38,13 34,14 34,34"
          ></polygon>
          <path
            fill="#1e88e5"
            d="M34,14l1-4l-1-4H9C7.343,6,6,7.343,6,9v25l4,1l4-1V14H34z"
          ></path>
          <polygon fill="#e53935" points="34,34 34,42 42,34"></polygon>
          <path
            fill="#1565c0"
            d="M39,6h-5v8h8V9C42,7.343,40.657,6,39,6z"
          ></path>
          <path
            fill="#1565c0"
            d="M9,42h5v-8H6v5C6,40.657,7.343,42,9,42z"
          ></path>
        </svg>
      ),
    },
  ];
  const router = useRouter();
  const callbackCode = useSearchParams().get("code");
  const callbackError = useSearchParams().get("error");

  useEffect(() => {
    const fetchScopes = async () => {
      const { scopes } = await getActiveScopes();
      setInitialScopes(scopes);
      console.log("SCOPES:", scopes);
    };

    fetchScopes();
  }, [callbackCode]);

  if (callbackError) {
    console.log("Callback error", callbackError);
    router.replace("/aichat");
    //Alert that user denied access or error occurred
  }

  //TODO: Remove if not needed in production build
  useEffect(() => {
    if (callbackCode) {
      (async () => {
        const { data, error } = await saveAuthToken(callbackCode);
        if (error) {
          setError(error);
          // router.replace("/aichat");
        }
        if (data) {
          // Reset url to remove the callBack code
          router.replace("/integrations");
        }
      })();
    }
  }, [callbackCode, router]);

  async function handleSubmit(scope: string, status: boolean) {
    if (!scope) {
      alert("Please choose a scope");
      return;
    }
    if (status) {
      setLoading(true);
      const res = await generateAuthUrl(scope);

      if (res.error) {
        console.error("Error generating auth URL:", res.error);
      } else {
        router.push(res.url as string);
      }
    }
    setLoading(false);
  }

  return (
    <div className="md:ml-40 text-white mt-44 mx-aut md:mt-6">
      <span className="text-3xl">Integrations</span>
      {loading && (
        <div className="loading-state">
          <div className="loading"></div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mt-4">
        {scopesList.map(
          (
            scope: { name: string; link: string; image: JSX.Element },
            index: number
          ) => (
            <div
              key={index}
              className="w-56 h-32 rounded bg-black bg-opacity-60 text-white/70 p-2"
            >
              <div className="flex justify-between items-center mb-2">
                {scope.image}
                <ToggleSwitch
                  onStatusChange={handleSubmit}
                  scope={scope.link}
                  defaultStatus={initialScopes.includes(scope.link)}
                />
              </div>
              <div className="text-xl text-white/90">{scope.name}</div>
              <div className="text-xs">
                Supercharge your email with AI-assisted email sending.
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default function IntegrationsTab() {
  return (
    <>
      <Suspense>
        <Page />
      </Suspense>
    </>
  );
}
