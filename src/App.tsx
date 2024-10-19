import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Display from "./components/layout/display";
import CadastroAnimais from "./pages/CadastroAnimais/CadastroAnimais";
import { ToastProvider } from "./components/ui/toast";

const Login = React.lazy(() => import("@/pages/login"));

const Dashboard = React.lazy(() => import("@/pages/dashboard"));
const Cadastro = React.lazy(() => import("@/pages/cadastro/cadastro"));
const Adocao = React.lazy(() => import("@/pages/animal/"));
// const Formulario = React.lazy(() => import("@/pages/FormsAdoção/formAdoção"));

function App() {
	return (
		<ToastProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Display />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/register" element={<CadastroAnimais />} />
						<Route path="/pet/:id" element={<Adocao />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/cadastro" element={<Cadastro />} />
					{/* <Route path="/formulario" element={<Formulario />} /> */}
				</Routes>
			</BrowserRouter>
		</ToastProvider>
	);
}

export default App;
