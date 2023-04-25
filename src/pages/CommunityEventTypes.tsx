import DataTable from "../components/DataTable";
import { dataField, dataTable } from "../types/dataTableTypes";

function CommunityEventTypes() {
	const table: dataTable = "communityEventTypes";
	const fields: dataField<typeof table>[] = [
		{
			header: "Event Type Name",
			name: "name",
			editable: true
		},
		{
			header: "ID",
			name: "id"
		}
	];

	return (
		<div className="table-layout">
			<h1>Community Event Types</h1>
			<DataTable fields={fields} table={table} dataName="event type" deleteConfirmMessageField="name" />
		</div>
	);
}

export default CommunityEventTypes;
