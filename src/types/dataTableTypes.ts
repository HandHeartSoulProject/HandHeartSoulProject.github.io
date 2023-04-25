import { Database } from "./supabase";

export type dataTable = keyof Database["public"]["Tables"];
export interface dataField<Table extends dataTable> {
	header: string;
	name: keyof Database["public"]["Tables"][Table]["Row"];
	editable?: boolean;
	isDate?: boolean;
	nestedField?: string;
}
