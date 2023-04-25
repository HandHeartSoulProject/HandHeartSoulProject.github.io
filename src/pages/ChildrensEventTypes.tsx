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

	return (
		<div className="table-layout">
			<h1>Children's Event Types</h1>
			<DataTable fields={fields} table={table} dataName="event type" deleteConfirmMessageField="name" />
		</div>
	);
}

export default ChildrensEventTypes;
