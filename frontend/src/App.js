import React from "react";
import { Routes , Route } from 'react-router-dom';

import Layout from './Layout/index';

const App = () => {
	return (
		<>	
			<div className="h-screen w-screen">
				<Routes>
					<Route path="/" element={<Layout />} /> 
					<Route path="*" element={<Layout />} /> 
				</Routes> 
			</div>
		</>
	);
};

export default App;
