// src/lib/auth.ts
import { User } from "../types";

export const users: User[] = [
  { name: "Alice", email: "alice@company.com", role: "employee" },
  { name: "Bob", email: "bob@company.com", role: "admin" },
  { name: "Sally", email: "sally@company.com", role: "superadmin" },
];

export function login(email: string): User | null {
  return users.find((user) => user.email === email) || null;
}
