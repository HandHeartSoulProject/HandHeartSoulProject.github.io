import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

const dateOptions: any = { weekday: "short", year: "numeric", month: "numeric", day: "numeric" };

function ChildrensEvents() {
	type eventType = Database["public"]["Tables"]["childrenEvents"]["Row"];
	const [events, setEvents] = useState<eventType[]>();

	useEffect(() => {
		fetchEvents();
	}, []);

	async function fetchEvents() {
		var { data: events, error } = await supabase.from("childrenEvents").select("*");

		if (error || !events) console.error(error);
		else setEvents(events as eventType[]);
	}

	return (
		<div className="events">
			<div className="title">
				<h1>Children's Events</h1>
				<CSVLink
					data={events || ""}
					filename={`childrens-events-${new Date().toISOString().replace(/T.*/, "")}.csv`}
				>
					<button className="export" disabled={!events}>
						<FileDownloadIcon />
						Export CSV
					</button>
				</CSVLink>
			</div>
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
					{events ? (
						events.map(event => {
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
									<td>{event.numAdults}</td>
									<td>{event.numChildren}</td>
									<td>{event.location}</td>
									<td>{date.toLocaleDateString(undefined, dateOptions)}</td>
									<td>{event.startTime}</td>
									<td>{event.endTime}</td>
									<td>{event.description}</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={999} className="loading">
								Loading...
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default ChildrensEvents;
