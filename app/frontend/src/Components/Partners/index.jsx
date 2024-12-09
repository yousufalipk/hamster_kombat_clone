import React, { useEffect, useState } from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import CustomLoader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context";

const Partners = () => {

	const navigate = useNavigate();

	const { patners, fetchPatners, upgradePatnerLevel, patnerLoader, balance } = useUser();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPatner, setSelectedPatner] = useState(null);
	const [processing, setProcessing] = useState(null);

	useEffect(() => {
		if (!patners) {
			fetchPatners();
		}
	}, [])

	const handleUpgrade = (kol, upgradeCost) => {
		if (upgradeCost > balance) {
			toast.error('Insufficient Balance!');
			return;
		}
		setIsModalOpen(true);
		setSelectedPatner(kol);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedPatner(null);
	}

	const handlePatnerUpgrade = async () => {
		try {
			setProcessing(true);
			const res = await upgradePatnerLevel(selectedPatner._id);
			if (res.success) {
				navigate('/hammer');
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {

		} finally {
			setProcessing(false);
		}
	}

	if (patnerLoader || processing) {
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

					{isModalOpen && (
						<div
							onClick={() => handleCancel()}
							className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 overflow-hidden'>
							<div className='fixed bottom-0 h-[40vh] w-screen'>
								<div className="absolute -inset-1 h-[40vh] bg-[#23a7ff] rounded-[35px]"></div>
								<div className="absolute -inset-2 h-[40vh] bg-[#23a7ff] blur rounded-[50px]"></div>
								<div className='w-screen bg-[#1B1B27] h-[40vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
									{/* Main Body */}
									<div className='mb-5 px-2 mt-10'>

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
													{selectedPatner && (
														<>
															<img
																src={`data:image/jpeg;base64,${selectedPatner.logo.data}`}
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
											<h1 className='text-sm font-medium'>{selectedPatner.name}</h1>
										</div>
										{/* description */}
										<div className='my-2'>
											<p className='text-center font-thin text-xs'>
												You will get +{selectedPatner?.userData?.nextLevelCpm || selectedPatner.levels[0].cpm} coins per minute against {selectedPatner?.userData?.nextLevelCost || selectedPatner.levels[0].cost} pandatop coins.
											</p>
										</div>
										{/* action buttons */}
										<div className='flex gap-4 mt-3 justify-center p-2'>
											<button
												className='w-1/2 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm'
												onClick={() => (handlePatnerUpgrade())}
											>
												Confirm
											</button>
										</div>
									</div>

								</div>
							</div>
						</div>
					)}

					<div className='h-[45vh] overflow-scroll'>
						{patners.map((patner, index) => {
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
																<span className="mr-2 font-semibold text-xs">+{patner.userData?.nextLevelCpm || patner.levels[0].cpm}</span>
																Coin Per Minute
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
												{patner?.userData?.level >= patner?.levels?.length ? (
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
															<div className="text-sm">{patner.userData?.nextLevelCost || patner.levels[0].cost}</div>
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
