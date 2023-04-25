import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import { childrensEventSiteType } from "../types/eventTypes";
import { objectsEqual } from "../util";
import ActionButtons from "./ActionButtons";
import { snackbarType } from "./CustomSnackbar";

function ChildrensEventSiteRow({
	eventSite,
	removeEventSite,
	updateEventSite,
	setSnackBar
}: {
	eventSite: childrensEventSiteType;
	removeEventSite: () => void;
	updateEventSite: (eventSite: childrensEventSiteType) => void;
	setSnackBar: React.Dispatch<React.SetStateAction<snackbarType>>;
}) {
	const [loadingDelete, setLoadingDelete] = useState(false);
	async function deleteEventSite() {
		if (loadingDelete) return;

		if (
			!confirm(
				`Are you sure you want to delete "${eventSite.name}"? This CANNOT be undone and will cause errors with any associated events.`
			)
		) {
			return;
		}

		setLoadingDelete(true);
		const { error } = await supabase.from("childrenEventSites").delete().eq("id", eventSite.id);
		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to delete event site" });
		} else {
			removeEventSite();
			setSnackBar({ toggle: true, severity: "success", message: "Event site deleted" });
		}
		setLoadingDelete(false);
	}

	const [editing, setEditing] = useState(false);
	const [editedEventSite, setEditedEventSite] = useState(eventSite);
	function detectClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
		e.stopPropagation();
		if (e.detail != 2 || editing) return;
		setEditing(true);
	}
	function stopEditing() {
		if (!objectsEqual(eventSite, editedEventSite) && !confirm("Are you sure you want to discard your changes?")) {
			return;
		}

		setEditing(false);
		setEditedEventSite(eventSite);
	}

	const [saveDisabled, setSaveDisabled] = useState(true);
	useEffect(() => {
		setSaveDisabled(objectsEqual(eventSite, editedEventSite));
	}, [eventSite, editedEventSite]);

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveEventSite() {
		if (loadingSave) return;

		setLoadingSave(true);
		const { data, error } = await supabase
			.from("childrenEventSites")
			.update({ name: editedEventSite.name })
			.eq("id", eventSite.id)
			.select("*");
		if (error || !data || data.length == 0) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to save event site changes" });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: "Event site changes saved" });
			updateEventSite(data[0] as childrensEventSiteType);
			setEditing(false);
		}
		setLoadingSave(false);
	}

	return (
		<tr key={eventSite.id} onClick={detectClick}>
			<td>
				{!editing ? (
					eventSite.name
				) : (
					<textarea
						value={editedEventSite.name}
						onChange={e => setEditedEventSite({ ...editedEventSite, name: e.target.value })}
					/>
				)}
			</td>
			<td>{eventSite.id}</td>
			<td>
				<ActionButtons
					editing={editing}
					loadingSave={loadingSave}
					loadingDelete={loadingDelete}
					saveDisabled={saveDisabled}
					stopEditing={stopEditing}
					saveData={saveEventSite}
					deleteData={deleteEventSite}
				/>
			</td>
		</tr>
	);
}

export default ChildrensEventSiteRow;
