import { Check, Close, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import { supabase } from "../supabaseClient";
import { communityEventType } from "../types/eventTypes";
import { formatDateString, objectsEqual } from "../util";
import AdaptiveWidthNumericInput from "./AdaptiveWidthNumericInput";
import { snackbarType } from "./CustomSnackbar";

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
	/** Stores an array of IDs representing the events awaiting deletion */
	const [loadingDelete, setLoadingDelete] = useState(false);
	async function deleteEvent() {
		if (loadingDelete) return;

		if (!confirm(`Are you sure you want to delete "${event.name}"? This action cannot be undone.`)) return;

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
		if (!objectsEqual(event, editedEvent) && !confirm("Are you sure you want to discard your changes?")) return;

		setEditing(false);
		setEditedEvent(event);
	}

	const [saveDisabled, setSaveDisabled] = useState(true);
	useEffect(() => {
		setSaveDisabled(objectsEqual(event, editedEvent));
	}, [editedEvent]);

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveEvent() {
		if (loadingSave) return;

		const tempEvent = {
			...editedEvent,
			type: editedEvent.type.id
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
			<td>{formatDateString(event.date)}</td>
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
			<td>{editedEvent.type.name}</td>
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
			<td>{formatDateString(editedEvent.date)}</td>
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
							<button className="save-icon" onClick={() => saveEvent()} disabled={saveDisabled}>
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
