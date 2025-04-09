"use client";

import { useGoogleCallbackMutation } from "@/features/auth/authSlice";
import { useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";

const GoogleCallback = () => {
  const [googleCallback] = useGoogleCallbackMutation();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const scope = searchParams.get("scope");
  const authuser = searchParams.get("authuser");
  const prompt = searchParams.get("prompt");

  const sendRequest = useCallback(async () => {
    if (!code || !scope || !authuser || !prompt) return;
    try {
      await googleCallback({
        code,
        scope,
        authuser,
        prompt,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [code, scope, authuser, prompt, googleCallback]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return <div>Redirecting...</div>;
};

export default GoogleCallback;
