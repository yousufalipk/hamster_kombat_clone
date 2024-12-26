import React, { useEffect, useState } from "react";
import CustomLoader from '../Loader/Loader';
import { useNavigate } from "react-router-dom";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import close from "../../assets/dailyreward/close.svg"

import { toast } from 'react-toastify';
import { useUser } from "../../context";

const VCS = () => {
	const { vcs, fetchVcs, upgradeVcLevel, vcLoader, balance } = useUser();

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
								className='fixed bottom-0 h-[35vh] w-screen'>
								<div className="absolute -inset-1 h-[35vh] bg-[#23a7ff] rounded-[35px]"></div>
								<div className="absolute -inset-2 h-[35vh] bg-[#23a7ff] blur rounded-[50px]"></div>
								<div className='w-screen bg-[#06060E] h-[35vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
									{/* Main Body */}
									<div className='mb-5 px-2 mt-10'>
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
													{selectedVc && (
														<>
															<img
																src={`data:image/jpeg;base64,${selectedVc.logo.data}`}
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
											<h1 className='text-sm font-medium'>{selectedVc.name}</h1>
										</div>
										{/* description */}
										<div className='my-2'>
											<p className='text-center font-thin text-xs'>
												You will get +{selectedVc?.userData?.nextLevelCpm || selectedVc.levels[0].cpm} coins per minute against {selectedVc?.userData?.nextLevelCost || selectedVc.levels[0].cost} pandatop coins.
											</p>
										</div>
										{/* action buttons */}
										<div className="flex flex-col gap-4 mt-3 justify-center p-2 items-center">
											<button
												className="w-1/2 h-10 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm disabled:grayscale disabled:cursor-not-allowed"
												onClick={handleVcUpgrade}
												disabled={buttonLoading}
											>
												{balance >= (selectedVc?.userData?.nextLevelCost ?? selectedVc.levels[0].cost) ? (
													<>
														{buttonLoading ? (
															<span className="h-6 font-bold">{dots}</span>
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
																<span className="mr-2 font-semibold text-xs">+{vc.userData?.nextLevelCpm || vc.levels[0].cpm}</span>
																Coin Per Minute
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
