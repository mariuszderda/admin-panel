"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await logout();
    router.push("/auth/login");
  };
  return (
    <Button variant="ghost" className="text-red-600" onClick={handleSignOut}>
      Logout
    </Button>
  );
};
