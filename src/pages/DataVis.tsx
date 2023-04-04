import { useEffect, useState } from "react";

import { VictoryBar, VictoryChart, VictoryLegend, VictoryTheme } from "victory";
import { supabase } from "../supabaseClient";
import {
	childrensFields,
	communityFields,
	dropDownEventTypes,
	eventType,
	eventTypeOptions,
	visField
} from "../types/eventTypes";
import { customVictoryTheme } from "../styles/ChartStyles";

function DataVis() {
	const [currEventType, setCurrEventType] = useState<eventType>("communityEvent");
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
				console.log("Children's Events: ", childrenEvents);
			}

			let { data: communityEvents, error: communityError } = await supabase
				.from("communityEvents")
				.select("*, type (name)");

			if (communityError || !communityEvents) {
				console.error(communityError);
			} else {
				setCommunityData(communityEvents);
				console.log("Community Events: ", communityEvents);
			}
		}

		// fetchEventData();
	}, []);

	const data = [
		{ month: "Jan", numAdults: 13 },
		{ month: "Feb", numAdults: 15 },
		{ month: "Mar", numAdults: 18 },
		{ month: "Apr", numAdults: 20 }
	];

	return (
		<div>
			<h1>Data Visualization</h1>

			<select
				onChange={e => {
					e.preventDefault();
					setCurrEventType(e.target.value as eventType);
				}}
			>
				{Object.entries(dropDownEventTypes).map(([value, label]) => (
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
				{Object.entries(eventTypeOptions[currEventType]).map(([value, label]) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>

			<VictoryChart theme={customVictoryTheme}>
				<VictoryLegend title={dropDownEventTypes[currEventType]} />
				<VictoryBar data={data} x="month" y="numAdults" cornerRadius={2.5} />
			</VictoryChart>
		</div>
	);
}

export default DataVis;
