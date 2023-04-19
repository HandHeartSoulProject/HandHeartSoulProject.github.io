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

export function objectsEqual(obj1: any, obj2: any): boolean {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}
