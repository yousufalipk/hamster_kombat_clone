import React, { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';
import { LuLoader2 } from "react-icons/lu";

import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";

import popupLine from "../../assets/token/popupLine.svg";

import Twitter from "../../assets/token/twitter.svg";
import Telegram from "../../assets/token/telegram.svg";
import Youtube from "../../assets/token/youtube.svg";
import cardbg from "../../assets/token/tokencardbg.svg";
import loadcoin from "../../assets/token/loadcoin.svg";

const Token = () => {
	const { sendTokenData, upgradeProjectLevel, balance, fetchUserProjectDetails } = useUser();


	const [isModalOpen, setModalOpen] = useState(false);
	const [processing, setProcessing] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [token, setToken] = useState();
	const [dots, setDots] = useState('');

	useEffect(() => {
		console.log("is Modal open", isModalOpen);
	}, [isModalOpen])

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
			}
		}
	}


	useEffect(() => {
		fetchData();
	}, [sendTokenData]);

	useEffect(() => {
		console.log("Token", token);
	}, [token])


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


	const handleCancel = () => {
		setModalOpen(false);
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
		}
	}

	const data = [
		{
			id: 1,
			img: Twitter,
			name: "Join X and get",
			amount: "50,000MFI",
		},
		{
			id: 2,
			img: Telegram,
			name: "Join TG and get",
			amount: "50,000MFI",
		},
		{
			id: 3,
			img: Youtube,
			name: "Subscribe YouTube",
			amount: "50,000 MFI",
		},
	];

	return (
		<>
			<>
				{processing && (
					<div className="h-[100vh] w-[100vw] z-50 bg-black opacity-50 flex justify-center items-center">
						<LuLoader2 className="animate-spin w-20 h-20 text-white" />
					</div>
				)}
				{sendTokenData && token && (
					<>
						{isModalOpen && (
							<>
								{/* New Popup */}
								<div
									className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 overflow-hidden'>
									<div
										onClick={() => handleCancel()}
										className="w-full h-[50vh] absolute top-0">
									</div>
									<div className='fixed bottom-0 h-[50vh] w-screen'>
										<div className="absolute -inset-1 h-[50vh] bg-[#23a7ff] rounded-[35px]"></div>
										<div className="absolute -inset-2 h-[50vh] bg-[#23a7ff] blur rounded-[50px]"></div>
										<div className='w-screen bg-[#06060E] h-[50vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
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
																src={`data:image/jpeg;base64,${sendTokenData.icon.data}`}
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
													<h1 className='text-sm font-medium'>{sendTokenData.name}</h1>
												</div>
												{/* description */}
												<div className='my-2'>
													<p className='text-center font-thin text-xs'>
														You will get +{sendTokenData?.userData?.nextLevelReward || sendTokenData.levels[0].reward} coins of {sendTokenData.name} coins against {sendTokenData?.userData?.nextLevelCost || sendTokenData.levels[0].cost} pandatop coins.
													</p>
												</div>
												<div className='text-center text-[#FF9500] font-semibold'>
													<p>level {sendTokenData?.userData?.level || 0}</p>

												</div>
												<div className='flex justify-center mt-3 gap-4'>
													<div className='flex justify-center items-center gap-1'>
														<img
															src={LittleCoin}
															alt="Little coin"
															className='w-5'
														/>
														<span className='text-sm'>+{sendTokenData?.userData?.nextLevelReward || sendTokenData.levels[0].reward} {sendTokenData.name.match(/[A-Z]/g)?.join('')}</span>
													</div>
													<div className=' gap-2'>
														<span className='text-xs font-thin'>coins per minute</span>
														<div className='flex'>
															<img
																src={LittleCoin}
																alt="Little coin"
															/>
															<p>+{sendTokenData?.userData?.nextLevelCpm || sendTokenData.levels[0].cpm}</p>
														</div>
													</div>
												</div>
												<div className='mt-2'>
													<img src={popupLine} alt="" />
												</div>
												<div className='mt-2 flex justify-center items-center'>
													<img
														src={LittleCoin}
														alt="Little coin"
														className='w-10 h-10'
													/>
													<span className='text-[#FF9500] text-xl'>{sendTokenData?.userData?.nextLevelCost || sendTokenData.levels[0].cost}</span>
												</div>

												{/* action buttons */}
												<div className='flex gap-4 justify-center p-2'>

													<button
														disabled={buttonLoading || processing || token.userData.userLevel === 'max' || (sendTokenData?.userData?.nextLevelCost || sendTokenData.levels[0].cost) > balance}
														className='w-1/2 py-1 px-3 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm flex justify-center items-center'
														onClick={() => (handleProjectUpgrade(sendTokenData?.userData?.nextLevelCost || sendTokenData.levels[0].cost))}
													>
														{(sendTokenData?.userData?.nextLevelCost || sendTokenData.levels[0].cost) > balance ? (
															'Insufficient Balance'
														) : (
															<>
																{buttonLoading ? (
																	<span className="h-6 font-bold">
																		{dots}
																	</span>) : 'Confirm'}
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

						<div className='bg-[#060611] p-4 w-full h-[100vh] overflow-scroll overflow-x-hidden'>
							<div className='flex items-center gap-4'>
								<div className='text-[#FFF] text-[18px] font-semibold'>{token.project.name}</div>
							</div>

							{/* New Upper Portion */}
							<div>
								<div className="pt-10">
									{/* Card Header */}
									<div className="flex py-3 absolute top-0 right-0">
										<div
											className={`mx-auto flex items-center gap-2 px-4 rounded-[25.93px]`}
										>
											<div className="text-white flex justify-center items-center gap-2 ">
												<img src={LittleCoin} alt="Coin-Icon" className="" />
												{balance}
											</div>
										</div>
									</div>
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
																		{token.userData.nextLevelCost}
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
																		{token.userData.walletBalance || 0}
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
																	<p>+{token?.userData?.nextLevelCpm}</p>
																</div>
															</div>
															<div className="w-[40%] flex items-center gap-2 border justify-center border-[#fff9f9] rounded-xl py-1">
																<img
																	width={15}
																	src={BigCoin}
																	alt="Coin-Icon"
																/>
																<div className="text-[#FFF] text-[15px] font-normal text-xs ">
																	<p> + {token?.userData?.nextLevelReward} {token.project.name.match(/[A-Z]/g)?.join('')}</p>
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
							<div className='px-1 pt-4'>
								{/* Heading 1 */}
								<div>
									<p className='text-[#9595A9] text-[15px] font-medium'>
										Pandatop News
									</p>
								</div>

								{/* Pandatop News Cards */}
								<div>
									{data.map((values) => {
										const { id, img, name, amount } = values;
										return (
											<div
												key={id}
												className='bg-[#1b1b27] text-[#FFF] text-base font-medium flex justify-between items-center border border-[#666666] rounded-[14px] gap-4 py-1 px-3 my-3'>

												<div className="flex gap-3 justify-center items-center py-1">
													{/* Icon */}
													<div className='flex flex-shrink-0'>
														<img
															src={img}
															alt='Icons'
															width="40"
														/>
													</div>
													{/* Name */}
													<div className='flex flex-shrink-0 text-[14px]'>{name}</div>
												</div>

												{/* White Box */}
												<div className="bg-white text-black py-1 px-2 rounded-md text-[15px]">
													{amount}
												</div>
											</div>
										);
									})}
								</div>

								{/* Heading 2 */}
								<div className='pt-3'>
									<p className='text-[#9595A9] text-[15px] font-medium'>
										Social Media
									</p>
								</div>
								{/* Social Media Cards */}
								<div>
									{data.map((values) => {
										const { id, img, name, amount } = values;
										return (
											<div
												key={id}
												className='bg-[#1b1b27] text-[#FFF] text-base font-medium flex justify-between items-center border border-[#666666] rounded-[14px] gap-4 py-1 px-3 my-3'>

												<div className="flex gap-3 justify-center items-center py-1">
													{/* Icon */}
													<div className='flex flex-shrink-0'>
														<img
															src={img}
															alt='Icons'
															width="40"
														/>
													</div>
													{/* Name */}
													<div className='flex flex-shrink-0 text-[14px]'>{name}</div>
												</div>

												{/* White Box */}
												<div className="bg-white text-black py-1 px-2 rounded-md text-[15px]">
													{amount}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</>
				)}
			</>
		</>
	);
};

export default Token;
