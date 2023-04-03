// import { useState } from "react";
// import { dropDownEventTypes, eventType } from "../types/eventTypes";
// import { Database } from "../types/supabase";

// function DataVis() {
// 	const [eventField, setEventField] = useState<eventType>();
// 	const [dataField, setDataField] = useState("test field 2");
// 	const [timePeriod, setTimePeriod] = useState("time");

// 	type communityFields = Database["public"]["Tables"]["communityEvents"]["Row"];
// 	type childrensFields = Database["public"]["Tables"]["childrenEvents"]["Row"];
// 	type selectedDataFields = {
// 		communityEvent: Pick<communityFields, "numAdults" | "numChildren" | "foodPounds">;
// 		childrenEvent: Pick<childrensFields, "numAdults" | "numChildren">;
// 	};

// 	const dataDownRoles: { value: string; label: string }[] = [
// 		{ value: "numAdults", label: "Number of Adults" },
// 		{ value: "numChildren", label: "Number of Children" },
// 	];

// 	return (
// 		<div>
// 			<h1>Data Visualization Tab</h1>

// 			<select onChange={e => setEventField(e.target.value as eventType)}>
// 				{dropDownEventTypes.map(({ value, label }) => (
// 					<option value={value}>{label}</option>
// 				))}
// 			</select>

// 			<select onChange={e => setDataField(e.target.value as selectedDataFields[eventType])}>
// 				{dataDownRoles.map(({ value, label }) => (
// 					<option value={value}>{label}</option>
// 				))}
// 			</select>
// 		</div>
// 	);
// }
// export default DataVis;

import { useState } from "react";
import { dropDownEventTypes, eventType } from "../types/eventTypes";
import { Database } from "../types/supabase";

function DataVis() {
	const [eventField, setEventField] = useState<eventType>();
	const [dataField, setDataField] = useState("numAdults"); // update initial value and type
	const [timePeriod, setTimePeriod] = useState("time");
	const [currentEventType, setCurrentEventType] = useState<eventType>(); // add new state variable

	type communityFields = Database["public"]["Tables"]["communityEvents"]["Row"];
	type childrensFields = Database["public"]["Tables"]["childrenEvents"]["Row"];

	return (
		<div>
			<h1>Data Visualization Tab</h1>

			<select
				onChange={e => {
					setEventField(e.target.value as eventType);
					setCurrentEventType(e.target.value as eventType);
				}}
			>
				{dropDownEventTypes.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option> // add 'key' prop
				))}
			</select>

			<select
				onChange={e => {
					setEventField(e.target.value as eventType);
					setCurrentEventType(e.target.value as eventType);
				}}
			>
				{dropDownEventTypes.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option> // add 'key' prop
				))}
			</select>
		</div>
	);
}

export default DataVis;
