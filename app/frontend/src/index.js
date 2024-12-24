import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/index';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<TonConnectUIProvider manifestUrl="http://localhost:3000/tonconnect-manifest.json">
			<UserProvider>
				<ToastContainer />
				<App />
			</UserProvider>
		</TonConnectUIProvider>
	</BrowserRouter>
);
