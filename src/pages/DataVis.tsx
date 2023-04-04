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
import "../styles/DataVis.scss";

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

	const data: Record<eventType, { month: string; numAdults: number; numChildren: number; foodPounds?: number }[]> = {
		communityEvent: [
			{ month: "Jan", numAdults: 43, numChildren: 60, foodPounds: 204 },
			{ month: "Feb", numAdults: 32, numChildren: 70, foodPounds: 150 },
			{ month: "Mar", numAdults: 60, numChildren: 40, foodPounds: 110 },
			{ month: "Apr", numAdults: 6, numChildren: 8, foodPounds: 23 }
		],
		childrenEvent: [
			{ month: "Jan", numAdults: 78, numChildren: 80 },
			{ month: "Feb", numAdults: 122, numChildren: 72 },
			{ month: "Mar", numAdults: 111, numChildren: 133 },
			{ month: "Apr", numAdults: 8, numChildren: 11 }
		]
	};

	return (
		<div className="data-vis">
			<h1>Data Visualization</h1>

			<div className="options">
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
			</div>

			<div className="chart-wrapper">
				<VictoryChart theme={customVictoryTheme}>
					<VictoryLegend
						title={`${eventTypeOptions[currEventType][dataField]} in ${dropDownEventTypes[currEventType]}s`}
					/>
					<VictoryBar data={data[currEventType]} x="month" y={dataField} cornerRadius={2.5} />
				</VictoryChart>
			</div>
		</div>
	);
}

export default DataVis;
