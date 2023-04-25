import DataTable from "../components/DataTable";
import { dataField } from "../types/dataTableTypes";

function ChildrensEventTypes() {
	const fields: dataField[] = [
		{
			header: "Event Type Name",
			name: "name"
		},
		{
			header: "ID",
			name: "id",
			editDisabled: true
		}
	];

	return (
		<div className="table-layout">
			<h1>Childrens Event Types</h1>
			<DataTable
				fields={fields}
				table="childrenEventTypes"
				dataName="event type"
				deleteConfirmMessageField="name"
			/>
		</div>
	);
}

export default ChildrensEventTypes;
