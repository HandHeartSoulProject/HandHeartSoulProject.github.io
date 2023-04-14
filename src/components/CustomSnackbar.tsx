import { Alert, AlertColor, Snackbar } from "@mui/material";

function CustomSnackbar({
	snackbar,
	setSnackbar
}: {
	snackbar: snackbarType;
	setSnackbar: React.Dispatch<React.SetStateAction<snackbarType>>;
}) {
	function closeSnackbar() {
		setSnackbar({ ...snackbar, toggle: false });
	}

	return (
		<Snackbar open={snackbar.toggle} autoHideDuration={3000} onClose={closeSnackbar}>
			<Alert onClose={closeSnackbar} severity={snackbar.severity} variant={"filled"}>
				{snackbar.message}
			</Alert>
		</Snackbar>
	);
}

export type snackbarType = { toggle: boolean; severity: AlertColor; message: string };

export default CustomSnackbar;
