import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import Modal from "react-modal";
import { dropDownRoles } from "../types/userTypes";
import { userRole } from "../types/userTypes";

Modal.setAppElement("#root");

function UserModal({ user, modalStatus, toggleModal }) {
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<userRole>("contractor");

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)"
		}
	};

	async function deleteUser() {
		const { error } = await supabase.from("users").delete().eq("email", user.email);
		if (error) {
			console.log(error);
		}
		toggleModal();
	}

	async function updateUser() {
		const { error } = await supabase
			.from("users")
			.update({
				id: user.id,
				email,
				role
			})
			.eq("id", user.id);

		if (error) {
			console.error("error");
			console.error(error);
		}
		toggleModal();
	}

	useEffect(() => {
		setEmail(user.email);
		setRole(user.role);
	}, [user]);

	return (
		<Modal
			isOpen={modalStatus}
			outline="None"
			overlayClassName="Overlay"
			style={customStyles}
			contentLabel="Example Modal"
		>
			<div className="modal">
				<div>
					<h1>User Info</h1>
					<label>
						<b>Username</b>
					</label>
					<input
						type="text"
						placeholder="Email"
						name="uname"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<label>
						<b>User Privileges</b>
					</label>
					<select onChange={e => setRole(e.target.value as userRole)}>
						{dropDownRoles.map(({ value, label }) => (
							<option value={value} selected={value == user.role}>
								{label}
							</option>
						))}
					</select>
				</div>

				<button onClick={toggleModal}> Close Modal</button>
				<button onClick={deleteUser}> Delete User</button>
				<button onClick={updateUser}> Update User</button>
			</div>
		</Modal>
	);
}

export default UserModal;
