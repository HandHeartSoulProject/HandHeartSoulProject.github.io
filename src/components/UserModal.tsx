import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import Modal from "react-modal";
import { dropDownRoles } from "../types/userTypes";

Modal.setAppElement("#root");

var test: string = 'admin';
function UserModal({user, modalStatus, toggleModal}) {

	const customStyles = {
		content: {
		  top: '50%',
		  left: '50%',
		  right: 'auto',
		  bottom: 'auto',
		  marginRight: '-50%',
		  transform: 'translate(-50%, -50%)',
		},
	  };

	async function deleteUser() {
		const { error } = await supabase.from("users").delete().eq("email", user.email);
		if (error) {
			console.log(error);
		}
		toggleModal();
	}
	return (
		<Modal isOpen={modalStatus} outline="None" overlayClassName="Overlay" style={customStyles} contentLabel="Example Modal">
		<div className="modal" >
			<div>
				<h1>User Info</h1>
				<label>
					<b>Username</b>
				</label>
				<input type="text" placeholder={user.email} name="uname" required />
			</div>

            <div>
				<label>
					<b>User Privileges</b>
				</label>
				<select>
					{dropDownRoles.map(({ value, label }) => (
						<option value={value} selected={value == user.role}>{label}</option>
					))}

                
				</select>
			</div>

			<button onClick={toggleModal}> Close Modal</button>
			<button onClick={deleteUser}> Delete User</button>
			<button onClick={deleteUser}> Update User</button>
		</div>

		</Modal>
	);
}

export default UserModal;