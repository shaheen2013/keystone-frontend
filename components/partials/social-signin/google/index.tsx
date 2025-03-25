import { Button } from "@/components/shadcn/button";
import { useLazyGoogleRedirectUrlQuery } from "@/features/auth/authSlice";

import Image from "next/image";

const GoogleSignIn = () => {
  const [googleRedirectUrl, { isLoading }] = useLazyGoogleRedirectUrlQuery();
  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    try {
      const data = await googleRedirectUrl().unwrap();
      console.log("data", data);
      console.log("url", data.url);
      window.open(data.data.url, "_blank", "height=500,width=500");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      className="w-full bg-white border border-primary-3 mb-4"
      variant="ghost"
      onClick={handleGoogleSignIn}
    >
      <Image
        src="/assets/auth/google.svg"
        alt="google"
        width={24}
        height={24}
        className="h-6 w-6"
      />
      Sign in with Google
    </Button>
  );
};

export default GoogleSignIn;
