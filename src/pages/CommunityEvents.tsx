import { Delete, FileDownload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ClipLoader } from "react-spinners";

import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

const dateOptions: any = { weekday: "short", year: "numeric", month: "numeric", day: "numeric" };

function CommunityEvents() {
	type eventType = Database["public"]["Tables"]["communityEvents"]["Row"] & {
		type: { name: Database["public"]["Tables"]["eventTypes"]["Row"]["name"] };
	};
	const [events, setEvents] = useState<eventType[]>();

	useEffect(() => {
		async function fetchEvents() {
			const { data: events, error } = await supabase.from("communityEvents").select("*, type (name)");

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
		const { error } = await supabase.from("communityEvents").delete().match({ id });

		if (error) console.error(error);
		else {
			setEvents(events?.filter(event => event.id != id));
			setLoadingDelete(loadingDelete.filter(eventId => eventId != id));
		}
	}

	return (
		<div className="events">
			<div className="title">
				<h1>Community Events</h1>
				<CSVLink
					data={events ? events.map(event => ({ ...event, type: event.type.name })) : ""}
					filename={`community-events-${new Date().toISOString().replace(/T.*/, "")}.csv`}
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

export default CommunityEvents;
