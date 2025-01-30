import React, { useEffect, useState } from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import CustomLoader from '../Loader/Loader';
import close from "../../assets/dailyreward/close.svg"

import { useUser } from '../../context/index';

import LeftPopupEllipse from '../../assets/optimizedImages/popup/leftEllipse.webp';
import RightPopupEllipse from '../../assets/optimizedImages/popup/rightEllipse.webp';
import popupLine from '../../assets/optimizedImages/popup/horizontalLine.webp';

import { motion, AnimatePresence } from "framer-motion";
import SparkelAnimation from '../../assets/animation/sparkle.gif';
import cardbg from "../../assets/token/tokencardbg.svg";

const KOLS = () => {
	const { fetchKols, upgradeKolsLevel, kols, kolsLoader, balance, triggerToast, formatCpm, comboCards, comboCardWinning, setComboCardWinning } = useUser();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKol, setSelectedKol] = useState(null);

	const [popupClosing, setPopupClosing] = useState(false);

	const [dots, setDots] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);

	const [index, setIndex] = useState(0);

	const [tasks, setTasks] = useState(null);

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
		if (kols.length === 0) {
			fetchKols();
		}
	}, []);

	const handleUpgrade = (kol) => {
		if (!kol.socialTasksCompleted && kol.tasks.length > 0) {
			setTasks(kol.tasks);
		}
		setIsModalOpen(true);
		setSelectedKol(kol);
	};

	const handleKolsUpgrade = async () => {
		setButtonLoading(true);
		try {
			const res = await upgradeKolsLevel(selectedKol._id);
			if (res.success) {
				triggerToast(res.mess, 'success');
			} else {
				triggerToast(res.mess, 'error');
			}
		} catch (error) {
			console.log("Internal Server Error", error);
		} finally {
			setButtonLoading(false);
			setIsModalOpen(false);
		}
	}

	const visitLinks = (tasks) => {
		if (!tasks) {
			setSelectedKol(prevState => ({
				...prevState,
				socialTasksCompleted: true
			}));
			setIndex(0);
			return;
		}
		if (index < tasks.length) {
			const newTab = window.open(tasks[index].link, "_blank");

			if (newTab) {
				const checkTab = setInterval(() => {
					if (newTab.closed) {
						clearInterval(checkTab);
						setIndex((prevIndex) => {
							const nextIndex = prevIndex + 1;
							if (nextIndex < tasks.length) {
								visitLinks();
							} else {
								setSelectedKol(prevState => ({
									...prevState,
									socialTasksCompleted: true
								}));
								setIndex(0);
							}
							return nextIndex;
						});
					}
				}, 1000);
			} else {
				console.log("Popup blocked! Please allow pop-ups for this site.");
			}
		}
	}

	const playCombocardwinning = () => {
		setComboCardWinning(true);
		setTimeout(() => {
			setComboCardWinning(false)
		}, 10000)
	}

	if (kolsLoader) {
		return (
			<>
				<div className="h-[33vh] w-full flex justify-center items-center">
					<CustomLoader size={100} />
				</div>
			</>
		)
	}

	return (
		<>
			{kols.length > 0 ? (
				<>
					{isModalOpen && (
						<div
							style={{
								animation: `${popupClosing ? "fadeOut" : "fadeIn"
									} 0.5s ease-in-out forwards`,
							}}
							onClick={() => {
								setPopupClosing(true);
								setTimeout(() => {
									setIsModalOpen(false);
									setPopupClosing(false);
								}, 500);
							}}
							className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 overflow-hidden'>
							<div
								style={{
									animation: `${popupClosing ? "closePopup" : "openPopup"
										} 0.5s ease-in-out forwards`,
								}}
								className='fixed bottom-0 h-[58vh] w-screen'>
								<div className="absolute -inset-1 h-[45vh] bg-[#23a7ff] rounded-[35px]"></div>
								<div className="absolute -inset-2 h-[45vh] bg-[#23a7ff] blur rounded-[50px]"></div>
								<div className='w-screen bg-[#06060E] h-[58vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
									{/* Main Body */}
									<div className='popup-content mb-5 px-2 mt-5'>
										{/* Left top ellipse */}
										<div className="-left-10 -top-20 w-52 h-52 absolute">
											<img src={LeftPopupEllipse} alt="popup-ellipse" />
										</div>
										{/* Right bottom ellipse */}
										<div className="-right-10 -bottom-5 w-52 h-52 absolute">
											<img src={RightPopupEllipse} alt="popup-ellipse" />
										</div>
										<div className="absolute top-4 right-5">
											<button onClick={() => {
												setPopupClosing(true);
												setTimeout(() => {
													setIsModalOpen(false);
													setPopupClosing(false);
												}, 500);
											}}>
												<img src={close} alt="" width={25} />
											</button>
										</div>

										<div
											onClick={(e) => e.stopPropagation()}
											className="popup-main">
											<h1 className="border-2 border-gray-200 w-[20vw] mx-auto absolute top-2 left-[40%] rounded-full"></h1>
											<div className='flex relative justify-center'>
												{/* logo */}
												<div className="mx-auto w-20 h-20 overflow-hidden">
													<div
														style={{
															borderRadius: '100%',
															transform: 'translateZ(0)',
															filter: 'drop-shadow(0 0 15px rgba(255, 176, 0, 0.35))',
														}}
													>
														{selectedKol && (
															<img
																src={selectedKol.logo.data}
																alt="booster_icon"
																className="w-full h-full object-cover rounded-full"
															/>
														)}
													</div>
												</div>
											</div>
											{/* popup title */}
											<div className='flex justify-center mt-1'>
												<h1 className='text-2xl popup-heading text-center'>{selectedKol.name}</h1>
											</div>
											{/* description */}
											<div className='my-2'>
												<p className='text-[14px] font-light text-center'>
													You will get +{formatCpm(selectedKol?.userData?.nextLevelCpm || selectedKol.levels[0].cpm)} coins per minute against {selectedKol?.userData?.nextLevelCost || selectedKol.levels[0].cost} pandatop coins.
												</p>
											</div>

											<div className='text-xl text-customOrange text-center'>
												<p>Level {selectedKol?.userData?.level + 1 || 1}</p>
											</div >

											{/* Next Level Cpm */}
											<div div className='flex gap-1 justify-center items-center mt-3' >
												<div className='flex justify-center items-center gap-1'>
													<img
														src={LittleCoin}
														alt="Little coin"
														className='w-5'
													/>
													<p className="text-sm">+{formatCpm(selectedKol?.userData?.nextLevelCpm || selectedKol.levels[0].cpm)}</p>
												</div>
												<span className='text-xs font-thin'>CPM</span>
											</div>

											<div className='py-2'>
												<img src={popupLine} alt="" className="pt-2" />
											</div>

											{/* Cost */}
											<div>
												<p className="flex justify-center items-center gap-1 text-2xl text-customOrange">
													<img
														src={LittleCoin}
														alt="Little coin"
														width={25}
														height={25}
														className="mt-1"
													/>
													{selectedKol?.userData?.nextLevelCost.toLocaleString() || selectedKol.levels[0].cost.toLocaleString()}
												</p>
											</div>
											{/* Buttons */}
											<div className="w-full h-[5vh] mt-3">
												<button
													disabled={!selectedKol?.socialTasksCompleted || buttonLoading}
													className={`w-full h-12 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg`}
													onClick={() => {
														handleKolsUpgrade();
													}}
												>
													{balance >= (selectedKol?.userData?.nextLevelCost ?? selectedKol.levels[0].cost) ? (
														<>
															{buttonLoading ? (
																<span className="flex justify-center items-center font-semibold text-5xl w-full">
																	<p className="absolute -mt-6">
																		{dots}
																	</p>
																</span>
															) : (
																"Upgrade"
															)}
														</>
													) : (
														"Insufficient Balance"
													)}
												</button>
											</div>
										</div >
									</div >
								</div >
							</div >
						</div >
					)}

					{comboCardWinning && (
						<AnimatePresence>
							{comboCardWinning && (
								<motion.div
									style={{
										zIndex: 50000000000
									}}
									className="fixed inset-0 flex justify-center items-center text-white"
									initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
									animate={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
									exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
									transition={{ duration: 0.5 }}
								>
									{/* Cards Container */}
									<motion.div
										className="relative flex justify-center items-center w-[90%] max-w-3xl  z-50 gap-2"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 1 }}
									>

										{/* Left Card */}
										<motion.div
											className="flex justify-center items-center"
											initial={{ x: "-100vw" }}
											animate={{ x: "0" }}
											transition={{
												duration: 1,
												delay: 0.5,
											}}
										>
											{/* Post Wiggle Animation */}
											<motion.div
												animate={{
													rotate: [0, 2, -2, 0],
												}}
												transition={{
													duration: 2,
													delay: 8,
													ease: "easeInOut",
												}}
											>
												{/* Wiggle Animation */}
												<motion.div
													animate={{
														rotate: [0, 10, -10, 0],
													}}
													transition={{
														duration: 2,
														delay: 4,
														ease: "easeInOut",
													}}
												>
													{/* Move Up and Exit */}
													<motion.div
														animate={{
															y: [0, "-240%"]
														}}
														transition={{
															duration: 1,
															delay: 6.5,
															ease: "easeIn",
														}}
														style={{
															background: `linear-gradient(to bottom, ${comboCards[0]?.fromColor}, ${comboCards[0]?.toColor})`
														}}
														className="w-24 h-32 rounded-md flex justify-center items-center"
													>
														<div className="w-full h-full absolute z-20 flex flex-col justify-center items-center gap-2">
															<img
																className="w-[50px] h-[50px] rounded-full"
																src={comboCards[0].icon}
																alt="BigCoin-Icon"
															/>
															<h1 className="text-center w-full">
																{comboCards[0].name}
															</h1>
														</div>
														<div className="relative w-full h-full overflow-hidden z-10 flex justify-center items-center">
															<img
																src={cardbg}
																alt=""
																className="opacity-10 w-[180px] h-[180px]"
															/>
															<div className=" flex items-center justify-center absolute">
																<p className="font-italianno text-[3rem]   text-slate-100 opacity-10">
																	{comboCards[0].name.charAt(0)}
																</p>
															</div>
														</div>
													</motion.div>
												</motion.div>
											</motion.div>
										</motion.div>

										{/* Right Card */}
										<motion.div
											className="flex justify-center items-center"
											initial={{ x: "100vw" }}
											animate={{ x: "0" }}
											transition={{
												duration: 1,
												delay: 0.5,
											}}
										>
											{/* Post Wiggle Animation */}
											<motion.div
												animate={{
													rotate: [0, -2, 2, 0],
												}}
												transition={{
													duration: 2,
													delay: 8,
													ease: "easeInOut",
												}}
											>
												{/* Wiggle Animation */}
												<motion.div
													animate={{
														rotate: [0, -10, 10, 0],
													}}
													transition={{
														duration: 2,
														delay: 4,
														ease: "easeInOut",
													}}
												>
													{/* Move Up */}
													<motion.div
														animate={{
															y: [0, "-240%"],
															//opacity: [1, 0],
														}}
														transition={{
															duration: 1,
															delay: 6.5,
															ease: "easeIn",
														}}
														style={{
															background: `linear-gradient(to bottom, ${comboCards[1]?.fromColor}, ${comboCards[1]?.toColor})`
														}}
														className="w-24 h-32 rounded-md flex justify-center items-center"
													>
														<div className="w-full h-full absolute z-20 flex flex-col justify-center items-center gap-2">
															<img
																className="w-[50px] h-[50px] rounded-full"
																src={comboCards[1].icon}
																alt="BigCoin-Icon"
															/>
															<h1 className="text-center w-full">
																{comboCards[1].name}
															</h1>
														</div>
														<div className="relative w-full h-full overflow-hidden z-10 flex justify-center items-center">
															<img
																src={cardbg}
																alt=""
																className="opacity-10 w-[180px] h-[180px]"
															/>
															<div className=" flex items-center justify-center absolute">
																<p className="font-italianno text-[3rem]   text-slate-100 opacity-10">
																	{comboCards[1].name.charAt(0)}
																</p>
															</div>
														</div>
													</motion.div>
												</motion.div>
											</motion.div>
										</motion.div>
									</motion.div>

									{/* Congratulations Text */}
									<motion.div
										className="absolute z-50 top-[25%] text-center"
										initial={{ opacity: 0, y: -50 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0 }}
										transition={{ delay: 2, duration: 1 }}
									>
										<motion.div
											animate={{
												scale: [1, 0],
												opacity: [1, 0],
												y: [0, -20],
											}}
											transition={{
												duration: 1,
												delay: 6.5,
												ease: "easeIn",
											}}
										>
											<h1
												style={{
													textShadow: '0px 0px 20px #016EE9',
												}}
												className="text-white text-center text-xl font-semibold px-3"
											>
												CONGRATULATIONS! You have completed Combo Card!
											</h1>
										</motion.div>
									</motion.div>

									{/* Coins Text */}
									<motion.div
										className="absolute z-50 bottom-[10%] text-center"
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0 }}
										transition={{ delay: 2, duration: 1 }}
									>
										<motion.div
											animate={{
												scale: [1, 0],
												opacity: [1, 0],
												y: [0, -20],
											}}
											transition={{
												duration: 1,
												delay: 6.5,
												ease: "easeIn",
											}}
										>
											<h2 className="text-2xl font-semibold">50,000 Coins</h2>
										</motion.div>
									</motion.div>

									{/* Sparkles GIF */}
									<motion.div
										className="absolute bottom-[10%] z-0 flex justify-center items-center"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ delay: 1.3, duration: 1 }}
									>
										<motion.div
											animate={{
												scale: [1, 0],
												opacity: [1, 0],
												y: [0, -20],
											}}
											transition={{
												duration: 1,
												delay: 6.5,
												ease: "easeIn",
											}}
										>
											<img src={SparkelAnimation} alt="Sparkles" width={800} />
										</motion.div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					)}

					<div className="w-full h-12 absolute z-10 top-0 right-0 flex justify-center items-center gap-2">
						<button
							onClick={() => {
								playCombocardwinning()
							}}
							className="bg-purple-600 p-2 text-white rounded-full w-1/2"
						>
							Play One Combo Animation
						</button>
					</div>

					<div className='h-[45vh] overflow-scroll'>
						{kols?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((kol, index) => {
							return (
								<div
									key={index}
									className="text-[#FFF] text-base font-medium flex justify-center items-center rounded-[14px] pt-3 mt-3 px-3"
									style={{
										background: `linear-gradient(to left, ${kol.fromColor}, ${kol.toColor})`,
									}}
								>
									<div className="w-[50vh]">
										{/* Card Body */}
										<div className="flex">
											{/* left section */}
											<div className="left w-1/2">
												{/* head */}
												<div className="flex gap-2">
													<div className="text-[12px]">{kol.name}</div>
													{kol?.userData?.level >= kol?.levels?.length ? (
														<>
															<div
																className="px-2 rounded-xl text-[8px]"
																style={{
																	background: `linear-gradient(to left, ${kol.fromColor}, ${kol.toColor})`,
																}}
															>

																lvl MAX
															</div>
														</>
													) : (
														<>
															<div
																className="px-2 rounded-xl text-[8px]"
																style={{
																	background: `linear-gradient(to left, ${kol.fromColor}, ${kol.toColor})`,
																}}
															>
																lvl {kol?.userData?.level || 0}
															</div>
														</>
													)}
												</div>
												{/* body */}

												<div className="flex">
													{kol?.userData?.level >= kol?.levels?.length ? (
														<>

														</>
													) : (
														<>
															<img
																src={LittleCoin}
																alt='Coin-Icon'
															/>
															<div className="text-xs font-thin text-gray-300">
																<span className="mr-2 font-semibold text-xs">+{formatCpm(kol.userData?.nextLevelCpm || kol.levels[0].cpm)}</span>
																CPM
															</div>
														</>
													)}
												</div>
												{/* upgrade button */}
												{kol?.userData?.level >= kol?.levels?.length ? (
													<>

													</>
												)
													: (
														<>
															<div className="mt-2 flex items-center justify-center gap-2 rounded-[18px] w-fit px-3 py-1 bg-[#FFF] text-black">
																<img
																	src={AngleIcon}
																	alt='Angle-icon'
																	width='5'
																/>
																<button
																	className="text-xs font-thin"
																	onClick={() => handleUpgrade(kol)}
																	disabled={buttonLoading}
																>
																	Upgrade
																</button>
															</div>
														</>
													)}
											</div>

											{/* right section */}
											<div className="right w-1/2">
												{kol?.userData?.level >= kol?.levels?.length ? (
													<>

													</>
												) : (
													<>
														<div className="relative flex justify-end gap-1 z-10">
															<img
																src={BigCoin}
																alt='Coin-Icon'
																width="15"
															/>
															<div className="text-sm">{kol.userData?.nextLevelCost.toLocaleString() || kol.levels[0].cost.toLocaleString()}</div>
														</div>
													</>
												)}
												<div className="flex">
													<div className="w-3/5 flex justify-end items-end h-[10vh]">
														<img
															src={kol.logo.data}
															alt=''
															width='85'
														/>
													</div>
													<div className="w-2/5 flex justify-end items-end h-[10vh]">
														<img
															src={kol.icon.data}
															alt=''
															width='85'
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<>
					<div className="h-[33vh] w-full flex justify-center items-center text-white">
						<span className="text-xl font-semibold">No Kols!</span>
					</div>
				</>
			)
			}
		</>
	);
};

export default KOLS;
