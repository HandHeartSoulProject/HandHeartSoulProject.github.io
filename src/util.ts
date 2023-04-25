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

/**
 * @param month A month as an integer 1 - 12 (inclusive)
 * @param long Whether to return the full month name or the abbreviated version. Defaults to false
 * */
export function getMonthName(month: number, long: boolean = false): string {
	const months = long
		? [
				"January",
				"Febuary",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
		  ]
		: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[month - 1];
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
