"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "1079143290208-r0g847eopeglrdc1hb5tndp2s5tab5ih.apps.googleusercontent.com";

export default function AuthProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      <GoogleOAuthProvider clientId={googleClientId}>
        {children}
      </GoogleOAuthProvider>
    </SessionProvider>
  );
}
