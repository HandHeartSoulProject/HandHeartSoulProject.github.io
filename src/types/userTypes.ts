import { Database } from "./supabase";
export type userRole = "admin" | "contractor" | "employee";
export type userInfo = Database["public"]["Tables"]["users"]["Row"];
