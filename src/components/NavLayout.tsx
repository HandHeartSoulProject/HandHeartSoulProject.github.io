import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function NavLayout() {
	return (
		<div>
			<NavBar />
			<div className="App">
				<Outlet />
			</div>
		</div>
	);
}

export default NavLayout;
