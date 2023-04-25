import { useEffect, useState } from "react";

import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import ChildrensEventTypeRow from "../components/ChildrensEventTypeRow";
import { supabase } from "../supabaseClient";
import { childrensEventTypeType } from "../types/eventTypes";

function ChildrensEventTypes() {
	const [types, setTypes] = useState<childrensEventTypeType[]>();
	useEffect(() => {
		async function fetchTypes() {
			const { data: types, error } = await supabase.from("childrenEventTypes").select("*");
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
		<div className="table-layout">
			<h1>Childrens Event Types</h1>
			<table>
				<thead>
					<tr>
						<th>Event Type Name</th>
						<th>Event Type ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{types ? (
						types
							.sort((typeA, typeB) => typeA.id - typeB.id)
							.map(type => (
								<ChildrensEventTypeRow
									key={type.id}
									eventType={type}
									removeEventType={() => setTypes(types?.filter(t => t.id != type.id))}
									updateEventType={updatedEventType => {
										setTypes(types?.map(t => (t.id == type.id ? updatedEventType : t)));
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

export default ChildrensEventTypes;
