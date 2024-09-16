import React from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import Panda1 from "../../assets/Panda1.png";
import Panda2 from "../../assets/Panda2.png";
import Panda4 from "../../assets/Panda4.png";
import StarFish from "../../assets/StarFishIcon.svg";
import Star2 from "../../assets/Star2.svg";
import CIcon from "../../assets/CIcon.svg";
const data = [
	{
		id: 1,
		name: "Blockchain Capital",
		img1: BigCoin,
		img2: LittleCoin,
		img3: AngleIcon,
		img4: Panda1,
		img5: StarFish,
		amount: "20K",
		coin: 60,
		level: 10,
		button: "Upgrade",
	},
	{
		id: 2,
		name: "Coinbase Ventures",
		img1: BigCoin,
		img2: LittleCoin,
		img3: AngleIcon,
		img4: Panda4,
		img5: CIcon,
		amount: "5K",
		coin: 10,
		level: 0,
		button: "Get Now",
	},
	{
		id: 3,
		name: "Solava Ventures",
		img1: BigCoin,
		img2: LittleCoin,
		img3: AngleIcon,
		img4: Panda2,
		img5: Star2,
		amount: 500,
		coin: 60,
		level: 10,
		button: "Get Now",
	},
];

const Partners = () => {
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
								${id === 3 ? "red-grad" : ""}
							`}>
							<div className='w-full'>
								<div className='upper flex justify-between items-center'>
									<div className='left flex items-center gap-3'>
										<div className=''>
											<p>{name}</p>
										</div>
										<div
											className={`px-3 py-1 rounded-[20px]
											${id === 1 ? "bg-[#3a8cea]" : ""}
											${id === 2 ? "bg-[#cc8137]" : ""}
											${id === 3 ? "bg-[#c41313]" : ""}
										}`}>
											lvl {level}
										</div>
									</div>
									<div className='right flex items-center gap-1'>
										<div className='left'>
											<img
												src={img1}
												alt='Coin-Icon'
											/>
										</div>
										<div className='right'>
											<p>{amount}</p>
										</div>
									</div>
								</div>
								<div className='lower flex justify-between items-center'>
									<div className='left'>
										<div className='up flex items-center py-3'>
											<div className='img'>
												<img
													src={img2}
													alt='Coin-Icon'
												/>
											</div>
											<div className='text flex items-center'>
												<div className='pr-2'>
													<p> + {coin}</p>
												</div>
												<div> Coin Per Minute</div>
											</div>
										</div>
										<div className='down flex items-center gap-2 rounded-[18px] w-fit px-4 py-1 bg-[#FFF] text-[#000] mb-1'>
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
									<div className='right flex -mb-2'>
										<div className=''>
											<img
												src={img4}
												alt=''
											/>
										</div>
										<div
											className={`${
												id === 2 ? "mt-7" : id === 3 ? "mt-4" : ""
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

export default Partners;
