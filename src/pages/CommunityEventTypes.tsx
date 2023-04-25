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

	return <DataTable fields={fields} table={table} dataName="event type" title="Community Event Types" />;
}

export default CommunityEventTypes;
