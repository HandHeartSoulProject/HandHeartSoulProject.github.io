import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

const dateOptions: any = { weekday: "short", year: "numeric", month: "numeric", day: "numeric" };

function CommunityEvents() {
	type eventType = Database["public"]["Tables"]["communityEvents"]["Row"] & {
		type: { name: Database["public"]["Tables"]["eventTypes"]["Row"]["name"] };
	};
	const [events, setEvents] = useState<eventType[]>();

	useEffect(() => {
		fetchEvents();
	}, []);

	async function fetchEvents() {
		var { data: events, error } = await supabase.from("communityEvents").select("*, type (name)");

		if (error || !events) console.error(error);
		else setEvents(events as eventType[]);
	}

	return (
		<div className="events">
			<h1>Community Events</h1>
			{events ? (
				<table>
					<thead>
						<tr>
							<th>Event</th>
							<th>Type</th>
							<th>Presenter(s)</th>
							<th>Location</th>
							<th>Virtual</th>
							<th>Date</th>
							<th>Hours</th>
							<th># of Children Served</th>
							<th># of Adults Served</th>
							<th>Pounds of Food</th>
							<th>Food Description</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{events.map(event => {
							const date = new Date(event.date);
							// Adjust the date to account for the timezone offset
							// When JS reads in a date in ISO format, it automatically applies the local timezone offset
							// In the case of EST, this makes the date 5 hours behind, casuing the previous day to be shown
							if (date.getTimezoneOffset() != 0) {
								date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
							}
							return (
								<tr key={event.id}>
									<td>{event.name}</td>
									<td>{event.type.name}</td>
									<td>{event.presenter}</td>
									<td>{event.location}</td>
									<td>{event.virtual ? "Yes" : "No"}</td>
									<td>{date.toLocaleDateString(undefined, dateOptions)}</td>
									<td>{event.hours}</td>
									<td>{event.numChildren}</td>
									<td>{event.numAdults}</td>
									<td>{event.foodPounds}</td>
									<td>{event.foodDescription}</td>
									<td>{event.description}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}

export default CommunityEvents;
