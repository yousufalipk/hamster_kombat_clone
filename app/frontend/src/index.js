import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/index";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<TonConnectUIProvider
		manifestUrl="https://res.cloudinary.com/du6yj0y8r/raw/upload/v1737808035/ton-manifest/manifest_a75eq9.json"
	>
		<BrowserRouter>
			<UserProvider>
				<App />
			</UserProvider>
		</BrowserRouter>
	</TonConnectUIProvider>
);
