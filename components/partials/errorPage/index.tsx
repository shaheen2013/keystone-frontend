import { Button } from "@/components/shadcn/button";
import Link from "next/link";

type ErrorComponentProps = {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
};

export default function ErrorComponent({
  title,
  message,
  showHomeButton = true,
}: ErrorComponentProps) {
  return (
    <main className="h-[calc(100vh-100px)] container mx-auto max-w-[620px] flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>

      <p className="text-gray-600 font-medium text-center mb-8">{message}</p>

      <div className="flex gap-4">
        {showHomeButton && (
          <Button variant="secondary" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
