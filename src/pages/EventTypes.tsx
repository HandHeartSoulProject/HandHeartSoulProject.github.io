import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import { communityEventType, communityEventTypeType } from "../types/eventTypes";
import { Delete } from "@mui/icons-material";
import { ClipLoader } from "react-spinners";
import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import EventTypeRow from "../components/EventTypeRow";

function EventTypes() {
	const [types, setTypes] = useState<communityEventTypeType[]>();
	useEffect(() => {
		async function fetchTypes() {
			const { data: types, error } = await supabase.from("eventTypes").select("*");
			if (error) {
				console.error(error);
				setSnackBar({ toggle: true, severity: "error", message: "Failed to fetch event types" });
			} else setTypes(types);
		}

		fetchTypes();
	}, []);

	const [snackbar, setSnackBar] = useState<snackbarType>({
		toggle: false,
		severity: "error",
		message: ""
	});

	return (
		<div>
			<h1>Community Event Types</h1>
			<table>
				<thead>
					<tr>
						<th>Event Type Name</th>
						<th>Event Type ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{types?.map(type => (
						<EventTypeRow
							key={type.id}
							eventType={type}
							removeEventType={() => setTypes(types?.filter(t => t.id != type.id))}
							updateEventType={updatedEventType => {
								setTypes(types?.map(t => (t.id == type.id ? updatedEventType : t)));
							}}
							setSnackBar={setSnackBar}
						/>
					))}
				</tbody>
			</table>

			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackBar} />
		</div>
	);
}

export default EventTypes;
