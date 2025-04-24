"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // You can also clear auth/session storage here if needed
    router.push("/");
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-2 opacity-80" />
      Logout
    </Button>
  );
}
