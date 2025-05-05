"use client";

import { useGoogleCallbackMutation } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const GoogleCallback = () => {
  const [googleCallback] = useGoogleCallbackMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get("code");
    const scope = searchParams.get("scope");
    const authuser = searchParams.get("authuser");
    const prompt = searchParams.get("prompt");

    if (!code || !scope || !authuser || !prompt) {
      toast({
        description: "Failed to authenticate with Google",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    const handleCallback = async () => {
      try {
        const response: any = await googleCallback({
          code,
          scope: scope || "",
          authuser: authuser || "",
          prompt: prompt || "",
        }).unwrap();

        if (response.success) {
          const token = response.data.access_token;
          Cookies.set("key_stone_token", token, {
            secure: true,
            sameSite: "strict",
            expires: 7,
          });

          // Get the returnUrl from query params or default to profile overview
          const returnUrl = searchParams.get("returnUrl");
          router.push(
            returnUrl ? decodeURIComponent(returnUrl) : "/profile/overview"
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          description: "Failed to authenticate with Google",
          variant: "destructive",
        });
        router.push("/login");
      }
    };

    handleCallback();
  }, [searchParams, googleCallback, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Authenticating with Google...
        </h1>
        <p>Please wait while we process your login.</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
