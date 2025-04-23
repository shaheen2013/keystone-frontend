import { ChevronDown } from "@/components/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import Cookies from "js-cookie";
import { apiSlice } from "@/features/api/apiSlice";
import { useLogoutMutation } from "@/features/auth/authSlice";
import { cn } from "@/lib/utils";
import { User, CalendarDays, Bookmark, KeyRound, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProfileMenu = ({ currentUser }: { currentUser: any }) => {
  console.log("currentUser", currentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [logout] = useLogoutMutation();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      const res: any = await logout({}).unwrap();
      console.log("res", res);

      if (res?.success) {
        Cookies.remove("key_stone_token");

        router.push("/");
        dispatch(apiSlice.util.resetApiState());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          open &&
            "bg-transparent md:bg-muted hover:bg-transparent hover:md:bg-muted"
        )}
      >
        <div className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:md:bg-muted transition">
          <Avatar className="rounded-full size-10">
            <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
            <AvatarFallback className="rounded-xl">
              {currentUser?.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col">
            <h4 className="text-base font-medium text-foreground max-w-[160px] truncate">
              {currentUser?.name}
            </h4>
            <span className="text-sm text-muted-foreground">
              {currentUser?.email}
            </span>
          </div>
          <div className={cn("shrink-0 hidden md:block")}>
            <ChevronDown
              className={cn(
                "h-4 w-4 duration-300 ease-in",
                open && "rotate-180"
              )}
            />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2 shadow-lg border border-border">
        <DropdownMenuItem
          className="text-base flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition"
          onClick={() => handleNavigate("/profile/overview")}
        >
          <User className="h-4 w-4" />
          Profile Overview
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-base flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition"
          onClick={() => handleNavigate("/profile/events?page=1")}
        >
          <CalendarDays className="h-4 w-4" />
          Events
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-base flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition"
          onClick={() => handleNavigate("/profile/saved-blogs?page=1")}
        >
          <Bookmark className="h-4 w-4" />
          Saved Blogs
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-base flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition"
          onClick={() => handleNavigate("/profile/password")}
        >
          <KeyRound className="h-4 w-4" />
          Password
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-base flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 hover:text-red-700 cursor-pointer transition"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
