import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import { communityEventTypeType } from "../types/eventTypes";
import { objectsEqual } from "../util";
import ActionButtons from "./ActionButtons";
import { snackbarType } from "./CustomSnackbar";

function CommunityEventTypeRow({
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
		const { error } = await supabase.from("communityEventTypes").delete().eq("id", eventType.id);
		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to delete event type" });
		} else {
			removeEventType();
			setSnackBar({ toggle: true, severity: "success", message: "Event type deleted" });
		}
		setLoadingDelete(false);
	}

	const [editing, setEditing] = useState(false);
	const [editedEventType, setEditedEventType] = useState(eventType);
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

	const [saveDisabled, setSaveDisabled] = useState(true);
	useEffect(() => {
		setSaveDisabled(objectsEqual(eventType, editedEventType));
	}, [eventType, editedEventType]);

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveEventType() {
		if (loadingSave) return;

		setLoadingSave(true);
		const { data, error } = await supabase
			.from("communityEventTypes")
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

	return (
		<tr key={eventType.id} onClick={detectClick}>
			<td>
				{!editing ? (
					eventType.name
				) : (
					<textarea
						value={editedEventType.name}
						onChange={e => setEditedEventType({ ...editedEventType, name: e.target.value })}
					/>
				)}
			</td>
			<td>{eventType.id}</td>
			<td>
				<ActionButtons
					editing={editing}
					loadingSave={loadingSave}
					loadingDelete={loadingDelete}
					saveDisabled={saveDisabled}
					stopEditing={stopEditing}
					saveData={saveEventType}
					deleteData={deleteEventType}
				/>
			</td>
		</tr>
	);
}

export default CommunityEventTypeRow;
