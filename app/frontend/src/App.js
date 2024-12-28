import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLoader from "./Components/Loader/Loader";
import Token from "./Components/Token/index";
import GamePage from "./Pages/Game/Game";
import Layout from "./Layout/index";
import { useUser } from "./context/index";
import axios from "axios";
import SplashScreen from "./assets/splashScreen.png";

import Animation1 from './assets/splashScreen/Animation1.gif';
import Animation2 from './assets/splashScreen/Animation2.gif';

const App = () => {
	const [isTimeValid, setIsTimeValid] = useState(true);
	const staticUser = process.env.REACT_APP_STATIC_USER;
	const apiUrl = process.env.REACT_APP_URL;

	const { loader, loaderErrorMes, mainLoader } = useUser();

	const [animation, setAnimation] = useState(0);

	const animationTime = 3;

	useEffect(() => {
		if (mainLoader) {
			const steps = 4;
			const interval = (animationTime * 1000) / steps;
			const percentages = [25, 50, 75, 100];
			let currentStep = 0;

			setAnimation(0);

			const intervalId = setInterval(() => {
				setAnimation(percentages[currentStep]);
				currentStep++;

				if (currentStep === percentages.length) {
					clearInterval(intervalId);
				}
			}, interval);

			return () => clearInterval(intervalId);
		} else {
			setAnimation(0);
		}
	}, [mainLoader]);

	useEffect(() => {
		const checkTimeIntegrity = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/utc-time`);
				const serverUtcTime = response.data.utcTime;

				const serverTime = new Date(serverUtcTime).getTime();
				const clientTime = new Date().getTime();

				const timeDifference = Math.abs(serverTime - clientTime);

				if (timeDifference > 5000 || timeDifference < -5000) {
					setIsTimeValid(false);
				} else {
					setIsTimeValid(true);
				}
			} catch (error) {
				console.error("Error fetching server time:", error);
				setIsTimeValid(false);
			}
		};

		checkTimeIntegrity();
	}, [apiUrl]);

	if (mainLoader) {
		return (
			<div className="relative z-10 h-screen w-screen bg-black flex justify-center items-center">
				<img
					src={SplashScreen}
					alt="splash_screen"
					className="w-full h-full object-fill absolute z-20"
				/>
				<div className="absolute z-30 bottom-[15%] w-[80%] h-[10vh] flex flex-col justify-center items-center gap-2">
					<h1 className="text-[20px] text-white">Loading...</h1>
					<div className="relative z-30 w-full h-[3vh] bg-white rounded-sm">
						<div
							className="absolute z-50 h-full bg-orange-500 transition-all duration-500"
							style={{ width: `${animation}%` }}
						>
							<img src={Animation1} alt="animation_1" width={60} className={`${animation < 100 ? 'flex' : 'hidden'} z-40 absolute ${animation === 25 && `-right-[40%] -top-[90%]`} ${animation === 50 && `-right-[20%] -top-[90%]`} ${animation === 75 && `-right-[15%] -top-[90%]`} `} />
						</div>
						<img src={Animation2} alt="animation_2" className={`${animation < 100 ? 'hidden' : 'flex'} absolute -right-[22%] bottom-0 z-2`} />
					</div>
				</div>
			</div>
		);
	}

	if (loader) {
		return (
			<div className="h-screen w-screen bg-black flex justify-center items-center">
				<CustomLoader size={200} />
			</div>
		);
	}

	if (!isTimeValid) {
		return (
			<div className="h-[100vh] w-[100vw] bg-black text-white flex flex-col gap-2 justify-center items-center text-center">
				<div className="w-[80%] h-[80%] border-2 rounded-2xl border-white p-10 flex flex-col gap-5 justify-center items-center">
					<h1 className="text-2xl font-bold">⚠️ Time Error Detected</h1>
					<p className="text-lg font-light">
						Please set your device time to automatic to continue using the app.
					</p>
				</div>
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
