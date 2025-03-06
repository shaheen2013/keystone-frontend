import React from "react";

export default async function EventDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log(slug);

  return <div>EventDetails</div>;
}
