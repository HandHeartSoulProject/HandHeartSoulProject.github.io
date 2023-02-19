import "./styles/App.scss";
import Login from "./pages/Login";
import Events from "./components/Events";
import Users from "./components/Users";
import CreateUsers from "./components/CreateUsers";
import UsersTable from "./components/UsersTable";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/events" element={<Events />} />
					<Route path="/users" element={<Users />} />
					<Route path="/create-users" element={<CreateUsers />} />
					<Route path="/users-table" element={<UsersTable />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
