import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLoader from "./Components/Loader/Loader";
import Token from "./Components/Token/index";
import GamePage from "./Pages/Game/Game";
import Layout from "./Layout/index";
import { useUser } from "./context/index";

const App = () => {
	const staticUser = process.env.REACT_APP_STATIC_USER;
	useEffect(() => {
		if (staticUser === 'false') {
			const tg = window.Telegram.WebApp;

			const handleCloseEvent = () => {
				const shouldClose = window.confirm("Are you sure you want to close the app?");
				if (!shouldClose) {
					tg.MainButton.show();
					return false;
				}
				tg.close();
			};

			tg.onEvent("close", handleCloseEvent);

			return () => {
				tg.offEvent("close", handleCloseEvent);
			};
		}
	}, []);

	const { loader, loaderErrorMes } = useUser();

	if (loader) {
		return (
			<div className="h-screen w-screen bg-black flex justify-center items-center">
				<CustomLoader size={200} />
			</div>
		);
	}

	if (loaderErrorMes) {
		return (
			<div className="h-screen w-screen bg-black flex justify-center items-center">
				<div className="flex flex-col gap-3 justify-center items-center border-2 h-[90vh] w-[90vw] rounded-3xl bg-white p-8">
					<span className="text-2xl text-red-700 text-center font-bold">
						{loaderErrorMes.mess}
					</span>
					<p className="text-xl text-white text-center">Try reloading!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen w-screen bg-[#060611]">
			<Routes>
				<Route path="/" element={<Layout />} />
				<Route path="*" element={<Layout />} />

				{/* Other Routes */}
				<Route path="/gameplay" element={<GamePage />} />
				<Route path="/token" element={<Token />} />
			</Routes>
		</div>
	);
};

export default App;
