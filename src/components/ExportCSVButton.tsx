import { FileDownload } from "@mui/icons-material";
import { CSVLink } from "react-csv";

function ExportCSVButton({ data }) {
	return (
		<CSVLink data={data || ""} filename={`childrens-events-${new Date().toISOString().replace(/T.*/, "")}.csv`}>
			<button className="export" disabled={!data}>
				<FileDownload />
				Export CSV
			</button>
		</CSVLink>
	);
}

export default ExportCSVButton;
