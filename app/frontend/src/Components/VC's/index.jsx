import React, { useEffect, useState } from "react";
import CustomLoader from '../Loader/Loader';
import { useNavigate } from "react-router-dom";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import close from "../../assets/dailyreward/close.svg";
import LeftPopupEllipse from '../../assets/optimizedImages/popup/leftEllipse.webp';
import RightPopupEllipse from '../../assets/optimizedImages/popup/rightEllipse.webp';
import popupLine from '../../assets/optimizedImages/popup/horizontalLine.webp';

import { toast } from 'react-toastify';
import { useUser } from "../../context";

const VCS = () => {
	const { vcs, fetchVcs, upgradeVcLevel, vcLoader, balance, formatNumberWithSuffix, formatCpm } = useUser();

	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedVc, setSelectedVc] = useState(null);
	const [processing, setProcessing] = useState(null);

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
		if (vcs.length === 0) {
			fetchVcs();
		}
	}, [])

	const handleUpgrade = (vc) => {
		setIsModalOpen(true);
		setSelectedVc(vc);
	};

	const handleVcUpgrade = async () => {
		setButtonLoading(true);
		try {
			setProcessing(true);
			const res = await upgradeVcLevel(selectedVc._id);
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

	if (vcLoader) {
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
			{vcs.length > 0 ? (
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
												<img src={close} width={25} />
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
														{selectedVc && (
															<img
																src={`data:image/jpeg;base64,${selectedVc.logo.data}`}
																alt="booster_icon"
																className="w-full h-full object-cover rounded-full"
															/>
														)}
													</div>
												</div>
											</div>
											{/* popup title */}
											<div className='flex justify-center mt-1'>
												<h1 className='text-2xl popup-heading text-center'>{selectedVc.name}</h1>
											</div>
											{/* description */}
											<div className='my-2'>
												<p className='text-[14px] font-light text-center'>
													You will get +{formatCpm(selectedVc?.userData?.nextLevelCpm || selectedVc.levels[0].cpm)} coins per minute against {selectedVc?.userData?.nextLevelCost || selectedVc.levels[0].cost} pandatop coins.
												</p>
											</div>

											<div className='text-xl text-customOrange text-center'>
												<p>Level {selectedVc?.userData?.level || 0}</p>
											</div>

											{/* Next Level Cpm */}
											<div className='flex gap-1 justify-center items-center mt-3'>
												<div className='flex justify-center items-center gap-1'>
													<img
														src={LittleCoin}
														alt="Little coin"
														className='w-5'
													/>
													<p className="text-sm">+{formatCpm(selectedVc?.userData?.nextLevelCpm || selectedVc.levels[0].cpm)}</p>
												</div>
												<span className='text-xs font-thin'>CPM</span>
											</div>

											<div className="py-2">
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
													{selectedVc?.userData?.nextLevelCost || selectedVc.levels[0].cost}
												</p>
											</div>
											{/* Buttons */}
											<div className="w-full h-[5vh] mt-3">
												<button
													className={`w-full h-12 p-2 bg-gradient-to-t from-darkBlue to-lightBlue rounded-lg text-lg`}
													onClick={() => {
														handleVcUpgrade();
													}}
													disabled={buttonLoading}
												>
													{balance >= (selectedVc?.userData?.nextLevelCost ?? selectedVc.levels[0].cost) ? (
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
						{vcs.map((vc, index) => {
							return (
								<div
									key={index}
									className="text-[#FFF] text-base font-medium flex justify-center items-center rounded-[14px] pt-3 mt-3 px-3"
									style={{
										background: `linear-gradient(to left, ${vc.fromColor}, ${vc.toColor})`,
									}}
								>
									<div className="w-[50vh]">
										{/* Card Body */}
										<div className="flex">
											{/* left section */}
											<div className="left w-1/2">
												{/* head */}
												<div className="flex gap-2">
													<div className="text-[12px]">{vc.name}</div>
													{vc?.userData?.level >= vc?.levels?.length ? (
														<>
															<div
																className="px-2 rounded-xl text-[8px]"
																style={{
																	background: `linear-gradient(to left, ${vc.fromColor}, ${vc.toColor})`,
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
																	background: `linear-gradient(to left, ${vc.fromColor}, ${vc.toColor})`,
																}}
															>

																lvl {vc?.userData?.level || 0}
															</div>
														</>
													)}
												</div>
												{/* body */}
												<div className="flex">
													{vc?.userData?.level >= vc?.levels?.length ? (
														<>

														</>
													) : (
														<>
															<img
																src={LittleCoin}
																alt='Coin-Icon'
															/>
															<div className="text-xs font-thin text-gray-300">
																<span className="mr-2 font-semibold text-xs">+{formatCpm(vc.userData?.nextLevelCpm || vc.levels[0].cpm)}</span>
																CPM
															</div>
														</>
													)}
												</div>
												{/* upgrade button */}
												{vc?.userData?.level >= vc?.levels?.length ? (
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
																	onClick={() => handleUpgrade(vc, vc?.userData?.nextLevelCost || vc.levels[0].cost)}
																	disabled={processing}
																>
																	Upgrade
																</button>
															</div>
														</>
													)}
											</div>

											{/* right section */}
											<div className="right w-1/2">
												{vc?.userData?.level >= vc?.levels?.length ? (
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
															<div className="text-sm">{vc.userData?.nextLevelCost.toLocaleString() || vc.levels[0].cost.toLocaleString()}</div>
														</div>
													</>
												)}
												<div className="flex">
													<div className="w-3/5 flex justify-end items-end h-[10vh]">
														<img
															src={`data:image/jpeg;base64,${vc.logo.data}`}
															alt=''
															width='85'
														/>
													</div>
													<div className="w-2/5 flex justify-end items-end h-[10vh]">
														<img
															src={`data:image/jpeg;base64,${vc.icon.data}`}
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
						<span className="text-xl font-semibold">No Vcs!</span>
					</div>
				</>
			)}
		</>
	);
};

export default VCS;
