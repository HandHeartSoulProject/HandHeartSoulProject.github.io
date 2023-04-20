import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import { dropDownRoles, hhsDomain, userRole, userType } from "../types/userTypes";
import { objectsEqual } from "../util";
import ActionButtons from "./ActionButtons";
import { snackbarType } from "./CustomSnackbar";

function UserRow({
	user,
	removeUser,
	updateUser,
	setSnackBar
}: {
	user: userType;
	removeUser: () => void;
	updateUser: (user: userType) => void;
	setSnackBar: React.Dispatch<React.SetStateAction<snackbarType>>;
}) {
	const [loadingDelete, setLoadingDelete] = useState(false);
	async function deleteUser() {
		if (loadingDelete) return;

		if (!confirm(`Are you sure you want to delete "${user.email}"? This CANNOT be undone.`)) {
			return;
		}

		setLoadingDelete(true);
		const { error } = await supabase.from("users").delete().eq("id", user.id);
		if (error) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to delete user" });
		} else {
			removeUser();
			setSnackBar({ toggle: true, severity: "success", message: "User deleted" });
		}
		setLoadingDelete(false);
	}

	const [editing, setEditing] = useState(false);
	const [editedUser, setEditedUser] = useState(user);
	function detectClick(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
		e.stopPropagation();
		if (e.detail != 2 || editing) return;
		setEditing(true);
	}
	function stopEditing() {
		if (!objectsEqual(user, editedUser) && !confirm("Are you sure you want to discard your changes?")) {
			return;
		}

		setEditing(false);
		setEditedUser(user);
	}

	const [saveDisabled, setSaveDisabled] = useState(true);
	useEffect(() => {
		setSaveDisabled(objectsEqual(user, editedUser));
	}, [user, editedUser]);

	const [loadingSave, setLoadingSave] = useState(false);
	async function saveUser() {
		if (loadingSave) return;

		if (editedUser.role === "admin" || editedUser.role === "employee") {
			if (!editedUser.email.endsWith(hhsDomain)) {
				setSnackBar({
					toggle: true,
					severity: "error",
					message: `Only users with emails ending in ${hhsDomain} may be made an employee or admin`
				});
				return;
			}
		}

		setLoadingSave(true);
		const { data, error } = await supabase.from("users").update(editedUser).eq("id", user.id).select("*");
		if (error || !data || data.length == 0) {
			console.error(error);
			setSnackBar({ toggle: true, severity: "error", message: "Failed to save user changes" });
		} else {
			setSnackBar({ toggle: true, severity: "success", message: "User changes saved" });
			updateUser(data[0] as userType);
			setEditing(false);
		}
		setLoadingSave(false);
	}

	return (
		<tr key={user.id} onClick={detectClick}>
			{!editing ? (
				<>
					<td>{user.email}</td>
					{/* Capitilize the first character of the role */}
					<td>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
				</>
			) : (
				<>
					<td>
						<input
							type="email"
							value={editedUser.email}
							onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
							style={{ width: "calc(100% - 1rem)" }}
						/>
					</td>
					<td>
						<select
							onChange={e => setEditedUser({ ...editedUser, role: e.target.value as userRole })}
							value={editedUser.role}
						>
							{Object.entries(dropDownRoles).map(([value, label]) => (
								<option value={value}>{label}</option>
							))}
						</select>
					</td>
				</>
			)}
			<td>{user.id}</td>
			<td>
				<ActionButtons
					editing={editing}
					loadingSave={loadingSave}
					loadingDelete={loadingDelete}
					saveDisabled={saveDisabled}
					stopEditing={stopEditing}
					saveData={saveUser}
					deleteData={deleteUser}
				/>
			</td>
		</tr>
	);
}

export default UserRow;
