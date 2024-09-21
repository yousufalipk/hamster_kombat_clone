import React from "react";
import { Routes , Route } from 'react-router-dom';

import Rankings from './Pages/Rankings/index';

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
				</Routes> 
			</div>
		</>
	);
};

export default App;
