import DataTable from "../components/DataTable";
import { dataField, dataTable, dataTableLink } from "../types/dataTableTypes";

function CommunityEvents() {
	const table: dataTable = "communityEvents";
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
			header: "Presenter",
			name: "presenter",
			editable: true
		},
		{
			header: "Location",
			name: "location",
			editable: true
		},
		{
			header: "Virtual",
			name: "virtual",
			editable: true
		},
		{
			header: "Date",
			name: "date",
			isDate: true
		},
		{
			header: "Hours",
			name: "hours",
			editable: true
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
			header: "Food Lbs.",
			name: "foodPounds",
			editable: true
		},
		{
			header: "Food Desc.",
			name: "foodDescription",
			editable: true
		},
		{
			header: "Description",
			name: "description",
			editable: true
		}
	];

	const links: dataTableLink[] = [
		{
			to: "/community-event-types",
			text: "Types"
		}
	];

	return (
		<DataTable
			fields={fields}
			table={table}
			tableSelection="*, type (id, name)"
			dataName="community event"
			title="Community Events"
			links={links}
			showExport
			sortBy="date"
		/>
	);
}

export default CommunityEvents;
