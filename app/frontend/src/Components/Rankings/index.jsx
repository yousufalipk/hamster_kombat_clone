import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../context/index';
import CustomLoader from '../Loader/Loader';

import LeftArrowIcon from '../../assets/leaderboard/left.svg';
import RightArrowIcon from '../../assets/leaderboard/right.svg';

import BackgroundImg from '../../assets/optimizedImages/Home/bg.svg';

import SilverStage from '../../assets/leaderboard/stages/silver.svg';
import GoldStage from '../../assets/leaderboard/stages/gold.svg';
import DaimondStage from '../../assets/leaderboard/stages/daimond.svg';
import PlatinumStage from '../../assets/leaderboard/stages/platinum.svg';
import LegendaryStage from '../../assets/leaderboard/stages/legendary.svg';
import MasterStage from '../../assets/leaderboard/stages/master.svg';
import GrandMasterStage from '../../assets/leaderboard/stages/grandMaster.svg';
import EpicStage from '../../assets/leaderboard/stages/epic.svg';

import KingCrown from '../../assets/leaderboard/king.svg';
import BadgeIcon from '../../assets/leaderboard/badge.svg';
import Coin from "../../assets/BigCoinIcon.svg";

import ProfilePic from '../../assets/profile.png';

const Rankings = () => {
	const { rankLoader, setRankLoader, topUsers, fetchLeaderboardUsers, level, userId, levelsData } = useUser();

	const staticUser = process.env.REACT_APP_STATIC_USER;
	const navigate = useNavigate();

	const [currentPageUsers, setCurrentPageUsers] = useState(null);
	const [page, setPage] = useState(level);
	const stageImageRef = useRef();

	useEffect(() => {
		if (staticUser === 'false') {
			const tg = window.Telegram.WebApp;

			tg.BackButton.show();
			tg.BackButton.onClick(() => {
				navigate("/");
			});

			return () => {
				tg.BackButton.hide();
				tg.BackButton.offClick();
			};
		}
	}, [navigate]);

	const stageImages = {
		0: SilverStage,
		1: GoldStage,
		2: DaimondStage,
		3: PlatinumStage,
		4: LegendaryStage,
		5: MasterStage,
		6: GrandMasterStage,
		7: EpicStage,
		8: EpicStage,
		9: EpicStage,
		10: EpicStage,
		11: EpicStage,
		12: EpicStage,
		13: EpicStage,
	};

	useEffect(() => {
		if (level) {
			setPage(level - 1);
			updateStageImage(level - 1);
		}
	}, [level]);

	const updateStageImage = (stage) => {
		if (stageImageRef.current) {
			stageImageRef.current.src = stageImages[stage];
		}
	};

	const handleClickLeft = () => {
		// setRankLoader(true);
		if (page > 0) {
			setPage((prevPage) => prevPage - 1);
			updateStageImage(page);
			setTimeout(() => {
				setRankLoader(false);
			}, 300)
		} else {
			// setRankLoader(false);
			console.log("You're at the first page!");
		}
	};

	const handleClickRight = () => {
		//setRankLoader(true);
		if (page < levelsData.length - 1) {
			setPage((prevPage) => prevPage + 1);
			updateStageImage(page);
			setTimeout(() => {
				setRankLoader(false);
			}, 300)
		} else {
			//setRankLoader(false);
			console.log("You're at the last page!");
		}
	};

	useEffect(() => {
		if (!topUsers) {
			fetchLeaderboardUsers();
		}
	}, []);

	useEffect(() => {
		if (topUsers && topUsers[page]) {
			setCurrentPageUsers(topUsers[page]);
		}
	}, [page, topUsers]);

	useEffect(() => {
		if (staticUser === false) {
			const tg = window.Telegram.WebApp;

			tg.BackButton.show();
			tg.BackButton.onClick(() => {
				navigate("/");
			});

			return () => {
				tg.BackButton.hide();
				tg.BackButton.offClick();
			};
		}
	}, [navigate]);


	const formatLargeNumber = (value) => {
		if (value === null || value === undefined || isNaN(value)) return '0';

		const absValue = Math.abs(value);
		let formattedValue = value;

		if (absValue >= 1e12) {
			formattedValue = `${(value / 1e12).toFixed(2)}T`;
		} else if (absValue >= 1e9) {
			formattedValue = `${(value / 1e9).toFixed(2)}B`;
		} else if (absValue >= 1e6) {
			formattedValue = `${(value / 1e6).toFixed(2)}M`;
		} else if (absValue >= 1e3) {
			formattedValue = `${(value / 1e3).toFixed(2)}K`;
		} else {
			formattedValue = value.toFixed(2);
		}

		return formattedValue;
	};

	return (
		<>
			{rankLoader && (
				<>
					<div
						className="fixed z-50 h-[100vh] w-[100vw] bg-black flex justify-center items-center">
						<CustomLoader size={200} />
					</div>
				</>
			)}
			{topUsers && currentPageUsers && (
				<>
					<div className='h-[92vh] w-[100vw] z-10 overflow-scroll overflow-x-hidden'>
						<div className='min-h-[37vh] px-5 rounded-br-3xl rounded-bl-3xl relative'>
							{/* Background Image */}
							<div className="absolute z-10">
								<img
									src={BackgroundImg}
									alt="Background"
									className="w-full h-full object-cover relative scale-150 top-[9vh]"
								/>
							</div>
							<div className="relative z-10">
								<div className="w-full h-[10vh] flex justify-end items-center">
									<div className="flex justify-center items-center text-white font-semibold gap-1">
										<img src={BadgeIcon} alt="badge_icon" />
										<p className="capitalize">{levelsData[page].name}</p>
									</div>
								</div>
								{/* top 3 stage */}
								<div className='h-[40vh] flex text-[#FFF] overflow-hidden'>
									<button
										onClick={handleClickLeft}
										className={`${page === 0 ? "opacity-50 pointer-events-none" : "opacity-100"}`}
									>
										<img src={LeftArrowIcon} alt="left" />
									</button>
									<div className='flex w-[80vw] mx-2 justify-center items-center relative'>
										<img
											ref={stageImageRef}
											src={stageImages[page]}
											alt="stage_img"
											className="absolute bottom-0"
											loading="eager"
										/>
										<div className="absolute z-50 h-full w-full flex justify-center mx-5">
											<div className="left w-[25vw] mt-10 flex flex-col items-center gap-1">
												{currentPageUsers[1] && (
													<>
														{currentPageUsers[1].profilePic === 'not set' ? (
															<>
																<img src={ProfilePic} alt="img" width={70} className="rounded-full" />
															</>
														) : (
															<>
																<img src={currentPageUsers[1].profilePic} alt="img" width={50} className="rounded-full" />
															</>
														)}
														<p>{currentPageUsers[1].firstName.slice(0, 7)}</p>
														<div className="flex justify-center items-center gap-1 bg-gray-800 rounded-lg p-1 text-sm">
															<img src={Coin} alt="coin" width={15} />
															{formatLargeNumber(currentPageUsers[1].balance)}
														</div>
													</>
												)}
											</div>
											<div className="mid w-[25vw] mt-4 flex flex-col items-center gap-1 relative">
												{currentPageUsers[0] && (
													<>
														{currentPageUsers[0].profilePic === 'not set' ? (
															<>
																<img src={ProfilePic} alt="img" width={70} className="rounded-full" />
															</>
														) : (
															<>
																<div className="relative flex justify-center items-start">
																	<img src={KingCrown} alt="crown" width={20} className="absolute -top-3" />
																	<img src={currentPageUsers[0].profilePic} alt="img" width={50} className="rounded-full" />
																</div>
															</>
														)}
														<p>{currentPageUsers[0].firstName.slice(0, 7)}</p>
														<div className="flex justify-center items-center gap-1 bg-gray-800 rounded-lg p-1 text-sm">
															<img src={Coin} alt="coin" width={18} />
															{formatLargeNumber(currentPageUsers[0].balance)}
														</div>
													</>
												)}
											</div>
											<div className="right w-[25vw] mt-12 flex flex-col items-center gap-1">
												{currentPageUsers[2] && (
													<>
														{currentPageUsers[2].profilePic === 'not set' ? (
															<>
																<img src={ProfilePic} alt="img" width={70} className="rounded-full" />
															</>
														) : (
															<>
																<img src={currentPageUsers[2].profilePic} alt="img" width={50} className="rounded-full" />
															</>
														)}
														<p>{currentPageUsers[2].firstName.slice(0, 7)}</p>
														<div className="flex justify-center items-center gap-1 bg-gray-800 rounded-lg p-1 text-sm">
															<img src={Coin} alt="coin" width={18} />
															{formatLargeNumber(currentPageUsers[2].balance)}
														</div>
													</>
												)}
											</div>
										</div>
									</div>
									<button
										onClick={handleClickRight}
										className={`${page === levelsData.length - 1 ? "opacity-50 pointer-events-none" : "opacity-100"}`}
									>
										<img src={RightArrowIcon} alt="right" />
									</button>
								</div>
								{/* List of competitors */}
								<div className='bg-[#1B1B27] pb-10 pt-5 rounded-tl-[14px] rounded-tr-[14px] flex flex-col gap-3 w-[90vw]'>
									<div className="flex flex-col gap-4 justify-start items-center min-h-[40vh]">
										{currentPageUsers.map((user, i) => {
											if (i <= 2) return null;

											return user._id === userId ? (
												<div className="relative w-[85vw] rounded-lg">
													<div className="absolute left-0 top-0 -bottom-1 -inset-4 w-[85vw] bg-[#23A7FF] rounded-2xl z-10"></div>
													<div className="absolute top-5 -bottom-0 inset-4 bg-[#23A7FF] blur rounded-lg z-10"></div>
													<div className="absolute -top-1 -bottom-2 -inset-0 bg-[#962833] blur rounded-lg z-0 opacity-50"></div>
													<div
														key={user.id}
														className="relative z-20 shadow-md border-[0.5px] border-[#12121C] w-[85vw] h-[10vh] bg-[#0C0C0C] rounded-xl flex items-center gap-3 font-semibold"
													>
														{/* User Profile */}
														<div className="flex items-center gap-3 py-1 px-3 w-full">
															<div className="w-[10%] flex justify-center items-center overflow-hidden">
																<span className="rounded-full border-gray-600 p-2 text-xs flex justify-center items-center text-gray-400 w-5 h-5">
																	{i}
																</span>
															</div>
															<div className="w-[25%] flex justify-start items-center overflow-hidden">
																{user.profilePic === "not set" ? (
																	<div className="w-14 h-14 flex justify-center items-center rounded-full bg-black text-white text-md">
																		<p>{user.firstName.slice(0, 1)}</p>
																	</div>
																) : (
																	<img src={user.profilePic} alt="Profile" width={50} className="rounded-full" />
																)}
															</div>
															<div className="w-[65%] flex flex-col justify-center items-start gap-2 text-white overflow-hidden">
																<h1>
																	<p>{user.firstName.slice(0, 7)}</p>
																</h1>
																<div className="flex items-center justify-start gap-1">
																	<img src={Coin} alt="Coin" width={15} />
																	<p>{formatLargeNumber(user.balance)}</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											) : (
												<div
													key={user.id}
													className="shadow-md border-[0.5px] border-[#12121C] w-[85vw] h-[10vh] bg-gradient-to-t from-[#12121C] to-[#21212D] rounded-lg flex items-center gap-3 px-3 p-1"
												>
													{/* Other user's */}
													<div className="w-[10%] flex justify-center items-center overflow-hidden">
														<span className="rounded-full border-2 border-gray-600 p-2 text-xs flex justify-center items-center text-gray-400 w-5 h-5">
															{i}
														</span>
													</div>
													<div className="w-[25%] flex justify-start items-center overflow-hidden">
														{user.profilePic === "not set" ? (
															<div className="w-14 h-14 flex justify-center items-center rounded-full bg-black text-white text-md">
																<p>{user.firstName.slice(0, 1)}</p>
															</div>
														) : (
															<img src={user.profilePic} alt="Profile" width={50} className="rounded-full" />
														)}
													</div>
													<div className="w-[65%] flex flex-col justify-center items-start gap-2 text-white overflow-hidden">
														<h1>
															<p>{user.firstName.slice(0, 7)}</p>
														</h1>
														<div className="flex items-center justify-start gap-1">
															<img src={Coin} alt="Coin" width={15} />
															<p>{formatLargeNumber(user.balance)}</p>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)
			}
		</>
	);
};

export default Rankings;
