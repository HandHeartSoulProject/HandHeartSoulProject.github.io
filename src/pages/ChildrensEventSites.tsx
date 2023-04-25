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

	return <DataTable fields={fields} table={table} dataName="event site" title="Children's Event Sites" />;
}

export default ChildrensEventSites;
