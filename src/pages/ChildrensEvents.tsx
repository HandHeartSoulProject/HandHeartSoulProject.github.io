import { Delete, FileDownload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ClipLoader } from "react-spinners";

import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

const dateOptions: any = { weekday: "short", year: "numeric", month: "numeric", day: "numeric" };

function ChildrensEvents() {
	type eventType = Database["public"]["Tables"]["childrenEvents"]["Row"];
	const [events, setEvents] = useState<eventType[]>();

	useEffect(() => {
		async function fetchEvents() {
			let { data: events, error } = await supabase.from("childrenEvents").select("*");

			if (error || !events) console.error(error);
			else setEvents(events as eventType[]);
		}

		fetchEvents();
	}, []);

	/** Stores an array of IDs representing the events awaiting deletion */
	const [loadingDelete, setLoadingDelete] = useState<eventType["id"][]>([]);
	async function deleteEvent(id: eventType["id"]) {
		if (id in loadingDelete) return;

		setLoadingDelete([...loadingDelete, id]);
		const { error } = await supabase.from("childrenEvents").delete().match({ id });

		if (error) console.error(error);
		else {
			setEvents(events?.filter(event => event.id != id));
			setLoadingDelete(loadingDelete.filter(eventId => eventId != id));
		}
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
						<FileDownload />
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
						<th>Action</th>
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
									<td>
										<div className="action-cell">
											{!loadingDelete.includes(event.id) ? (
												<button className="delete-icon" onClick={() => deleteEvent(event.id)}>
													<Delete />
												</button>
											) : (
												<ClipLoader size={20} color="red" />
											)}
										</div>
									</td>
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
