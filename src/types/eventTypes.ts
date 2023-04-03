export type eventType = "communityEvent" | "childrenEvent";
export const hhsDomain = "@handheartsoulproject.org";
export const dropDownEventTypes: { value: string; label: string }[] = [
	{ value: "childrenEvent", label: "Children Event" },
	{ value: "communityEvent", label: "Community Event" }
];

export type visFields = "numAdults" | "numChildren" | "foodPounds";
export const dropDownEventTypes2: { value: string; label: string }[] = [
	{ value: "numAdults", label: "Number of Adults Served" },
	{ value: "numChildren", label: "Number of Children Served" }
];
export const dropDownEventTypes3: { value: string; label: string }[] = [
	{ value: "numAdults", label: "Number of Adults Served" },
	{ value: "numChildren", label: "Number of Children Served" },
	{ value: "foodPounds", label: "Amount of Food Served" }
];
