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
import { menuOptions } from "@/static/header";
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/navigation-menu";
import { Button } from "@/components/shadcn/button";
import { useMeQuery } from "@/features/auth/authSlice";
import ProfileMenu from "./Profile-menu";
import { useGetHeaderQuery } from "@/features/public/headerSlice";

interface User {
  data: {
    avatar: string;
    name: string;
  };
}

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    data: currentUser,
    isLoading,
    isFetching,
  } = useMeQuery({}) as {
    data: User;
    isLoading: boolean;
    isFetching: boolean;
  };

  const { data: headerData }: any = useGetHeaderQuery({});

  console.log("headerData", headerData);

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container flex h-24 items-center justify-between">
        {/* Left - Brand */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={headerData?.data?.website_logo ?? "/icons/brand-logo.svg"}
              alt="logo"
              width={100}
              height={100}
              className="h-12 w-[110px] flex-1"
              priority
            />
          </Link>
        </div>

        {/* Center - Content (hidden on tablet) */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {headerData?.data?.menus?.map((menu: any, index: number) => {
                if (menu.children.length === 0) {
                  return (
                    <NavigationMenuItem key={index}>
                      <Link href={menu.url} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {menu.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger
                      onClick={() => router.push(menu.url)}
                    >
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {menu?.children?.length > 0 &&
                          menu.children.map((component: any) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.url}
                            >
                              {component.subtitle}
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
          {!isLoading && !isFetching && currentUser && (
            <ProfileMenu currentUser={currentUser} />
          )}

          {!isLoading && !isFetching && !currentUser && (
            <>
              <Button asChild variant="link" className="hidden lg:flex">
                <Link href="/login" className="">
                  Login
                </Link>
              </Button>

              <Button asChild className="hidden lg:flex" variant="secondary">
                <Link href="/signup">Signup</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          {!isLoading && !isFetching && !currentUser && (
            <Button asChild className="lg:hidden mr-4" variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden bg-gray-2 rounded-xl p-1.5"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 top-[98px] w-full overflow-y-auto bg-white">
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

ListItem.displayName = "ListItem";
