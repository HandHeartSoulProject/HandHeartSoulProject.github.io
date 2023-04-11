import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import { supabase } from "../supabaseClient";
import { dropDownRoles, userRole, hhsDomain } from "../types/userTypes";
import "../styles/Modal.scss";

Modal.setAppElement("#root");

function UserModal({ user, modalStatus, toggleModal, handleSnackbar }) {
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<userRole>("contractor");

	useEffect(() => {
		setEmail(user.email);
		setRole(user.role);
	}, [user]);

	async function deleteUser(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (!confirm("Are you sure you want to delete this user?")) {
			return;
		}

		const { error } = await supabase.from("users").delete().eq("email", user.email);
		if (error) {
			console.log(error);
			handleSnackbar(true, "error", "Error deleting user. Please try again");
		} else {
			handleSnackbar(true, "success", "Successfully deleted user.");
			toggleModal();
		}
	}

	async function updateUser(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (role === "admin" || role === "employee") {
			if (!email.endsWith(hhsDomain)) {
				handleSnackbar(
					true,
					"error",
					"Only users with emails ending in " + hhsDomain + " may be made an employee or admin"
				);
				return;
			}
		}

		const { error } = await supabase
			.from("users")
			.update({
				id: user.id,
				email,
				role
			})
			.eq("id", user.id);

		if (error) {
			console.error(error);
			handleSnackbar(true, "error", "Error updating user. Please try again");
		} else {
			handleSnackbar(true, "success", "Successfully updated user.");
			toggleModal();
		}
	}

	return (
		<Modal isOpen={modalStatus} className="modal" overlayClassName="modal-overlay">
			<form>
				<button onClick={toggleModal} className="close">
					<CloseIcon />
				</button>
				<div className="input-group">
					<label>Email</label>
					<input
						type="text"
						placeholder="Email"
						name="uname"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="input-group">
					<label>User Role</label>
					<select onChange={e => setRole(e.target.value as userRole)}>
						{dropDownRoles.map(({ value, label }) => (
							<option value={value} selected={value == user.role}>
								{label}
							</option>
						))}
					</select>
				</div>
				<div className="button-group">
					<button onClick={deleteUser} className="delete">
						Delete User
					</button>
					<button onClick={updateUser}>Update User</button>
				</div>
			</form>
		</Modal>
	);
}

export default UserModal;
