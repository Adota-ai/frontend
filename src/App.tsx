import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Display from "./components/layout/display";

const Login = React.lazy(() => import("@/pages/login"));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Display />}>
					<Route path="teste" element={<Login />} />
				</Route>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
