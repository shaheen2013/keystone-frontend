import Link from "next/link";

export default async function NotFound() {
  return (
    <div>
      <h2>Event Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        Go To <Link href="/">Home</Link>
      </p>

      <p>
        Go To <Link href="/events">Events</Link>
      </p>
    </div>
  );
}
