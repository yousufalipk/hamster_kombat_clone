import React, { useState } from "react";
import BackIcon from "../../assets/BackIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";
import QuestionMark from "../../assets/questionMark.png";
import BackGround from "../../assets/BackGround.svg";
import TimerIcon from "../../assets/TimerIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";

import LaunchPad from "../../Components/LaunchPad/index";
import KOLS from "../../Components/KOLS/index";
import Partners from "../../Components/Partners/index";
import VCs from "../../Components/VC's/index";

const Hammer = () => {
	const [activeItem, setActiveItem] = useState(null);

	const handleClick = (item) => {
		setActiveItem(item);
	};

	const bonus = {
		total: 25951748,
	};

	const timer = {
		time: "23:18:33",
	};

	const balance = {
		value: 4000000,
	};

	return (
		<>
			<div className='overflow-hidden'>
				<div className='relative'>
					<div className='absolute -inset-3 bg-[#23a7ff] min-h-[40%] blur rounded-[50px]'></div>
					<div className='bg-[#0C0C0C] min-h-[37vh] pt-5 px-5 relative rounded-br-3xl rounded-bl-3xl'>
						<div className='flex justify-between'>
							<div className='flex items-center gap-4'>
								<div className=''>
									<img
										src={BackIcon}
										alt='Back-Icon'
									/>
								</div>
								<div className='text-[#FFF] text-[18px] font-semibold'>
									PandaTap
								</div>
							</div>
							<div className='text-[#FFF] text-[18.542px] font-medium flex gap-2'>
								<div className=''>
									<img
										src={BigCoin}
										alt='Coin-Icon'
									/>
								</div>
								<div className=''>{bonus.total}</div>
							</div>
						</div>
						<div className='flex gap-5 px-16 pt-10'>
							<div className='p-6 w-fit bg-[#1b1b27] border border-[#6c6c6c] rounded-[14px]'>
								<div className='relative'>
									<img
										className='w-[80px]'
										src={BackGround}
										alt='Back-Ground'
									/>
									<div className='absolute top-[20%] left-[30%]'>
										<img
											src={QuestionMark}
											alt='QuestionMark-Icon'
										/>
									</div>
								</div>
							</div>
							<div className='p-6 w-fit bg-[#1b1b27] border border-[#6c6c6c] rounded-[14px]'>
								<div className='relative'>
									<img
										className='w-[80px]'
										src={BackGround}
										alt='Back-Ground'
									/>
									<div className='absolute top-[20%] left-[30%]'>
										<img
											src={QuestionMark}
											alt='QuestionMark-Icon'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='pt-6 px-1 flex justify-between'>
							<div className=''>
								<div className='text-[#FFF] text-base font-medium'>
									<p>Daily Combo Reward</p>
								</div>
								<div className='flex items-center gap-2 pt-1'>
									<div className=''>
										<img
											src={TimerIcon}
											alt='Timer-Icon'
										/>
									</div>
									<div className='text-[#A5A5A5] text-xs font-normal'>
										{timer.time}
									</div>
								</div>
							</div>
							<div className='grad flex items-center gap-1 px-3'>
								<div className=''>
									<img
										src={LittleCoin}
										alt='Coin-Icon'
									/>
								</div>
								<div className='text-[#FFF] text-base font-normal'>
									{balance.value}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-[#1B1B27] overflow-y-scroll min-h-[50vh] pt-12 -mt-4'>
					<div className='px-4'>
						<div className='flex justify-between items-center bg-[#252525] border border-[#FFF] rounded-[29.5px] p-3'>
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${
									activeItem === "Launch Pad"
										? "bg-[#FFF] text-[#0C0C0C]"
										: "bg-transparent text-[#FFF]"
								}`}
								onClick={() => handleClick("Launch Pad")}>
								<p>Launch Pad</p>
							</div>
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${
									activeItem === "KOLS"
										? "bg-[#FFF] text-[#0C0C0C]"
										: "bg-transparent text-[#FFF]"
								}`}
								onClick={() => handleClick("KOLS")}>
								<p>KOLS</p>
							</div>
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${
									activeItem === "Partners"
										? "bg-[#FFF] text-[#0C0C0C]"
										: "bg-transparent text-[#FFF]"
								}`}
								onClick={() => handleClick("Partners")}>
								<p>Partners</p>
							</div>
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${
									activeItem === "VC's"
										? "bg-[#FFF] text-[#0C0C0C]"
										: "bg-transparent text-[#FFF]"
								}`}
								onClick={() => handleClick("VC's")}>
								<p>VC's</p>
							</div>
						</div>
					</div>
					<div className='mt-6 px-4'>
						{activeItem === "Launch Pad" && <LaunchPad />}
						{activeItem === "KOLS" && <KOLS />}
						{activeItem === "Partners" && <Partners />}
						{activeItem === "VC's" && <VCs />}
					</div>
				</div>
			</div>
		</>
	);
};

export default Hammer;
