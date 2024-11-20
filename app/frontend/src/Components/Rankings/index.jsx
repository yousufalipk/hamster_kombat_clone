import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../context/index';

import LeftArrowIcon from '../../assets/leaderboard/left.svg';
import RightArrowIcon from '../../assets/leaderboard/right.svg';

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

import Top1 from "../../assets/Top1.svg";
import Coin from "../../assets/BigCoinIcon.svg";

const Rankings = () => {
	const {
		topUsers,
		fetchLeaderboardUsers,
		level
	} = useUser();

	const staticUser = process.env.REACT_APP_STATIC_USER;
	const navigate = useNavigate();

	const [currentPageUsers, setCurrentPageUsers] = useState(null);
	const [page, setPage] = useState(level);
	const [stageImage, setStageImage] = useState(null);

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

	// Update default stage image based on user level
	useEffect(() => {
		if (level) {
			setPage(level); // Set the default page to the user's level
			setStageImage(stageImages[level]); // Set the stage image based on the user's level
		}
	}, [level]);

	const handleClickLeft = () => {
		const currentIndex = pagesName.indexOf(page);
		if (currentIndex > 0) {
			const newPage = pagesName[currentIndex - 1];
			setPage(newPage);
			setStageImage(stageImages[newPage]);
		} else {
			console.log("You're at the first page!");
		}
	};

	const handleClickRight = () => {
		const currentIndex = pagesName.indexOf(page);
		if (currentIndex < pagesName.length - 1) {
			const newPage = pagesName[currentIndex + 1];
			setPage(newPage);
			setStageImage(stageImages[newPage]);
		} else {
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

	return (
		<>
			{topUsers && currentPageUsers && (
				<>
					<div className='h-[86vh] w-[100vw] overflow-hidden'>
						<div className='bg-[#080813] min-h-[37vh] pb-3 pt-5 px-5 rounded-br-3xl rounded-bl-3xl'>
							<div className="w-full h-[5vh] flex justify-end items-center">
								<div className="flex justify-center items-center text-white font-semibold gap-1">
									<img src={BadgeIcon} alt="badge_icon" />
									<p className="capitalize">{page}</p>
								</div>
							</div>
							{/* Top 3 stage */}
							<div className='h-[40vh] flex text-[#FFF] overflow-hidden'>
								<button onClick={handleClickLeft}>
									<img src={LeftArrowIcon} alt="left" />
								</button>
								<div className='flex w-[80vw] mx-2 justify-center items-center relative'>
									<img src={stageImage} alt="stage_img" className="absolute bottom-0" />
									<div className="absolute z-50 h-full w-full flex justify-center mx-5">
										{/* Add logic for top 3 users */}
									</div>
								</div>
								<button onClick={handleClickRight}>
									<img src={RightArrowIcon} alt='right' />
								</button>
							</div>

							{/* List of competitors */}
							<div className='bg-[#272a2f] pb-3 pt-5 px-3 rounded-tl-[14px] rounded-tr-[14px] overflow-scroll h-[60vh] flex flex-col gap-2'>
								{currentPageUsers.map((user, i) => {
									if (i > 2) {
										return (
											<div
												key={i}
												className="w-full h-[10vh] bg-[#21212D] rounded-lg flex items-center gap-3 px-3 p-1">
												<div className="rounded-full border-2 border-gray-600 p-2 text-xs flex justify-center items-center text-gray-400 w-5 h-5">
													{i}
												</div>
												<div>
													<img src={Top1} alt="profile_pic" />
												</div>
												<div className="flex flex-col justify-center items-center gap-2 text-white">
													<h1>{user.firstName.slice(0, 7)}</h1>
													<div className="flex items-center justify-start gap-1">
														<img src={Coin} alt="coin" width={15} />
														<p>{user.balance}</p>
													</div>
												</div>
											</div>
										);
									}
									return null;
								})}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Rankings;
