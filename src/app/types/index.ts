// src/types/index.ts
export type Role = "employee" | "admin" | "superadmin";

export interface User {
  name: string;
  email: string;
  role: Role;
}
