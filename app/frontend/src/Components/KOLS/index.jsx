import React, { useEffect } from "react";
import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import AngleIcon from "../../assets/BlackAngle.svg";
import Panda1 from "../../assets/Panda1.png";
import Panda2 from "../../assets/Panda2.png";
import Panda3 from "../../assets/Panda3.png";
import StarFish from "../../assets/StarFishIcon.svg";
import Star2 from "../../assets/Star2.svg";
import Dollar from "../../assets/Dollar.svg";

import { useUser } from '../../context/index';

const data = [
	{
		id: 1,
		name: "Vitali Batim",
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
		name: "KOL's Youtube",
		img1: BigCoin,
		img2: LittleCoin,
		img3: AngleIcon,
		img4: Panda2,
		img5: Star2,
		amount: 500,
		coin: 10,
		level: 0,
		button: "Get Now",
	},
	{
		id: 3,
		name: "Wise Adive",
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
	const { fetchKols, upgradeKolsLevel, kols } = useUser();

	useEffect(() => {
		if (!kols) {
			fetchKols();
		}
	}, [])

	return (
		<>
			<div className='h-[45vh] overflow-scroll'>
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
							className={`text-[#FFF] text-base font-medium flex justify-center items-center rounded-[14px] pt-3 mt-3 px-3
								${id === 1 ? "blue-grad" : ""}
								${id === 2 ? "red-grad" : ""}
								${id === 3 ? "purple-grad" : ""}
							`}>
							<div className="w-[50vh]">
								{/* Card Body */}
								<div className="flex">
									{/* left section */}
									<div className="left w-1/2">
										{/* head */}
										<div className="flex gap-2">
											<div className="text-[12px]">{name}</div>
											<div
												className={`px-2 rounded-xl text-[8px]
												${id === 1 ? "bg-[#3a8cea]" : ""}
												${id === 2 ? "bg-[#c41313]" : ""}
												${id === 3 ? "bg-[#854bf2]" : ""}
											}`}>
												lvl {level}
											</div>
										</div>
										{/* body */}
										<div className="flex">
											<img
												src={img2}
												alt='Coin-Icon'
											/>
											<div className="text-xs font-thin text-gray-300">
												<span className="mr-2 font-semibold text-xs">+{coin}</span>
												Coin Per Minute
											</div>
										</div>
										{/* upgrade button */}
										<div className="mt-2 flex items-center justify-center gap-2 rounded-[18px] w-fit px-3 py-1 bg-[#FFF] text-black">
											<img
												src={img3}
												alt='Angle-icon'
												width='5'
											/>
											<p className="text-xs font-thin">{button}</p>
										</div>
									</div>

									{/* right section */}
									<div className="right w-1/2">
										<div className="flex justify-end gap-1">
											<img
												src={img1}
												alt='Coin-Icon'
												width="15"
											/>
											<div className="text-sm">{amount}</div>
										</div>
										<div className="flex">
											<div className="w-3/5 flex justify-end items-end h-[10vh]">
												<img
													src={img4}
													alt=''
													width='85'
												/>
											</div>
											<div className="w-2/5 flex justify-end items-end h-[10vh]">
												<img
													src={img5}
													alt=''
													width='85'
												/>
											</div>
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
