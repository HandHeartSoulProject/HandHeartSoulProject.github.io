import { Check, Delete } from "@mui/icons-material";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

import { communityEventType, dateDisplayOptions } from "../types/eventTypes";
import { snackbarType } from "./CustomSnackbar";
import { supabase } from "../supabaseClient";

function CommunityEventRow({
	event,
	removeEvent,
	setSnackBar
}: {
	event: communityEventType;
	setSnackBar: React.Dispatch<React.SetStateAction<snackbarType>>;
	removeEvent: () => void;
}) {
	/** Adjust the date to account for the timezone offset
		When JS reads in a date in ISO format, it automatically applies the local timezone offset
		In the case of EST, this makes the date 5 hours behind, casuing the previous day to be shown */
	const date = new Date(event.date);
	if (date.getTimezoneOffset() != 0) {
		date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
	}

	/** Stores an array of IDs representing the events awaiting deletion */
	const [loadingDelete, setLoadingDelete] = useState(false);
	async function deleteEvent() {
		if (loadingDelete) return;

		setLoadingDelete(true);
		const { error } = await supabase.from("communityEvents").delete().match({ id: event.id });

		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to delete event" });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: "Event deleted" });
			removeEvent();
		}
		setLoadingDelete(false);
	}

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveEvent() {
		if (loadingSave) return;

		setLoadingSave(true);
	}

	const [editing, setEditing] = useState(false);
	function detectClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
		e.stopPropagation();
		if (e.detail != 2 || editing) return;
		setEditing(true);
	}

	return !editing ? (
		<tr key={event.id} onClick={detectClick}>
			<td>{event.name}</td>
			<td>{event.type.name}</td>
			<td>{event.presenter}</td>
			<td>{event.location}</td>
			<td>{event.virtual ? "Yes" : "No"}</td>
			<td>{date.toLocaleDateString(undefined, dateDisplayOptions)}</td>
			<td>{event.hours}</td>
			<td>{event.numChildren}</td>
			<td>{event.numAdults}</td>
			<td>{event.foodPounds}</td>
			<td>{event.foodDescription}</td>
			<td>{event.description}</td>
			<td>
				<div className="action-cell">
					{!loadingDelete ? (
						<button className="delete-icon" onClick={() => deleteEvent()}>
							<Delete />
						</button>
					) : (
						<ClipLoader size={20} color="red" />
					)}
				</div>
			</td>
		</tr>
	) : (
		<tr key={event.id}>
			<td>{event.name}</td>
			<td>{event.type.name}</td>
			<td>{event.presenter}</td>
			<td>{event.location}</td>
			<td>{event.virtual ? "Yes" : "No"}</td>
			<td>{date.toLocaleDateString(undefined, dateDisplayOptions)}</td>
			<td>{event.hours}</td>
			<td>{event.numChildren}</td>
			<td>{event.numAdults}</td>
			<td>{event.foodPounds}</td>
			<td>{event.foodDescription}</td>
			<td>{event.description}</td>
			<td>
				<div className="action-cell">
					{!loadingSave ? (
						<button className="save-icon" onClick={() => saveEvent()}>
							<Check />
						</button>
					) : (
						<ClipLoader size={20} color="lime" />
					)}
				</div>
			</td>
		</tr>
	);
}

export default CommunityEventRow;
