import DataTable from "../components/DataTable";
import { dataField, dataTable } from "../types/dataTableTypes";

function ChildrensEventSites() {
	const table: dataTable = "childrenEventSites";
	const fields: dataField<typeof table>[] = [
		{
			header: "Event Site Name",
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
			<h1>Children's Event Sites</h1>
			<DataTable fields={fields} table={table} dataName="event site" deleteConfirmMessageField="name" />
		</div>
	);
}

export default ChildrensEventSites;
