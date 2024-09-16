import React from "react";
import BackIcon from "../../assets/BackIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";
import PandaPic from "../../assets/pandaPic.png";
import Twitter from "../../assets/twitterIcon.png";
import Telegram from "../../assets/telegramIcon.png";
import Youtube from "../../assets/youtubeIcon.png";
import Footer from "../Footer";

const BottleCap = () => {
	const balance = {
		current: 450000,
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
					<div className='text-[#FFF] text-[18px] font-semibold'>PandaTap</div>
				</div>
				<div className='relative pt-10'>
					<div className='absolute back-color h-[130%] -inset-2 blur rounded-[40px]'></div>
					<div className='bg-[#f69001] w-fit px-14 py-6 -mt-1 rounded-[20px] mx-auto relative'>
						<div className='flex items-center gap-2'>
							<div className=''>
								<img
									src={BigCoin}
									alt='BigCoin-Icon'
								/>
							</div>
							<div className='text-[#FFF] text-[29.034px] font-medium'>
								<p>{balance.current}</p>
							</div>
						</div>
						<div className='flex pt-3'>
							<div className='mx-auto'>
								<img
									src={PandaPic}
									alt='Panda-Pic'
								/>
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
				<div className=''>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default BottleCap;
