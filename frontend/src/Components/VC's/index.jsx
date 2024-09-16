import React from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import Panda1 from "../../assets/Panda1.png";
import Panda3 from "../../assets/Panda3.png";
import Panda4 from "../../assets/Panda4.png";
import StarFish from "../../assets/StarFishIcon.svg";
import Dollar from "../../assets/Dollar.svg";
import CIcon from "../../assets/CIcon.svg";

const data = [
	{
		id: 1,
		name: "Virat Kohli",
		img1: BigCoin,
		img2: LittleCoin,
		img3: AngleIcon,
		img4: Panda1,
		img5: StarFish,
		amount: "5K",
		coin: 60,
		level: 10,
		button: "Get Now",
	},
	{
		id: 2,
		name: "Alex Morn",
		img1: BigCoin,
		img2: LittleCoin,
		img3: AngleIcon,
		img4: Panda4,
		img5: CIcon,
		amount: "20K",
		coin: 10,
		level: 0,
		button: "Upgrade",
	},
	{
		id: 3,
		name: "Frenchie",
		img1: BigCoin,
		img2: LittleCoin,
		img3: AngleIcon,
		img4: Panda3,
		img5: Dollar,
		amount: "20K",
		coin: 60,
		level: 10,
		button: "Upgrade",
	},
];

const KOLS = () => {
	return (
		<>
			<div className=''>
				{data.map((values) => {
					const {
						id,
						img1,
						img2,
						img3,
						img4,
						img5,
						name,
						amount,
						coin,
						level,
						button,
					} = values;
					return (
						<div
							key={id}
							className={`text-[#FFF] text-base font-medium flex items-center border border-[#666666] rounded-[14px] p-3 my-4
								${id === 1 ? "blue-grad" : ""}
								${id === 2 ? "yellow-grad" : ""}
								${id === 3 ? "purple-grad" : ""}
							`}>
							<div className='w-full'>
								<div className='flex justify-between items-center'>
									<div className='flex items-center gap-16'>
										<div className=''>
											<p>{name}</p>
										</div>
										<div
											className={`px-3 py-1 rounded-[20px]
											${id === 1 ? "bg-[#3a8cea]" : ""}
											${id === 2 ? "bg-[#cc8137]" : ""}
											${id === 3 ? "bg-[#854bf2]" : ""}
										}`}>
											lvl {level}
										</div>
									</div>
									<div className='flex items-center gap-1'>
										<div className='left'>
											<img
												src={img1}
												alt='Coin-Icon'
											/>
										</div>
										<div className=''>
											<p>{amount}</p>
										</div>
									</div>
								</div>
								<div className='flex justify-between items-center'>
									<div className=''>
										<div className='flex items-center py-3'>
											<div className='img'>
												<img
													src={img2}
													alt='Coin-Icon'
												/>
											</div>
											<div className='flex items-center'>
												<div className='pr-2'>
													<p> + {coin}</p>
												</div>
												<div> Coin Per Minute</div>
											</div>
										</div>
										<div className='flex items-center gap-2 rounded-[18px] w-fit px-4 py-1 bg-[#FFF] text-[#000] mb-1'>
											<div className=''>
												<img
													src={img3}
													alt='Angle-icon'
												/>
											</div>
											<div className=''>
												<p>{button}</p>
											</div>
										</div>
									</div>
									<div className='flex -mb-2'>
										<div className=''>
											<img
												src={img4}
												alt=''
											/>
										</div>
										<div
											className={`${
												id === 2 ? "mt-7" : id === 3 ? "mt-6" : ""
											}`}>
											<img
												src={img5}
												alt=''
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default KOLS;
