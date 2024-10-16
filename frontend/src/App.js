import React from "react";
import { Routes, Route } from 'react-router-dom';
import { LuLoader2 } from "react-icons/lu";

import Rankings from './Components/Rankings/index';
import Token from './Components/Token/index';
import GamePage from './Pages/Game/Game';

import Layout from './Layout/index';

import { useUser } from './context/index';

const App = () => {

	const { loader } = useUser();


	if (loader) {
		return (
			<>
				<div className="h-[100vh] w-[100vw] bg-black flex justify-center items-center">
					<LuLoader2 className="animate-spin w-20 h-20 text-white" />
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
