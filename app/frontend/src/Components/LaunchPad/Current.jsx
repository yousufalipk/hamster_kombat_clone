import React from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/index';

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
	{
		id: 4,
		name: "Gamefi",
		logo1: Gamefi,
		logo2: Coin,
		balance: 96584123,
		level: 19,
		bgColor: "gamefi2-bg",
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
	<div className={`h-[17vh] px-4 py-2 rounded-[20px] text-[#FFF] ${bgColor}`}>
		<div className='flex justify-between items-center mt-2'>
			<div className='text-sm font-semibold'>
				<p>{name}</p>
			</div>
			<div className=''>
				<img
					src={logo1}
					alt={`${name}-Icon`}
					width="25"
				/>
			</div>
		</div>
		<div className='mt-2 flex items-center gap-2 text-[18.519px] font-normal'>
			<div className=''>
				<img
					src={logo2}
					alt='Coin-Icon'
					width="17"
				/>
			</div>
			<div className='text-[16px]'>{balance.toLocaleString()}</div>
		</div>
		<div
			className="mt-2 text-[8px] font-medium bg-[rgba(0,0,0,0.3)] w-fit p-1 rounded-[5px]">
			<p className="opacity-100">lvl {level}</p>
		</div>
	</div>
);

const Current = () => {

	const { setSendTokenData } = useUser();

	const navigate = useNavigate();

	const handleCardClick = (card) => {
		setSendTokenData(card);
		navigate('/token');
	}

	return (
		<>
			<div className='grid grid-cols-2 gap-3 h-[37vh]'>
				{cards.map((card) => {
					return (
						<div 
							onClick={()=>handleCardClick(card)}	
						> 
							<Card
								key={card.id}
								name={card.name}
								logo1={card.logo1}
								logo2={card.logo2}
								balance={card.balance}
								level={card.level}
								bgColor={card.bgColor}
							/>
						</div>
					)
				})}
			</div>
		</>
	);
};

export default Current;
