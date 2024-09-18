import React from "react";

import CrossIcon from "../../assets/CrossIcon.svg";
import ProfilePic from "../../assets/ProfilePicIcon.svg";
import DailyGamePlay from "../../assets/dailyGamePlayIcon.png";
import DailyReward from "../../assets/dailyRewardIcon.png";
import DailyCombo from "../../assets/dailyComboIcon.png";
import DailySecretCode from "../../assets/secretCodeIcon.png";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";
import BigPanda from "../../assets/bigPandaIcon.png";
import PandaCircleIcon from "../../assets/PandaCircleIcon.svg";
import JetPack from "../../assets/jetPackIcon.png";
import BatteryBooster1 from "../../assets/batteryBooster1Icon.png";
import BatteryBooster2 from "../../assets/batteryBooster2Icon.png";
import TouchIcon from "../../assets/touchIcon.png";
import FlashIcon from "../../assets/lighteningIcon.png";
import InfoIcon from "../../assets/InfoIcon.svg";
import AngleIcon from "../../assets/AngleIcon.svg";

const Home = () => {
	const username = {
		name: "Virat Kohli",
		pic: ProfilePic,
	};

	const percentage = (6 / 10) * 100;

	const cards = [
		{
			id: 1,
			img: DailyGamePlay,
			data1: "Daily",
			data2: "Game play",
			timer: "13:11:35",
		},
		{
			id: 2,
			img: DailyReward,
			data1: "Daily",
			data2: "reward",
			timer: "13:11:35",
		},
		{
			id: 3,
			img: DailyCombo,
			data1: "Daily",
			data2: "Combo",
			timer: "02:33:48",
		},
		{
			id: 4,
			img: DailySecretCode,
			data1: "Daily",
			data2: "Secret Code",
			timer: "23:18:33",
		},
	];

	const value = {
		id: 1,
		value: 25951748,
		postFix: "M",
	};

	const jetLimit = {
		obtained: 0,
		total: 5,
	};

	const boostLimit = {
		obtained: 0,
		total: 5,
	};

	const bonus = {
		remaining: 1500,
		total: 1500,
	};

	const rank = {
		current: 6,
		total: 10,
	};

	return (
		<>
			<div className='overflow-hidden h-[86vh] w-screen'>
				<div className='relative'>
					<div className='absolute -inset-1 bg-[#23a7ff] min-h-[50%] rounded-[35px]'></div>
					<div className='absolute -inset-2 bg-[#23a7ff] min-h-[50%] blur rounded-[50px]'></div>
					<div className='bg-[#0C0C0C] min-h-[32vh] pt-5 px-2 relative rounded-br-3xl rounded-bl-3xl'>
						{/* Header */}
						<div className='px-2 flex justify-between'>
							<div className='flex'>
								<div className='rounded-full bg-gray-300 w-[42px] h-[42px]'>
									<img
										src={username.pic}
										alt='Profile-Picture'
									/>
								</div>
								<div className='pl-2 text-[#FFF]'>
									<p className='font-medium text-sm'>{username.name}</p>
									<p className='flex font-normal text-sm -top-1'>(Founder)</p>
								</div>
							</div>
							<div className='rounded-full bg-[#252525] min-w-[40%] px-4 py-1'>
								<div className='flex items-center gap-2'>
									<div className='text-[#FFF] font-normal text-xs'>Silver</div>
									<div>
										<img
											src={AngleIcon}
											alt='Angle-Icon'
										/>
									</div>
									<div className='text-[#FFF] text-xs font-normal pl-11'>
										{rank.current}/{rank.total}
									</div>
								</div>
								<div>
									{/* Progress bar */}
									<div className="w-full rounded-lg bg-gray-600 h-2 mt-1 overflow-hidden">
										<div
											className={`h-4 transition-all duration-300 ease-in-out rounded`}
											style={{
											width: `${percentage}%`,
											background: `linear-gradient(to right, rgb(48 43 251), rgb(54 197 244))`
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Cards */}
						<div className='pt-6 flex justify-evenly items-center'>
							{cards.map((data) => {
								const { id, img, data1, data2 } = data;
								return (
									<div
										key={id}
										className={`border ${
											id === 3 ? "border-[#0072ff]" : "border-[#666666]"
										} rounded-[14px] min-w-[20%]`}>
										<div
											className={`flex flex-col justify-center items-center p-2 h-20
                                ${
																	id === 3 ? "bg-[#091e4b]" : "bg-[#1B1B27]"
																} rounded-[14px] 
                                    `}>
											<div className="h-3">
												<img
													src={img}
													alt='Logo'
													width="25"
												/>
											</div>
											<div className='text-[#FFF] text-[10px] font-medium mt-3'>
												<div
													className={`pt-2
												${id === 2 || id === 3 ? "pl-1" : "pl-3"}`}>
													<p>{data1}</p>
												</div>
												<p>{data2}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						
						{/* Timmers */}
						<div className='flex text-[#FFF] text-[10px] font-normal items-center justify-around pt-[2px] mr-1'>
							{cards.map((time) => {
								const { id, timer } = time;
								return <div key={id}>{timer}</div>;
							})}
						</div>
					</div>
				</div>

				{/* Coins Details & Bot Image */}
				<div className='min-h-[60vh] pt-8 -mt-2'>

					{/* Coins per minute & balance  */}
					<div className='flex gap-6 items-center'>
						
						{/* Coins Per Minute */}
						<div className='min-w-[30%] flex flex-col items-center justify-center gap-1'>
							<div className='flex justify-center items-center gap-1'>
								<div className=''>
									<img
										className='pl-3'
										src={LittleCoin}
										alt='Coin-Icon'
									/>
								</div>
								<div className='text-[#FFF] text-[11.655px] font-medium'>
									<p>+ 2.56M</p>
								</div>
							</div>
							<div className='flex justify-center items-center gap-1 pl-1'>
								<div className=''>
									<img
										src={InfoIcon}
										alt='Info-Icons'
									/>
								</div>
								<div className='text-[#A4A4A4] text-[10.595px] font-medium'>
									Coin Per Mine
								</div>
							</div>
						</div>

						{/* Balance  */}
						<div className='min-w-[30%] flex justify-center items-center gap-2 '>
							<div>
								<img
									src={BigCoin}
									alt='Coin-Icon'
									width="24"
								/>
							</div>
							<div className='text-[#FFF] text-[24px] font-medium'>
								{value.value}
							</div>
						</div>
					</div>

					{/* Bot Icons */}
					<div className='flex justify-end mt-2'>
						<div className='flex justify-center items-center'>
							<div className='relative'>
								<img
									src={PandaCircleIcon}
									alt='Outer-Circle'
									width='230'
								/>
								<div className='absolute top-[21%] left-[22%]'>
									<img
										src={BigPanda}
										alt='Panda-Icon'
									/>
								</div>
							</div>
						</div>

						{/* Side Booster Options */}
						<div className='flex flex-col justify-center items-center gap-4 pr-5'>
							<div className='text-[#FFF] text-[10px] font-medium pl-7 -mb-3'>
								{jetLimit.obtained}/{jetLimit.total}
							</div>
							<div className='rounded-full min-w-[46px] min-h-[46px] bg-[#1344C2] flex justify-center items-center shadow-inner'>
								<img
									src={JetPack}
									alt='JetPack-Icon'
								/>
							</div>
							<div className='rounded-full min-w-[46px] min-h-[46px] bg-[#1344C2] flex justify-center items-center shadow-inner'>
								<img
									src={BatteryBooster1}
									alt='Battery-Booster-Icon'
								/>
							</div>
							<div className='rounded-full min-w-[46px] min-h-[46px] bg-[#1344C2] flex justify-center items-center shadow-inner'>
								<img
									src={TouchIcon}
									alt='Touch-Icon'
								/>
							</div>
							<div className='rounded-full min-w-[46px] min-h-[46px] bg-[#1344C2] flex justify-center items-center shadow-inner'>
								<img
									src={BatteryBooster2}
									alt='Battery-Booster-Icon'
								/>
							</div>
						</div>
					</div>

					{/* Energy Tab */}
					<div className='flex'>
						<div className='flex mx-auto'>
							<div className='px-2'>
								<img
									src={FlashIcon}
									alt='Flash-Icon'
								/>
							</div>
							<div className='text-[#FFF] text-base font-medium'>
								{bonus.remaining}/{bonus.total}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
