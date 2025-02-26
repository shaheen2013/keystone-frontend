import { quickLinks, supportAndLegal } from "@/static/footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../shadcn/button";

export default function Footer() {
  return (
    <footer className="text-gray-600 bg-primary-2">
      <div className="container lg:py-24 py-12 mx-auto flex  lg:flex-row md:flex-nowrap flex-wrap flex-col gap-6">
        {/* left */}
        <div className="xl:w-80 lg:w-60">
          <Link href="/" className="lg:mb-6 mb-5 block">
            <Image
              src="/icons/brand-logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="h-12 w-[110px] flex-1"
            />
          </Link>

          <p className="text-base text-gray-9 mb-8">
            At Keystone Ability Support, we empower families of children with
            special needs to thrive. Through personalized plans, advocacy, and
            resource connections, we simplify special education, government
            programs, and community services.
          </p>

          <div className="flex gap-4">
            <Link href="https://facebook.com">
              <Image
                src="/icons/facebook.svg"
                alt="facebook"
                width={40}
                height={40}
              />
            </Link>

            <Link href="https://instagram.com">
              <Image
                src="/icons/instagram.svg"
                alt="instagram"
                width={40}
                height={40}
              />
            </Link>

            <Link href="https://twitter.com">
              <Image
                src="/icons/twitter.svg"
                alt="twitter"
                width={40}
                height={40}
              />
            </Link>

            <Link href="https://youtube.com">
              <Image
                src="/icons/youtube.svg"
                alt="youtube"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>

        {/* middle */}
        <div className="grid lg:grid-cols-3 grid-cols-2 flex-wrap flex-1">
          <div className="">
            <h2 className="font-bold text-gray-9 text-lg lg:mb-6 mb-4">
              Quick Links
            </h2>
            <nav className="lg:mb-10 mb-4">
              {quickLinks.map((link, index) => {
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="block lg:mb-3 mb-2 text-gray-9"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="">
            <h2 className="font-bold text-gray-9 text-lg lg:mb-6 mb-4">
              Support & Legal
            </h2>
            <nav className="lg:mb-10 mb-4">
              {supportAndLegal.map((link, index) => {
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="block lg:mb-3 mb-2 text-gray-9"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-span-1 col-span-2">
            <h2 className="font-bold text-gray-9 text-lg lg:mb-6 mb-4">
              Get in Touch
            </h2>
            <nav className="lg:mb-10 mb-4">
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-6">
                  <Image
                    src="/icons/mail.svg"
                    alt="location"
                    width={60}
                    height={60}
                    className=""
                  />
                </div>
                <Link
                  href="mailto:support@keystone.com"
                  className=" text-gray-9"
                >
                  support@keystone.com
                </Link>
              </div>

              <div className="flex gap-2 mb-4">
                <div className="h-6 w-6">
                  <Image
                    src="/icons/phonecall.svg"
                    alt="location"
                    width={60}
                    height={60}
                    className=""
                  />
                </div>
                <Link href="tel:+1 (123) 456-7890" className=" text-gray-9">
                  +1 (123) 456-7890
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* right */}
        <div className="xl:w-80 lg:w-60">
          <h2 className="font-bold text-gray-9 text-lg mb-6">Subscribe</h2>

          <p className="text-base text-gray-9 mb-6">
            Stay informed with the latest resources, events, and support tools.
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              className="rounded-lg w-full px-3 outline-none"
              placeholder="Enter your email"
            />
            <Button variant="secondary">Sign Up</Button>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="bg-primary-3">
        <div className="container mx-auto py-8 px-5 flex flex-wrap flex-col justify-center items-center sm:flex-row">
          <p className="text-gray-9 font-medium text-base">
            © 2025 Keystone Ability Support. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
