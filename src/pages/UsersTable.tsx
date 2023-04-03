import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";
import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import UserModal from "../components/UserModal";

function UsersTable() {
	type userInfo = Database["public"]["Tables"]["users"]["Row"];
	const [users, setUsers] = useState<userInfo[]>();
	const [selectedUser, setSelectedUser] = useState<userInfo>({
		id: "",
		email: "",
		role: ""
	});
	const [modalStatus, setModalStatus] = useState(false);
	const [snackbar, setSnackBar] = useState<{ toggle: boolean; severity: AlertColor; message: string }>({
		toggle: false,
		severity: "error",
		message: ""
	});

	function handleSnackbar(open: boolean, severity: AlertColor, message: string) {
		setSnackBar({
			toggle: open,
			severity: severity,
			message: message
		});
	}
	function closeSnackbar() {
		handleSnackbar(false, snackbar.severity, snackbar.message);
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		var { data: users, error } = await supabase.from("users").select("*");
		if (error || !users) console.error(error);
		else setUsers(users as userInfo[]);
	}

	function handleSelectedUser(currentUser: userInfo) {
		toggleModal();
		setSelectedUser(currentUser);
	}

	function toggleModal() {
		setModalStatus(modalStatus => !modalStatus);
		fetchUsers();
	}

	return (
		<div className="events">
			<h1>Users</h1>
			{users ? (
				<table>
					<thead>
						<tr>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => {
							return (
								<tr key={user.id}>
									<td>{user.email}</td>
									{/* Capitilize the first character of the role */}
									<td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
									<td>
										<button onClick={() => handleSelectedUser(user)}>Edit User</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>Loading...</div>
			)}
			<UserModal
				user={selectedUser}
				modalStatus={modalStatus}
				toggleModal={toggleModal}
				handleSnackbar={handleSnackbar}
			></UserModal>
			<Snackbar open={snackbar.toggle} autoHideDuration={3000} onClose={closeSnackbar}>
				<Alert onClose={closeSnackbar} severity={snackbar.severity} variant={"filled"}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default UsersTable;
