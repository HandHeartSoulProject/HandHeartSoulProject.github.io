import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryLegend } from "victory";

import CustomSnackbar, { snackbarType } from "../components/CustomSnackbar";
import { customVictoryTheme } from "../styles/ChartStyles";
import "../styles/DataVis.scss";
import { supabase } from "../supabaseClient";
import {
	childrensVisData,
	communityVisData,
	dropDownEventTypes,
	eventType,
	eventTypeOptions,
	visField
} from "../types/eventTypes";
import { getMonthName } from "../util";
import { ClipLoader } from "react-spinners";

const startYear = 2022;
const yearList = [...Array(new Date().getFullYear() - startYear + 1).keys()].map(x => x + startYear);

function DataVis() {
	const [currEventType, setCurrEventType] = useState<eventType>("communityEvent");
	const [dataField, setDataField] = useState<visField>("totaladults");
	const [year, setYear] = useState(yearList[yearList.length - 1]);

	const [communityData, setCommunityData] = useState<communityVisData>();
	const [childrenData, setChildrenData] = useState<childrensVisData>();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchEventData() {
			setLoading(true);
			if (currEventType === "communityEvent") {
				const { data: communityData, error: communityError } = await supabase.rpc(
					"aggregate_community_events_ytd",
					{ year }
				);
				console.log(communityData);
				if (communityError || !communityData) {
					console.error(communityError);
					setSnackBar({ toggle: true, severity: "error", message: "Failed to fetch community events data" });
				} else {
					setCommunityData(communityData.map(data => ({ ...data, month: getMonthName(data.month) })));
				}
			} else {
				const { data: childrenData, error: childrenError } = await supabase.rpc(
					"aggregate_children_events_ytd",
					{
						year
					}
				);
				console.log(childrenData);
				if (childrenError || !childrenData) {
					console.error(childrenError);
					setSnackBar({ toggle: true, severity: "error", message: "Failed to fetch children events data" });
				} else {
					setChildrenData(childrenData.map(data => ({ ...data, month: getMonthName(data.month) })));
				}
			}
			setLoading(false);
		}

		fetchEventData();
	}, [year, currEventType]);

	const currData = currEventType === "communityEvent" ? communityData : childrenData;

	const [snackbar, setSnackBar] = useState<snackbarType>({
		toggle: false,
		severity: "error",
		message: ""
	});

	return (
		<div className="data-vis">
			<h1>Data Visualization</h1>

			<div className="options">
				<select
					onChange={e => {
						e.preventDefault();
						setYear(parseInt(e.target.value));
					}}
					value={year}
				>
					{yearList.map(year => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
				<select
					onChange={e => {
						e.preventDefault();
						const newType = e.target.value as eventType;
						if (newType === "childrenEvent" && dataField === "totalfoodpounds") {
							setDataField("totalchildren");
						}
						setCurrEventType(e.target.value as eventType);
					}}
					value={currEventType}
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
					value={dataField}
				>
					{Object.entries(eventTypeOptions[currEventType]).map(([value, label]) => (
						<option key={value} value={value}>
							{label}
						</option>
					))}
				</select>
			</div>

			<div className="chart-wrapper">
				{!loading ? (
					currData?.length ? (
						<VictoryChart theme={customVictoryTheme}>
							<VictoryLegend
								title={`${eventTypeOptions[currEventType][dataField]} in ${dropDownEventTypes[currEventType]}s`}
							/>
							<VictoryBar data={currData} x="month" y={dataField} cornerRadius={2.5} />
						</VictoryChart>
					) : (
						<div className="no-data">No data exists for the given parameters</div>
					)
				) : (
					<div className="loading">
						<ClipLoader color="var(--text)" />
					</div>
				)}
			</div>

			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackBar} />
		</div>
	);
}

export default DataVis;
