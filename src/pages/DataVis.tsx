import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import {
	childrensFields,
	communityFields,
	dropDownEventTypes,
	eventType,
	eventTypeOptions,
	visField
} from "../types/eventTypes";

function DataVis() {
	const [currEventType, setCurrEventType] = useState<eventType>("childrenEvent");
	const [dataField, setDataField] = useState<visField>("numAdults");
	// const [timePeriod, setTimePeriod] = useState();
	// const [currentEventType, setCurrentEventType] = useState<eventType>(); // add new state variable

	const [childrenData, setChildrenData] = useState<childrensFields[]>();
	const [communityData, setCommunityData] = useState<communityFields[]>();

	useEffect(() => {
		async function fetchEventData() {
			let { data: childrenEvents, error: childrenError } = await supabase.from("childrenEvents").select("*"); // Change this to account for eventType
			if (childrenError || !childrenEvents) {
				console.error(childrenError);
			} else {
				setChildrenData(childrenEvents);
			}

			let { data: communityEvents, error: communityError } = await supabase
				.from("communityEvents")
				.select("*, type (name)");

			if (communityError || !communityEvents) {
				console.error(communityError);
			} else {
				setCommunityData(communityEvents);
			}
		}

		fetchEventData();
	}, []);

	return (
		<div>
			<h1>Data Visualization Tab</h1>

			<select
				onChange={e => {
					e.preventDefault();
					setCurrEventType(e.target.value as eventType);
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
					setDataField(e.target.value as visField);
				}}
			>
				{eventTypeOptions[currEventType].map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>

			<h1>{currEventType}</h1>
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
