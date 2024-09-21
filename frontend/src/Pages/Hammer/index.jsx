import React, { useEffect, useState } from "react";

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

	//Chooses Launch Pad by default
	useEffect(() => {
		setActiveItem("Launch Pad");
	}, [])

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
			<div className='relative h-[86vh] w-screen'>
				<div className='relative h-[30vh]'>
					<div className="absolute -inset-1 bg-[#23a7ff] rounded-[35px]"></div>
					<div className="absolute -inset-1 bg-[#23a7ff] blur rounded-[35px]"></div>

					{/* Header Cards */}
					<div className='bg-[#0C0C0C] h-[30vh] relative rounded-b-[26px]'>
						{/* Two Cards */}
						<div className='h-[20vh] flex gap-5 justify-center items-center pt-5'>
							{/* Card 1 */}
							<div className="bg-[#1b1b27] px-3 py-4 rounded-xl border-gradient">
								{/* gray circle */}
								<div className="bg-[#444444] rounded-full flex justify-center items-center px-4 py-2">
									<img
										style={{ width: '30px', height: '45px' }}
										src={QuestionMark}
										alt='QuestionMark-Icon'
									/>
								</div>
							</div>
							{/* Card 2 */}
							<div className="bg-[#1b1b27] px-3 py-4 rounded-xl border-gradient">
								{/* gray circle */}
								<div className="bg-[#444444] rounded-full flex justify-center items-center px-4 py-2">
									<img
										style={{ width: '30px', height: '45px' }}
										src={QuestionMark}
										alt='QuestionMark-Icon'
									/>
								</div>
							</div>
						</div>

						{/* Daily Combo Reward */}
						<div className='h-[10vh] flex justify-between items-center mx-4'>
							{/* Left text & timer  */}
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
							{/* Reward Button */}
							<div className='grad flex items-center gap-1 px-4 py-1'>
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

				{/* Filter Launch Pad / KOLS / Partners / VC's */}
				<div className='pt-6'>
					<div className='px-4'>
						<div className='flex justify-between items-center bg-[#252525] border border-[#FFF] rounded-[29.5px] p-2'>
							{/* LaunchPad button */}
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${activeItem === "Launch Pad"
									? "bg-[#FFF] text-[#0C0C0C]"
									: "bg-transparent text-[#FFF] truncate"
									}`}
								onClick={() => handleClick("Launch Pad")}>
								<p className='truncate text-xs md:text-base'>Launch Pad</p>
							</div>
							{/* KOLS Button */}
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${activeItem === "KOLS"
									? "bg-[#FFF] text-[#0C0C0C]"
									: "bg-transparent text-[#FFF] truncate"
									}`}
								onClick={() => handleClick("KOLS")}>
								<p className='truncate text-xs md:text-base'>KOLS</p>
							</div>
							{/* Partners Button */}
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${activeItem === "Partners"
									? "bg-[#FFF] text-[#0C0C0C]"
									: "bg-transparent text-[#FFF] truncate"
									}`}
								onClick={() => handleClick("Partners")}>
								<p className='truncate text-xs md:text-base'>Partners</p>
							</div>
							{/* VC's Button */}
							<div
								className={`rounded-[16.5px] w-fit px-3 py-1 text-base font-medium cursor-pointer ${activeItem === "VC's"
									? "bg-[#FFF] text-[#0C0C0C]"
									: "bg-transparent text-[#FFF] truncate"
									}`}
								onClick={() => handleClick("VC's")}>
								<p className='truncate text-xs md:text-base'>VC's</p>
							</div>
						</div>
					</div>
					<div className='mt-3 px-4'>
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
