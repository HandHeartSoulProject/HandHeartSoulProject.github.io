import { Database } from "./supabase";

export type eventType = "communityEvent" | "childrenEvent";
export type communityEventType = Database["public"]["Tables"]["communityEvents"]["Row"] & {
	type: Database["public"]["Tables"]["eventTypes"]["Row"];
};
export type childrenEventType = Database["public"]["Tables"]["childrenEvents"]["Row"];
export const hhsDomain = "@handheartsoulproject.org";
export const dropDownEventTypes: Record<eventType, string> = {
	communityEvent: "Community Event",
	childrenEvent: "Children's Event"
};

type field =
	| keyof Database["public"]["Tables"]["communityEvents"]["Row"]
	| keyof Database["public"]["Tables"]["childrenEvents"]["Row"];
export type visField = Extract<field, "numAdults" | "numChildren" | "foodPounds">;
export type communityFields = Database["public"]["Tables"]["communityEvents"]["Row"];
export type childrensFields = Database["public"]["Tables"]["childrenEvents"]["Row"];
const communityEventOptions: Record<visField, string> = {
	numAdults: "Number of Adults Served",
	numChildren: "Number of Children Served",
	foodPounds: "Amount of Food Served"
};
const childrenEventOptions: Record<Exclude<visField, "foodPounds">, string> = {
	numAdults: "Number of Adults Served",
	numChildren: "Number of Children Served"
};
export const eventTypeOptions: Record<eventType, typeof communityEventOptions | typeof childrenEventOptions> = {
	communityEvent: communityEventOptions,
	childrenEvent: childrenEventOptions
};

/**
 * Adjusts the date to account for the timezone offset and formats it for display
 *
 * When JS reads in a date in ISO format, it automatically applies the local timezone offset
 * In the case of EST, this makes the date 5 hours behind, causing the previous day to be shown */
export function formatDateString(dateString: string): string {
	const dateDisplayOptions: any = {
		weekday: "short",
		year: "numeric",
		month: "numeric",
		day: "numeric"
	};
	const date = new Date(dateString);
	if (date.getTimezoneOffset() != 0) {
		date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
	}
	return date.toLocaleDateString(undefined, dateDisplayOptions);
}
