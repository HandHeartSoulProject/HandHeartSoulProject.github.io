import { Database } from "./supabase";

export type eventType = "communityEvent" | "childrenEvent";
export type communityEventType = Database["public"]["Tables"]["communityEvents"]["Row"] & {
	type: Database["public"]["Tables"]["communityEventTypes"]["Row"];
};
export type childrenEventType = Database["public"]["Tables"]["childrenEvents"]["Row"] & {
	type: Database["public"]["Tables"]["childrenEventTypes"]["Row"];
	site: Database["public"]["Tables"]["childrenEventSites"]["Row"];
};
export type communityEventTypeType = Database["public"]["Tables"]["communityEventTypes"]["Row"];
export type childrensEventTypeType = Database["public"]["Tables"]["childrenEventTypes"]["Row"];
export type childrensEventSiteType = Database["public"]["Tables"]["childrenEventSites"]["Row"];
export const hhsDomain = "@handheartsoulproject.org";
export const dropDownEventTypes: Record<eventType, string> = {
	communityEvent: "Community Event",
	childrenEvent: "Children's Event"
};

type communityVisField = "totaladults" | "totalchildren" | "totalfoodpounds";
type childrensVisField = "totaladults" | "totalchildren";
export type visField = communityVisField | childrensVisField;
export type communityVisData = Omit<
	Database["public"]["Functions"]["aggregate_community_events_ytd"]["Returns"][number],
	"month"
>[] &
	{ month: string }[];
export type childrensVisData = Omit<
	Database["public"]["Functions"]["aggregate_children_events_ytd"]["Returns"][number],
	"month"
>[] &
	{ month: string }[];
const communityEventOptions: Record<communityVisField, string> = {
	totaladults: "Number of Adults Served",
	totalchildren: "Number of Children Served",
	totalfoodpounds: "Amount of Food Served"
};
const childrenEventOptions: Record<childrensVisField, string> = {
	totaladults: "Number of Adults Served",
	totalchildren: "Number of Children Served"
};
export const eventTypeOptions: Record<eventType, typeof communityEventOptions | typeof childrenEventOptions> = {
	communityEvent: communityEventOptions,
	childrenEvent: childrenEventOptions
};
