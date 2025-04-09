import { Suspense } from "react";
import GoogleCallback from "./components/GoogleCallback";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallback />
    </Suspense>
  );
}
