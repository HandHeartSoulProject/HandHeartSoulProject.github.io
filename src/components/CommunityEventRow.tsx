import { Check, Close, Delete } from "@mui/icons-material";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

import { communityEventType, dateDisplayOptions } from "../types/eventTypes";
import { snackbarType } from "./CustomSnackbar";
import { supabase } from "../supabaseClient";
import AdaptiveWidthNumericInput from "./AdaptiveWidthNumericInput";

function CommunityEventRow({
	event,
	removeEvent,
	updateEvent,
	setSnackBar
}: {
	event: communityEventType;
	removeEvent: () => void;
	updateEvent: (event: communityEventType) => void;
	setSnackBar: React.Dispatch<React.SetStateAction<snackbarType>>;
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
		const { error } = await supabase.from("communityEvents").delete().eq("id", event.id);

		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to delete event" });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: "Event deleted" });
			removeEvent();
		}
		setLoadingDelete(false);
	}

	const [editing, setEditing] = useState(false);
	const [editedEvent, setEditedEvent] = useState<communityEventType>(event);
	function detectClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
		e.stopPropagation();
		if (e.detail != 2 || editing) return;
		setEditing(true);
	}
	function stopEditing() {
		setEditing(false);
		setEditedEvent(event);
	}

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveEvent() {
		if (loadingSave) return;

		const tempEvent = {
			...editedEvent,
			type: editedEvent.type.id
			// hours: Number.isNaN(editedEvent.hours) ? null : editedEvent.hours,
		};

		setLoadingSave(true);
		const { data, error } = await supabase
			.from("communityEvents")
			.update(tempEvent)
			.eq("id", event.id)
			.select("*, type(id, name)");
		if (error || !data || data.length == 0) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to save event changes" });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: "Event changes saved" });
			setEditing(false);
			updateEvent(data[0] as communityEventType);
		}
		setLoadingSave(false);
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
						<ClipLoader size={20} color="var(--warning)" />
					)}
				</div>
			</td>
		</tr>
	) : (
		<tr key={event.id}>
			<td>
				<textarea
					onChange={e => setEditedEvent({ ...editedEvent, name: e.target.value })}
					value={editedEvent.name}
				/>
			</td>
			<td>{event.type.name}</td>
			<td>
				<textarea
					onChange={e => setEditedEvent({ ...editedEvent, presenter: e.target.value })}
					value={editedEvent.presenter || ""}
				/>
			</td>
			<td>
				<textarea
					onChange={e => setEditedEvent({ ...editedEvent, location: e.target.value })}
					value={editedEvent.location || ""}
				/>
			</td>
			<td>
				<input
					type="checkbox"
					checked={editedEvent.virtual}
					onChange={e => setEditedEvent({ ...editedEvent, virtual: e.target.checked })}
				/>
			</td>
			<td>{date.toLocaleDateString(undefined, dateDisplayOptions)}</td>
			<td>
				<AdaptiveWidthNumericInput
					value={editedEvent.hours}
					onChange={value => setEditedEvent({ ...editedEvent, hours: value })}
				/>
			</td>
			<td>
				<AdaptiveWidthNumericInput
					value={editedEvent.numChildren}
					onChange={value => setEditedEvent({ ...editedEvent, numChildren: value })}
				/>
			</td>
			<td>
				<AdaptiveWidthNumericInput
					value={editedEvent.numAdults}
					onChange={value => setEditedEvent({ ...editedEvent, numAdults: value })}
				/>
			</td>
			<td>
				<AdaptiveWidthNumericInput
					value={editedEvent.foodPounds}
					onChange={value => setEditedEvent({ ...editedEvent, foodPounds: value })}
				/>
			</td>
			<td>
				<textarea
					value={editedEvent.foodDescription || ""}
					onChange={e => setEditedEvent({ ...editedEvent, foodDescription: e.target.value })}
				/>
			</td>
			<td>
				<textarea
					value={editedEvent.description || ""}
					onChange={e => setEditedEvent({ ...editedEvent, description: e.target.value })}
				/>
			</td>
			<td>
				<div className="action-cell">
					{!loadingSave ? (
						<>
							<button className="delete-icon" onClick={() => stopEditing()}>
								<Close />
							</button>
							<button className="save-icon" onClick={() => saveEvent()}>
								<Check />
							</button>
						</>
					) : (
						<ClipLoader size={20} color="var(--success)" />
					)}
				</div>
			</td>
		</tr>
	);
}

export default CommunityEventRow;
