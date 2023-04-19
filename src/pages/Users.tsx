import { AlertColor } from "@mui/material/Alert";
import { useEffect, useState } from "react";

import CustomSnackbar from "../components/CustomSnackbar";
import UserRow from "../components/UserRow";
import { supabase } from "../supabaseClient";
import { userType } from "../types/userTypes";

function Users() {
	const [users, setUsers] = useState<userType[]>();

	useEffect(() => {
		async function fetchUsers() {
			const { data: users, error } = await supabase.from("users").select("*");
			if (error || !users) {
				console.error(error);
				setSnackBar({ toggle: true, severity: "error", message: "Failed to fetch users" });
			} else setUsers(users as userType[]);
		}

		fetchUsers();
	}, []);

	const [snackbar, setSnackBar] = useState<{ toggle: boolean; severity: AlertColor; message: string }>({
		toggle: false,
		severity: "error",
		message: ""
	});

	return (
		<div className="table-layout">
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th>Email</th>
						<th>Role</th>
						<th>ID</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users ? (
						users.map(user => (
							<UserRow
								key={user.id}
								user={user}
								removeUser={() => setUsers(users?.filter(u => u.id != user.id))}
								updateUser={updatedUser => {
									setUsers(users?.map(u => (u.id == user.id ? updatedUser : u)));
								}}
								setSnackBar={setSnackBar}
							/>
						))
					) : (
						<tr>
							<td colSpan={999} className="loading">
								Loading...
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackBar} />
		</div>
	);
}

export default Users;
