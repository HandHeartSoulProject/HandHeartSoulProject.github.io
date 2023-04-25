import DataTable from "../components/DataTable";
import { dataField, dataTable, dataTableLink } from "../types/dataTableTypes";

function ChildrensEvents() {
	const table: dataTable = "childrenEvents";
	const fields: dataField<typeof table>[] = [
		{
			header: "Name",
			name: "name",
			editable: true
		},
		{
			header: "Type",
			name: "type",
			nestedField: "name"
		},
		{
			header: "Site",
			name: "site",
			nestedField: "name"
		},
		{
			header: "# Adults",
			name: "numAdults",
			editable: true
		},
		{
			header: "# Children",
			name: "numChildren",
			editable: true
		},
		{
			header: "Date",
			name: "date",
			isDate: true
		},
		{
			header: "Start Time",
			name: "startTime"
		},
		{
			header: "End Time",
			name: "endTime"
		},
		{
			header: "Description",
			name: "description",
			editable: true
		}
	];

	const links: dataTableLink[] = [
		{
			to: "/childrens-event-types",
			text: "Types"
		},
		{
			to: "/childrens-event-sites",
			text: "Sites"
		}
	];

	return (
		<DataTable
			fields={fields}
			table={table}
			tableSelection="*, type(id, name), site(id, name)"
			dataName="children's event"
			deleteConfirmMessageField="name"
			title="Children's Events"
			links={links}
			showExport
		/>
	);
}

export default ChildrensEvents;
