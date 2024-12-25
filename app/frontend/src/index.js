import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TonConnectUIProvider } from "@tonconnect/ui-react";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<TonConnectUIProvider manifestUrl='https://panda-tap-backend-production.up.railway.app/manifest.json'>
		<BrowserRouter>
			<UserProvider>
				<ToastContainer />
				<App />
			</UserProvider>
		</BrowserRouter >
	</TonConnectUIProvider>
);
