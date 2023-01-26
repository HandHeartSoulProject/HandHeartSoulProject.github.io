import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

const dateOptions: any = { weekday: "short", year: "numeric", month: "numeric", day: "numeric" };

function Events() {
	const [events, setEvents] = useState<Database["public"]["Tables"]["events"]["Row"][]>();

	useEffect(() => {
		fetchEvents();
	}, []);

	async function fetchEvents() {
		let { data: events, error } = await supabase.from("events").select("*");

		if (error || !events) console.log("error", error);
		else setEvents(events);
	}

	return (
		<div className="events">
			<h1>Events</h1>
			{events ? (
				<table>
					<thead>
						<tr>
							<th>Event</th>
							<th>Date</th>
							<th>Number of People Served</th>
						</tr>
					</thead>
					<tbody>
						{events.map(event => {
							const date = new Date(event.date);
							return (
								<tr key={event.id}>
									<td>{event.name}</td>
									<td>{date.toLocaleDateString(undefined, dateOptions)}</td>
									<td>{event.numServed}</td>
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

export default Events;
