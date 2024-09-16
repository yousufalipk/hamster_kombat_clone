import React from "react";
import MIcon from "../../assets/MIcon.png";
import Coin from "../../assets/BigCoinIcon.svg";
import Tonfish from "../../assets/TonfishIcon.png";
import Gamefi from "../../assets/GamefiIcon.png";

const cards = [
	{
		id: 1,
		name: "MemeFi",
		logo1: MIcon,
		logo2: Coin,
		balance: 203659461,
		level: 10,
		bgColor: "memefi-bg",
	},
	{
		id: 2,
		name: "Tonfish",
		logo1: Tonfish,
		logo2: Coin,
		balance: "0.00",
		level: 0,
		bgColor: "tonfish-bg",
	},
	{
		id: 3,
		name: "Gamefi",
		logo1: Gamefi,
		logo2: Coin,
		balance: 96584123,
		level: 19,
		bgColor: "gamefi1-bg",
	},
	{
		id: 4,
		name: "Gamefi",
		logo1: Gamefi,
		logo2: Coin,
		balance: 96584123,
		level: 19,
		bgColor: "gamefi2-bg",
	},
];

const Card = ({ name, logo1, logo2, balance, level, bgColor }) => (
	<div className={`w-[45%] px-5 py-3 rounded-[20px] text-[#FFF] ${bgColor}`}>
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
		<div
			className={`text-xs font-medium ${
				name === "MemeFi"
					? "bg-[#e08121]"
					: name === "Tonfish"
					? "bg-[#005cc1]"
					: name === "Gamefi" && bgColor === "gamefi1-bg"
					? "bg-[#151515]"
					: name === "Gamefi" && bgColor === "gamefi2-bg"
					? "bg-[#049c4c]"
					: "bg-white"
			} w-fit p-1 rounded-[5px]`}>
			<p>lvl {level}</p>
		</div>
	</div>
);

const Current = () => {
	return (
		<>
			<div className='flex flex-wrap gap-8'>
				{cards.map((card) => (
					<Card
						key={card.id}
						name={card.name}
						logo1={card.logo1}
						logo2={card.logo2}
						balance={card.balance}
						level={card.level}
						bgColor={card.bgColor}
					/>
				))}
			</div>
		</>
	);
};

export default Current;
