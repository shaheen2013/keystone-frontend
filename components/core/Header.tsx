import Link from "next/link";
import Image from "next/image";
import { forwardRef } from "react";
import { Menu } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/navigation-menu";

import { cn } from "@/lib/utils";
import { menuOptions } from "@/static/header";
import { Button } from "@/components/shadcn/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-24 items-center justify-between px-4 md:px-6">
        {/* Left - Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src="/icons/brand-logo.svg"
              alt="logo"
              width={50}
              height={50}
              className="h-12 w-[110px]"
            />
          </Link>
        </div>

        {/* Center - Content (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6">
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
          <Button asChild variant="link">
            <Link href="/login" className="hidden sm:flex">
              Login
            </Link>
          </Button>

          <Button asChild className=" bg-secondary-6">
            <Link href="/signup">Signup</Link>
          </Button>

          {/* Mobile Menu */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Navigation</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-2 p-4">
                <Link
                  href="#"
                  className="py-2 text-sm font-medium hover:underline underline-offset-4"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="py-2 text-sm font-medium hover:underline underline-offset-4"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="py-2 text-sm font-medium hover:underline underline-offset-4"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="py-2 text-sm font-medium hover:underline underline-offset-4"
                >
                  About
                </Link>
                <DrawerClose asChild>
                  <Button className="mt-2">
                    <Link href="/login">Login</Link>
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
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
