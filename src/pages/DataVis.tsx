import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRole, dropDownRoles, hhsDomain } from "../types/userTypes";
function DataVis() {
    const [dataField, setDataField] = useState('test field');
    const [timePeriod, setTimePeriod] = useState('time');
	return (
        <div>
            <h1>Data Visualization Tab</h1>

            <select onChange={e => setDataField(e.target.value as userRole)}>
					{dropDownRoles.map(({ value, label }) => (
						<option value={value}>{label}</option>
					))}
			</select>
        </div>
	);
}
export default DataVis;