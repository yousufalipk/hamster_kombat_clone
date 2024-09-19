import React from "react";
import BackIcon from "../../assets/BackIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";
import PandaPic from "../../assets/pandaPic.png";
import Twitter from "../../assets/twitterIcon.png";
import Telegram from "../../assets/telegramIcon.png";
import Youtube from "../../assets/youtubeIcon.png";

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
			<div className='h-[83.5vh] bg-gradient-to-t from-[#1B1B27] to-black'>
				{/* Upper Yellow Card */}
				<div className='relative pt-10 mt-5 h-[28vh]'>
					<div className='absolute back-color h-[30vh] -inset-2 blur-[20px]'></div>
					<div className='bg-[#f18c01] w-fit px-12 py-4 -mt-1 rounded-[25px] mx-auto relative'>
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

				{/* Tasks Section */}
				<div className='h-[60vh] px-4 overflow-scroll'>
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
	);
};

export default BottleCap;
