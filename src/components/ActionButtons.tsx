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
						<button className="delete-icon" onClick={() => stopEditing()}>
							<Close />
						</button>
						<button className="save-icon" onClick={() => saveData()} disabled={saveDisabled}>
							<Check />
						</button>
					</>
				) : (
					<ClipLoader size={20} color="var(--success)" />
				)
			) : !loadingDelete ? (
				<button className="delete-icon" onClick={() => deleteData()}>
					<Delete />
				</button>
			) : (
				<ClipLoader size={20} color="var(--warning)" />
			)}
		</div>
	);
}

export default ActionButtons;
