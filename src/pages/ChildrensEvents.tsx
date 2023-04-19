import { FileDownload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import ChildrensEventRow from "../components/ChildrensEventRow";
import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import { supabase } from "../supabaseClient";
import { childrenEventType } from "../types/eventTypes";

function ChildrensEvents() {
	const [events, setEvents] = useState<childrenEventType[]>();

	useEffect(() => {
		async function fetchEvents() {
			let { data: events, error } = await supabase.from("childrenEvents").select("*");

			if (error || !events) {
				console.error(error);
				setSnackBar({ toggle: true, severity: "error", message: "Failed to fetch events" });
			} else setEvents(events as childrenEventType[]);
		}

		fetchEvents();
	}, []);

	/** Stores an array of IDs representing the events awaiting deletion */
	const [loadingDelete, setLoadingDelete] = useState<childrenEventType["id"][]>([]);
	async function deleteEvent(id: childrenEventType["id"]) {
		if (id in loadingDelete) return;

		setLoadingDelete([...loadingDelete, id]);
		const { error } = await supabase.from("childrenEvents").delete().eq("id", id);

		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to delete event" });
		} else {
			setEvents(events?.filter(event => event.id != id));
			setSnackBar({ toggle: true, severity: "success", message: "Event deleted" });
		}
		setLoadingDelete(loadingDelete.filter(eventId => eventId != id));
	}

	const [snackbar, setSnackBar] = useState<snackbarType>({
		toggle: false,
		severity: "error",
		message: ""
	});

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
						events.map(event => (
							<ChildrensEventRow
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

export default ChildrensEvents;
