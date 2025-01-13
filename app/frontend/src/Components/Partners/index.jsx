import React, { useEffect, useState } from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import CustomLoader from '../Loader/Loader';
import { toast } from 'react-toastify';
import close from "../../assets/dailyreward/close.svg"
import LeftPopupEllipse from '../../assets/optimizedImages/popup/leftEllipse.webp';
import RightPopupEllipse from '../../assets/optimizedImages/popup/rightEllipse.webp';
import popupLine from '../../assets/optimizedImages/popup/horizontalLine.webp';

import { useUser } from "../../context";

const Partners = () => {
	const { patners, fetchPatners, upgradePatnerLevel, patnerLoader, balance, formatNumberWithSuffix, formatCpm } = useUser();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPatner, setSelectedPatner] = useState(null);

	const [dots, setDots] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);

	const [popupClosing, setPopupClosing] = useState(false);

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
		if (patners.length === 0) {
			fetchPatners();
		}
	}, [])

	const handleUpgrade = (kol) => {
		setIsModalOpen(true);
		setSelectedPatner(kol);
	};

	const handlePatnerUpgrade = async () => {
		try {
			setButtonLoading(true);
			const res = await upgradePatnerLevel(selectedPatner._id);
			if (res.success) {
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {

		} finally {
			setButtonLoading(false);
			setIsModalOpen(false);
		}
	}

	if (patnerLoader) {
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
			{patners.length > 0 ? (
				<>
					{/* New Modal  */}
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
														{selectedPatner && (
															<img
																src={`data:image/jpeg;base64,${selectedPatner.logo.data}`}
																alt="booster_icon"
																className="w-full h-full object-cover rounded-full"
															/>
														)}
													</div>
												</div>
											</div>
											{/* popup title */}
											<div className='flex justify-center mt-1'>
												<h1 className='text-2xl popup-heading text-center'>{selectedPatner.name}</h1>
											</div>
											{/* description */}
											<div className='my-2'>
												<p className='text-[14px] font-light text-center'>
													You will get +{formatCpm(selectedPatner?.userData?.nextLevelCpm || selectedPatner.levels[0].cpm)} coins per minute against {selectedPatner?.userData?.nextLevelCost || selectedPatner.levels[0].cost} pandatop coins.
												</p>
											</div>

											<div className='text-xl text-customOrange text-center'>
												<p>Level {selectedPatner?.userData?.level + 1 || 1}</p>
											</div>

											{/* Next Level Cpm */}
											<div className='flex gap-1 justify-center items-center mt-3'>
												<div className='flex justify-center items-center gap-1'>
													<img
														src={LittleCoin}
														alt="Little coin"
														className='w-5'
													/>
													<p className="text-sm">+{formatCpm(selectedPatner?.userData?.nextLevelCpm || selectedPatner.levels[0].cpm)}</p>
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
													{selectedPatner?.userData?.nextLevelCost.toLocaleString() || selectedPatner.levels[0].cost.toLocaleString()}
												</p>
											</div>
											{/* Buttons */}
											<div className="w-full h-[5vh] mt-3">
												<button
													className={`w-full h-12 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg`}
													onClick={() => {
														handlePatnerUpgrade();
													}}
													disabled={buttonLoading}
												>
													{balance >= (selectedPatner?.userData?.nextLevelCost ?? selectedPatner.levels[0].cost) ? (
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
						{patners?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((patner, index) => {
							return (
								<div
									key={index}
									className="text-[#FFF] text-base font-medium flex justify-center items-center rounded-[14px] pt-3 mt-3 px-3"
									style={{
										background: `linear-gradient(to left, ${patner.fromColor}, ${patner.toColor})`,
									}}
								>
									<div className="w-[50vh]">
										{/* Card Body */}
										<div className="flex">
											{/* left section */}
											<div className="left w-1/2">
												{/* head */}
												<div className="flex gap-2">
													<div className="text-[12px]">{patner.name}</div>
													{patner?.userData?.level >= patner?.levels?.length ? (
														<>
															<div
																className="px-2 rounded-xl text-[8px]"
																style={{
																	background: `linear-gradient(to left, ${patner.fromColor}, ${patner.toColor})`,
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
																	background: `linear-gradient(to left, ${patner.fromColor}, ${patner.toColor})`,
																}}
															>

																lvl {patner?.userData?.level || 0}
															</div>
														</>
													)}
												</div>
												{/* body */}
												<div className="flex">
													{patner?.userData?.level >= patner?.levels?.length ? (
														<>

														</>
													) : (
														<>
															<img
																src={LittleCoin}
																alt='Coin-Icon'
															/>
															<div className="text-xs font-thin text-gray-300">
																<span className="mr-2 font-semibold text-xs">+{formatCpm(patner.userData?.nextLevelCpm || patner.levels[0].cpm)}</span>
																CPM
															</div>
														</>
													)}
												</div>
												{/* upgrade button */}
												{patner?.userData?.level >= patner?.levels?.length ? (
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
																	onClick={() => handleUpgrade(patner, patner?.userData?.nextLevelCost || patner.levels[0].cost)}
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
												{patner?.userData?.level >= patner?.levels?.length ? (
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
															<div className="text-sm">{patner.userData?.nextLevelCost.toLocaleString() || patner.levels[0].cost.toLocaleString()}</div>
														</div>
													</>
												)}
												<div className="flex">
													<div className="w-3/5 flex justify-end items-end h-[10vh]">
														<img
															src={`data:image/jpeg;base64,${patner.logo.data}`}
															alt=''
															width='85'
														/>
													</div>
													<div className="w-2/5 flex justify-end items-end h-[10vh]">
														<img
															src={`data:image/jpeg;base64,${patner.icon.data}`}
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
						<span className="text-xl font-semibold">No Patners!</span>
					</div>
				</>
			)}
		</>
	);
};

export default Partners;
