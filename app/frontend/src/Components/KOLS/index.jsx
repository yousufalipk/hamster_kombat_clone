import React, { useEffect, useState } from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import { LuLoader2 } from "react-icons/lu";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { useUser } from '../../context/index';

const KOLS = () => {
	const { fetchKols, upgradeKolsLevel, kols, kolsLoader, balance } = useUser();

	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedKol, setSelectedKol] = useState(null);
	const [processing, setProcessing] = useState(null);

	useEffect(() => {
		if (!kols) {
			fetchKols();
		}
	}, []);

	const handleUpgrade = (kol, upgradeCost) => {
		if (upgradeCost > balance) {
			toast.error('Insufficient Balance!');
			return;
		}
		setIsModalOpen(true);
		setSelectedKol(kol);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedKol(null);
	}

	const handleProjectUpgrade = async () => {
		try {
			setProcessing(true);
			const res = await upgradeKolsLevel(selectedKol._id);
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

	if (kolsLoader || processing) {
		return (
			<>
				<div className="h-[33vh] w-full flex justify-center items-center">
					<LuLoader2 className="animate-spin w-20 h-20 text-white" />
				</div>
			</>
		)
	}

	return (
		<>
			{kols ? (
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
											<h1 className='text-sm font-medium'>{selectedKol.name}</h1>
										</div>
										{/* description */}
										<div className='my-2'>
											<p className='text-center font-thin text-xs'>
												You will get +{selectedKol?.userData?.nextLevelCpm || selectedKol.levels[0].cpm} coins per minute against {selectedKol?.userData?.nextLevelCost || selectedKol.levels[0].cost} pandatop coins.
											</p>
										</div>
										{/* action buttons */}
										<div className='flex gap-4 mt-3 justify-center p-2'>
											<button
												className='w-1/2 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm'
												onClick={() => (handleProjectUpgrade())}
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
																<span className="mr-2 font-semibold text-xs">+{kol.userData?.nextLevelCpm || kol.levels[0].cpm}</span>
																Coin Per Minute
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
																	onClick={() => handleUpgrade(kol, kol?.userData?.nextLevelCost || kol.levels[0].cost)}
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
															<div className="text-sm">{kol.userData?.nextLevelCost || kol.levels[0].cost}</div>
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
