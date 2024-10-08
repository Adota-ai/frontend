import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Display from "./components/layout/display";
import CadastroAnimais from "./pages/CadastroAnimais/CadastroAnimais";

const Login = React.lazy(() => import("@/pages/login"));

const Dashboard = React.lazy(() => import("@/pages/carousel.tsx"));
const Cadastro = React.lazy(() => import("@/pages/cadastro/cadastro"));


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Display />}>
					<Route path="teste" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard/>} />
					<Route path="/CadastroAnimais" element={<CadastroAnimais/>} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro/>} />
			</Routes>
		</BrowserRouter>
	);
}


export default App;
