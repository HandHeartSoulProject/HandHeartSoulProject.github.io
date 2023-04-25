import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import { dataField } from "../types/dataTableTypes";
import { communityEventType } from "../types/eventTypes";
import { capitalize, formatDateString, objectsEqual } from "../util";
import ActionButtons from "./ActionButtons";
import AdaptiveWidthNumericInput from "./AdaptiveWidthNumericInput";
import { snackbarType } from "./CustomSnackbar";

function DataTableRow({
	dataPoint,
	fields,
	table,
	tableSelection,
	dataName,
	deleteConfirmMessageField,
	removeDataPoint,
	updateDataPoint,
	setSnackBar
}: {
	dataPoint: any;
	fields: dataField[];
	table: string;
	tableSelection: string;
	dataName: string;
	deleteConfirmMessageField: string;
	removeDataPoint: () => void;
	updateDataPoint: (dataPoint: communityEventType) => void;
	setSnackBar: React.Dispatch<React.SetStateAction<snackbarType>>;
}) {
	const [loadingDelete, setLoadingDelete] = useState(false);
	async function deleteData() {
		if (loadingDelete) return;

		if (
			!confirm(
				`Are you sure you want to delete "${dataPoint[deleteConfirmMessageField]}"? This action CANNOT be undone.`
			)
		)
			return;

		setLoadingDelete(true);
		const { error } = await supabase.from(table).delete().eq("id", dataPoint.id);

		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: `Failed to delete ${dataName}` });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: `${capitalize(dataName)} deleted` });
			removeDataPoint();
		}
		setLoadingDelete(false);
	}

	const [editing, setEditing] = useState(false);
	const [editedDataPoint, setEditedDataPoint] = useState(dataPoint);
	function detectClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
		e.stopPropagation();
		if (e.detail != 2 || editing) return;
		setEditing(true);
	}
	function stopEditing() {
		if (!objectsEqual(dataPoint, editedDataPoint) && !confirm("Are you sure you want to discard your changes?"))
			return;

		setEditing(false);
		setEditedDataPoint(dataPoint);
	}

	const [saveDisabled, setSaveDisabled] = useState(true);
	useEffect(() => {
		setSaveDisabled(objectsEqual(dataPoint, editedDataPoint));
	}, [dataPoint, editedDataPoint]);

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveData() {
		if (loadingSave) return;

		// const tempData = {
		// 	...editedDataPoint,
		// 	type: editedDataPoint.type.id
		// };
		const nestedData = Object.fromEntries(
			fields.filter(field => field.nestedField).map(field => [field.name, editedDataPoint[field.name].id])
		);

		setLoadingSave(true);
		const { data, error } = await supabase
			.from(table)
			.update({ ...editedDataPoint, ...nestedData })
			.eq("id", dataPoint.id)
			.select(tableSelection);
		if (error || !data || data.length == 0) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: `Failed to save ${dataName} changes` });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: `${capitalize(dataName)} changes saved` });
			setEditing(false);
			updateDataPoint(data[0] as any);
		}
		setLoadingSave(false);
	}

	return (
		<tr key={dataPoint.id} onClick={detectClick}>
			{fields.map(field => {
				let content = dataPoint[field.name];
				if (field.isDate) content = formatDateString(content);
				else if (field.nestedField) content = content[field.nestedField];
				else if (editing && !field.editDisabled) {
					const dpType = typeof dataPoint[field.name];
					if (dpType == "number") {
						content = (
							<AdaptiveWidthNumericInput
								value={content}
								onChange={value => setEditedDataPoint({ ...editedDataPoint, [field.name]: value })}
							/>
						);
					} else if (dpType == "boolean") {
						content = (
							<input
								type="checkbox"
								checked={content}
								onChange={e =>
									setEditedDataPoint({ ...editedDataPoint, [field.name]: e.target.checked })
								}
							/>
						);
					} else {
						content = (
							<textarea
								onChange={e => setEditedDataPoint({ ...editedDataPoint, [field.name]: e.target.value })}
								value={content}
							/>
						);
					}
				}

				return <td key={field.name}>{content}</td>;
			})}
			<td>
				<ActionButtons
					editing={editing}
					loadingSave={loadingSave}
					loadingDelete={loadingDelete}
					saveDisabled={saveDisabled}
					stopEditing={stopEditing}
					saveData={saveData}
					deleteData={deleteData}
				/>
			</td>
		</tr>
	);
}

export default DataTableRow;
