import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import NavLayout from "./components/NavLayout";
import ChildrensEvents from "./pages/ChildrensEvents";
import ChildrensEventSites from "./pages/ChildrensEventSites";
import ChildrensEventTypes from "./pages/ChildrensEventTypes";
import CommunityEvents from "./pages/CommunityEvents";
import CommunityEventTypes from "./pages/CommunityEventTypes";
import CreateUsers from "./pages/CreateUsers";
import DataVis from "./pages/DataVis";
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
					<Route path="community-event-types" element={<CommunityEventTypes />} />
					<Route path="childrens-event-types" element={<ChildrensEventTypes />} />
					<Route path="childrens-event-sites" element={<ChildrensEventSites />} />
					<Route path="create-user" element={<CreateUsers />} />
					<Route path="users" element={<Users />} />
					<Route path="vis" element={<DataVis />} />
				</Route>
			</>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
