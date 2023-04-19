import { Delete, FileDownload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ClipLoader } from "react-spinners";

import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import { supabase } from "../supabaseClient";
import { childrenEventType, dateDisplayOptions } from "../types/eventTypes";

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
		const { error } = await supabase.from("childrenEvents").delete().match({ id });

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
									<td>{date.toLocaleDateString(undefined, dateDisplayOptions)}</td>
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
												<ClipLoader size={20} color="var(--warning)" />
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

			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackBar} />
		</div>
	);
}

export default ChildrensEvents;
