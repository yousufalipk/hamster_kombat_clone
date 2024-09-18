import React from "react";
import { Routes , Route } from 'react-router-dom';

import Home from "./Components/Home";
import BottleCap from "./Components/BottleCap";
import Hammer from "./Components/Hammer";
import MemeFi from "./Components/MemeFi";
import Popup1 from "./Components/ModalPopup/Popup1";
import Popup2 from "./Components/ModalPopup/Popup2";
import Popup3 from "./Components/ModalPopup/Popup3";
import Popup4 from "./Components/ModalPopup/Popup4";
import InviteFriends from "./Components/InviteFriends";
import Rankings from "./Components/Rankings";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="*" element={<Home />} />
				<Route path="/bottle-cap" element={<BottleCap />} />
				<Route path="/hammer" element={<Hammer />} />
				<Route path="/meme-fi" element={<MemeFi />} />
				<Route path="/invite-friends" element={<InviteFriends />} />
				<Route path="/rankings" element={<Rankings />} />
			</Routes>
			{/* <Popup1 />
			<Popup2 />
			<Popup3 />
			<Popup4 /> */}
		</>
	);
};

export default App;
