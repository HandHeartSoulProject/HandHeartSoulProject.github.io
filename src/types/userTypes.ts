import { Database } from "./supabase";
const userRoleList = ["admin", "contractor", "employee"] as const;
export type userRole = typeof userRoleList[number];
export type userType = Database["public"]["Tables"]["users"]["Row"];
export const hhsDomain = "@handheartsoulproject.org";
export const dropDownRoles: Record<userRole, string> = Object.fromEntries(
	userRoleList.map(role => [role as userRole, role.charAt(0).toUpperCase() + role.slice(1)])
) as Record<userRole, string>;
