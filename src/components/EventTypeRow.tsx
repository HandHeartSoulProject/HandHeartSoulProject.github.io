import { useState } from "react";

import { supabase } from "../supabaseClient";
import { ClipLoader } from "react-spinners";
import { Check, Close, Delete } from "@mui/icons-material";
import { communityEventTypeType } from "../types/eventTypes";
import { snackbarType } from "./CustomSnackbar";
import { objectsEqual } from "../util";

function EventTypeRow({
	eventType,
	removeEventType,
	updateEventType,
	setSnackBar
}: {
	eventType: communityEventTypeType;
	removeEventType: () => void;
	updateEventType: (eventType: communityEventTypeType) => void;
	setSnackBar: React.Dispatch<React.SetStateAction<snackbarType>>;
}) {
	const [loadingDelete, setLoadingDelete] = useState(false);
	async function deleteEventType() {
		if (loadingDelete) return;

		if (
			!confirm(
				`Are you sure you want to delete "${eventType.name}"? This CANNOT be undone and will cause errors with any associated events.`
			)
		) {
			return;
		}

		setLoadingDelete(true);
		const { error } = await supabase.from("eventTypes").delete().eq("id", eventType.id);
		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to delete event type" });
		} else {
			removeEventType();
			setSnackBar({ toggle: true, severity: "success", message: "Event type deleted" });
		}
		setLoadingDelete(false);
	}

	function detectClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
		e.stopPropagation();
		if (e.detail != 2 || editing) return;
		setEditing(true);
	}
	function stopEditing() {
		if (!objectsEqual(eventType, editedEventType) && !confirm("Are you sure you want to discard your changes?")) {
			return;
		}

		setEditing(false);
		setEditedEventType(eventType);
	}

	const [editing, setEditing] = useState(false);
	const [editedEventType, setEditedEventType] = useState(eventType);
	const [loadingSave, setLoadingSave] = useState(false);
	async function saveEventType() {
		if (loadingSave) return;

		setLoadingSave(true);
		const { data, error } = await supabase
			.from("eventTypes")
			.update({ name: editedEventType.name })
			.eq("id", eventType.id)
			.select("*");
		if (error || !data || data.length == 0) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to save event type changes" });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: "Event type changes saved" });
			updateEventType(data[0] as communityEventTypeType);
			setEditing(false);
		}
		setLoadingSave(false);
	}

	return !editing ? (
		<tr key={eventType.id} onClick={detectClick}>
			<td>{eventType.name}</td>
			<td>{eventType.id}</td>
			<td>
				<div className="action-cell">
					{!loadingDelete ? (
						<button className="delete-icon" onClick={() => deleteEventType()}>
							<Delete />
						</button>
					) : (
						<ClipLoader size={20} color="var(--warning)" />
					)}
				</div>
			</td>
		</tr>
	) : (
		<tr key={eventType.id}>
			<td>
				<textarea
					value={editedEventType.name}
					onChange={e => setEditedEventType({ ...editedEventType, name: e.target.value })}
				/>
			</td>
			<td>{eventType.id}</td>
			<td>
				<div className="action-cell">
					{!loadingSave ? (
						<>
							<button className="delete-icon" onClick={() => stopEditing()}>
								<Close />
							</button>
							<button className="save-icon" onClick={() => saveEventType()}>
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

export default EventTypeRow;
