import { Database } from "./supabase";
export type userRole = "admin" | "contractor" | "employee";
export type userInfo = Database["public"]["Tables"]["users"]["Row"];
export const hhsDomain = "@handheartsoulproject.org";
export const dropDownRoles: { value: string; label: string }[] = [
    { value: "contractor", label: "Contractor" },
    { value: "admin", label: "Admin" },
    { value: "employee", label: "Employee" }
];
