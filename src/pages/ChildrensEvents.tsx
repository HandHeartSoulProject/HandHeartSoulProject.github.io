import { useEffect, useState } from "react";

import ChildrensEventRow from "../components/ChildrensEventRow";
import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import ExportCSVButton from "../components/ExportCSVButton";
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

	const [snackbar, setSnackBar] = useState<snackbarType>({
		toggle: false,
		severity: "error",
		message: ""
	});

	return (
		<div className="table-layout">
			<div className="title">
				<h1>Children's Events</h1>
				<ExportCSVButton data={events} />
			</div>
			<table>
				<thead>
					<tr>
						<th>Event</th>
						<th># of Adults</th>
						<th># of Children</th>
						<th>Date</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{events ? (
						events
							.sort((eventA, eventB) => eventB.date.localeCompare(eventA.date))
							.map(event => (
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
