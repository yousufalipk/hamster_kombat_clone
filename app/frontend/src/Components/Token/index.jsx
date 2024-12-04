import React, { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';

import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";

import popupLine from "../../assets/token/popupLine.svg";

import Twitter from "../../assets/token/twitter.svg";
import Telegram from "../../assets/token/telegram.svg";
import Youtube from "../../assets/token/youtube.svg";
import cardbg from "../../assets/token/tokencardbg.svg";
import loadcoin from "../../assets/token/loadcoin.svg";
import lineCard from "../../assets/token/cardLine.svg";

import { LuLoader2 } from "react-icons/lu";

const Token = () => {
	const { sendTokenData, isModalOpen, setModalOpen, upgradeProjectLevel, balance } = useUser();

	const [processing, setProcessing] = useState(false);

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

	const handleTokenBuy = (upgradeCost) => {
		if (upgradeCost > balance) {
			toast.error('Insufficient Balance!');
			return;
		}
		setModalOpen(true);
	}

	const handleCancel = () => {
		setModalOpen(false);
	}

	const handleProjectUpgrade = async () => {
		try {
			setProcessing(true);
			const res = await upgradeProjectLevel(sendTokenData._id);
			if (res.success) {
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log('Internal Server Error!');
		} finally {
			setProcessing(false);
			navigate('/hammer');
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

	const darkenColor = (color, percent) => {
		let r = parseInt(color.slice(1, 3), 16);
		let g = parseInt(color.slice(3, 5), 16);
		let b = parseInt(color.slice(5, 7), 16);

		r = Math.floor(r * (1 - percent));
		g = Math.floor(g * (1 - percent));
		b = Math.floor(b * (1 - percent));

		return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
	};

	if (processing) {
		return (
			<>
				<div className="h-[100vh] w-[100vw] flex justify-center items-center">
					<LuLoader2 className="animate-spin w-20 h-20 text-white" />
				</div>
			</>
		)
	}

	return (
		<>
			<>
				{sendTokenData && (
					<>
						{isModalOpen && (
							<>
								{/* New Popup */}
								<div
									onClick={handleCancel}
									className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 overflow-hidden'>
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
														className='w-1/3 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm'
														onClick={() => (handleProjectUpgrade())}
													>
														Confirm
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
								<div className='text-[#FFF] text-[18px] font-semibold'>{sendTokenData.name}</div>
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


									{/* Main Card */}
									<button
										style={{
											position: "relative",
											padding: "2px",
											background:
												`linear-gradient(to right, ${sendTokenData?.fromColor}90, ${sendTokenData?.toColor}90,${sendTokenData?.fromColor}90,${sendTokenData?.toColor}90)`,
											borderRadius: "16px",
											clipPath:
												"polygon(0 18%, 1% 32%, 1% 68%, 0 82%, 0 100%, 100% 100%, 100% 82%, 99% 68%, 99% 32%, 100% 18%, 100% 0, 0 0)",
										}}
										className="card-container w-full h-[30vh]"
										onClick={() => handleTokenBuy(sendTokenData?.userData?.nextLevelCost || sendTokenData.levels[0].cost)}
										disabled={processing || sendTokenData?.userData?.nextLevelCost === 'max'}
									>
										<div
											style={{
												position: "relative",
												background: `linear-gradient(to bottom, ${sendTokenData?.fromColor}, ${sendTokenData?.toColor})`,
												borderRadius: "14px",
												clipPath:
													"polygon(0 18%, 1% 32%, 1% 68%, 0 82%, 0 100%, 100% 100%, 100% 82%, 99% 68%, 99% 32%, 100% 18%, 100% 0, 0 0)",
											}}
											className="card-container w-full h-[29vh]"
										>
											<div className="absolute left-6 -top-4   ">
												<div className=" relative ">
													<img
														src={cardbg}
														alt=""
														className="opacity-10 h-52 w-60  "
													/>
													<div className=" flex items-center justify-center  absolute top-20 right-16">
														<p className="font-italianno text-8xl   text-slate-100 opacity-10">
															{sendTokenData.name.charAt(0)}
														</p>
													</div>
												</div>
											</div>
											<div className={`rounded-[14px]`}>
												<div className="justify-between ">
													<div className="w-full">
														<div className="text-xs  bg-opacity-30 w-full flex justify-between py-1 ">
															<p
																style={{
																	background: `linear-gradient(to bottom, ${sendTokenData.fromColor}, ${sendTokenData.toColor})`
																}}
																className="text-base py-1 w-[16vw] bg-slate-900 text-center rounded-md text-white ml-1 mt-1"
															>
																{sendTokenData?.userData?.nextLevelCost !== 'max' ? (`lvl ${sendTokenData?.userData?.level || 0}`) : ('Max')}
															</p>

															{sendTokenData?.userData?.nextLevelCost !== 'max' && (
																<div className="text-[#FFF] flex items-center mr-10 gap-1">
																	<span>
																		<img
																			src={LittleCoin}
																			alt="Coin-Icon"
																			className=" w-10 h-8"
																		/>
																	</span>
																	<p className="text-xl">
																		{sendTokenData?.userData?.nextLevelCost || sendTokenData?.levels[0]?.cost}
																	</p>
																</div>
															)}
														</div>
														<div
															className={`flex justify-between items-center  py-3 `}
														>
															<div className="flex items-center gap-2 ml-8 mt-3">
																<img
																	className="w-[50px] h-[50px]"
																	src={`data:image/jpeg;base64,${sendTokenData.icon.data}`}
																	alt="BigCoin-Icon"
																/>
																<div className="text-xl text-white">
																	<p>{sendTokenData.name}</p>
																</div>
															</div>
															<div className=" items-center mr-8">
																<p className="text-[#F39E09] font-semibold">
																	Balance
																</p>
																<div className="flex gap-2">
																	<img src={BigCoin} alt="Coin-Icon" />
																	<p className="text-white">
																		{sendTokenData?.walletData?.balance || 0}
																		<span className="text-xs">{sendTokenData.name.match(/[A-Z]/g)?.join('')}</span>
																	</p>

																	<p></p>
																</div>
															</div>
														</div>
														<div className="absolute bottom-1 opacity-50">
															<svg width="90vw" height="20vh" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
																{/* Vertical */}
																<line
																	x1="500"
																	y1="100"
																	x2="500"
																	y2="-30"
																	stroke={darkenColor(sendTokenData.fromColor, 0.5)}
																	stroke-width="4"
																/>
																{/* Horizontal */}
																<line
																	x1="60"
																	y1="100"
																	x2="750"
																	y2="100"
																	stroke={darkenColor(sendTokenData.toColor, 0.5)}
																	stroke-width="4"
																/>
															</svg>
														</div>
													</div>

													{sendTokenData?.userData?.nextLevelCost !== 'max' && (
														<div className="p-5 flex justify-between w-full">
															<div className="text-[#FFF] font-normal gap-2 flex items-center w-[60%]">
																<div className="text-md">Coins Per Minute</div>
																<div>
																	<img src={loadcoin} alt="" />
																</div>
																<div className="text-xl text-[#FF8F00] font-medium">
																	<p>+{sendTokenData?.userData?.nextLevelCpm || sendTokenData?.levels[0]?.cpm}</p>
																</div>
															</div>
															<div className="w-[40%] flex items-center gap-2 border justify-center border-[#5B5B5B] rounded-xl py-1">
																<img
																	className=" h-[20px]"
																	src={BigCoin}
																	alt="Coin-Icon"
																/>
																<div className="text-[#FFF] text-[15px] font-normal ">
																	<p> + {sendTokenData?.userData?.nextLevelReward || sendTokenData?.levels[0]?.reward} {sendTokenData.name.match(/[A-Z]/g)?.join('')}</p>
																</div>
															</div>
														</div>
													)}
												</div>
											</div>
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
