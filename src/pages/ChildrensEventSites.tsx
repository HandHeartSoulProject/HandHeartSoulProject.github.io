import { useEffect, useState } from "react";

import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import ChildrensEventSiteRow from "../components/ChildrensEventSiteRow";
import { supabase } from "../supabaseClient";
import { childrensEventSiteType } from "../types/eventTypes";

function ChildrensEventSites() {
	const [sites, setSites] = useState<childrensEventSiteType[]>();
	useEffect(() => {
		async function fetchSites() {
			const { data: sites, error } = await supabase.from("childrenEventSites").select("*");
			if (error) {
				console.error(error);
				setSnackBar({ toggle: true, severity: "error", message: "Failed to fetch event sites" });
			} else setSites(sites);
		}

		fetchSites();
	}, []);

	const [snackbar, setSnackBar] = useState<snackbarType>({
		toggle: false,
		severity: "error",
		message: ""
	});

	return (
		<div className="table-layout">
			<h1>Childrens Event Sites</h1>
			<table>
				<thead>
					<tr>
						<th>Event Site Name</th>
						<th>Event Site ID</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{sites ? (
						sites
							.sort((siteA, siteB) => siteA.id - siteB.id)
							.map(site => (
								<ChildrensEventSiteRow
									key={site.id}
									eventSite={site}
									removeEventSite={() => setSites(sites?.filter(s => s.id != site.id))}
									updateEventSite={updatedEventSite => {
										setSites(sites?.map(s => (s.id == site.id ? updatedEventSite : s)));
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

export default ChildrensEventSites;
