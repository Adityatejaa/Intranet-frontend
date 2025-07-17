// src/components/LogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        localStorage.removeItem("user");
        router.push("/login");
      }}
      className="text-red-600 font-medium"
    >
      Logout
    </button>
  );
}
