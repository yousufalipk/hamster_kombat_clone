import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/index';

import DailyGamePlayImg from '../../assets/optimizedImages/Home/dailyGamePlay.svg';
import DailyRewardImg from '../../assets/optimizedImages/Home/dailyReward.svg';
import DailyComboImg from '../../assets/optimizedImages/Home/dailyCombo.svg';

import Panda1 from '../../assets/optimizedImages/Home/Pandas/1.webp';
import Panda2 from '../../assets/optimizedImages/Home/Pandas/2.webp';
import Panda3 from '../../assets/optimizedImages/Home/Pandas/3.webp';
import Panda4 from '../../assets/optimizedImages/Home/Pandas/4.webp';
import Panda5 from '../../assets/optimizedImages/Home/Pandas/5.webp';
import Panda6 from '../../assets/optimizedImages/Home/Pandas/6.webp';
import Panda7 from '../../assets/optimizedImages/Home/Pandas/7.webp';
import Panda8 from '../../assets/optimizedImages/Home/Pandas/8.webp';
import Panda9 from '../../assets/optimizedImages/Home/Pandas/9.webp';
import Panda10 from '../../assets/optimizedImages/Home/Pandas/10.webp';
import Panda11 from '../../assets/optimizedImages/Home/Pandas/11.webp';
import Panda12 from '../../assets/optimizedImages/Home/Pandas/12.webp';
import Panda13 from '../../assets/optimizedImages/Home/Pandas/13.webp';
import Panda14 from '../../assets/optimizedImages/Home/Pandas/14.webp';

import Booster1Img from '../../assets/optimizedImages/Home/Boosters/b1.webp';
import Booster2Img from '../../assets/optimizedImages/Home/Boosters/b2.webp';
import Booster3Img from '../../assets/optimizedImages/Home/Boosters/b3.webp';
import Booster4Img from '../../assets/optimizedImages/Home/Boosters/b4.webp';

import BigCoin from '../../assets/optimizedImages/BigCoin.svg';
import SmallCoin from '../../assets/optimizedImages/SmallCoin.svg';
import CirclesBackgroundImg from '../../assets/optimizedImages/Home/bg.svg';

import LargeBooster1Img from '../../assets/optimizedImages/Home/Boosters/large/tapBooster.svg';
import LargeBooster2Img from '../../assets/optimizedImages/Home/Boosters/large/energyRefill.svg';
import LargeBooster3Img from '../../assets/optimizedImages/Home/Boosters/large/multiTap.svg';
import LargeBooster4Img from '../../assets/optimizedImages/Home/Boosters/large/energyLimit.svg';

import LeftPopupEllipse from '../../assets/optimizedImages/popup/leftEllipse.webp';
import RightPopupEllipse from '../../assets/optimizedImages/popup/rightEllipse.webp';
import PopupHorizontalLine from '../../assets/optimizedImages/popup/horizontalLine.webp';
import CrossImg from '../../assets/optimizedImages/closeButton.svg';

import DaiyCurrentDayBg from '../../assets/dailyreward/dailyCurrentDay.jpg';

import PandaCircleIcon from "../../assets/PandaCircleIcon.svg";
import midAnimationCircle from '../../assets/animation/1.png';
import finalAnimationCircle from '../../assets/animation/2.png';

import InfoIcon from "../../assets/InfoIcon.svg";
import CpmInfoBg from '../../assets/cpmPopupBg.svg';
import FlashIcon from "../../assets/lighteningIcon.png";
import AngleIcon from "../../assets/AngleIcon.svg";
import DomeProfilePic from "../../assets/profile.png";
import padaIcon from "../../assets/pages/pandaicon.svg"

import tick from "../../assets/dailyreward/tick.svg";
import day7coin from "../../assets/dailyreward/day7coin.svg";

import leftbox from '../../assets/dailyreward/gift1.svg';
import rightbox from '../../assets/dailyreward/gift2.svg';

import CommingSoon from '../../assets/root/comingSoon.svg';



const Home = () => {

	const {
		userId,
		userDataInitilized,
		firstName,
		level,
		levelName,
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
		coinsPerMinute,
		remaningTime,
		avaliableCpm,
		claimCpmCoins,
		setAvaliableCpm,
		levelsData,
		comboCards,
		formatBalance,
		formatNumberWithSuffix,
		energyUpgradeCost,
		energyLimits,
		multitapUpgradeCost,
		multitapValues,
		triggerToast,
		equippedSkin
	} = useUser();

	const [isRefilling, setIsRefilling] = useState(false);

	const accumulatedEnergyRef = useRef(energy);

	const refillIntervalRef = useRef(null);

	const refillDuration = 800;

	const incrementValue = 1;

	const startRefillInterval = () => {
		if (refillIntervalRef.current) {
			clearInterval(refillIntervalRef.current);
		}
		refillIntervalRef.current = setInterval(() => {
			setEnergy((prevEnergy) => {
				if (isNaN(prevEnergy) || prevEnergy >= energyLimit) {
					clearInterval(refillIntervalRef.current);
					setIsRefilling(false);
					return energyLimit;
				}

				const newEnergy = Math.min(prevEnergy + incrementValue, energyLimit);

				if (!isNaN(newEnergy)) {
					accumulatedEnergyRef.current = newEnergy;
				}
				return newEnergy;
			});
		}, 1000);
	};

	const refillEnergy = () => {
		setIsRefilling(true);
		startRefillInterval();
	};

	useEffect(() => {
		if (energy < energyLimit) {
			refillEnergy();
		}
	}, [energy]);

	useEffect(() => {
		if (userId) {
			if (refillIntervalRef.current) {
				clearInterval(refillIntervalRef.current);
			}

			const storedEnergy = localStorage.getItem("energy");
			const lastRefillTime = localStorage.getItem("lastRefillTime");

			let energyValue = storedEnergy ? Number(storedEnergy) : energyLimit;
			let lastTime = lastRefillTime ? Number(lastRefillTime) : Date.now();

			if (!isNaN(energyValue) && energyValue >= 0 && !isNaN(lastTime) && lastTime > 0) {
				const elapsedTime = Date.now() - lastTime;
				const elapsedSteps = Math.floor(elapsedTime / refillDuration);
				const restoredEnergy = Math.min(energyValue + elapsedSteps * incrementValue, energyLimit);

				if (restoredEnergy >= 0) {
					setEnergy(restoredEnergy);

					if (restoredEnergy < energyLimit) {
						setIsRefilling(true);
						refillEnergy();
					}
				}
			} else {
				setEnergy(energyLimit);
			}

			localStorage.setItem("energy", energyValue);
			localStorage.setItem("lastRefillTime", lastTime);
		}
	}, [userId, refillDuration, incrementValue, energyLimit]);

	const pandaMapping = {
		0: Panda1,
		1: Panda2,
		2: Panda3,
		3: Panda4,
		4: Panda5,
		5: Panda6,
		6: Panda7,
		7: Panda8,
		8: Panda9,
		9: Panda10,
		10: Panda11,
		11: Panda12,
		12: Panda13,
		13: Panda14,
	};

	const days = [0, 1, 2, 3, 4, 5, 6];
	const reward = [500, 1000, 1500, 2000, 2500, 3000, 3500];

	const staticUser = process.env.REACT_APP_STATIC_USER;

	const getRandomName = () => {
		const randomNames = ["John Doe", "Jane Smith", "Alex Johnson", "Chris Lee", "Taylor Brown"];
		return randomNames[Math.floor(Math.random() * randomNames.length)];
	};

	const [clicks, setClicks] = useState([]);
	const [isTapped, setIsTapped] = useState(false);
	const tapRef = useRef(null);
	const isUpdating = useRef(false);

	// 4 Boosters Popup States 

	const [popupClosing, setPopupClosing] = useState(false);

	const [energyPopup, setEnergyPopup] = useState(false);
	const [multitapsPopup, setMultitapsPopup] = useState(false);
	const [unlimitedTapsPopup, setUnlimitedTapsPopup] = useState(false);
	const [energyRefillPopup, setEnergyRefillPopup] = useState(false);
	const [dailyRewardPopup, setDailyRewardPopup] = useState(false);
	const [cpmInfo, setCpmInfo] = useState(false);

	const [dots, setDots] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);

	// Animation States
	const [animationComplete, setAnimationComplete] = useState(false);
	const scaleRef = useRef(null);
	const fadeRef = useRef(null);

	const [animatedBalance, setAnimatedBalance] = useState(balance);

	// Bot scaling on tap effect 
	const handleTap = () => {
		setIsTapped(true);
		setTimeout(() => setIsTapped(false), 150);
	};

	useEffect(() => {
		const duration = 1000;
		const stepTime = 10;
		const steps = duration / stepTime;
		const difference = balance - animatedBalance;
		const stepValue = difference / steps;

		if (difference !== 0) {
			let currentStep = 0;

			const animate = () => {
				currentStep++;
				setAnimatedBalance((prev) =>
					currentStep < steps ? prev + stepValue : balance
				);

				if (currentStep < steps) {
					requestAnimationFrame(animate);
				}
			};

			animate();
		}
	}, [balance]);

	useEffect(() => {
		let interval;
		if (buttonLoading) {
			interval = setInterval(() => {
				setDots(prev => (prev.length < 4 ? prev + '.' : ''));
			}, 300);
		} else {
			setDots('');
		}
		return () => clearInterval(interval);
	}, [buttonLoading]);

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
			tele.isClosingConfirmationEnabled = true;
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
			navigate('/hammer');
		}
		else if (data.id === 4) {
			navigate('/');
		}
	}

	// Handle multiple taps
	const handleBotTap = (e) => {
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

					let newEnergy;

					setClicks((prevClicks) => [...prevClicks, newClick]);

					// Reduce Energy - 1 per tap
					if (!disableEnergy) {
						setEnergy((prevEnergy) => {
							newEnergy = Math.max(prevEnergy - 1, 0);
							accumulatedEnergyRef.current = newEnergy;
							if (isNaN(newEnergy) || newEnergy === undefined || newEnergy === null) {
								return energyLimit;
							} else {
								return newEnergy;
							}
						});
						if (newEnergy) {
							localStorage.setItem("energy", newEnergy);
							localStorage.setItem("lastRefillTime", Date.now());
						}

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
			img: DailyGamePlayImg,
			data1: "Daily Game Play",
			timer: "00:00:00",
			isDone: false,
			isCommingSoon: true,
		},
		{
			id: 2,
			img: DailyRewardImg,
			data1: "Daily Reward",
			timer: "13:11:35",
			isDone: claimed.includes(currentDay) ? true : false,
			isCommingSoon: false,
		},
		{
			id: 3,
			img: DailyComboImg,
			data1: "Daily Combo",
			timer: "00:00:00",
			isDone: comboCards.length >= 2 ? true : false,
			isCommingSoon: false,
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

	const handleUnlimitedTaps = async () => {
		try {
			setButtonLoading(true);
			const res = await unlimitedTapsUpgrade();

			if (res.success) {
				setUnlimitedTapsPopup(false);
				triggerToast(res.mess, 'success');
			} else {
				setUnlimitedTapsPopup(false);
				triggerToast(res.mess, 'error');
			}
		} catch (error) {
			console.log("Error upgrading unlimited taps!", error);
			triggerToast('Internal Server Error', 'error');
		} finally {
			setButtonLoading(false);
		}
	}

	const handleEnergyRefill = async () => {
		try {
			setButtonLoading(true);
			const res = await energyRefillUpgrade();

			if (res.success) {
				setEnergyRefillPopup(false);
				triggerToast(res.mess, 'success');
			} else {
				setEnergyRefillPopup(false);
				triggerToast(res.mess, 'error');
			}

		} catch (error) {
			console.log("Error Refilling Energy!", error);
			triggerToast('Internal Server Error', 'error');
		} finally {
			setButtonLoading(false);
		}
	}

	const handleEnergyUpgrade = async () => {
		setButtonLoading(true);
		const res = await energyUpgrade();
		if (res.success) {
			triggerToast('Energy Limit Upgraded!', 'success');
			setEnergyPopup(false);
		} else {
			triggerToast(res.mess, 'error');
			setEnergyPopup(false);
		}
		setButtonLoading(false);
	}

	const handleMultitapUpgrade = async () => {
		setButtonLoading(true);
		const res = await multitapUpgrade();
		if (res.success) {
			triggerToast('Multitap Level Upgraded!', 'success');
			setMultitapsPopup(false);
		} else {
			triggerToast(res.mess, 'error');
			setMultitapsPopup(false);
		}
		setButtonLoading(false);
	}


	const handleDailyRewardClaim = async () => {
		setButtonLoading(true);
		const res = await claimDailyReward();
		if (res.success) {
			triggerToast('Daily Reward Claimed Succesfuly!', 'success');
			setDailyRewardPopup(false);
		} else {
			triggerToast(res.mess, 'error');
		}
		setButtonLoading(false);
	}

	const handleClaimCpm = async () => {
		setButtonLoading(true);
		try {
			const res = await claimCpmCoins();
			if (res.success) {
				triggerToast(res.mess, 'success');
			} else {
				triggerToast(res.mess, 'error');
			}
		} catch (error) {
			triggerToast('Internal Server Error!', 'error');
		} finally {
			setButtonLoading(false);
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
								src={CirclesBackgroundImg}
								alt="Background"
								className="scale-95 object-cover fixed top-[21vh]"
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
												<p className="font-medium text-sm">{firstName || getRandomName()}</p>
												<p className="flex font-normal text-sm -top-1">(Founder)</p>
											</div>
										</div>

										{/* level & rank bar  */}
										<div
											onClick={() => handleRankings()}
											className="rounded-full bg-[#252525] min-w-[40%] px-4 py-1">
											<div className="flex items-center gap-2">
												<div className="text-[#FFF] font-normal text-xs">{levelName}</div>
												<div>
													<img src={AngleIcon} alt="Angle-Icon" />
												</div>
												<div className="text-[#FFF] text-xs font-normal pl-11">
													{level}/{levelsData.length}
												</div>
											</div>
											<div>
												{/* Progress bar */}
												<div className="w-full rounded-lg bg-gray-600 h-2 mt-1 overflow-hidden">
													<div
														className={`h-2 transition-all duration-300 ease-in-out rounded`}
														style={{
															width: `${levelPercentage || 0}%`,
															background: `linear-gradient(to right, rgb(48 43 251), rgb(54 197 244))`,
														}}
													/>
												</div>
											</div>
										</div>
									</div>

									{/* Cards */}
									<div className="pt-8 flex justify-evenly items-center">
										{cards.map((data) => {
											const { id, img, data1, isDone } = data;

											return (
												<div
													onClick={() => handleCardClick(data)}
													key={id}
													className="relative min-w-[25%]"
												>
													{data.isCommingSoon && (
														<>
															<div className="absolute top-0 -right-1 z-50">
																<img src={CommingSoon} alt="comming_soon" />
															</div>
														</>
													)}
													{isDone ? (
														<>
															<div
																className="relative border border-[#23a7ff] rounded-[14px] overflow-hidden">
																{/* Done sticker */}
																<div className="absolute top-0 left-0 bg-[#0072ff] text-white font-bold text-[9px] py-1 px-3 transform -rotate-45 origin-top-left"
																	style={{ top: '37px', left: '-15px', width: '70px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
																	Done
																</div>

																{/* Main content */}
																<div className={`flex flex-col justify-center items-center p-2 h-20 ${data.isCommingSoon ? `bg-[#1B1B27]` : `bg-[#162B58]`} rounded-[14px] gap-2`}>
																	<div className="h-[70%] flex justify-center items-center">
																		<img src={img} alt="Logo" />
																	</div>
																	<div className="h-[30%] text-[#FFF] text-[10px] font-medium flex justify-center items-start">
																		<div className="flex justify-center items-center">
																			<p className={`text-[11px] ${data.isCommingSoon && `text-gray-400`}`}>{data1}</p>
																		</div>
																	</div>
																</div>
															</div>
															<div className="w-full h-[2vh] flex justify-center items-center">
																{
																	id === 2 ?
																		(claimed.includes(currentDay) && (
																			<>
																				<div className="text-white text-[10px] mt-3 flex justify-center items-center">
																					{remaningTime}
																				</div>
																			</>
																		))
																		: id === 3 ?
																			(comboCards.length >= 2 && (
																				<>
																					<div className="text-white text-[10px] mt-3 flex justify-center items-center">
																						{remaningTime}
																					</div>
																				</>
																			))
																			: null
																}
															</div>
														</>
													) : (
														<>
															<div
																className={`relative ${data.isCommingSoon ? `shadow-white shadow-inner` : `border border-[#23a7ff] shadow-[0_0_10px_0px_rgba(35, 167, 255, 1)]`}  rounded-[14px] overflow-hidden`}>
																{/* Main content */}
																<div className={`flex flex-col justify-center items-center p-2 h-20 ${data.isCommingSoon ? `bg-[#1B1B27]` : `bg-[#162B58]`} rounded-[14px] gap-2`}>
																	<div className="h-[70%] flex justify-center items-center">
																		<img src={img} alt="Logo" width="40" />
																	</div>
																	<div className="h-[30%] text-[#FFF] text-[10px] font-medium flex justify-center items-start">
																		<div className="flex justify-center items-center">
																			<p className={`text-[10px] ${data.isCommingSoon && `text-gray-400`}`}>{data1}</p>
																		</div>
																	</div>
																</div>
															</div>
															<div className="w-full h-[2vh] flex justify-center items-center">
																{
																	id === 2 ?
																		(claimed.includes(currentDay) && (
																			<>
																				<div className="text-white text-[10px] mt-3 flex justify-center items-center">
																					{remaningTime}
																				</div>
																			</>
																		))
																		: id === 3 ?
																			(comboCards.length >= 2 && (
																				<>
																					<div className="text-white text-[10px] mt-3 flex justify-center items-center">
																						{remaningTime}
																					</div>
																				</>
																			))
																			: null
																}
															</div>
														</>
													)}
												</div>
											);
										})}
									</div>
								</div>
							</div>

							{/* Coins Details & Bot Image */}
							<div className="min-h-[56vh] w-full flex flex-col justify-center items-center">

								{/* Coins per minute & balance */}
								<div className="w-full flex items-center justify-start px-5 pt-6 h-[10vh]">
									{/* Coins Per Minute */}
									<button
										onClick={() => { setCpmInfo(true) }}
										className="absolute w-[25%] z-20 flex flex-col justify-center items-start gap-1">
										<div className="flex justify-start items-center">
											<div className="">
												<img src={SmallCoin} alt="Coin-Icon" />
											</div>
											<div className="text-[#FFF] text-[11.655px] font-medium">
												<p>+{formatNumberWithSuffix(coinsPerMinute)}</p>
											</div>
										</div>
										<div className="flex justify-center items-center gap-1 pl-3">
											<div className="">
												<img src={InfoIcon} alt="Info-Icons" />
											</div>
											<div className="text-[#A4A4A4] text-[10.595px] font-medium">CPM</div>
										</div>
									</button>

									{/* Balance */}
									<div className="w-full flex justify-center items-center gap-1">
										<div>
											<img src={BigCoin} alt="Coin-Icon" width="24" />
										</div>
										<div className="text-[#FFF] text-[24px] font-medium">{formatBalance(balance)}</div>
									</div>
								</div>

								{/* Bot & Options */}
								<div
									className="flex justify-center items-center w-full h-[42vh]"
								>
									{/* +1 animation per tap */}
									{clicks.map((click) => (
										<div
											className='absolute text-2xl font-bold opacity-0 text-[#0072ff] z-50'
											style={{
												top: `${click.y - (-230)}px`,
												left: `${click.x - (-30)}px`,
												animation: `textAnimation 1s ease-out`,
											}}
											onAnimationEnd={() => handleAnimationEnd(click.id)}
											key={click.id}
										>
											+{addCoins}
										</div>
									))}

									{/* Animation Cards */}
									<div
										className="absolute z-0 w-[100vw] animate-rotatePulse pointer-events-none">
										<img
											src={finalAnimationCircle}
											alt="final"
											ref={fadeRef}
											className={`transition-opacity duration-1000 ${disableEnergy ? '' : 'fade-out'}`}
										/>
									</div>

									<div className={`pointer-events-none absolute z-30 ${disableEnergy ? 'scale-up' : 'scale-down fade-out'}`} ref={scaleRef}>
										<img
											src={midAnimationCircle}
											alt="start_animation"
											width={animationComplete ? 50 : 100}
											className="transition-all duration-1000"
										/>
									</div>

									{/* Bot Image Tap to earn */}
									<div
										onPointerDown={(e) => {
											handleTap();
											handleBotTap(e);
										}}
										ref={tapRef}
										className="relative flex justify-end items-center h-[40vh] w-[60vw] overflow-hidden"
									>
										<div className="relative select-none rounded-full w-full h-full z-10 overflow-visible">
											<div
												className="absoulte h-full w-full rounded-full overflow-hidden flex items-center justify-center"
											>
												<div className="absolute z-20">
													<img src={PandaCircleIcon} alt="Panda-circle" />
												</div>
												<div className="absolute z-40">
													<img
														src={pandaMapping[equippedSkin] ?? pandaMapping[level - 1]}
														alt="Panda-Icon"
														className={`rounded-full transition-transform ease-out duration-150 ${isTapped ? "scale-110" : ""
															}`}
														width={100}
													/>
												</div>
											</div>
										</div>
									</div>

									{/* Side Booster Options */}
									<div className='z-50 absolute right-5 flex flex-col justify-center items-center gap-6'>
										{/* b-1 a */}
										<div className='relative flex justify-center items-center'>
											<div className='text-[#FFF] text-[10px] font-medium absolute -top-4 -right-1'>
												{avaliableUnlimitedTaps}/{5}
											</div>
											<div
												onClick={(e) => {
													e.stopPropagation()
													setUnlimitedTapsPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={Booster1Img} alt='JetPack-Icon' className='p-1' />
											</div>
										</div>
										{/* b-1 b */}
										<div className='relative flex justify-center items-center'>
											<div className='text-[#FFF] text-[10px] font-medium absolute -top-4 -right-1'>
												{avaliableEnergyRefill}/{3}
											</div>
											<div
												onClick={(e) => {
													e.stopPropagation()
													setEnergyRefillPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={Booster2Img} alt='BatteryBooster-Icon' className='p-1' />
											</div>
										</div>
										{/* b-1 c */}
										<div className='relative flex justify-center items-center'>
											<div
												onClick={(e) => {
													e.stopPropagation()
													setMultitapsPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={Booster3Img} alt='TouchIcon-Icon' className='p-1' />
											</div>
										</div>
										{/* b-1 d */}
										<div className='relative flex justify-center items-center'>
											<div
												onClick={(e) => {
													e.stopPropagation()
													setEnergyPopup(true);
												}}
												className='relative z-10 rounded-full min-w-[46px] min-h-[46px] bg-gradient-to-r from-[#1344C2] to-[#1A5FF2] flex justify-center items-center border-[#1A5FF2] border-[1px]'
												style={{
													boxShadow: '0 12px 10px rgba(0, 0, 0, 0.9), 0 4px 10px rgba(0, 173, 255, 0.6)',
												}}
											>
												<img src={Booster4Img} alt='BatteryBooster2-Icon' className='p-1' />
											</div>
										</div>
									</div>
								</div>

								{/* Energy Section */}
								<div className='flex justify-center w-screen mx-auto h-[5vh] relative'>
									<div className='flex mx-auto absolute -top-2'>
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

						{/* 1 Final Unlimited Taps Popup */}
						{unlimitedTapsPopup && (
							<>
								<div
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setUnlimitedTapsPopup(false);
											setPopupClosing(false);
										}, 500);
									}}
									className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 flex items-end"
								>
									<div
										onClick={(e) => e.stopPropagation()}
										className="w-full h-[54vh] popup-content">
										<div
											style={{
												animation: `${popupClosing ? "closePopup" : "openPopup"
													} 0.5s ease-in-out forwards`,
											}}
										>
											<div
												className="relative bg-[#06060E] w-[100vw] h-[54vh] rounded-t-3xl p-6 text-white">
												<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
												<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>

												{/* Main */}
												<div className="w-full h-[45vh] flex flex-col">
													{/* Left top ellipse */}
													<div className="-left-10 -top-20 w-52 h-52 absolute">
														<img src={LeftPopupEllipse} alt="popup-ellipse" />
													</div>
													{/* Right bottom ellipse */}
													<div className="-right-10 -bottom-5 w-52 h-52 absolute">
														<img src={RightPopupEllipse} alt="popup-ellipse" />
													</div>
													<div className="popup-main">
														{/* Cross Button */}
														<button
															onClick={() => {
																setPopupClosing(true);
																setTimeout(() => {
																	setUnlimitedTapsPopup(false);
																	setPopupClosing(false);
																}, 500);
															}}
															style={{
																zIndex: 60
															}}
															className="w-12 h-12 absolute right-0 top-0 flex justify-center items-center"
														>
															<img src={CrossImg} alt="crossImg" />
														</button>
														{/* Top White Bar */}
														<h1 className="border-2 rounded-full border-gray-200 w-[20vw] mx-auto absolute top-3 left-[40%]"></h1>

														{/* Logo, Title & Desc */}
														<div className="relative z-50 h-[25vh] flex justify-center flex-col items-center py-4">

															<div className='flex justify-center absolute top-3'>
																<div>
																	<div
																		style={{
																			borderRadius: '100%',
																			transform: 'translateZ(0)',
																			filter: 'drop-shadow(0 0 15px #BF95E9)',
																		}}
																	>
																		<img
																			src={LargeBooster1Img}
																			alt='token_Icon'
																			width='60'
																			style={{
																				borderRadius: '12px',
																			}}
																		/>
																	</div>
																</div>
															</div>
															<div className="absolute bottom-3 flex flex-col gap-1">
																<h1 className="text-2xl popup-heading text-center">
																	Tap Booster
																</h1>
																<p className="text-[14px] font-light text-center">
																	Tap as much as you can within 30 secs, energy will not be deducted.
																</p>
															</div>
														</div>

														{/* Reward, Line, Cost */}
														<div className="relative z-50 w-full h-[15vh] flex flex-col items-center gap-2 py-2">

															{/* Reward*/}
															<div className="w-full h-[6vh] flex justify-center items-center">
																<p className="text-customOrange text-[22px] border-2 border-borderGray rounded-lg px-2 text-center">
																	x2 Unlimited Taps
																</p>
															</div>

															{/* Line */}
															<div className="w-full h-[3vh] flex justify-center items-center">
																<img src={PopupHorizontalLine} alt="popUp_horizontal_line" />
															</div>

															{/* Cost Section */}
															<div className="w-full h-[6vh] flex justify-center items-center -mt-2 gap-1">
																<img src={BigCoin} alt="big_coin" width={25} />
																<p className="text-customOrange text-[30px]">Free</p>
															</div>
														</div>

														{/* Buttons */}
														<div className="w-full h-[5vh]">
															<button
																className={`w-full h-12 z-50 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg ${avaliableUnlimitedTaps === 0 && `grayscale`}`}
																onClick={() => {
																	handleUnlimitedTaps();
																}}
																disabled={avaliableUnlimitedTaps === 0 || buttonLoading}
															>
																{buttonLoading ? (
																	<span className="flex justify-center items-center font-semibold text-5xl w-full">
																		<p className="absolute -mt-6">
																			{dots}
																		</p>
																	</span>
																) : (
																	avaliableUnlimitedTaps === 0 ? (
																		'Come back tomorrow'
																	) : (
																		'Boost'
																	)
																)}
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* 2 Final Energy Upgrade Popup */}
						{energyRefillPopup && (
							<>
								<div
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setEnergyRefillPopup(false);
											setPopupClosing(false);
										}, 500);
									}}
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
											onClick={(e) => e.stopPropagation()}
											className="popup-overlay"
										>
											<div
												className="relative bg-[#06060E] w-[100vw] h-[50vh] rounded-t-3xl p-6 text-white">
												<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
												<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>

												{/* Main */}
												<div className="w-full h-[40vh] flex flex-col">
													{/* Left top ellipse */}
													<div className="-left-10 -top-20 w-52 h-52 absolute">
														<img src={LeftPopupEllipse} alt="popup-ellipse" />
													</div>
													{/* Right bottom ellipse */}
													<div className="-right-10 -bottom-5 w-52 h-52 absolute">
														<img src={RightPopupEllipse} alt="popup-ellipse" />
													</div>
													<div className="popup-main">
														{/* Cross Button */}
														<button
															onClick={() => {
																setPopupClosing(true);
																setTimeout(() => {
																	setEnergyRefillPopup(false);
																	setPopupClosing(false);
																}, 500);
															}}
															style={{
																zIndex: 60
															}}
															className="w-12 h-12 absolute right-0 top-0 flex justify-center items-center"
														>
															<img src={CrossImg} alt="crossImg" />
														</button>
														{/* Top White Bar */}
														<h1 className="border-2 rounded-full border-gray-200 w-[20vw] mx-auto absolute top-3 left-[40%]"></h1>

														{/* Logo, Title & Desc */}
														<div className="relative z-50 h-[25vh] flex justify-center flex-col items-center py-4">

															<div className='flex justify-center absolute top-3'>
																<div>
																	<div
																		style={{
																			borderRadius: '100%',
																			transform: 'translateZ(0)',
																			filter: 'drop-shadow(0 0 15px #ADFFB7)',
																		}}
																	>
																		<img
																			src={LargeBooster2Img}
																			alt='token_Icon'
																			width='45'
																			style={{
																				borderRadius: '12px',
																			}}
																		/>
																	</div>
																</div>
															</div>
															<div className="absolute bottom-3 flex flex-col gap-1">
																<h1 className="text-2xl popup-heading text-center">
																	Energy Refill
																</h1>
																<p className="text-[14px] font-light text-center">
																	Refill Energy to maximum
																</p>
															</div>
														</div>

														{/* Reward, Line, Cost */}
														<div className="relative z-50 w-full h-[15vh] flex flex-col items-center gap-2 py-2">

															{/* Line */}
															<div className="w-full h-[3vh] flex justify-center items-center">
																<img src={PopupHorizontalLine} alt="popUp_horizontal_line" />
															</div>

															{/* Cost Section */}
															<div className="w-full h-[6vh] flex justify-center items-center -mt-2 gap-1">
																<img src={BigCoin} alt="big_coin" width={25} />
																<p className="text-customOrange text-[30px]">Free</p>
															</div>
														</div>

														{/* Buttons */}
														<div className="w-full h-[5vh] -mt-7">
															<button
																className={`w-full h-12 z-50 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg ${avaliableEnergyRefill === 0 && `grayscale`}`}
																onClick={() => {
																	handleEnergyRefill();
																}}
																disabled={avaliableEnergyRefill === 0 || buttonLoading}
															>
																{buttonLoading ? (
																	<span className="flex justify-center items-center text-5xl font-bold w-full">
																		<p className="absolute -mt-6">
																			{dots}
																		</p>
																	</span>
																) : (
																	avaliableEnergyRefill === 0 ? (
																		'Come back tomorrow'
																	) : (
																		'Refill'
																	)
																)}
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* 3 Final Energy Upgrade Popup */}
						{energyPopup && (
							<>
								<div
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setEnergyPopup(false);
											setPopupClosing(false);
										}, 500);
									}}
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
											onClick={(e) => e.stopPropagation()}
										>
											<div
												className="relative bg-[#06060E] w-[100vw] h-[58vh] rounded-t-3xl p-6 text-white">
												<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
												<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>

												{/* Main New */}
												<div className="w-full h-[40vh] flex flex-col">
													{/* Left top ellipse */}
													<div className="-left-10 -top-20 w-52 h-52 absolute">
														<img src={LeftPopupEllipse} alt="popup-ellipse" />
													</div>
													{/* Right bottom ellipse */}
													<div className="-right-10 -bottom-5 w-52 h-52 absolute">
														<img src={RightPopupEllipse} alt="popup-ellipse" />
													</div>
													<div className="popup-main">
														{/* Cross Button */}
														<button
															onClick={() => {
																setPopupClosing(true);
																setTimeout(() => {
																	setEnergyPopup(false);
																	setPopupClosing(false);
																}, 500);
															}}
															style={{
																zIndex: 60
															}}
															className="w-12 h-12 absolute right-0 top-0 flex justify-center items-center"
														>
															<img src={CrossImg} alt="crossImg" />
														</button>
														{/* Top White Bar */}
														<h1 className="border-2 rounded-full border-gray-200 w-[20vw] mx-auto absolute top-3 left-[40%]"></h1>

														{/* Logo, Title & Desc */}
														<div className="relative z-50 h-[25vh] flex justify-center flex-col items-center py-4">

															<div className='flex justify-center absolute top-3'>
																<div>
																	<div
																		style={{
																			borderRadius: '100%',
																			transform: 'translateZ(0)',
																			filter: 'drop-shadow(0 0 15px #9E9E9E)',
																		}}
																	>
																		<img
																			src={LargeBooster4Img}
																			alt='token_Icon'
																			width='45'
																			style={{
																				borderRadius: '12px',
																			}}
																		/>
																	</div>
																</div>
															</div>
															<div className="absolute bottom-3 flex flex-col gap-1">
																<h1 className="text-2xl popup-heading text-center">
																	Energy Limit
																</h1>
																<p className="text-[14px] font-light text-center">
																	Increase the limit of the energy storage
																</p>
															</div>
														</div>

														{/* Reward, Line, Cost */}
														<div className="relative z-50 w-full h-[15vh] flex flex-col items-center gap-2 py-2">

															<div className="flex flex-col items-center justify-center">
																<h1 className="text-xl text-customOrange">Level {energyLevel >= energyLimits.length - 1 ? ('Max') : (`${energyLevel + 1}`)}</h1>
																<p>+500 energy limit</p>
															</div>

															{/* Line */}
															<div className="w-full h-[3vh] flex justify-center items-center">
																<img src={PopupHorizontalLine} alt="popUp_horizontal_line" />
															</div>

															{/* Cost Section */}
															<div>
																{energyLevel < energyLimits.length - 1 ? (
																	<>
																		<div>
																			<p className="flex justify-center items-center gap-1 text-[30px] text-customOrange">
																				<img
																					src={SmallCoin}
																					alt="Little coin"
																					width={30}
																					height={30}
																					className="mt-1"
																				/>
																				{energyUpgradeCost[energyLevel + 1].toLocaleString()}
																			</p>
																		</div>
																	</>
																) : (
																	<>
																		<div>
																			<p className="flex justify-center items-center gap-1 text-2xl text-customOrange">
																				<img
																					src={SmallCoin}
																					alt="Little coin"
																					width={25}
																					height={25}
																					className="mt-1"
																				/>
																				0
																			</p>
																		</div>
																	</>
																)}
															</div>
														</div>

														{/* Buttons */}
														<div className="w-full h-[5vh] mt-7">
															<button
																className={`w-full h-12 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg`}
																onClick={() => {
																	handleEnergyUpgrade();
																}}
																disabled={energyLevel >= energyLimits.length - 1 || buttonLoading}
															>
																{buttonLoading ? (
																	<span className="flex justify-center items-center text-5xl font-bold w-full">
																		<p className="absolute -mt-6 w-full">
																			{dots}
																		</p>
																	</span>
																) : (
																	<>
																		{energyLevel >= energyLimits.length - 1 ? ("Max Level") : ('Upgrade')}
																	</>
																)}
															</button>
														</div>
													</div>
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
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setMultitapsPopup(false);
											setPopupClosing(false);
										}, 500);
									}}
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
										<div
											className="relative bg-[#06060E] w-[100vw] h-[60vh] rounded-t-3xl p-6 text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div
												onClick={(e) => e.stopPropagation()}
												className="popup-content">
												{/* Left top ellipse */}
												<div className="-left-10 -top-20 w-52 h-52 absolute">
													<img src={LeftPopupEllipse} alt="popup-ellipse" />
												</div>
												{/* Right bottom ellipse */}
												<div className="-right-10 -bottom-5 w-52 h-52 absolute">
													<img src={RightPopupEllipse} alt="popup-ellipse" />
												</div>
												<button
													onClick={() => {
														setPopupClosing(true);
														setTimeout(() => {
															setMultitapsPopup(false);
															setPopupClosing(false);
														}, 500);
													}}
													style={{
														zIndex: 60
													}}
													className="w-12 h-12 absolute right-0 top-0 flex justify-center items-center"
												>
													<img src={CrossImg} alt="crossImg" />
												</button>
												<div className="popup-main">
													<h1 className="border-2 border-gray-200 w-[20vw] mx-auto absolute top-2 left-[40%]"></h1>
													<div className="relative h-[15vh] flex justify-center flex-col items-center gap-2">
														<div
															style={{
																borderRadius: '100%',
																transform: 'translateZ(0)',
																filter: 'drop-shadow(0 0 15px #9E9E9E)',
															}}
														>
															<img
																src={LargeBooster3Img}
																alt='booster_icon'
																width='60'
																style={{
																	borderRadius: '12px',
																}}
															/>
														</div>
														<h1 className="text-2xl text-center absolute -bottom-6">
															Multi Tap
														</h1>
													</div>
													<div className="mt-7 text-center text-sm px-4 text-gray-300 flex flex-col items-center justify-center gap-2">
														<p>Increase amount of Tap you can earn per one tap</p>
														<h1 className="text-xl text-customOrange">Level {multitapLevel >= multitapValues.length - 1 ? ('Max') : (`${multitapLevel + 2}`)}</h1>
														<p>+1 per tap for each level</p>
														<div className="py-2">
															<img src={PopupHorizontalLine} alt="popup_horizontal_line" />
														</div>
														<div className="py-1">
															{multitapLevel < multitapValues.length - 1 ? (
																<>
																	<div>
																		<p className="flex justify-center items-center gap-1 text-[30px] text-customOrange">
																			<img
																				src={SmallCoin}
																				alt="Little coin"
																				width={30}
																				height={30}
																				className="mt-1"
																			/>
																			{multitapUpgradeCost[multitapLevel + 1].toLocaleString()}
																		</p>
																	</div>
																</>
															) : (
																<>
																	<div>
																		<p className="flex justify-center items-center gap-1 text-2xl text-customOrange">
																			<img
																				src={SmallCoin}
																				alt="Little coin"
																				width={25}
																				height={25}
																				className="mt-1"
																			/>
																			0
																		</p>
																	</div>
																</>
															)}
														</div>
													</div>

													{/* Button */}
													<div className="w-full h-[5vh] mt-6">
														<button
															className={`w-full h-12 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg`}
															onClick={() => {
																handleMultitapUpgrade()
															}}
															disabled={multitapLevel >= multitapValues.length - 1 || buttonLoading}
														>
															{buttonLoading ? (
																<span className="flex justify-center items-center text-5xl font-bold w-full">
																	<p className="absolute -mt-6 w-full">
																		{dots}
																	</p>
																</span>
															) : (
																<>
																	{multitapLevel >= multitapValues.length - 1 ? ("Max Level") : ('Upgrade')}
																</>
															)}
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* cpm Info */}
						{cpmInfo && (
							<>
								<div
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setCpmInfo(false);
											setPopupClosing(false);
										}, 500);
									}}
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
										<div className="relative bg-[#06060E] w-[100vw] h-[33vh] rounded-t-3xl p-4 text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div
												onClick={(e) => e.stopPropagation()}
												className="popup-content flex flex-col gap-3">
												{/* Left top ellipse */}
												<div className="-left-10 -top-20 w-52 h-52 absolute">
													<img src={LeftPopupEllipse} alt="popup-ellipse" />
												</div>
												{/* Right bottom ellipse */}
												<div className="-right-10 -bottom-5 w-52 h-52 absolute">
													<img src={RightPopupEllipse} alt="popup-ellipse" />
												</div>
												<div className="popup-main">
													<div className="flex justify-center flex-col items-center gap-2">
														<img src={InfoIcon} alt="battery" width={25} />
														<h1 className="text-lg font-bold text-center">
															Coins Per Minute
														</h1>
													</div>
													<div className="text-center text-xs flex flex-col gap-4 px-7 justify-center">
														Coins Per Minute (CPM) defines how many coins users earn automatically every minute, based on their CPM value. Higher CPM means faster passive earnings. Come Back every 1 hour to claim reward!
													</div>
													{/* action buttons */}
													<div className='flex gap-4 justify-center mt-3'>
														<button
															className={`w-full h-12 z-50 font-semibold p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-md`}
															onClick={() => {
																navigate('/hammer')
															}}
															disabled={buttonLoading}
														>
															{buttonLoading ? (
																<span className="flex justify-center items-center text-5xl font-bold w-full">
																	<p className="absolute -mt-6">
																		{dots}
																	</p>
																</span>
															) : (
																<>
																	Mine
																</>
															)}
														</button>
														<div className="absolute top-4 right-5">
															<button onClick={() => {
																setPopupClosing(true);
																setTimeout(() => {
																	setCpmInfo(false);
																	setPopupClosing(false);
																}, 500);
															}}>
																<img src={CrossImg} alt="" width={25} />
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* Avaliable cpm Info */}
						{avaliableCpm && (
							<>
								<div
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setAvaliableCpm(false);
											setPopupClosing(false);
										}, 500);
									}}
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
										<div className="relative bg-[#06060E] w-[100vw] h-[48vh] rounded-t-3xl p-4 text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div
												onClick={(e) => e.stopPropagation()}
												className="popup-content relative "
											>
												{/* Left top ellipse */}
												<div className="-left-10 -top-20 w-52 h-52 absolute">
													<img src={LeftPopupEllipse} alt="popup-ellipse" />
												</div>
												{/* Right bottom ellipse */}
												<div className="-right-10 -bottom-5 w-52 h-52 absolute">
													<img src={RightPopupEllipse} alt="popup-ellipse" />
												</div>
												<div className="popup-main flex flex-col gap-3 items-center">
													<img src={CpmInfoBg} alt="bg" className="absolute z-0 top-10" />
													<div className="h-1 w-16 bg-[#D9D9D9] rounded-md"></div>
													<div className="flex justify-center flex-col items-center gap-3">
														<img src={padaIcon} alt="pandaIcon" width={50} />
														<div>
															<p className="flex justify-center items-center gap-1 border border-[#242434] py-2 px-6 rounded-md text-[#FF8F00] text-[26px] font-semibold">
																<img
																	src={SmallCoin}
																	alt="Little coin"
																	width={25}
																	height={25}
																/>
																+{formatNumberWithSuffix(avaliableCpm)}
															</p>
														</div>
													</div>
													<div className="text-center text-gray-200 text-lg flex flex-col gap-4 px-7 justify-center">
														Coins per minute reward is ready!. Come Back every 1 hour to claim reward!
													</div>
													{/* action buttons */}
													<div className='w-full flex gap-4 justify-center mt-2'>
														<button
															className={`w-full h-12 z-50 font-semibold p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-md`}
															onClick={() => {
																handleClaimCpm();
															}}
															disabled={buttonLoading}
														>
															{buttonLoading ? (
																<span className="flex justify-center items-center text-5xl font-bold w-full">
																	<p className="absolute -mt-6">
																		{dots}
																	</p>
																</span>
															) : (
																<>
																	Claim
																</>
															)}
														</button>
													</div>
													<div className="absolute top-0 right-0">
														<button onClick={() => {
															setPopupClosing(true);
															setTimeout(() => {
																setAvaliableCpm(false);
																setPopupClosing(false);
															}, 500);
														}}>
															<img src={CrossImg} alt="" width={25} />
														</button>
													</div>
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
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setDailyRewardPopup(false);
											setPopupClosing(false);
										}, 500);
									}}
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
											onClick={(e) => e.stopPropagation()}
											className="popup-content"
										>
											<div
												className=" relative bg-[#06060E] w-[100vw] h-[80vh] rounded-t-3xl p-4 text-white">
												<div className="absolute left-0 -top-10">
													<img src={RightPopupEllipse} alt="" />
												</div>
												<div className="absolute bottom-0 right-0">
													<img src={LeftPopupEllipse} alt="" />
												</div>
												<div className="absolute left-0 bottom-20">
													<img src={leftbox} alt="" />
												</div>
												<div className="absolute bottom-0 right-0">
													<img src={rightbox} alt="" />
												</div>
												<div
													className="popup-main flex flex-col"
												>
													<div className="absolute bottom-0 -inset-1 bg-[#23A7FF] rounded-[35px] -z-10"></div>
													<div className="absolute bottom-0 -inset-2 bg-[#23A7FF] blur rounded-[50px] -z-10"></div>

													<div
														style={{
															zIndex: 1000
														}}
														className="absolute top-4 right-4">
														<button onClick={() => {
															setPopupClosing(true);
															setTimeout(() => {
																setDailyRewardPopup(false);
																setPopupClosing(false);
															}, 500);
														}}>
															<img src={CrossImg} alt="" width={25} />
														</button>
													</div>

													<div className="flex flex-col gap-4 items-center justify-center z-50">
														<p className="w-16 border-b-4 rounded-md"></p>
														<h1 className="text-2xl font-semibold">Daily Reward</h1>
														<p className="text-xs text-center text-[#CACACA]">
															Earn Coins by logging in game daily! Don't miss a day, or your streak will reset!
														</p>
														<div className="overflow-scroll w-[90vw] h-[50vh] flex flex-wrap gap-4 justify-center items-center">
															{days.map((day, index) => {
																if (currentDay === day && !claimed.includes(day)) {
																	return (
																		<div
																			key={index}
																			style={{
																				backgroundImage: `url(${DaiyCurrentDayBg})`,
																				backgroundSize: 'cover',
																				backgroundPosition: 'center'
																			}}
																			className={`shadow-[0_0_20px_0px_rgba(0,0,0,0.2)] shadow-[#2174FF] border-2 border-[#2174FF] relative w-[23vw] h-[14vh] rounded-lg pt-2 flex flex-col gap-2 ${index === 6 ? "w-[80vw]" : ""}`}
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
																	)
																} else {
																	return (
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
																	)
																}
															})}
														</div>
													</div>
													{/* action buttons */}
													<div className="flex gap-4 justify-center mt-4">
														<button
															className="h-10 min-w-16 px-3 p-2 bg-[#242434] rounded-xl text-sm z-50 border-b-4 border-b-[#191922] shadow-zinc-900"
															onClick={handleDailyRewardClaim}
															disabled={claimed.includes(currentDay) || buttonLoading}
														>
															{buttonLoading ? (
																<span className="flex justify-center items-center text-5xl font-bold w-full">
																	<p className="absolute -mt-6">
																		{dots}
																	</p>
																</span>
															) : (
																claimed.includes(currentDay) ? (
																	<span>Come back tomorrow</span>
																) : (
																	<span>Claim</span>
																)
															)}
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</>
			)
			}
		</>
	);
};

export default Home;
