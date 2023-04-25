import { FileDownload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

function ExportCSVButton({ data }) {
	const [workingData, setWorkingData] = useState<any[]>([]);
	const [eventType, setEventType] = useState<"childrens" | "community">("childrens");

	useEffect(() => {
		if (Array.isArray(data) && data.length > 0) {
			if ("presenter" in data[0]) setEventType("community");

			// Make sure to keep header row (when i == 0)
			// Replace nested objects with their name field
			setWorkingData(
				data.map((event: Object, i: number) =>
					i
						? Object.entries(event).map(([key, value]) => {
								if (typeof event[key] === "object" && event[key] !== null) {
									return event[key].name;
								}
								return event[key];
						  })
						: Object.keys(event)
				)
			);
		}
	}, [data]);

	return (
		<CSVLink
			data={workingData || ""}
			filename={`${eventType}-events-${new Date().toISOString().replace(/T.*/, "")}.csv`}
		>
			<button className="export" disabled={!data}>
				<FileDownload />
				Export CSV
			</button>
		</CSVLink>
	);
}

export default ExportCSVButton;
