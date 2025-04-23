"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { menuOptions } from "@/static/header";

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
import { Skeleton } from "../shadcn/skeleton";
import { useGetServicesQuery } from "@/features/public/services";
import Logo from "./logo";
import { lowerCaseFirstLetter } from "@/lib/lowercaseFirstLetter";

interface User {
  data: {
    avatar: string;
    name: string;
  };
}

export default function Header() {
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

  const {
    data: servicesData,
    isLoading: servicesLoading,
    isFetching: servicesFetching,
  }: any = useGetServicesQuery({
    limit: 4,
  });

  const loading =
    isLoading || isFetching || servicesLoading || servicesFetching;

  // Extract services with fallback
  const services = useMemo(
    () => servicesData?.data?.services || [],
    [servicesData]
  );

  // Derive menus with injected services
  const menus = useMemo(() => {
    return menuOptions.map((menu) =>
      menu.name === "Services" ? { ...menu, items: services } : menu
    );
  }, [services]);

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container flex h-24 items-center justify-between">
        {/* Left - Brand */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Center - Content (hidden on tablet) */}
        <nav className="hidden lg:flex items-center gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="px-3 flex gap-3">
                <Skeleton className="w-16 h-9" />
              </div>
            ))
          ) : (
            <NavigationMenu>
              <NavigationMenuList>
                {menus.map((menu, index) => {
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
                      {menu.items && menu.items.length > 0 ? (
                        <>
                          <NavigationMenuTrigger>
                            <Link href={`/${lowerCaseFirstLetter(menu.name)}`}>
                              {menu.name}
                            </Link>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                              {menu.items &&
                                menu.items.map((component: any) => (
                                  <ListItem
                                    key={component.name}
                                    title={component.name}
                                    href={`/${lowerCaseFirstLetter(menu.name)}/${component.slug}`}
                                  >
                                    {component.short_brief}
                                  </ListItem>
                                ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={`/${lowerCaseFirstLetter(menu.name)}`}
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {menu.name}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </nav>

        {/* Right - Login Button */}
        <div className="flex items-center">
          {loading && (
            <div className="hidden md:flex gap-3">
              <Skeleton className="w-16 h-9" />
              <Skeleton className="w-16 h-9" />
            </div>
          )}
          {!loading && currentUser && (
            <>
              <ProfileMenu currentUser={currentUser} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden bg-gray-2 rounded-xl p-1.5"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </>
          )}

          {!loading && !currentUser && (
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

          {loading && (
            <div className="flex md:hidden gap-3">
              <Skeleton className="w-16 h-9" />
              <Skeleton className="w-16 h-9" />
            </div>
          )}

          {!loading && !currentUser && (
            <>
              <Button asChild className="lg:hidden mr-4" variant="secondary">
                <Link href="/login">Login</Link>
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden bg-gray-2 rounded-xl p-1.5"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </>
          )}

          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 top-[98px] w-full overflow-y-auto bg-white">
              <div className="">
                {menus.map((menu, index) => {
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
                          <Link href={`/${lowerCaseFirstLetter(menu.name)}`}>
                            {menu?.name}
                          </Link>
                        </AccordionTrigger>
                        <AccordionContent>
                          {menu.items &&
                            menu.items.map((submenu: any, subIndex: number) => {
                              return (
                                <div
                                  className="border-b first:border-t last:border-0"
                                  key={subIndex}
                                >
                                  <Link
                                    href={`/${lowerCaseFirstLetter(menu.name)}/${submenu.slug}`}
                                    className="block py-4 pl-10 text-base font-semibold text-gray-9"
                                  >
                                    {submenu.name}
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

interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  href: string;
  title: string;
}

const ListItem = forwardRef<React.ElementRef<"li">, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <li
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <Link href={href}>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </li>
      </NavigationMenuLink>
    );
  }
);

ListItem.displayName = "ListItem";
