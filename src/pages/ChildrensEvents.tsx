import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

const dateOptions: any = { weekday: "short", year: "numeric", month: "numeric", day: "numeric" };

function ChildrensEvents() {
	type eventType = Database["public"]["Tables"]["events_v2"]["Row"];
	const [events, setEvents] = useState<eventType[]>();

	useEffect(() => {
		fetchEvents();
	}, []);

	async function fetchEvents() {
		var { data: events, error } = await supabase.from("events_v2").select("*");

		if (error || !events) console.error(error);
		else setEvents(events as eventType[]);
	}

	return (
		<div className="events">
			<h1>Childrens Events</h1>
			{events ? (
				<table>
					<thead>
						<tr>
							<th>Event</th>
							<th># of Adults</th>
							<th># of Children</th>
							<th>Location</th>
							<th>Date</th>
							<th>Start Time</th>
							<th>End Time</th>
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
									<td>{event.num_adults}</td>
									<td>{event.num_children}</td>
									<td>{event.location}</td>
									<td>{date.toLocaleDateString(undefined, dateOptions)}</td>
									<td>{event.start_time}</td>
									<td>{event.end_time}</td>
									<td>{event.activity_description}</td>
									
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

export default ChildrensEvents;
