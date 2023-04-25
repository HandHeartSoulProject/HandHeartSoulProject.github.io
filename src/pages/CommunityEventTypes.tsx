import DataTable from "../components/DataTable";
import { dataField } from "../types/dataTableTypes";

function CommunityEventTypes() {
	const fields: dataField[] = [
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

			<DataTable
				fields={fields}
				table="communityEventTypes"
				dataName="event type"
				deleteConfirmMessageField="name"
			/>
		</div>
	);
}

export default CommunityEventTypes;
