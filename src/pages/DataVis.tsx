import { useState, useEffect } from "react";
import {
	dropDownEventTypes,
	eventType,
	visFields,
	dropDownEventTypes2,
	dropDownEventTypes3
} from "../types/eventTypes";
import { Database } from "../types/supabase";

function DataVis() {
	const [eventField, setEventField] = useState<eventType>("childrenEvent"); // Stores the eventType
	const [dataField, setDataField] = useState<visFields>("numAdults"); // update initial value and type
	const [timePeriod, setTimePeriod] = useState("time");
	const [currentEventType, setCurrentEventType] = useState<eventType>(); // add new state variable

	// type communityFields = Database["public"]["Tables"]["communityEvents"]["Row"];
	type childrensFields = Database["public"]["Tables"]["childrenEvents"]["Row"];

	const dropDownOptions = { communityEvent: dropDownEventTypes3, childrenEvent: dropDownEventTypes2 };
	return (
		<div>
			<h1>Data Visualization Tab</h1>

			<select
				onChange={e => {
					e.preventDefault();
					setEventField(e.target.value as eventType);
				}}
			>
				{dropDownEventTypes.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>

			<select
				onChange={e => {
					setDataField(e.target.value as visFields);
				}}
			>
				{dropDownOptions[eventField].map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>

			<h1>{eventField}</h1>
			<h1>{dataField}</h1>
		</div>
	);
}

export default DataVis;
