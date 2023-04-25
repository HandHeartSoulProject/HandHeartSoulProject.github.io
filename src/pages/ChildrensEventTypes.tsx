import DataTable from "../components/DataTable";
import { dataField, dataTable } from "../types/dataTableTypes";

function ChildrensEventTypes() {
	const table: dataTable = "childrenEventTypes";
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

	return <DataTable fields={fields} table={table} dataName="event type" title="Children's Event Types" />;
}

export default ChildrensEventTypes;
