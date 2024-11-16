import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { LuLoader2 } from "react-icons/lu";

import Rankings from './Components/Rankings/index';
import Token from './Components/Token/index';
import GamePage from './Pages/Game/Game';

import Layout from './Layout/index';

import { useUser } from './context/index';


const App = () => {
	const { loader, loaderErrorMes } = useUser();

	if (loader) {
		return (
			<>
				<div className="h-[100vh] w-[100vw] bg-black flex justify-center items-center">
					<LuLoader2 className="animate-spin w-20 h-20 text-white" />
				</div>
			</>
		)
	}

	if (loaderErrorMes) {
		return (
			<>
				<div className="h-[100vh] w-[100vw] bg-black flex justify-center items-center">
					<div className="flex gap-3 justify-center items-center flex-col border-2 h-[90vh] w-[90vw] rounded-3xl">
						<span className="text-2xl text-red-700 text-center font-bold">
							{loaderErrorMes.mess}
						</span>
						<p className="text-xl text-white text-center">
							Try reloading!
						</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div className="h-screen w-screen bg-gradient-to-t from-[#1B1B27] to-black">
				<Routes>
					<Route path="/" element={<Layout />} />
					<Route path="*" element={<Layout />} />

					{/* Other Routes */}
					<Route path="/rankings" element={<Rankings />} />
					<Route path="/gameplay" element={<GamePage />} />
					<Route path="/token" element={<Token />} />
				</Routes>
			</div>
		</>
	);
};

export default App;
