import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Display from "./components/layout/display";
import CadastroAnimais from "./pages/CadastroAnimais/CadastroAnimais";

const Login = React.lazy(() => import("@/pages/login"));

const Dashboard = React.lazy(() => import("@/pages/carousel.tsx"));
const Cadastro = React.lazy(() => import("@/pages/cadastro/cadastro"));
const Adocao = React.lazy(() => import("@/pages/Adocao/adocao"));
const Formulario = React.lazy(() => import("@/pages/FormsAdoção/formAdoção"));

 



function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Display />}>
					<Route path="/home" element={<Dashboard/>} />
					<Route path="/CadastroAnimais" element={<CadastroAnimais/>} />
					<Route path="/adocao/:id" element={<Adocao/>} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro/>} />
				<Route path="/formulario" element={<Formulario />} />
			</Routes>
		</BrowserRouter>
	);
}


export default App;
