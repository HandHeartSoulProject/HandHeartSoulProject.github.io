import { Check, Close, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import { supabase } from "../supabaseClient";
import { childrenEventType } from "../types/eventTypes";
import AdaptiveWidthNumericInput from "./AdaptiveWidthNumericInput";
import { snackbarType } from "./CustomSnackbar";
import { formatDateString, objectsEqual } from "../util";
import ActionButtons from "./ActionButtons";

function ChildrensEventRow({
	event,
	removeEvent,
	updateEvent,
	setSnackBar
}: {
	event: childrenEventType;
	removeEvent: () => void;
	updateEvent: (event: childrenEventType) => void;
	setSnackBar: React.Dispatch<React.SetStateAction<snackbarType>>;
}) {
	/** Stores an array of IDs representing the events awaiting deletion */
	const [loadingDelete, setLoadingDelete] = useState(false);
	async function deleteEvent() {
		if (loadingDelete) return;

		if (!confirm(`Are you sure you want to delete "${event.name}"? This action cannot be undone.`)) return;

		setLoadingDelete(true);
		const { error } = await supabase.from("childrenEvents").delete().eq("id", event.id);

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
	const [editedEvent, setEditedEvent] = useState<childrenEventType>(event);
	function detectClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
		e.stopPropagation();
		if (e.detail != 2 || editing) return;
		setEditing(true);
	}
	function stopEditing() {
		console.log(event, editedEvent, objectsEqual(event, editedEvent));

		if (!objectsEqual(event, editedEvent) && !confirm("Are you sure you want to discard your changes?")) return;

		setEditing(false);
		setEditedEvent(event);
	}

	const [saveDisabled, setSaveDisabled] = useState(true);
	useEffect(() => {
		setSaveDisabled(objectsEqual(event, editedEvent));
	}, [event, editedEvent]);

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveEvent() {
		if (loadingSave) return;

		setLoadingSave(true);
		const { data, error } = await supabase
			.from("childrenEvents")
			.update(editedEvent)
			.eq("id", event.id)
			.select("*");
		if (error || !data || data.length == 0) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to save event changes" });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: "Event changes saved" });
			setEditing(false);
			updateEvent(data[0] as childrenEventType);
		}
		setLoadingSave(false);
	}

	return !editing ? (
		<tr key={event.id} onClick={detectClick}>
			<td>{event.name}</td>
			<td>{event.numAdults}</td>
			<td>{event.numChildren}</td>
			<td>{formatDateString(event.date)}</td>
			<td>{event.startTime}</td>
			<td>{event.endTime}</td>
			<td>{event.description}</td>
			<td>
				<ActionButtons
					editing={editing}
					loadingSave={loadingSave}
					loadingDelete={loadingDelete}
					saveDisabled={saveDisabled}
					stopEditing={stopEditing}
					saveData={saveEvent}
					deleteData={deleteEvent}
				/>
			</td>
		</tr>
	) : (
		<tr key={event.id}>
			<td>
				<textarea
					value={editedEvent.name}
					onChange={e => setEditedEvent({ ...editedEvent, name: e.target.value })}
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
					value={editedEvent.numChildren}
					onChange={value => setEditedEvent({ ...editedEvent, numChildren: value })}
				/>
			</td>
			<td>{formatDateString(editedEvent.date)}</td>
			<td>{editedEvent.startTime}</td>
			<td>{editedEvent.endTime}</td>
			<td>
				<textarea
					value={editedEvent.description || ""}
					onChange={e => setEditedEvent({ ...editedEvent, description: e.target.value })}
				/>
			</td>
			<td>
				<ActionButtons
					editing={editing}
					loadingSave={loadingSave}
					loadingDelete={loadingDelete}
					saveDisabled={saveDisabled}
					stopEditing={stopEditing}
					saveData={saveEvent}
					deleteData={deleteEvent}
				/>
			</td>
		</tr>
	);
}

export default ChildrensEventRow;
