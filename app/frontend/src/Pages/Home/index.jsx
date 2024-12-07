import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/index';
import { toast } from 'react-toastify';

import midAnimationCircle from '../../assets/animation/1.png';
import finalAnimationCircle from '../../assets/animation/2.png';

import BackgroundImg from '../../assets/background/bg.png';
import DailyGamePlay from "../../assets/dailyGamePlayIcon.png";
import DailyReward from "../../assets/dailyRewardIcon.png";
import DailyCombo from "../../assets/dailyComboIcon.png";
import DailySecretCode from "../../assets/secretCodeIcon.png";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";
import BigPanda from "../../assets/bigPandaIcon.png";
import PandaCircleIcon from "../../assets/PandaCircleIcon.svg";
import JetPack from "../../assets/jetPackIcon.png";
import BatteryBooster1 from "../../assets/batteryBooster1Icon.png";
import BatteryBooster2 from "../../assets/batteryBooster2Icon.png";
import TouchIcon from "../../assets/touchIcon.png";
import FlashIcon from "../../assets/lighteningIcon.png";
import InfoIcon from "../../assets/InfoIcon.svg";
import AngleIcon from "../../assets/AngleIcon.svg";
import DomeProfilePic from "../../assets/profile.png";

import tick from "../../assets/dailyreward/tick.svg";
import close from "../../assets/dailyreward/close.svg"
import day7coin from "../../assets/dailyreward/day7coin.svg";

import leftbox from '../../assets/dailyreward/gift1.svg';
import rightbox from '../../assets/dailyreward/gift2.svg';

import leftreward from '../../assets/dailyreward/leftReward.svg';
import rightreward from '../../assets/dailyreward/rightReward.svg';

const Home = () => {

	const energyUpgradeCost = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500];
	const multitapUpgradeCost = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

	const days = [0, 1, 2, 3, 4, 5, 6];
	const reward = [500, 1000, 1500, 2000, 2500, 3000, 3500];

	const staticUser = process.env.REACT_APP_STATIC_USER;

	const {
		userId,
		initializeUser,
		userDataInitilized,
		username,
		level,
		currentRank,
		levelPercentage,
		setBalance,
		balance,
		energyLevel,
		energy,
		energyLimit,
		setEnergy,
		profilePic,
		addCoins,
		socket,
		energyUpgrade,
		multitapUpgrade,
		multitapLevel,
		avaliableUnlimitedTaps,
		avaliableEnergyRefill,
		energyRefillUpgrade,
		unlimitedTapsUpgrade,
		disableEnergy,
		claimDailyReward,
		claimed,
		currentDay,
		tapBalance,
		setTapBalance,
		coinsPerMinute
	} = useUser();

	const [clicks, setClicks] = useState([]);
	const tapRef = useRef(null);
	const isUpdating = useRef(false);

	// 4 Boosters Popup States 

	const [popupClosing, setPopupClosing] = useState(false);

	const [energyPopup, setEnergyPopup] = useState(false);
	const [multitapsPopup, setMultitapsPopup] = useState(false);
	const [unlimitedTapsPopup, setUnlimitedTapsPopup] = useState(false);
	const [energyRefillPopup, setEnergyRefillPopup] = useState(false);
	const [dailyRewardPopup, setDailyRewardPopup] = useState(false);

	// Animation States
	const [animationComplete, setAnimationComplete] = useState(false);
	const scaleRef = useRef(null);
	const fadeRef = useRef(null);

	useEffect(() => {
		const handleAnimationEnd = () => {
			setAnimationComplete(true);
		};
		if (disableEnergy) {
			if (scaleRef.current && fadeRef.current) {
				scaleRef.current.classList.add('scale-up');
				fadeRef.current.classList.remove('fade-out');
			}
			setAnimationComplete(false);
		} else {
			if (scaleRef.current && fadeRef.current) {
				scaleRef.current.classList.add('scale-down');
				fadeRef.current.classList.add('fade-out');
				scaleRef.current.addEventListener('animationend', handleAnimationEnd);
			}
		}
		return () => {
			if (scaleRef.current) {
				scaleRef.current.removeEventListener('animationend', handleAnimationEnd);
			}
		};
	}, [disableEnergy]);

	const navigate = useNavigate();

	useEffect(() => {
		if (staticUser !== 'true') {
			const tele = window.Telegram.WebApp;
			tele.disableVerticalSwipes();
			tele.BackButton.hide();
			tele.disableVerticalSwipes();
			tele.expand();
			tele.ready();
			window.Telegram.WebApp.setHeaderColor("#000000");

			// Disable zoom on double-tap
			document.addEventListener('dblclick', (e) => {
				e.preventDefault();
			});

			// Disable pinch-zoom
			document.addEventListener('touchstart', function (event) {
				if (event.touches.length > 1) {
					event.preventDefault();
				}
			}, { passive: false });

			if (tele.HapticFeedback) {
				tele.HapticFeedback.impactOccurred("medium");
			}
		}
	}, []);

	// Update Balance Interval
	useEffect(() => {
		const intervalId = setInterval(async () => {
			if (tapBalance !== 0 && !isUpdating.current) {
				isUpdating.current = true;
				try {
					await socket.emit('updateBalance', { userId, tapBalance });
					setTapBalance(0);
				} catch (error) {
					console.error("Error updating balance:", error);
				} finally {
					isUpdating.current = false;
				}
			}
		}, 1000); // Every 1 sec

		return () => clearInterval(intervalId);
	}, [tapBalance]);

	// Handle Haptic Feedback (Vibrate)
	const triggerHapticFeedback = () => {
		const isAndroid = /Android/i.test(navigator.userAgent);
		const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

		if (
			isIOS &&
			window.Telegram &&
			window.Telegram.WebApp &&
			window.Telegram.WebApp.HapticFeedback
		) {
			window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
		} else if (isAndroid && "vibrate" in navigator) {
			navigator.vibrate(50);
		}
	};

	const handleRankings = () => {
		navigate('/rankings');
	}

	const handleCardClick = (data) => {
		if (data.isCommingSoon) {
			return;
		}
		if (data.id === 1) {
			navigate('/gameplay');
		}
		else if (data.id === 2) {
			setDailyRewardPopup(true);
			setPopupClosing(false);
		}
		else if (data.id === 3) {
			navigate('/');
		}
		else if (data.id === 4) {
			navigate('/');
		}
	}

	// Handle multiple taps
	const handleBotTap = (e) => {

		e.preventDefault();
		e.stopPropagation();

		// Skip if no energy left
		if (energy <= 0) return;

		triggerHapticFeedback();

		const targetElement = tapRef.current;
		if (targetElement) {
			const rect = targetElement.getBoundingClientRect();

			if (rect && rect.width > 0 && rect.height > 0) {
				const touchPoints = e.changedTouches || [e];

				for (let i = 0; i < touchPoints.length; i++) {
					const touch = touchPoints[i];
					const newClick = {
						id: Date.now() + i,
						x: touch.clientX - rect.left,
						y: touch.clientY - rect.top,
					};

					setClicks((prevClicks) => [...prevClicks, newClick]);

					// Reduce Energy - 1 per tap
					if (!disableEnergy) {
						setEnergy(prevEnergy => Math.max(prevEnergy - 1, 0));
					} else {
						console.log("Energy is disabled!");
					}

					// Increment tap balance per tap

					setTapBalance((prevTapBalance) => prevTapBalance + addCoins);
					setBalance((prevBalance) => prevBalance + addCoins);

					setTimeout(() => {
						setClicks((prevClicks) => prevClicks.filter((click) => click.id !== newClick.id));
					}, 800);
				}
			}
		}
	}

	// Handle animation end
	const handleAnimationEnd = (id) => {
		setClicks(prevClicks => prevClicks.filter(click => click.id !== id));
	};

	const cards = [
		{
			id: 1,
			img: DailyGamePlay,
			data1: "Daily",
			data2: "Game play",
			timer: "13:11:35",
			isDone: false,
			isCommingSoon: true,
		},
		{
			id: 2,
			img: DailyReward,
			data1: "Daily",
			data2: "Reward",
			timer: "13:11:35",
			isDone: claimed.includes(currentDay) ? true : false,
			isCommingSoon: false,
		},
		{
			id: 3,
			img: DailyCombo,
			data1: "Daily",
			data2: "Combo",
			timer: "02:33:48",
			isDone: false,
			isCommingSoon: true,
		},
		/*
		{
			id: 4,
			img: DailySecretCode,
			data1: "Daily",
			data2: "Secret Code",
			timer: "23:18:33",
			isDone: false,
			isCommingSoon: false,
		},
		*/
	];

	const formatCoins = (coinsPerMinute) => {
		if (coinsPerMinute < 1e3) {
			return coinsPerMinute.toString();
		} else if (coinsPerMinute < 1e6) {
			return (coinsPerMinute / 1e3).toFixed(1) + "k";
		} else if (coinsPerMinute < 1e9) {
			return (coinsPerMinute / 1e6).toFixed(1) + "M";
		} else if (coinsPerMinute < 1e12) {
			return (coinsPerMinute / 1e9).toFixed(1) + "B";
		} else {
			return (coinsPerMinute / 1e12).toFixed(1) + "T";
		}
	}

	const handleUnlimitedTaps = async () => {
		try {
			const res = await unlimitedTapsUpgrade();

			if (res.success) {
				setUnlimitedTapsPopup(false);
				toast.success(res.mess);
			} else {
				setUnlimitedTapsPopup(false);
				toast.error(res.mess);
			}

		} catch (error) {
			console.log("Error upgrading unlimited taps!", error);
			toast.error("Internal Server Error!");
		}
	}

	const handleEnergyRefill = async () => {
		try {
			const res = await energyRefillUpgrade();

			if (res.success) {
				console.log("Energy Refilled succesfuly!", res.mess);
				setEnergyRefillPopup(false);
				toast.success(res.mess);
			} else {
				setEnergyRefillPopup(false);
				toast.error(res.mess);
			}

		} catch (error) {
			console.log("Error Refilling Energy!", error);
			toast.error("Internal Server Error!");
		}
	}

	const handleEnergyUpgrade = async () => {
		const res = await energyUpgrade();
		if (res.success) {
			toast.success("Energy Limit Upgraded!");
			setEnergyPopup(false);
			initializeUser();
		} else {
			toast.error(res.mess);
			setEnergyPopup(false);
		}
	}

	const handleMultitapUpgrade = async () => {
		const res = await multitapUpgrade();
		if (res.success) {
			toast.success("Multitap Level Upgraded!");
			setMultitapsPopup(false);
			initializeUser();
		} else {
			toast.error(res.mess);
			setMultitapsPopup(false);
		}
	}


	const handleDailyRewardClaim = async () => {
		const res = await claimDailyReward();
		if (res.success) {
			toast.success('Daily Reward Claimed Succesfuly!');
			setDailyRewardPopup(false);
		} else {
			toast.error(res.mess);
		}
	}

	return (
		<>
			{userDataInitilized && (
				<>
					<div className="h-[86vh] w-[100vw]">
						{/* Background Image */}
						<div className="absolute inset-0 -z-10">
							<img
								src={BackgroundImg}
								alt="Background"
								className="w-full h-full object-cover scale-[0.79] fixed top-[9vh]"
							/>
						</div>

						{/* Content */}
						<div className="relative h-[86vh] w-[100vw]">
							<div className="relative h-[30vh]">
								<div className="absolute -inset-1 bg-[#23a7ff] min-h-[50%] rounded-[35px]"></div>
								<div className="absolute -inset-2 bg-[#23a7ff] min-h-[45%] blur rounded-[50px]"></div>
								<div className="bg-[#0C0C0C] min-h-[30vh] pt-5 px-2 relative rounded-br-3xl rounded-bl-3xl">
									{/* Header */}
									<div className="px-2 flex justify-between">
										<div className="flex">
											<div className="rounded-full bg-gray-700 text-white w-[42px] h-[42px] overflow-hidden flex items-center justify-center">
												{profilePic === 'not set' ? (
													<img src={DomeProfilePic} alt="img" width={70} className="rounded-full" />
												) : (
													<>
														<img src={profilePic} alt="Profile-Picture" className="rounded-full" />
													</>
												)}
											</div>
											<div className="pl-2 text-[#FFF]">
												<p className="font-medium text-sm">{username}</p>
												<p className="flex font-normal text-sm -top-1">(Founder)</p>
											</div>
										</div>

										{/* level & rank bar  */}
										<div
											onClick={() => handleRankings()}
											className="rounded-full bg-[#252525] min-w-[40%] px-4 py-1">
											<div className="flex items-center gap-2">
												<div className="text-[#FFF] font-normal text-xs">{level}</div>
												<div>
													<img src={AngleIcon} alt="Angle-Icon" />
												</div>
												<div className="text-[#FFF] text-xs font-normal pl-11">
													{currentRank}/10
												</div>
											</div>
											<div>
												{/* Progress bar */}
												<div className="w-full rounded-lg bg-gray-600 h-2 mt-1 overflow-hidden">
													<div
														className={`h-2 transition-all duration-300 ease-in-out rounded`}
														style={{
															width: `${levelPercentage}%`,
															background: `linear-gradient(to right, rgb(48 43 251), rgb(54 197 244))`,
														}}
													/>
												</div>
											</div>
										</div>
									</div>

									{/* Cards */}
									<div className="pt-6 flex justify-evenly items-center">
										{cards.map((data) => {
											const { id, img, data1, data2, isDone } = data;

											return (
												<div
													onClick={() => handleCardClick(data)}
													key={id}
													className="relative min-w-[20%]"
												>
													{data.isCommingSoon && (
														<>
															<div className="absolute -top-1 -right-1 px-1 py-1 z-50 text-white font-bold text-[6px] bg-blue-700 rounded-full">
																Comming Soon
															</div>
														</>
													)}
													{isDone ? (
														<div
															className="relative border border-[#0072ff] rounded-[14px] overflow-hidden">
															{/* Done sticker */}
															<div className="absolute top-0 left-0 bg-[#0072ff] text-white font-bold text-[9px] py-1 px-3 transform -rotate-45 origin-top-left"
																style={{ top: '37px', left: '-15px', width: '70px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
																Done
															</div>

															{/* Main content */}
															<div className="flex flex-col justify-center items-center p-2 h-20 bg-[#091e4b] rounded-[14px] gap-2">
																<div className="h-3">
																	<img src={img} alt="Logo" width="30" />
																</div>
																<div className="text-[#FFF] text-[10px] font-medium pt-4">
																	<div className="flex justify-center items-center">
																		<p className="text-[8px]">{data1}</p>
																	</div>
																	<p className="text-[8px]">{data2}</p>
																</div>
															</div>
														</div>
													) : (
														<div className={`relative py-[1px] px-[0.5px] rounded-[14px] overflow-hidden ${data.isCommingSoon && `opacity-60`}`}>
															<div className="flex flex-col justify-center items-center p-2 h-20 bg-[#1B1B27] rounded-[14px] gap-2 border-gradient">
																<div>
																	<img src={img} alt="Logo" width="30" />
																</div>
																<div className="text-[#FFF] text-[10px] font-medium">
																	<div className="flex justify-center items-center">
																		<p className="text-[8px]">{data1}</p>
																	</div>
																	<p className='text-[8px]'>{data2}</p>
																</div>
															</div>
														</div>
													)}
												</div>
											);
										})}
									</div>


									{/* Timers */}
									<div className="flex text-[#FFF] text-[10px] font-normal items-center justify-around pt-[2px] mr-1">
										{cards.map((time) => {
											const { id, timer } = time;
											return <div key={id}>{timer}</div>;
										})}
									</div>
								</div>
							</div>


							{/* Coins Details & Bot Image */}
							<div className="min-h-[56vh] flex flex-col justify-center items-center">
								{/* Coins per minute & balance */}
								<div className="flex items-center justify-start w-screen px-5 pt-6 h-[10vh]">
									{/* Coins Per Minute */}
									<div className="flex flex-col items-start gap-1">
										<div className="flex justify-center items-center gap-1">
											<div className="">
												<img className="pl-3" src={LittleCoin} alt="Coin-Icon" />
											</div>
											<div className="text-[#FFF] text-[11.655px] font-medium">
												<p>+{formatCoins(coinsPerMinute)}</p>
											</div>
										</div>
										<div className="flex justify-center items-center gap-1 pl-1">
											<div className="">
												<img src={InfoIcon} alt="Info-Icons" />
											</div>
											<div className="text-[#A4A4A4] text-[10.595px] font-medium">Coin Per Mine</div>
										</div>
									</div>

									{/* Balance */}
									<div className="mx-10 flex justify-center items-center gap-1">
										<div>
											<img src={BigCoin} alt="Coin-Icon" width="24" />
										</div>
										<div className="text-[#FFF] text-[24px] font-medium">{balance}</div>
									</div>
								</div>

								{/* Bot & Options */}
								<div className="flex justify-center items-center w-screen h-[41vh] mt-auto">
									{/* Bot Image Tap to earn */}
									<div
										onPointerDown={handleBotTap}
										ref={tapRef}
										className="relative flex justify-end items-center rounded-full h-[40vh] w-[60vw]"
									>

										<div className="relative select-none rounded-full w-full h-full z-10">
											{clicks.map((click) => (
												<div
													className='absolute text-2xl font-bold opacity-0 text-[#0072ff] z-50'
													style={{
														top: `${click.y - 42}px`,
														left: `${click.x - 28}px`,
														animation: `textAnimation 1s ease-out`,
													}}
													onAnimationEnd={() => handleAnimationEnd(click.id)}
													key={click.id}
												>
													+{addCoins}
												</div>
											))}
											<div className="absoulte h-full w-full rounded-full overflow-hidden flex items-center justify-center">
												{/* Animation Cards */}
												<div className="absolute z-0 w-[100vw] animate-rotatePulse">
													<img
														src={finalAnimationCircle}
														alt="final"
														ref={fadeRef}
														className={`transition-opacity duration-1000 ${disableEnergy ? '' : 'fade-out'}`}
													/>
												</div>

												<div className={`absolute z-30 ${disableEnergy ? 'scale-up' : 'scale-down fade-out'}`} ref={scaleRef}>
													<img
														src={midAnimationCircle}
														alt="start_animation"
														width={animationComplete ? 50 : 100}
														className="transition-all duration-1000"
													/>
												</div>
												<div className="absolute z-20">
													<img src={PandaCircleIcon} alt="Panda-circle" />
												</div>
												<div className="absolute z-50">
													<img src={BigPanda} alt="Panda-Icon" className="bot-tap" />
												</div>
												<div className="absolute z-50 top-[60%] left-[37%]">
													<img src={TouchIcon} alt="Touch-Icon" />
												</div>
											</div>
										</div>
									</div>

									{/* Side Booster Options */}
									<div className='absolute right-5 flex flex-col justify-center items-center gap-6'>
										{/* b-1 a */}
										<div className='relative flex justify-center items-center'>
											<div className='text-[#FFF] text-[10px] font-medium absolute -top-4 -right-1'>
												{avaliableUnlimitedTaps}/{5}
											</div>
											<div
												onClick={() => {
													setUnlimitedTapsPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={JetPack} alt='JetPack-Icon' className='p-1' />
											</div>
										</div>
										{/* b-1 b */}
										<div className='relative flex justify-center items-center'>
											<div className='text-[#FFF] text-[10px] font-medium absolute -top-4 -right-1'>
												{avaliableEnergyRefill}/{3}
											</div>
											<div
												onClick={() => {
													setEnergyRefillPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={BatteryBooster1} alt='BatteryBooster-Icon' className='p-1' />
											</div>
										</div>
										{/* b-1 c */}
										<div className='relative flex justify-center items-center'>
											<div
												onClick={() => {
													setMultitapsPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={TouchIcon} alt='TouchIcon-Icon' className='p-1' />
											</div>
										</div>
										{/* b-1 d */}
										<div className='relative flex justify-center items-center'>
											<div
												onClick={() => {
													setEnergyPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={BatteryBooster2} alt='BatteryBooster2-Icon' className='p-1' />
											</div>
										</div>
									</div>
								</div>

								{/* Energy Section */}
								<div className='flex w-screen mx-auto h-[5vh]'>
									<div className='flex mx-auto'>
										<div className='px-2'>
											<img
												src={FlashIcon}
												alt='Flash-Icon'
											/>
										</div>
										<div className='text-[#FFF] text-base font-medium'>
											{energy}/{energyLimit}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* 1 Unlimited Taps Popup */}
						{unlimitedTapsPopup && (
							<>
								<div
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
									className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end">
									<div
										style={{
											animation: `${popupClosing ? "closePopup" : "openPopup"
												} 0.5s ease-in-out forwards`,
										}}
									>
										<div
											className="relative bg-[#06060E] w-[100vw] h-[40vh] rounded-t-3xl p-6 text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div className="flex flex-col gap-3">
												<div className="flex justify-end">
													<span className="bg-gradient-to-t from-[#2226FF] to-[#00B2FF] text-xs py-1 rounded-lg px-2">
														{`Avalibale ${avaliableUnlimitedTaps}`}
													</span>
												</div>
												<div className="flex justify-center flex-col items-center gap-2">
													<img src={JetPack} alt="battery" width={25} />
													<h1 className="text-lg font-bold text-center">
														Unlimited Taps
													</h1>
												</div>
												<div className="text-center text-xs flex flex-col gap-4">
													<p>For each boost you will get unlimited taps, energy will not be deduced.</p>
													<p>∞ Taps per Boost</p>
												</div>
												{/* action buttons */}
												<div className='flex gap-4 justify-center mt-4'>
													<button
														className='w-1/2 p-2 bg-[#242434] rounded-lg text-sm'
														onClick={() => {
															setPopupClosing(true);
															setTimeout(() => {
																setUnlimitedTapsPopup(false);
																setPopupClosing(false);
															}, 500);
														}}
													>
														Cancel
													</button>
													<button
														className='w-1/2 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm'
														onClick={() => {
															// Upgrade Unlimited Taps
															handleUnlimitedTaps();
														}}
														disabled={avaliableUnlimitedTaps === 0}
													>
														{avaliableUnlimitedTaps === 0 ? ("Limit Reached!") : ('Confirm')}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* 2 Energy Upgrade Popup */}
						{energyRefillPopup && (
							<>
								<div
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
									className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end">
									<div
										style={{
											animation: `${popupClosing ? "closePopup" : "openPopup"
												} 0.5s ease-in-out forwards`,
										}}
									>
										<div className="relative bg-[#06060E] w-[100vw] h-[40vh] rounded-t-3xl p-4 text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div className="flex flex-col gap-3">
												<div className="flex justify-end">
													<span className="bg-gradient-to-t from-[#2226FF] to-[#00B2FF] text-xs py-1 rounded-lg px-2">
														{`Avalibale ${avaliableEnergyRefill}`}
													</span>
												</div>
												<div className="flex justify-center flex-col items-center gap-2">
													<img src={BatteryBooster1} alt="battery" width={25} />
													<h1 className="text-lg font-bold text-center">
														Energy Refill
													</h1>
												</div>
												<div className="text-center text-xs flex flex-col gap-4">
													<p>Each boost will give you max energy</p>
													<p>{energyLimit} energy per refill</p>
												</div>
												{/* action buttons */}
												<div className='flex gap-4 justify-center mt-4'>
													<button
														className='w-1/2 p-2 bg-[#242434] rounded-lg text-sm'
														onClick={() => {
															setPopupClosing(true);
															setTimeout(() => {
																setEnergyRefillPopup(false);
																setPopupClosing(false);
															}, 500);
														}}
													>
														Cancel
													</button>
													<button
														className='w-1/2 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm'
														onClick={() => {
															// Upgrade energy limit
															handleEnergyRefill()
														}}
														disabled={avaliableEnergyRefill === 0}
													>
														{avaliableEnergyRefill === 0 ? ("Limit Reached!") : ('Confirm')}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* 3 Energy Upgrade Popup */}
						{energyPopup && (
							<>
								<div
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
									className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end">
									<div
										style={{
											animation: `${popupClosing ? "closePopup" : "openPopup"
												} 0.5s ease-in-out forwards`,
										}}
									>
										<div className="relative bg-[#06060E] w-[100vw] h-[45vh] rounded-t-3xl p-4 text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div className="flex flex-col gap-3">
												<div className="flex justify-end">
													<span className="bg-gradient-to-t from-[#2226FF] to-[#00B2FF] text-xs py-1 rounded-lg px-2">
														{energyLevel >= 9 ? ('Max') : (`Level ${energyLevel + 1}`)}
													</span>
												</div>
												<div className="flex justify-center flex-col items-center gap-2">
													<img src={BatteryBooster1} alt="battery" width={25} />
													<h1 className="text-lg font-bold text-center">
														Energy Limit
													</h1>
												</div>
												<div className="text-center text-xs flex flex-col gap-4">
													<p>Increased energy limit by 1500</p>
													<p>+1500 per level</p>
													{energyLevel < 9 && (
														<span className="flex gap-4 justify-center items-center">
															Cost of level up
															<div className="flex justify-center items-center">
																<img src={BigCoin} alt="coin" width={20} />
																<p className="w-10">{energyUpgradeCost[energyLevel + 1]}</p>
															</div>
														</span>
													)}
												</div>
												{/* action buttons */}
												<div className='flex gap-4 justify-center mt-4'>
													<button
														className='w-1/2 p-2 bg-[#242434] rounded-lg text-sm'
														onClick={() => {
															setPopupClosing(true);
															setTimeout(() => {
																setEnergyPopup(false);
																setPopupClosing(false);
															}, 500);
														}}
													>
														Cancel
													</button>
													<button
														className='w-1/2 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm'
														onClick={() => {
															// Upgrade energy limit
															handleEnergyUpgrade()
														}}
														disabled={energyLevel >= 9}
													>
														{energyLevel >= 9 ? ("Max") : ('Confirm')}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* 4 - Multitap Upgrade Popup */}
						{multitapsPopup && (
							<>
								<div
									className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end"
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
								>
									<div
										style={{
											animation: `${popupClosing ? "closePopup" : "openPopup"
												} 0.5s ease-in-out forwards`,
										}}
									>
										<div className="relative bg-[#06060E] w-[100vw] h-[45vh] rounded-t-3xl p-4 text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div className="flex flex-col gap-3">
												<div className="flex justify-end">
													<span className="bg-gradient-to-t from-[#2226FF] to-[#00B2FF] text-xs py-1 rounded-lg px-2">
														{multitapLevel >= 9 ? ('Max') : (`Level ${multitapLevel + 1}`)}
													</span>
												</div>
												<div className="flex justify-center flex-col items-center gap-2">
													<img src={TouchIcon} alt="battery" width={25} />
													<h1 className="text-lg font-bold text-center">
														Multitap's
													</h1>
												</div>
												<div className="text-center text-xs flex flex-col gap-4">
													<p>Increased tap value by 1</p>
													<p>+1 per level</p>
													{multitapLevel < 9 && (
														<span className="flex gap-4 justify-center items-center">
															Cost of level up
															<div className="flex justify-center items-center">
																<img src={BigCoin} alt="coin" width={20} />
																<p className="w-10">{multitapUpgradeCost[multitapLevel + 1]}</p>
															</div>
														</span>
													)}
												</div>
												{/* action buttons */}
												<div className='flex gap-4 justify-center mt-4'>
													<button
														className='w-1/2 p-2 bg-[#242434] rounded-lg text-sm'
														onClick={() => {
															setPopupClosing(true);
															setTimeout(() => {
																setMultitapsPopup(false);
																setPopupClosing(false);
															}, 500);
														}}
													>
														Cancel
													</button>
													<button
														className='w-1/2 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm'
														onClick={() => {
															// Upgrade multitap limit
															handleMultitapUpgrade()
														}}
														disabled={multitapLevel >= 9}
													>
														{multitapLevel >= 9 ? ("Max") : ('Confirm')}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* Daily Reward Popup */}
						{dailyRewardPopup && (
							<>
								<div
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
									className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end"
								>
									<div
										style={{
											animation: `${popupClosing ? "closePopup" : "openPopup"
												} 0.5s ease-in-out forwards`,
										}}
									>
										<div
											className="relative bg-[#06060E] w-[100vw] h-[80vh] rounded-t-3xl p-4 text-white">
											<div className="absolute left-0 -top-10">
												<img src={rightreward} alt="" />
											</div>
											<div className="absolute bottom-0 right-0">
												<img src={leftreward} alt="" />
											</div>
											<div className="absolute left-0 bottom-20">
												<img src={leftbox} alt="" />
											</div>
											<div className="absolute bottom-0 right-0">
												<img src={rightbox} alt="" />
											</div>
											<div className="absolute bottom-0 -inset-1 bg-[#23A7FF] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23A7FF] blur rounded-[50px] -z-10"></div>
											<div className="flex flex-col gap-4 items-center justify-center z-50">
												<p className="w-16 border-b-4 rounded-md"></p>
												<h1 className="text-2xl font-semibold">Daily Reward</h1>
												<p className="text-xs text-center text-[#CACACA]">
													Earn Coins by logging in game daily! Don't miss a day, or your streak will reset!
												</p>
												<div className="overflow-scroll w-[90vw] h-[50vh] flex flex-wrap gap-4 justify-center items-center">
													{days.map((day, index) => (
														<div
															key={index}
															className={`border-2 relative w-[23vw] h-[14vh] border-[#AFABAB] rounded-lg pt-2 flex flex-col gap-2 ${index === 6 ? "w-[80vw]" : ""
																} ${currentDay >= day
																	? "bg-[#2E60B2]"
																	: "bg-[#767676]"
																} ${claimed.includes(day) ? "bg-[#767676]" : ""
																}`}
														>
															<div>
																<div
																	className={`${claimed.includes(day)
																		? "bg-[#474750]"
																		: "bg-[#1942EC]"
																		} mr-6 flex w-[20vw] shadow-inherit shadow-xl items-center justify-center rounded-r-md text-white`}
																>
																	<h1 className="font-semibold text-sm">Day {day + 1}</h1>
																</div>
																<div className="flex flex-col items-center mt-2 gap-1">
																	{claimed.includes(day) ? (
																		<div className="bg-[#D9D9D9] rounded-full h-6 w-6 flex items-center justify-center">
																			<img
																				src={tick}
																				width={25}
																				alt="tick"
																			/>
																		</div>
																	) : (
																		<>
																			{index === 6 ? (
																				<img
																					className="absolute top-6"
																					src={day7coin}
																					width={80}
																					alt="Big Coin"
																				/>
																			) : (
																				<img
																					src={BigCoin}
																					width={30}
																					alt="Big Coin"
																				/>
																			)}
																		</>
																	)}

																	{index === 6 ? (
																		<h2
																			className={`text-md text-[#000000] absolute bottom-1 font-medium ${claimed.includes(day) &&
																				"text-[#393838]"
																				} ${currentDay === day &&
																				"text-[#ffffff]"
																				}`}
																		>
																			{reward[day]}
																		</h2>
																	) : (
																		<h2
																			className={`text-md text-[#000000] font-medium ${claimed.includes(day) &&
																				"text-[#393838]"
																				} ${currentDay === day &&
																				"text-[#ffffff]"
																				}`}
																		>
																			{reward[day]}
																		</h2>
																	)}
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
											{/* action buttons */}
											<div className="flex gap-4 justify-center mt-8">
												<button
													className="w-1/3 p-2 bg-[#242434] rounded-xl text-sm z-50 border-b-4 border-b-[#191922] shadow-zinc-900"
													onClick={handleDailyRewardClaim}
													disabled={claimed.includes(currentDay)}
												>
													Claim
												</button>
											</div>
											<div className="absolute top-4 right-5">
												<button onClick={() => {
													setPopupClosing(true);
													setTimeout(() => {
														setDailyRewardPopup(false);
														setPopupClosing(false);
													}, 500);
												}}>
													<img src={close} alt="" width={25} />
												</button>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
