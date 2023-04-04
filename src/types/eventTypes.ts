import { Database } from "./supabase";

export type eventType = "communityEvent" | "childrenEvent";
export const hhsDomain = "@handheartsoulproject.org";
export const dropDownEventTypes: { value: eventType; label: string }[] = [
	{ value: "communityEvent", label: "Community Event" },
	{ value: "childrenEvent", label: "Children Event" }
];

type field =
	| keyof Database["public"]["Tables"]["communityEvents"]["Row"]
	| keyof Database["public"]["Tables"]["childrenEvents"]["Row"];
export type visField = Extract<field, "numAdults" | "numChildren" | "foodPounds">;
export const dropDownEventTypes2: { value: visField; label: string }[] = [
	{ value: "numAdults", label: "Number of Adults Served" },
	{ value: "numChildren", label: "Number of Children Served" }
];
export const dropDownEventTypes3: { value: visField; label: string }[] = [
	{ value: "numAdults", label: "Number of Adults Served" },
	{ value: "numChildren", label: "Number of Children Served" },
	{ value: "foodPounds", label: "Amount of Food Served" }
];
