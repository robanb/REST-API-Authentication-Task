import React from "react";
import { Routes, Route, useRoutes, BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import routes from "./routes";

function App() {
	const content = useRoutes(routes);

	return <AuthContextProvider> {content} </AuthContextProvider>;
}

export default App;
