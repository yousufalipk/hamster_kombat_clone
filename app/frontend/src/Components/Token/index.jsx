import React, { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';
import CustomLoader from '../Loader/Loader';

import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";

import linbottle from '../../assets/token/LineBottle.svg'
import closebutton from "../../assets/token/closebutton.svg"

import popupLine from "../../assets/token/popupLine.svg";
import PopupVerticalLine from '../../assets/optimizedImages/popup/verticalLine.webp';

import Twitter from '../../assets/token/twitter.svg';
import Telegram from '../../assets/token/telegram.svg';
import Youtube from '../../assets/token/youtube.svg';
import Instagram from '../../assets/token/instagram.svg';

import arrow from '../../assets/token/arrow.svg';
import cardbg from "../../assets/token/tokencardbg.svg";
import loadcoin from "../../assets/token/loadcoin.svg";

import UpgradeSvg from '../UpgradeSvg/UpgradeSvg';

const Token = () => {
	const { sendTokenData, upgradeProjectLevel, balance, fetchUserProjectDetails, claimProjectTask, formatLargeNumber } = useUser();

	const [isModalOpen, setModalOpen] = useState(false);
	const [processing, setProcessing] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [dots, setDots] = useState('');
	const [token, setToken] = useState();
	const [dailyTasks, setDailyTasks] = useState([]);
	const [socialTasks, setSocialTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [taskPopUp, setTaskPopup] = useState(false);
	const [popupClosing, setPopupClosing] = useState(false);
	const [timeDifference, setTimeDifference] = useState(0);

	const iconMapping = {
		twitter: Twitter,
		telegram: Telegram,
		youtube: Youtube,
		instagram: Instagram,
	};

	const buttonText = {
		twitter: "Follow",
		telegram: "Join",
		youtube: "Watch",
		instagram: "Follow",
	};

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

	const fetchData = async () => {
		if (!token) {
			const res = await fetchUserProjectDetails(sendTokenData._id);
			if (res.success) {
				setToken(res.data);
				setProcessing(false);
				const allTasks = res.data.project.tasks;
				setDailyTasks(allTasks.filter(task => task.taskType === "daily"));
				setSocialTasks(allTasks.filter(task => task.taskType === "social"));
			}
		}
	}

	useEffect(() => {
		fetchData();
	}, [sendTokenData]);

	const navigate = useNavigate();

	const staticUser = process.env.REACT_APP_STATIC_USER;

	useEffect(() => {
		if (staticUser === 'false') {
			const tg = window.Telegram.WebApp;

			tg.BackButton.show();
			tg.BackButton.onClick(() => {
				navigate("/hammer");
			});

			return () => {
				tg.BackButton.hide();
				tg.BackButton.offClick();
			};
		}
	}, [navigate]);

	const handleTokenBuy = () => {
		setModalOpen(true);
	}

	const handleProjectUpgrade = async () => {
		try {
			setButtonLoading(true);
			const res = await upgradeProjectLevel(token.project._id);
			if (res.success) {
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log('Internal Server Error!');
		} finally {
			const res = await fetchUserProjectDetails(token.project._id);
			if (res.success) {
				setToken(res.data);
			}
			setButtonLoading(false);
			setModalOpen(false);
		}
	}

	const handleClaimTask = async () => {
		try {
			setButtonLoading(true);
			if (!selectedTask?.claimedStatus) {
				console.log('setting status to true!');
				setSelectedTask((prevTask) => ({
					...prevTask,
					claimedStatus: true,
				}));
				window.open(selectedTask.link, '_blank');
				return;
			}
			const res = await claimProjectTask(token.project._id, selectedTask._id);
			if (res.success) {
				if (res.data.claimedStatus === 'pending') {
					setTimeDifference(30);
				}
				const res2 = await fetchUserProjectDetails(token.project._id);
				if (res2.success) {
					setToken(res2.data);
					const allTasks = res2.data.project.tasks;
					setDailyTasks(allTasks.filter(task => task.taskType === "daily"));
					setSocialTasks(allTasks.filter(task => task.taskType === "social"));
					const updatedTask = res2.data.project.tasks.find((t) => t._id === selectedTask._id);
					if (updatedTask) {
						setSelectedTask(updatedTask);
					}
				}
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log("Internal Server Error", error);
			toast.error('Internal Server Error! 2222');
		} finally {
			setButtonLoading(false);
		}
	}

	const getFirstWord = (inputLine) => {
		if (typeof inputLine !== "string") {
			inputLine = String(inputLine);
		}
		const firstWord = inputLine.split(' ')[0];
		return firstWord.toLowerCase();
	}

	return (
		<>
			<>
				{processing && (
					<div className="h-[100vh] w-[100vw] z-50 bg-black opacity-50 flex justify-center items-center">
						<CustomLoader size={200} />
					</div>
				)}

				{sendTokenData && token && (
					<>
						{/* Upgrade Level Popup */}
						{isModalOpen && (
							<>
								<div
									onClick={() => {
										setPopupClosing(true);
										setTimeout(() => {
											setModalOpen(false);
											setPopupClosing(false);
										}, 500);
									}}
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
									className='popup-overlay fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 overflow-hidden'
								>
									<div
										style={{
											animation: `${popupClosing ? "closePopup" : "openPopup"
												} 0.5s ease-in-out forwards`,
										}}
										className='fixed bottom-0 h-[53vh] w-screen'>
										<div className="absolute -inset-1 h-[53vh] bg-[#23a7ff] rounded-[35px]"></div>
										<div className="absolute -inset-2 h-[53vh] bg-[#23a7ff] blur rounded-[50px]"></div>
										<div
											onClick={(e) => e.stopPropagation()}
											className='w-screen bg-[#06060E] h-[53vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
											<div className="absolute top-3 right-5 z-20"
												onClick={() => {
													setPopupClosing(true);
													setTimeout(() => {
														setModalOpen(false);
														setPopupClosing(false);
													}, 500);
												}}
											>
												<img src={closebutton} alt="" />
											</div>
											{/* Main Body */}
											<div className='mb-5 px-2'>
												<div className='flex relative justify-center'>
													<div className='w-fit pt-2'>
														<div
															style={{
																borderRadius: '100%',
																transform: 'translateZ(0)',
																filter: 'drop-shadow(0 0 15px rgba(255, 176, 0, 0.35))',
															}}
														>
															<img
																src={`data:image/jpeg;base64,${token.project.icon.data}`}
																alt='token_Icon'
																width='60'
																style={{
																	borderRadius: '12px',
																}}
															/>
														</div>
													</div>
												</div>
												{/* popup title */}
												<div className='flex justify-center mt-1'>
													<h1 className='text-2xl popup-heading text-center'>{token.project.name}</h1>
												</div>
												{/* description */}
												<div className='my-2'>
													<p className='text-[14px] font-light text-center mt-1'>
														You will get +{token?.userData?.nextLevelReward} coins of {token.project.name} coins against {token.userData.nextLevelCost} pandatop coins.
													</p>
												</div>
												<div className='text-xl text-customOrange text-center'>
													<p>level {token.userData.userLevel + 1}</p>
												</div>
												<div className='flex justify-center mt-3 gap-4'>
													<div className='flex justify-center items-center gap-1'>
														<img
															src={LittleCoin}
															alt="Little coin"
															className='w-5'
														/>
														<span className='text-sm'>+{token.userData.nextLevelReward.toLocaleString()} {token.project.name.match(/[A-Z]/g)?.join('')}</span>
													</div>
													<img src={PopupVerticalLine} alt="vertical_line" className="h-10" />
													<div className='flex gap-1 justify-between items-center'>
														<div className='flex justify-center items-center gap-1'>
															<img
																src={LittleCoin}
																alt="Little coin"
																className='w-5'
															/>
															<p className="text-sm">+{token.userData.nextLevelCpm}</p>
														</div>
														<span className='text-xs font-thin'>CPM</span>
													</div>
												</div>
												<div className='py-2'>
													<img src={popupLine} alt="" />
												</div>
												<div className='flex justify-center items-center gap-1 text-[30px] text-customOrange py-2'>
													<img
														src={LittleCoin}
														alt="Little coin"
														width={30}
														height={30}
													/>
													<span className='text-[#FF9500] text-xl'>{token.userData.nextLevelCost.toLocaleString()}</span>
												</div>

												{/* Buttons */}
												<div className="w-full h-[5vh] py-2">
													<button
														className={`w-full h-10 py-1 px-3 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm flex justify-center items-center`}
														onClick={() => {
															handleProjectUpgrade();
														}}
														disabled={buttonLoading || processing || token.userData.userLevel === 'max' || (token.userData.nextLevelCost) > balance}
													>
														{token.userData.userLevel === 'max' ? (
															<>
																MAX
															</>
														) : (
															<>
																{(token?.userData?.nextLevelCost) > balance ? (
																	'Insufficient Balance'
																) : (
																	<>
																		{buttonLoading ? (
																			<span className="flex justify-center items-center font-semibold text-5xl w-full">
																				<p className="absolute -mt-6">
																					{dots}
																				</p>
																			</span>
																		) : 'Confirm'}
																	</>
																)}
															</>
														)}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						{/* Task Popup */}

						{taskPopUp && selectedTask && (
							<>
								<div
									style={{
										animation: `${popupClosing ? "fadeOut" : "fadeIn"
											} 0.5s ease-in-out forwards`,
									}}
									className="popup-overlay fixed  w-[100vw] h-[100vh] inset-0 z-50 flex justify-center items-end bg-black bg-opacity-80 overflow-hidden"
								>
									<div
										style={{
											animation: `${popupClosing ? "closePopup" : "openPopup"
												} 0.5s ease-in-out forwards`,
										}}
									>
										<div className="relative bg-[#06060E] w-[100vw] rounded-t-[30px]  text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
											<div className="flex flex-col items-center relative">
												<div className="absolute top-3 right-7"
													onClick={() => {
														setPopupClosing(true);
														setTimeout(() => {
															setTaskPopup(false);
															setPopupClosing(false);
														}, 500);
													}}
												>
													<img src={closebutton} alt="" />
												</div>
												<div className="h-1 w-16 bg-[#D9D9D9] rounded-md  mt-2 opacity-70"></div>
												<div className="flex justify-center flex-col items-center gap-2 mt-3">
													<img src={iconMapping[selectedTask.iconType]} alt="icon" />
												</div>
												<div className="text-xl text-white mt-3">
													<p>{selectedTask.title}</p>
												</div>
												<div className="mt-5">
													<button
														onClick={() => {
															window.open(selectedTask.link, '_blank');
															console.log('title', getFirstWord(selectedTask.title));
														}}
														className="bg-white py-2 rounded-md text-black px-6 font-medium"
													>
														{getFirstWord(selectedTask.title) === 'subscribe' || getFirstWord(selectedTask.title) === 'quote' || getFirstWord(selectedTask.title) === 'retweet' ? (
															getFirstWord(selectedTask.title) === 'subscribe' ? (
																<>{"Subscribe"}</>
															) : (
																getFirstWord(selectedTask.title) === 'retweet' ? (
																	<>
																		{"Retweet"}
																	</>
																) : (
																	<>
																		{"Quote"}
																	</>
																)
															)
														) : (
															<>{buttonText[selectedTask.iconType]}</>
														)}
													</button>
												</div>
												{selectedTask.claimedStatus === 'pending' && (
													<div className="text-gray-200 text-sm px-5 text-center mt-4">
														Please wait {timeDifference} minutes for moderation check to claim the prize
													</div>
												)}
												<div className="mt-5">
													<p className="flex justify-center items-center gap-2 border border-[#242434] py-1  rounded-md text-[#FF8F00] px-6 text-lg font-medium">
														<img
															src={LittleCoin}
															alt="Little coin"
															width={25}
															height={25}
														/>
														{selectedTask.reward.toLocaleString()} {token.project.name.match(/[A-Z]/g)?.join('')}
													</p>
												</div>
												{selectedTask.claimedStatus !== 'claimed' ? (
													<>
														<div className="text-center text-md flex flex-col mt-5 ">
															<img src={linbottle} alt="" />
														</div>
														<div className="flex w-full mt-3 items-center justify-center gap-4 z-40 mb-4 px-3">
															<button
																onClick={() => {
																	handleClaimTask(selectedTask);
																}}
																disabled={selectedTask.claimedStatus === 'pending' || buttonLoading}
																className={`w-full py-2 bg-gradient-to-b from-[#00B2FF] to-[#2226FF] text-white font-bold rounded-md ${selectedTask.claimedStatus === 'pending' ? 'filter grayscale' : ''}`}
															>
																{buttonLoading ? (
																	<span className="h-6 font-bold">
																		{dots}
																	</span>) : 'Check'}
															</button>
														</div>
													</>
												) : (
													<div className="p-5"></div>
												)}
											</div>
										</div>
									</div>
								</div>
							</>
						)}

						<div className='bg-[#060611] px-4 w-full h-[100vh] overflow-scroll'>
							<div className="text-white flex justify-end items-center gap-2 p-5">
								<img src={LittleCoin} alt="Coin-Icon" className="" />
								{balance.toLocaleString()}
							</div>

							{/* Upper Card Portion New */}
							<div>
								<div>
									{/* Card */}
									<button
										style={{
											position: "relative",
											padding: "2px",
											background:
												`linear-gradient(to bottom, ${token.project.toColor},${token.project.fromColor})`,
											borderRadius: "16px",
											clipPath:
												" polygon(0 0, 0 21%, 2% 35%, 2% 65%, 0 79%, 0 100%, 100% 100%, 100% 79%, 98% 65%, 98% 35%, 100% 21%, 100% 0)",
										}}
										className="card-container w-full h-[28vh]"
										onClick={() => handleTokenBuy()}
									>
										<div
											style={{
												position: "relative",
												background: `linear-gradient(to bottom, ${token.project.fromColor}, ${token.project.toColor})`,
												borderRadius: "14px",
												clipPath:
													" polygon(0 0, 0 21%, 2% 35%, 2% 65%, 0 79%, 0 100%, 100% 100%, 100% 79%, 98% 65%, 98% 35%, 100% 21%, 100% 0)",
											}}
											className="card-container w-full h-[27.5vh]"
										>
											<div className="absolute left-10 -top-3">
												<div className=" relative flex justify-end items-center w-[40vw] h-[30vh]">
													<img
														src={cardbg}
														alt=""
														className="opacity-10"
													/>
													<div className=" flex items-center justify-center absolute">
														<p className="font-italianno text-[6rem]   text-slate-100 opacity-10">
															{token.project.name.charAt(0)}
														</p>
													</div>
												</div>
											</div>
											{/* main body of card */}
											<div className="w-full h-full">
												{/* Level & Upgrade button */}
												<div className="w-full h-[25%] flex justify-between items-center">
													<div className="w-1/2 h-full flex justify-start items-center">
														{/* Level */}
														<p
															style={{
																background: `linear-gradient(to bottom, #00B2FF, #2226FF)`
															}}
															className="text-base py-1 w-[15vw] bg-slate-900 text-center rounded-r-md text-white mt-1"
														>
															{token.userData.userLevel !== 'max' ? (`lvl ${token.userData.userLevel || 0}`) : ('Max')}
														</p>
													</div>
													<div className="w-1/2 h-full flex justify-end items-center">
														{/* upgrade */}
														<UpgradeSvg token={token} />
													</div>
												</div>
											</div>

										</div>
										<div className="absolute bottom-0 right-0.5 overflow-hidden">
											<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.32 101.81" width="70" height="50">
												<defs>
													<linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
														<stop offset="0%" style={{ stopColor: token.project.lineFromColor, stopOpacity: 1 }} />
														<stop offset="100%" style={{ stopColor: token.project.lineToColor, stopOpacity: 1 }} />
													</linearGradient>
													<style>
														{`
															.cls-1 {
																fill: none;
																stroke: url(#gradient1);
																stroke-width: 3px;
																stroke-miterlimit: 10;
																filter: drop-shadow(0px 0px 5px ${token.project.fromColor});
															}
														`}
													</style>
												</defs>
												<polyline className="cls-1" points="284.32 30.61 140.94 30.61 111.06 1.5 34.32 1.5" />
												<polyline className="cls-1" points="284.32 73.5 210.64 73.5 180.77 100.31 83.49 100.31 59.74 73.5 0 73.5" />
											</svg>
										</div>
									</button>
								</div>
							</div>


							{/* Old Card */}
							<div>
								<div>
									{/* Card */}
									<button
										style={{
											position: "relative",
											padding: "2px",
											background:
												`linear-gradient(to bottom, ${token.project.toColor},${token.project.fromColor})`,
											borderRadius: "16px",
											clipPath:
												" polygon(0 0, 0 21%, 2% 35%, 2% 65%, 0 79%, 0 100%, 100% 100%, 100% 79%, 98% 65%, 98% 35%, 100% 21%, 100% 0)",
										}}
										className="card-container w-full h-[28vh]"
										onClick={() => handleTokenBuy()}
									>
										<div
											style={{
												position: "relative",
												background: `linear-gradient(to bottom, ${token.project.fromColor}, ${token.project.toColor})`,
												borderRadius: "14px",
												clipPath:
													" polygon(0 0, 0 21%, 2% 35%, 2% 65%, 0 79%, 0 100%, 100% 100%, 100% 79%, 98% 65%, 98% 35%, 100% 21%, 100% 0)",
											}}
											className="card-container w-full h-[27.5vh]"
										>
											<div className="absolute left-10 -top-3">
												<div className=" relative flex justify-end items-center w-[40vw] h-[30vh]">
													<img
														src={cardbg}
														alt=""
														className="opacity-10"
													/>
													<div className=" flex items-center justify-center absolute">
														<p className="font-italianno text-[6rem]   text-slate-100 opacity-10">
															{token.project.name.charAt(0)}
														</p>
													</div>
												</div>
											</div>
											<div className={`rounded-[14px]`}>
												<div className="justify-between">
													<div className="w-full">
														<div className="text-xs  bg-opacity-30 w-full flex justify-between py-1">
															<p
																style={{
																	background: `linear-gradient(to bottom, #00B2FF, #2226FF)`
																}}
																className="text-base py-1 w-[15vw] bg-slate-900 text-center rounded-md text-white ml-1 mt-1"
															>
																{token.userData.userLevel !== 'max' ? (`lvl ${token.userData.userLevel || 0}`) : ('Max')}
															</p>

															{token.userData.userLevel !== 'max' && (
																<div className="text-[#FFF] flex items-center mr-10 gap-1">
																	<span>
																		<img
																			src={LittleCoin}
																			alt="Coin-Icon"
																			className=" w-10 h-8"
																		/>
																	</span>
																	<p className="text-xl">
																		{token.userData.nextLevelCost.toLocaleString()}
																	</p>
																</div>
															)}
														</div>

														<div
															className={`flex justify-between items-center`}
														>
															<div className="flex items-center gap-2 ml-8 mt-6">
																<img
																	className="w-[40px] h-[40px]"
																	src={`data:image/jpeg;base64,${token.project.icon.data}`}
																	alt="BigCoin-Icon"
																/>
																<div className="text-xl text-white">
																	<p>{token.project.name}</p>
																</div>
															</div>
															<div className=" items-center mr-5">
																<p className="text-[#F39E09] font-semibold">
																	Balance
																</p>
																<div className="flex gap-2">
																	<img src={BigCoin} alt="Coin-Icon" />
																	<p className="text-white">
																		{token.userData.walletBalance.toLocaleString() || 0}
																		<span className="text-xs">{token.project.name.match(/[A-Z]/g)?.join('')}</span>
																	</p>

																	<p></p>
																</div>
															</div>
														</div>
														<div className="absolute bottom-16 left-5">
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 464.94 93.53" width={280} height={100}>
																<defs>
																	<linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
																		<stop offset="0%" style={{ stopColor: token.project.fromColor, stopOpacity: 1 }} />
																		<stop offset="100%" style={{ stopColor: token.project.toColor, stopOpacity: 1 }} />
																	</linearGradient>
																</defs>
																<polyline
																	className="cls-1"
																	points="0 92.53 464.94 92.53 310.98 92.53 310.98 0"
																	style={{
																		stroke: 'url(#gradientStroke)',
																		fill: 'none',
																		strokeWidth: '1',
																		strokeLinejoin: 'miter',
																		strokeLinecap: 'butt',
																	}}
																/>
															</svg>
														</div>
													</div>

													{token.userData.userLevel !== 'max' && (
														<div className="px-5 mt-5 flex justify-between w-full">
															<div className="text-[#FFF] text-xs font-normal gap-2 flex items-center w-[60%]">
																<div>Coins Per Minute</div>
																<div>
																	<img src={loadcoin} alt="" width={12} />
																</div>
																<div className="text-xl text-[#FF8F00] font-medium">
																	<p>+{formatLargeNumber(token?.userData?.nextLevelCpm)}</p>
																</div>
															</div>
															<div className="w-[40%] flex items-center gap-2 border justify-center border-[#fff9f9] rounded-xl py-1">
																<img
																	width={15}
																	src={BigCoin}
																	alt="Coin-Icon"
																/>
																<div className="text-[#FFF] text-[15px] font-normal text-xs ">
																	<p> + {token?.userData?.nextLevelReward.toLocaleString()} {token.project.name.match(/[A-Z]/g)?.join('')}</p>
																</div>
															</div>
														</div>
													)}
												</div>
											</div>
										</div>
										<div className="absolute bottom-0 right-0.5 overflow-hidden">
											<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.32 101.81" width="70" height="50">
												<defs>
													<linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
														<stop offset="0%" style={{ stopColor: token.project.lineFromColor, stopOpacity: 1 }} />
														<stop offset="100%" style={{ stopColor: token.project.lineToColor, stopOpacity: 1 }} />
													</linearGradient>
													<style>
														{`
															.cls-1 {
																fill: none;
																stroke: url(#gradient1);
																stroke-width: 3px;
																stroke-miterlimit: 10;
																filter: drop-shadow(0px 0px 5px ${token.project.fromColor});
															}
														`}
													</style>
												</defs>
												<polyline className="cls-1" points="284.32 30.61 140.94 30.61 111.06 1.5 34.32 1.5" />
												<polyline className="cls-1" points="284.32 73.5 210.64 73.5 180.77 100.31 83.49 100.31 59.74 73.5 0 73.5" />
											</svg>
										</div>
									</button>
								</div>
							</div>



							{/* Tasks Section */}
							<div className="px-4 py-5 border-t-2 mt-5 rounded-tl-[30px] rounded-tr-[30px] border-[#0099FF] shadow-[#0099ff92]  shadow-lg  ">
								{/* Heading 1 */}
								<div>
									<p className="text-[#9595A9] text-lg ">Daily Task</p>
								</div>
								{/* Pandatop News Cards */}
								{dailyTasks.length > 0 && (
									<div>
										{dailyTasks.map((task, index) => {
											return (
												<div
													onClick={() => {
														setTaskPopup(true);
														setSelectedTask(task);
														if (task.claimedStatus === 'pending') {
															const currentTime = new Date();
															const timeDifference = (currentTime - new Date(task.claimedDate)) / (1000 * 60);
															const remaningMin = 30 - Math.floor(timeDifference);
															if (remaningMin <= 0) {
																setSelectedTask((prevTask) => ({
																	...prevTask,
																	claimedStatus: true,
																}));
															}
															setTimeDifference(30 - Math.floor(timeDifference));
														}
													}}
													key={index}
													className={`bg-[#1B1B27] text-white flex justify-between items-center border ${task.claimedStatus === 'claimed' ? `border-[#224E00] shadow-[#224E00] shadow-sm` : `border-[#0099FF] shadow-[#0199FF] shadow-md`} rounded-[14px] gap-4 py-2 px-3 my-3`}
												>
													<div className="flex gap-3 justify-center items-center py-1 w-full">
														{/* Icon */}
														<div className="flex flex-shrink-0 ">
															<img src={iconMapping[task.iconType]} alt="icon" width={40} height={40} />
														</div>
														{/* Name */}
														<div className="flex justify-between items-center w-full">
															<div>
																<div className="flex text-md">{task.title}</div>
																<div className=" text-[#FF8F00] gap-1 rounded-md text-lg flex items-center ">
																	<img src={BigCoin} alt="" className="h-4 w-5" />
																	<span className="text-sm">+{task.reward.toLocaleString()}</span>
																</div>
															</div>
															<div>
																{task.claimedStatus === 'claimed' ? (
																	<>
																		<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path d="M13.4802 17.8884C13.3544 18.0136 13.2546 18.1624 13.1865 18.3263C13.1184 18.4902 13.0834 18.6659 13.0834 18.8433C13.0834 19.0208 13.1184 19.1965 13.1865 19.3604C13.2546 19.5242 13.3544 19.673 13.4802 19.7982L16.344 22.6611C16.4692 22.7868 16.6179 22.8865 16.7817 22.9545C16.9455 23.0225 17.1211 23.0575 17.2984 23.0575C17.4758 23.0575 17.6514 23.0225 17.8152 22.9545C17.979 22.8865 18.1277 22.7868 18.2529 22.6611L24.9993 15.9156C25.1251 15.7905 25.2249 15.6416 25.293 15.4778C25.3611 15.3139 25.3961 15.1382 25.3961 14.9607C25.3961 14.7833 25.3611 14.6076 25.293 14.4437C25.2249 14.2798 25.1251 14.131 24.9993 14.0058C24.8741 13.8801 24.7253 13.7803 24.5615 13.7122C24.3976 13.6441 24.2219 13.609 24.0444 13.609C23.8669 13.609 23.6912 13.6441 23.5274 13.7122C23.3635 13.7803 23.2147 13.8801 23.0895 14.0058L17.2989 19.7973L15.39 17.8893C15.2648 17.7636 15.116 17.6638 14.9521 17.5957C14.7883 17.5276 14.6126 17.4925 14.4351 17.4925C14.2576 17.4925 14.0819 17.5276 13.9181 17.5957C13.7542 17.6638 13.6054 17.7627 13.4802 17.8884Z" fill="#4B9F0A" />
																			<circle cx="19.5" cy="17.5" r="12" stroke="#224E00" />
																		</svg>
																	</>
																) : (
																	<>
																		<img src={arrow} alt="arrow" width={15} />
																	</>
																)}
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								)}
								{/* Heading 2 */}
								<div>
									<p className="text-[#9595A9] text-lg ">Social Media</p>
								</div>
								{/* Pandatop News Cards */}
								{socialTasks.length > 0 && (
									<div>
										{socialTasks.map((task, index) => {
											return (
												<div
													onClick={() => {
														setTaskPopup(true);
														setSelectedTask(task);
														if (task.claimedStatus === 'pending') {
															const currentTime = new Date();
															const timeDifference = (currentTime - new Date(task.claimedDate)) / (1000 * 60);
															const remaningMin = 30 - Math.floor(timeDifference);
															if (remaningMin <= 0) {
																setSelectedTask((prevTask) => ({
																	...prevTask,
																	claimedStatus: true,
																}));
															}
															setTimeDifference(30 - Math.floor(timeDifference));
														}
													}}
													key={index}
													className={`bg-[#1B1B27] text-white flex justify-between items-center border ${task.claimedStatus === 'claimed' ? `border-[#224E00] shadow-[#224E00] shadow-sm` : `border-[#0099FF] shadow-[#0199FF] shadow-md`} rounded-[14px] gap-4 py-2 px-3 my-3`}
												>
													<div className="flex gap-3 justify-center items-center py-1 w-full">
														{/* Icon */}
														<div className="flex flex-shrink-0 ">
															<img src={iconMapping[task.iconType]} alt="icon" width={40} height={40} />
														</div>
														{/* Name */}
														<div className="flex justify-between items-center w-full">
															<div>
																<div className="flex text-md">{task.title}</div>
																<div className=" text-[#FF8F00] gap-1 rounded-md text-lg flex items-center ">
																	<img src={BigCoin} alt="" className="h-4 w-5" />
																	<span className="text-sm">+{task.reward.toLocaleString()}</span>
																</div>
															</div>
															<div>
																{task.claimedStatus === 'claimed' ? (
																	<>
																		<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path d="M13.4802 17.8884C13.3544 18.0136 13.2546 18.1624 13.1865 18.3263C13.1184 18.4902 13.0834 18.6659 13.0834 18.8433C13.0834 19.0208 13.1184 19.1965 13.1865 19.3604C13.2546 19.5242 13.3544 19.673 13.4802 19.7982L16.344 22.6611C16.4692 22.7868 16.6179 22.8865 16.7817 22.9545C16.9455 23.0225 17.1211 23.0575 17.2984 23.0575C17.4758 23.0575 17.6514 23.0225 17.8152 22.9545C17.979 22.8865 18.1277 22.7868 18.2529 22.6611L24.9993 15.9156C25.1251 15.7905 25.2249 15.6416 25.293 15.4778C25.3611 15.3139 25.3961 15.1382 25.3961 14.9607C25.3961 14.7833 25.3611 14.6076 25.293 14.4437C25.2249 14.2798 25.1251 14.131 24.9993 14.0058C24.8741 13.8801 24.7253 13.7803 24.5615 13.7122C24.3976 13.6441 24.2219 13.609 24.0444 13.609C23.8669 13.609 23.6912 13.6441 23.5274 13.7122C23.3635 13.7803 23.2147 13.8801 23.0895 14.0058L17.2989 19.7973L15.39 17.8893C15.2648 17.7636 15.116 17.6638 14.9521 17.5957C14.7883 17.5276 14.6126 17.4925 14.4351 17.4925C14.2576 17.4925 14.0819 17.5276 13.9181 17.5957C13.7542 17.6638 13.6054 17.7627 13.4802 17.8884Z" fill="#4B9F0A" />
																			<circle cx="19.5" cy="17.5" r="12" stroke="#224E00" />
																		</svg>
																	</>
																) : (
																	<>
																		<img src={arrow} alt="arrow" width={15} />
																	</>
																)}
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</>
		</>
	);
};

export default Token;
