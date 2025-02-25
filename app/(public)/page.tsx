import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Keystone",
  description:
    "A platform for online communities, the Disability Platform, and Atypical Advantage",
};

export default function Home() {
  return (
    <div>
      <div>Header</div>
      <div>Content</div>
      <div>Footer</div>
    </div>
  );
}
