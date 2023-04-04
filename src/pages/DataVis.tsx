import { useState, useEffect } from "react";
import {
	dropDownEventTypes,
	eventType,
	visFields,
	dropDownEventTypes2,
	dropDownEventTypes3
} from "../types/eventTypes";
import { Database } from "../types/supabase";
import { supabase } from "../supabaseClient";

function DataVis() {
	const [eventField, setEventField] = useState<eventType>("childrenEvent"); // Stores the eventType
	const [dataField, setDataField] = useState<visFields>("numAdults"); // update initial value and type
	const [timePeriod, setTimePeriod] = useState("time");
	const [currentEventType, setCurrentEventType] = useState<eventType>(); // add new state variable

	const dropDownOptions = { communityEvent: dropDownEventTypes3, childrenEvent: dropDownEventTypes2 };

	// Data for communityEvents and ChildrenEvents
	type communityFields = Database["public"]["Tables"]["communityEvents"]["Row"] & {
		type: { name: Database["public"]["Tables"]["eventTypes"]["Row"]["name"] };
	};
	type childrensFields = Database["public"]["Tables"]["childrenEvents"]["Row"];

	// Code dealing with data loading from database
	const [childrenData, setChildrenData] = useState<childrensFields[]>();
	const [communityData, setCommunityData] = useState<communityFields[]>();

	async function fetchEventData() {
		var { data: childrenEvents, error } = await supabase.from("childrenEvents").select("*"); // Change this to account for eventType
		var { data: communityEvents, error } = await supabase.from("communityEvents").select("*, type (name)");
		if (error || !childrenEvents || !communityEvents) console.error(error);
		else {
			setChildrenData(childrenEvents as childrensFields[]);
			setCommunityData(communityEvents as communityFields[]);
		}
	}

	useEffect(() => {
		fetchEventData();
		console.log("get");
	}, []);
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

			{childrenData ? (
				<table>
					<thead>
						<tr>
							<th># of Adults</th>
							<th># of Children</th>
						</tr>
					</thead>
					<tbody>
						{childrenData.map(event => {
							const date = new Date(event.date);
							// Adjust the date to account for the timezone offset
							// When JS reads in a date in ISO format, it automatically applies the local timezone offset
							// In the case of EST, this makes the date 5 hours behind, casuing the previous day to be shown
							return (
								<tr key={event.id}>
									<td>{event.numAdults}</td>
									<td>{event.numChildren}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>Loading...</div>
			)}

			{communityData ? (
				<table>
					<thead>
						<tr>
							<th># of Children Served</th>
							<th># of Adults Served</th>
							<th>Pounds of Food</th>
						</tr>
					</thead>
					<tbody>
						{communityData.map(event => {
							return (
								<tr key={event.id}>
									<td>{event.numChildren}</td>
									<td>{event.numAdults}</td>
									<td>{event.foodPounds}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}

export default DataVis;
