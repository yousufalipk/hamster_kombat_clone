import React from "react";
import Tonfish from "../../assets/TonfishIcon.png";
import Coin from "../../assets/BigCoinIcon.svg";

const cards = {
	id: 1,
	name: "Tonfish",
	logo1: Tonfish,
	logo2: Coin,
	balance: "0.00",
	level: 0,
	bgColor: "tonfish-bg",
};

const MissedProjects = () => {
	const { name, logo1, logo2, balance, level, bgColor } = cards;
	return (
		<>
			<div
				className={`${bgColor} w-[50%] px-5 py-3 -mt-1 rounded-[20px] text-[#FFF]`}>
				<div className='flex justify-between items-center pb-3'>
					<div className='text-base font-medium'>
						<p>{name}</p>
					</div>
					<div className=''>
						<img
							src={logo1}
							alt={`${name}-Icon`}
						/>
					</div>
				</div>
				<div className='flex items-center gap-2 pb-3 text-[18.519px] font-normal'>
					<div className=''>
						<img
							src={logo2}
							alt='Coin-Icon'
						/>
					</div>
					<div className=''>{balance.toLocaleString()}</div>
				</div>
				<div className='text-xs font-medium bg-[#e08121] w-fit p-1 rounded-[5px]'>
					<p className=''>lvl {level}</p>
				</div>
			</div>
		</>
	);
};

export default MissedProjects;
