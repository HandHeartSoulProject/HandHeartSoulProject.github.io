import { NavLink, NavLinkProps } from "react-router-dom";

import "../styles/Nav.scss";
import logo from "../assets/logo.webp";

function NavBar() {
	const activeClass = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : undefined);

	return (
		<nav>
			<img src={logo} alt="Hand, Heart, and Soul" className="logo" />
			<NavLink to="events" className={activeClass}>
				Events
			</NavLink>
			<NavLink to="create-user" className={activeClass}>
				Create User
			</NavLink>
			<NavLink to="users" className={activeClass}>
				Users
			</NavLink>
		</nav>
	);
}

export default NavBar;
