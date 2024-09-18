import React from "react";
import BackIcon from "../../assets/BackIcon.svg";
import MIcon from "../../assets/MIcon.png";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import Twitter from "../../assets/twitterIcon.png";
import Telegram from "../../assets/telegramIcon.png";
import Youtube from "../../assets/youtubeIcon.png";

const MemeFi = () => {
	const user = {
		level: 10,
		balance: 500,
		reward: "+20",
		cpm: 60,
	};

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
			<div className='bg-[#060611] p-4'>
				<div className='flex items-center gap-4'>
					<div className=''>
						<img
							src={BackIcon}
							alt='Back-Icon'
						/>
					</div>
					<div className='text-[#FFF] text-[18px] font-semibold'>MemeFi</div>
				</div>
				<div className='pt-10'>
					<div className='flex py-3'>
						<div className='mx-auto flex items-center gap-2 px-4 py-2 rounded-[25.93px] bg-[#191922]'>
							<div className=''>
								<img
									src={MIcon}
									alt='M-Icon'
								/>
							</div>
							<div className='text-[#FFF] text-[20.823px] font-medium'>
								<p>259517</p>
							</div>
						</div>
					</div>
					<div className='bg-[#f69001] rounded-[14px]'>
						<div className=''>
							<div className='flex justify-between border px-4 py-5 border-b-white border-t-0 border-r-0 border-l-0'>
								<div className='flex items-center gap-4'>
									<div className=''>
										<img
											className='w-[60px] h-[60px]'
											src={MIcon}
											alt='BigCoin-Icon'
										/>
									</div>
									<div className='text-[#FFF] font-medium'>
										<div className='text-base pb-[6px]'>
											<p>MemeFi</p>
										</div>
										<div className='text-xs bg-[#d46f00] w-fit p-1 rounded-[5px]'>
											<p className=''>lvl {user.level}</p>
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
										{user.balance}
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
										<p>{user.reward} MEMEFI</p>
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
											<p>+{user.cpm}</p>
										</div>
									</div>
									<div className='text-[10.595px]'>Coins Per Minute</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='pt-14'>
					<div className=''>
						<p className='text-[#9595A9] text-[15px] font-medium'>
							Pandatop News
						</p>
					</div>
					<div className=''>
						{data.map((values) => {
							const { id, img, name, amount } = values;
							return (
								<div
									key={id}
									className='bg-[#1b1b27] text-[#FFF] text-base font-medium flex items-center border border-[#666666] rounded-[14px] gap-4 p-4 my-3'>
									<div className='flex flex-shrink-0'>
										<img
											src={img}
											alt='Icons'
										/>
									</div>
									<div className='flex flex-shrink-0'>{name}</div>
									<div
										className={`bg-[#FFF] text-[#000] font-semibold rounded-lg p-3 flex flex-shrink-0
											${id === 1 ? "ml-16" : ""}
											${id === 2 ? "ml-[59px]" : ""}
											${id === 3 ? "ml-8" : ""}
										`}>
										{amount}
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className='pt-2'>
					<div className=''>
						<p className='text-[#9595A9] text-[15px] font-medium'>
							Social Media
						</p>
					</div>
					<div className=''>
						{data.map((values) => {
							const { id, img, name, amount } = values;
							if (id === 3) {
								return null;
							}
							return (
								<div
									key={id}
									className='bg-[#1b1b27] text-[#FFF] text-base font-medium flex items-center border border-[#666666] rounded-[14px] gap-4 p-4 my-3'>
									<div className='flex flex-shrink-0'>
										<img
											src={img}
											alt='Icons'
										/>
									</div>
									<div className='flex flex-shrink-0'>{name}</div>
									<div
										className={`bg-[#FFF] text-[#000] font-semibold rounded-lg p-3 flex flex-shrink-0
											${id === 1 ? "ml-16" : ""}
											${id === 2 ? "ml-[59px]" : ""}
										`}>
										{amount}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default MemeFi;
