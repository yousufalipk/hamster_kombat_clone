import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../context/index';
import CustomLoader from '../Loader/Loader';

import LeftArrowIcon from '../../assets/leaderboard/left.svg';
import RightArrowIcon from '../../assets/leaderboard/right.svg';

import BackgroundImg from '../../assets/optimizedImages/Home/bg.svg';

import Stage1 from '../../assets/leaderboard/stages/stage1.svg';
import Stage2 from '../../assets/leaderboard/stages/stage2.svg';
import Stage3 from '../../assets/leaderboard/stages/stage3.svg';
import Stage4 from '../../assets/leaderboard/stages/stage4.svg';
import Stage5 from '../../assets/leaderboard/stages/stage5.svg';
import Stage6 from '../../assets/leaderboard/stages/stage6.svg';
import Stage7 from '../../assets/leaderboard/stages/stage7.svg';
import Stage8 from '../../assets/leaderboard/stages/stage8.svg';
import Stage9 from '../../assets/leaderboard/stages/stage9.svg';
import Stage10 from '../../assets/leaderboard/stages/stage10.svg';
import Stage11 from '../../assets/leaderboard/stages/stage11.svg';
import Stage12 from '../../assets/leaderboard/stages/stage12.svg';
import Stage13 from '../../assets/leaderboard/stages/stage13.svg';
import Stage14 from '../../assets/leaderboard/stages/stage14.svg';

import KingCrown from '../../assets/leaderboard/king.svg';
import BadgeIcon from '../../assets/leaderboard/badge.svg';
import Coin from "../../assets/BigCoinIcon.svg";

import ProfilePic from '../../assets/profile.png';

import AngleIcon from "../../assets/AngleIcon.svg";

const Rankings = () => {
	const { rankLoader, setRankLoader, topUsers, fetchLeaderboardUsers, level, userId, levelsData, formatNumberWithSuffix, formatBalance } = useUser();

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
		0: Stage1,
		1: Stage2,
		2: Stage3,
		3: Stage4,
		4: Stage5,
		5: Stage6,
		6: Stage7,
		7: Stage8,
		8: Stage9,
		9: Stage10,
		10: Stage11,
		11: Stage12,
		12: Stage13,
		13: Stage14
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
		if (page > 0) {
			let newPage = page - 1;
			while (newPage >= 0 && (!topUsers[newPage] || topUsers[newPage].length === 0)) {
				newPage--;
			}
			if (newPage >= 0) {
				setPage(newPage);
				updateStageImage(newPage);
				setTimeout(() => {
					setRankLoader(false);
				}, 300);
			} else {
				console.log("No more valid pages to the left!");
			}
		} else {
			console.log("You're at the first page!");
		}
	};

	const handleClickRight = () => {
		if (page < levelsData.length - 1) {
			let newPage = page + 1;
			while (newPage < levelsData.length && (!topUsers[newPage] || topUsers[newPage].length === 0)) {
				newPage++;
			}
			if (newPage < levelsData.length) {
				setPage(newPage);
				updateStageImage(newPage);
				setTimeout(() => {
					setRankLoader(false);
				}, 300);
			} else {
				console.log("No more valid pages to the right!");
			}
		} else {
			console.log("You're at the last page!");
		}
	};

	useEffect(() => {
		if (topUsers && topUsers[page]) {
			setCurrentPageUsers(topUsers[page]);
		}
	}, [page, topUsers]);

	useEffect(() => {
		if (!topUsers) {
			fetchLeaderboardUsers();
		}
	}, []);

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
									<div
										onClick={() => {
											navigate('/levels');
										}}
										className="flex justify-center items-center text-white font-semibold gap-1">
										<img src={BadgeIcon} alt="badge_icon" />
										<p className="capitalize">{levelsData[page].name}</p>
										<img src={AngleIcon} alt="angle_icon" width={8} />
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
															{formatNumberWithSuffix(currentPageUsers[1].allTimeBalance, 2)}
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
															{formatNumberWithSuffix(currentPageUsers[0].allTimeBalance, 2)}
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
															{formatNumberWithSuffix(currentPageUsers[2].allTimeBalance, 2)}
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
														<div className="flex items-center gap-3 py-1 px-3 w-full">
															<div className="w-[10%] flex justify-center items-center overflow-hidden">
																<span className="rounded-full border-gray-600 p-2 text-xs flex justify-center items-center text-gray-400 w-5 h-5">
																	{i + 1}
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
																	<p>{formatBalance(user.allTimeBalance)}</p>
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
													<div className="w-[10%] flex justify-center items-center overflow-hidden">
														<span className="rounded-full border-2 border-gray-600 p-2 text-xs flex justify-center items-center text-gray-400 w-5 h-5">
															{i + 1}
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
															<p>{formatBalance(user.allTimeBalance)}</p>
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
