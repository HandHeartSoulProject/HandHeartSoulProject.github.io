import { Check, Close, Delete } from "@mui/icons-material";
import { ClipLoader } from "react-spinners";

function ActionButtons({
	editing,
	loadingSave,
	loadingDelete,
	saveDisabled,
	stopEditing,
	saveData,
	deleteData
}: {
	editing: boolean;
	loadingSave: boolean;
	loadingDelete: boolean;
	saveDisabled: boolean;
	stopEditing: () => void;
	saveData: () => void;
	deleteData: () => void;
}) {
	return (
		<div className="action-buttons">
			{editing ? (
				!loadingSave ? (
					<>
						<button
							className="delete-icon"
							onClick={() => stopEditing()}
							title={saveDisabled ? "Stop editing (no changes made)" : "Discard changes"}
						>
							<Close />
						</button>
						<button
							className="save-icon"
							onClick={() => saveData()}
							disabled={saveDisabled}
							title={saveDisabled ? "Must make changes before saving" : "Save changes"}
						>
							<Check />
						</button>
					</>
				) : (
					<ClipLoader size={20} color="var(--success)" />
				)
			) : !loadingDelete ? (
				<button className="delete-icon" onClick={() => deleteData()} title="Delete">
					<Delete />
				</button>
			) : (
				<ClipLoader size={20} color="var(--warning)" />
			)}
		</div>
	);
}

export default ActionButtons;
