"use client";

import { useEffect, useRef } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "1079143290208-r0g847eopeglrdc1hb5tndp2s5tab5ih.apps.googleusercontent.com";

export default function GoogleOneTap({ callbackUrl, onStart, onError }) {
  const { status } = useSession();
  const router = useRouter();
  const initializedRef = useRef(false);

  useEffect(() => {
    // Do not show if already logged in or no client ID
    if (status === "authenticated" || !GOOGLE_CLIENT_ID || typeof window === "undefined") {
      return;
    }

    let isMounted = true;

    const initializeGoogleOneTap = () => {
      if (!window.google?.accounts?.id || initializedRef.current || !isMounted) {
        return;
      }

      try {
        // Cancel any pending / conflicting requests
        window.google.accounts.id.cancel();

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            if (!response?.credential) return;
            if (onStart) onStart();

            try {
              const res = await signIn("credentials", {
                redirect: false,
                isGoogleOneTap: "true",
                idToken: response.credential,
              });

              if (res?.error) {
                if (onError) onError(res.error);
              } else {
                const freshSession = await getSession();
                if (freshSession?.user?.role === "admin") {
                  router.push("/admin");
                } else if (
                  callbackUrl &&
                  !callbackUrl.includes("/dashboard") &&
                  !callbackUrl.includes("/admin")
                ) {
                  router.push(callbackUrl);
                } else {
                  router.push("/");
                }
                router.refresh();
              }
            } catch (err) {
              if (onError) onError(err.message || "Failed to sign in with Google.");
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: false,
          itp_support: true,
        });

        initializedRef.current = true;

        // Prompt user gently with error suppression for standard dismissals
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Dismissed or not displayed - normal browser behavior
          }
        });
      } catch (err) {
        // Silently catch in-flight aborts
      }
    };

    // Load Google Identity script if not already present
    if (window.google?.accounts?.id) {
      initializeGoogleOneTap();
    } else {
      const existingScript = document.getElementById("google-gsi-client");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "google-gsi-client";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleOneTap;
        document.head.appendChild(script);
      } else {
        existingScript.addEventListener("load", initializeGoogleOneTap);
      }
    }

    return () => {
      isMounted = false;
      initializedRef.current = false;
      try {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.cancel();
        }
      } catch (e) {
        // cleanup ignore
      }
    };
  }, [status, callbackUrl, router, onStart, onError]);

  return null;
}
