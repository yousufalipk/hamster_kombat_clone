import React, { useEffect, useState } from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import CustomLoader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import close from "../../assets/dailyreward/close.svg"
import popupLine from "../../assets/token/popupLine.svg";

import { useUser } from '../../context/index';

import LeftPopupEllipse from '../../assets/optimizedImages/popup/leftEllipse.webp';
import RightPopupEllipse from '../../assets/optimizedImages/popup/rightEllipse.webp';
import PopupHorizontalLine from '../../assets/optimizedImages/popup/horizontalLine.webp';
import CrossImg from '../../assets/optimizedImages/closeButton.svg';
import PopupVerticalLine from '../../assets/optimizedImages/popup/verticalLine.webp';

const KOLS = () => {
	const { fetchKols, upgradeKolsLevel, kols, kolsLoader, balance, formatNumberWithSuffix } = useUser();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKol, setSelectedKol] = useState(null);

	const [popupClosing, setPopupClosing] = useState(false);

	const [dots, setDots] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);

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
		setIsModalOpen(true);
		setSelectedKol(kol);
	};

	const handleProjectUpgrade = async () => {
		setButtonLoading(true);
		try {
			const res = await upgradeKolsLevel(selectedKol._id);
			if (res.success) {
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log("Internal Server Error", error);
		} finally {
			setButtonLoading(false);
		}
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
								className='fixed bottom-0 h-[60vh] w-screen'>
								<div className="absolute -inset-1 h-[45vh] bg-[#23a7ff] rounded-[35px]"></div>
								<div className="absolute -inset-2 h-[45vh] bg-[#23a7ff] blur rounded-[50px]"></div>
								<div className='w-screen bg-[#06060E] h-[60vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
									{/* Main Body */}
									<div className='popup-content mb-5 px-2 mt-10'>
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

										<div className="popup-main">
											<div className='flex relative justify-center'>
												{/* logo */}
												<div className='w-fit pt-2'>
													<div
														style={{
															borderRadius: '100%',
															transform: 'translateZ(0)',
															filter: 'drop-shadow(0 0 15px rgba(255, 176, 0, 0.35))',
														}}
													>
														{selectedKol && (
															<>
																<img
																	src={`data:image/jpeg;base64,${selectedKol.logo.data}`}
																	alt='M-Icon'
																	width='60'
																	style={{
																		borderRadius: '12px',
																	}}
																/>
															</>
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
													You will get +{formatNumberWithSuffix(selectedKol?.userData?.nextLevelCpm || selectedKol.levels[0].cpm, 2)} coins per minute against {selectedKol?.userData?.nextLevelCost || selectedKol.levels[0].cost} pandatop coins.
												</p>
											</div>

											<div className='text-xl text-customOrange text-center'>
												<p>level {selectedKol?.userData?.level}</p>
											</div>

											<div className='py-2'>
												<img src={popupLine} alt="" className="pt-2" />
											</div>

											<div className='flex justify-center mt-3 gap-4'>
												<div className='flex justify-center items-center gap-1'>
													<img
														src={LittleCoin}
														alt="Little coin"
														className='w-5'
													/>
													<span className='text-sm text-customOrange'>{selectedKol?.userData?.nextLevelCost || selectedKol.levels[0].cost}</span>
												</div>
												<img src={PopupVerticalLine} alt="vertical_line" className="h-10" />
												<div className='flex gap-1 justify-between items-center'>
													<div className='flex justify-center items-center gap-1'>
														<img
															src={LittleCoin}
															alt="Little coin"
															className='w-5'
														/>
														<p className="text-sm">+{formatNumberWithSuffix(selectedKol?.userData?.nextLevelCpm || selectedKol.levels[0].cpm, 2)}</p>
													</div>
													<span className='text-xs font-thin'>CPM</span>
												</div>
											</div>
											{/* Buttons */}
											<div className="w-full h-[5vh] py-5">
												<button
													className={`w-full h-10 py-1 px-3 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm flex justify-center items-center`}
													onClick={() => {
														handleProjectUpgrade();
													}}
													disabled={buttonLoading}
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
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					<div className='h-[45vh] overflow-scroll'>
						{kols.map((kol, index) => {
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
																<span className="mr-2 font-semibold text-xs">+{formatNumberWithSuffix(kol.userData?.nextLevelCpm || kol.levels[0].cpm, 2)}</span>
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
														<div className="flex justify-end gap-1">
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
															src={`data:image/jpeg;base64,${kol.logo.data}`}
															alt=''
															width='85'
														/>
													</div>
													<div className="w-2/5 flex justify-end items-end h-[10vh]">
														<img
															src={`data:image/jpeg;base64,${kol.icon.data}`}
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
