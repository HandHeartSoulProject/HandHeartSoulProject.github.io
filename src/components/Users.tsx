import { Link } from "react-router-dom";

function Users() {
    return (
		<Link to="/create-users">
			<button>Add a User</button>
		</Link>
	);
}

export default Users;