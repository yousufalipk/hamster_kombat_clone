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
		manifestUrl="https://panda-tap-app-frontend.vercel.app/manifest.json"
	>
		<BrowserRouter>
			<UserProvider>
				<App />
			</UserProvider>
		</BrowserRouter>
	</TonConnectUIProvider>
);
