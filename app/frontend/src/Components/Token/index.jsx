import React, { useEffect } from "react";

import { toast } from 'react-toastify';
import { useUser } from '../../context/index';
import { useNavigate } from 'react-router-dom';

import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import Twitter from "../../assets/twitterIcon.png";
import Telegram from "../../assets/telegramIcon.png";
import Youtube from "../../assets/youtubeIcon.png";

const Token = () => {
	const { sendTokenData, isModalOpen, setModalOpen, upgradeProjectLevel } = useUser();

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
		const res = await upgradeProjectLevel(sendTokenData._id);
		navigate('/hammer');
		if (res.success) {
			toast.success(res.mess);
		} else {
			toast.error(res.mess);
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
				{sendTokenData && (
					<>
						{isModalOpen && (
							<div
								onClick={handleCancel}
								className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 overflow-hidden'>
								<div className='fixed bottom-0 h-[40vh] w-screen'>
									<div className="absolute -inset-1 h-[40vh] bg-[#23a7ff] rounded-[35px]"></div>
									<div className="absolute -inset-2 h-[40vh] bg-[#23a7ff] blur rounded-[50px]"></div>
									<div className='w-screen bg-[#1B1B27] h-[40vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
										{/* Main Body */}
										<div className='mb-5 px-2'>

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
														<img
															src={`data:image/jpeg;base64,${sendTokenData.icon.data}`}
															alt='M-Icon'
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
													You will get +{sendTokenData.userData.nextLevelReward} coins of {sendTokenData.name} coins against {sendTokenData.userData.nextLevelCost} pandatop coins.
												</p>
											</div>
											<div className='flex justify-center gap-2'>
												<img
													src={LittleCoin}
													alt="Little coin"
												/>
												<span className='text-xs'>+{sendTokenData.userData.nextLevelCpm} CPM</span>
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
						<div className='bg-[#060611] p-4 h-[100vh] overflow-hidden'>
							<div className='flex items-center gap-4'>
								<div className='text-[#FFF] text-[18px] font-semibold'>{sendTokenData.name}</div>
							</div>
							{/* Upper Portion */}
							<div className='pt-10'>
								<div className='flex py-3'>
									<div className='mx-auto flex items-center gap-2 px-4 py-2 rounded-[25.93px] bg-[#191922]'>
										<div className=''>
											<img
												src={`data:image/jpeg;base64,${sendTokenData.icon.data}`}
												alt='M-Icon'
												width={30}
											/>
										</div>
										<div className='text-[#FFF] text-[20.823px] font-medium'>
											<p>{sendTokenData.walletData.balance}</p>
										</div>
									</div>
								</div>
								{/* Card */}
								<div
									onClick={() => handleTokenBuy()}
									className=" rounded-[14px]"
									style={{
										background: `linear-gradient(to left, ${sendTokenData.fromColor}, ${sendTokenData.toColor})`,
									}}
								>
									<div className=''>
										<div className='flex justify-between border px-4 py-3 border-b-white border-t-0 border-r-0 border-l-0'>
											<div className='flex items-center gap-4'>
												<div className=''>
													<img
														src={`data:image/jpeg;base64,${sendTokenData.icon.data}`}
														alt='M-Icon'
														width={50}
													/>
												</div>
												<div className='text-[#FFF] font-medium'>
													<div className='text-base pb-[6px]'>
														<p>{sendTokenData.name}</p>
													</div>
													<div className='text-xs bg-black bg-opacity-30 w-fit p-1 rounded-[5px]'>
														<p className=''>lvl {sendTokenData.userData.level}</p>
													</div>
												</div>
											</div>
											<div className='flex items-center gap-2'>
												<div className=''>
													<img
														src={BigCoin}
														alt='Coin-Icon'
													/>
												</div>
												<div className='text-[#FFF] text-[29.043px]'>
													{sendTokenData.userData.nextLevelCost}
												</div>
											</div>
										</div>
										<div className='p-5 flex'>
											<div className='flex items-center gap-2'>
												<div className='text-[#FFF] text-lg font-normal'>
													<p>Reward:</p>
												</div>
												<div className=''>
													<img
														className='w-[20px] h-[20px]'
														src={BigCoin}
														alt='Coin-Icon'
													/>
												</div>
												<div className='text-[#FFF] text-[15px] font-normal border border-r-white border-t-0 border-b-0 border-l-0 pr-3'>
													<p>{sendTokenData.userData.nextLevelReward} MEMEFI</p>
												</div>
											</div>
											<div className='text-[#FFF] font-normal pl-3'>
												<div className='flex items-center gap-1'>
													<div className=''>
														<img
															src={LittleCoin}
															alt='Coin-Icon'
														/>
													</div>
													<div className='text-[11.655px]'>
														<p>+{sendTokenData.userData.nextLevelCpm}</p>
													</div>
												</div>
												<div className='text-[10.595px]'>Coins Per Minute</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Tasks Section */}
							<div className='h-[60vh] px-1 pt-4 overflow-scroll'>
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
