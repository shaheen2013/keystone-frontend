import { Button } from "@/components/shadcn/button";
import { useLazyGoogleRedirectUrlQuery } from "@/features/auth/authSlice";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

const GoogleSignIn = () => {
  const [googleRedirectUrl, { isLoading, isFetching }] =
    useLazyGoogleRedirectUrlQuery();

  const loading = isLoading || isFetching;
  const handleGoogleSignIn = async () => {
    if (isLoading || isFetching) return;
    try {
      const data: any = await googleRedirectUrl({}).unwrap();
      // Redirect directly instead of opening in new window
      window.location.href = data.data.url;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      className="w-full bg-white border border-primary-3 mb-4"
      variant="ghost"
      onClick={handleGoogleSignIn}
      disabled={loading}
    >
      <Image
        src="/assets/auth/google.svg"
        alt="google"
        width={24}
        height={24}
        className="h-6 w-6"
      />
      {loading ? "Processing..." : "Sign in with Google"}
    </Button>
  );
};

export default GoogleSignIn;
