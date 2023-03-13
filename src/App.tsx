import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import NavLayout from "./components/NavLayout";
import CreateUsers from "./pages/CreateUsers";
import CommunityEvents from "./pages/CommunityEvents";
import Login from "./pages/Login";
import UsersTable from "./pages/UsersTable";
import "./styles/App.scss";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<Login />} />
				<Route path="/" element={<NavLayout />}>
					<Route path="events" element={<CommunityEvents />} />
					<Route path="create-user" element={<CreateUsers />} />
					<Route path="users" element={<UsersTable />} />
				</Route>
			</>
		),
		{ basename: "/Hand-Heart-and-Soul/" }
	);

	return <RouterProvider router={router} />;
}

export default App;
