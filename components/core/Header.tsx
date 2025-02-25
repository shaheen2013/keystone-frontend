"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { forwardRef, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/navigation-menu";
import { menuOptions } from "@/static/header";
import { Button } from "@/components/shadcn/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-white">
      <div className="container flex h-24 items-center justify-between px-4 md:px-6">
        {/* Left - Brand */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/icons/brand-logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="h-12 w-[110px] flex-1"
            />
          </Link>
        </div>

        {/* Center - Content (hidden on tablet) */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {menuOptions.map((menu, index) => {
                if (menu.href) {
                  return (
                    <NavigationMenuItem key={index}>
                      <Link href={menu.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {menu.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {menu.items &&
                          menu.items.map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right - Login Button */}
        <div className="flex items-center">
          <Button asChild variant="link" className="hidden lg:flex">
            <Link href="/login" className="">
              Login
            </Link>
          </Button>

          <Button asChild className=" bg-secondary-6 hidden lg:flex">
            <Link href="/signup">Signup</Link>
          </Button>

          {/* Mobile Menu */}
          <Button asChild className=" bg-secondary-6 lg:hidden mr-4">
            <Link href="/login">Login</Link>
          </Button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden bg-gray-2 rounded-xl p-[10px]"
          >
            {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>

          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 top-[100px] w-full overflow-y-auto bg-white">
              <div className="">
                {menuOptions.map((menu, index) => {
                  if (menu.href) {
                    return (
                      <Link
                        href={menu.href}
                        key={index}
                        className="block py-3 px-6 text-md font-semibold border-b text-gray-9"
                      >
                        {menu.name}
                      </Link>
                    );
                  }

                  return (
                    <Accordion type="single" collapsible key={index}>
                      <AccordionItem value="item-1" className="">
                        <AccordionTrigger className="text-md font-semibold px-6 py-3 text-gray-9">
                          {menu?.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          {menu.items &&
                            menu.items.map((submenu, subIndex) => {
                              console.log("submenu", submenu);
                              return (
                                <div
                                  className="border-b first:border-t last:border-0"
                                  key={subIndex}
                                >
                                  <Link
                                    href={submenu.href}
                                    className="block py-4 pl-10 text-base font-semibold text-gray-9"
                                  >
                                    {submenu.title}
                                  </Link>
                                </div>
                              );
                            })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </header>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
