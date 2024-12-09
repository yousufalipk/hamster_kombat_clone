import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUser } from '../../context/index';
import CustomLoader from '../Loader/Loader';

import LeftArrowIcon from '../../assets/leaderboard/left.svg';
import RightArrowIcon from '../../assets/leaderboard/right.svg';

import BackgroundImg from '../../assets/background/bg.png';

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
	const { topUsers, fetchLeaderboardUsers, level, userId } = useUser();

	const [rankLoader, setRankLoader] = useState(null);

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

	const pagesName = [
		'silver',
		'gold',
		'diamond',
		'platinum',
		'legendary',
		'master',
		'grandMaster',
		'epic'
	];

	const stageImages = {
		silver: SilverStage,
		gold: GoldStage,
		diamond: DaimondStage,
		platinum: PlatinumStage,
		legendary: LegendaryStage,
		master: MasterStage,
		grandMaster: GrandMasterStage,
		epic: EpicStage
	};

	useEffect(() => {
		if (level) {
			setPage(level);
			updateStageImage(level);
		}
	}, [level]);

	const updateStageImage = (stage) => {
		if (stageImageRef.current) {
			stageImageRef.current.src = stageImages[stage];
		}
	};

	const handleClickLeft = () => {
		if (level === 'silver') {
			toast.error("Reach the Gold level to unlock more pages!");
			return;
		}
		setRankLoader(true);
		const currentIndex = pagesName.indexOf(page);
		if (currentIndex > 0) {
			const newPage = pagesName[currentIndex - 1];
			setPage(newPage);
			updateStageImage(newPage);
			setTimeout(() => {
				setRankLoader(false);
			}, 300)
		} else {
			setRankLoader(false);
			console.log("You're at the first page!");
		}
	};

	const handleClickRight = () => {
		if (level === 'silver') {
			toast.error("Reach the Gold level to unlock more pages!");
			return;
		}
		setRankLoader(true);
		const currentIndex = pagesName.indexOf(page);
		if (currentIndex < pagesName.length - 1) {
			const newPage = pagesName[currentIndex + 1];
			setPage(newPage);
			updateStageImage(newPage);
			setTimeout(() => {
				setRankLoader(false);
			}, 300)
		} else {
			setRankLoader(false);
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

	if (rankLoader) {
		return (
			<>
				<div className="h-[100vh] w-[100vw] bg-black flex justify-center items-center">
					<CustomLoader size={200} />
				</div>
			</>
		)
	}

	return (
		<>
			{topUsers && currentPageUsers && (
				<>
					<div className='h-[86vh] w-[100vw] z-10'>
						<div className='min-h-[37vh] pb-3 pt-5 px-5 rounded-br-3xl rounded-bl-3xl relative'>
							{/* Background Image */}
							<div className="absolute z-10">
								<img
									src={BackgroundImg}
									alt="Background"
									className="w-full h-full object-cover scale-[1] fixed top-[0vh]"
								/>
							</div>
							<div className="relative z-10">
								<div className="w-full h-[5vh] flex justify-end items-center">
									<div className="flex justify-center items-center text-white font-semibold gap-1">
										<img src={BadgeIcon} alt="badge_icon" />
										<p className="capitalize">{page}</p>
									</div>
								</div>
								{/* top 3 stage */}
								<div className='h-[40vh] flex text-[#FFF] overflow-hidden'>
									<button
										onClick={handleClickLeft}
										className={`${pagesName.indexOf(page) === 0 ? "opacity-50 pointer-events-none" : "opacity-100"}`}
									>
										<img src={LeftArrowIcon} alt="left" />
									</button>
									<div className='flex w-[80vw] mx-2 justify-center items-center relative'>
										<img ref={stageImageRef} src={stageImages[page]} alt="stage_img" className="absolute bottom-0" />
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
															{currentPageUsers[1].balance}
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
															{currentPageUsers[0].balance}
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
															{currentPageUsers[2].balance}
														</div>
													</>
												)}
											</div>
										</div>
									</div>
									<button
										onClick={handleClickRight}
										className={`${pagesName.indexOf(page) === pagesName.length - 1 ? "opacity-50 pointer-events-none" : "opacity-100"}`}
									>
										<img src={RightArrowIcon} alt="right" />
									</button>
								</div>
								{/* List of competitors */}
								<div className='bg-[#1B1B27] pb-3 pt-5 rounded-tl-[14px] rounded-tr-[14px] overflow-hidden h-[55vh] flex flex-col gap-3 w-[90vw]'>
									<div className="flex flex-col gap-4 justify-center items-center h-[40vh]">
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
														<div className="flex items-center gap-3 py-1 px-3">
															<div className="rounded-full border-2 border-gray-600 p-2 text-xs flex justify-center items-center text-gray-400 w-5 h-5">
																{i}
															</div>
															<div>
																{user.profilePic === "not set" ? (
																	<img src={ProfilePic} alt="img" width={70} className="rounded-full" />
																) : (
																	<img src={user.profilePic} alt="Profile" width={50} className="rounded-full" />
																)}
															</div>
															<div className="flex flex-col justify-center items-center gap-2 text-white">
																<h1>
																	<p>{user.firstName.slice(0, 7)}</p>
																</h1>
																<div className="flex items-center justify-start gap-1">
																	<img src={Coin} alt="Coin" width={15} />
																	<p>{user.balance}</p>
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
													<div className="rounded-full border-2 border-gray-600 p-2 text-xs flex justify-center items-center text-gray-400 w-5 h-5">
														{i}
													</div>
													<div>
														{user.profilePic === "not set" ? (
															<img src={ProfilePic} alt="img" width={70} className="rounded-full" />
														) : (
															<img src={user.profilePic} alt="Profile" width={50} className="rounded-full" />
														)}
													</div>
													<div className="flex flex-col justify-center items-center gap-2 text-white">
														<h1>
															<p>{user.firstName.slice(0, 7)}</p>
														</h1>
														<div className="flex items-center justify-start gap-1">
															<img src={Coin} alt="Coin" width={15} />
															<p>{user.balance}</p>
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
