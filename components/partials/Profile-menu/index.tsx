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
import { useLogoutMutation } from "@/features/auth/authSlice";
import { User, CalendarDays, Bookmark, KeyRound, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

const ProfileMenu = ({ currentUser }: { currentUser: any }) => {
  const router = useRouter();

  const [logout] = useLogoutMutation();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();
      console.log("res", res);

      if (res?.success) {
        localStorage.removeItem("key_stone_token");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hidden md:flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-muted transition">
          <Avatar className="rounded-xl h-10 w-10">
            <AvatarImage
              src={currentUser?.data?.avatar}
              alt={currentUser?.data?.name}
            />
            <AvatarFallback className="rounded-xl">
              {currentUser?.data?.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h4 className="text-base font-medium text-foreground max-w-[160px] truncate">
              {currentUser?.data?.name}
            </h4>
            <span className="text-sm text-muted-foreground">
              {currentUser?.data?.email}
            </span>
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
