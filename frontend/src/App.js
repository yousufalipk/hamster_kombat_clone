import React from "react";
import { Routes , Route } from 'react-router-dom';

import Rankings from './Components/Rankings/index';
import Token from './Components/Token/index';
import GamePage from './Pages/Game/Game';

import Layout from './Layout/index';

const App = () => {
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
