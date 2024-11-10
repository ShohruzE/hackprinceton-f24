"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  username: string;
  pfp: string;
}

export default function DashboardHeader() {
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName = user.displayName as string;
        const initials = userName.slice(0, 2).toUpperCase();
        setUsername(userName);
        setPfp(initials);
      }
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm mb-4">
      <div className="w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
        <h2 className="text-2xl font-semibold text-gray-800 justify-start">
          Nurse Dashboard
        </h2>
        <div className="flex items-center ml-auto">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-500" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center ml-4 cursor-pointer">
                <Avatar>
                  <AvatarImage src={pfp} alt="Nurse" />
                  <AvatarFallback>{pfp}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {username}
                </span>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="cursor-pointer">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
