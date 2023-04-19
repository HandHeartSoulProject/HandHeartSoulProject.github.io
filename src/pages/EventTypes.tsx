import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import { communityEventType } from "../types/eventTypes";

function EventTypes() {
	const [types, setTypes] = useState<communityEventType["type"][]>();
	useEffect(() => {
		async function fetchTypes() {
			const { data: types, error } = await supabase.from("eventTypes").select("*");
			if (error) console.error(error);
			else {
				// setTypes(types);
				console.log(types);
			}
		}

		fetchTypes();
	}, []);

	return (
		<div>
			<h1>Community Event Types</h1>
			<table>
				<thead>
					<tr>
						<th>Event Type</th>
						<th>Event ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}

export default EventTypes;
