import DataTable from "../components/DataTable";
import { dataField } from "../types/dataTableTypes";

function ChildrensEventSites() {
	const fields: dataField[] = [
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

			<DataTable
				fields={fields}
				table="childrenEventSites"
				dataName="event site"
				deleteConfirmMessageField="name"
			/>
		</div>
	);
}

export default ChildrensEventSites;
