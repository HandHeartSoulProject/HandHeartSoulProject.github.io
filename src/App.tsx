import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import NavLayout from "./components/NavLayout";
import ChildrensEvents from "./pages/ChildrensEvents";
import CommunityEvents from "./pages/CommunityEvents";
import CreateUsers from "./pages/CreateUsers";
import DataVis from "./pages/DataVis";
import EventTypes from "./pages/EventTypes";
import Login from "./pages/Login";
import Users from "./pages/Users";
import "./styles/App.scss";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<Login />} />
				<Route path="/" element={<NavLayout />}>
					<Route path="community-events" element={<CommunityEvents />} />
					<Route path="childrens-events" element={<ChildrensEvents />} />
					<Route path="event-types" element={<EventTypes />} />
					<Route path="create-user" element={<CreateUsers />} />
					<Route path="users" element={<Users />} />
					<Route path="vis" element={<DataVis />} />
				</Route>
			</>
		),
		{ basename: "/Hand-Heart-and-Soul/" }
	);

	return <RouterProvider router={router} />;
}

export default App;
