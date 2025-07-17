// src/app/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.role) {
      router.push(`/${user.role}`);
    } else {
      router.push("/login");
    }
  }, []);

  return null;
}