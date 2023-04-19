import { FileDownload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import CommunityEventRow from "../components/CommunityEventRow";
import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import { supabase } from "../supabaseClient";
import { communityEventType } from "../types/eventTypes";

function CommunityEvents() {
	const [events, setEvents] = useState<communityEventType[]>();

	useEffect(() => {
		async function fetchEvents() {
			const { data: events, error } = await supabase.from("communityEvents").select("*, type (id, name)");

			if (error || !events) {
				console.error(error);
				setSnackBar({ toggle: true, severity: "error", message: "Failed to fetch events" });
			} else setEvents(events as communityEventType[]);
		}

		fetchEvents();
	}, []);

	const [snackbar, setSnackBar] = useState<snackbarType>({
		toggle: false,
		severity: "error",
		message: ""
	});

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
						events.map(event => (
							<CommunityEventRow
								key={event.id}
								event={event}
								removeEvent={() => setEvents(events?.filter(e => e.id != event.id))}
								updateEvent={updatedEvent => {
									setEvents(events?.map(e => (e.id == event.id ? updatedEvent : e)));
								}}
								setSnackBar={setSnackBar}
							/>
						))
					) : (
						<tr>
							<td colSpan={999} className="loading">
								Loading...
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackBar} />
		</div>
	);
}

export default CommunityEvents;
