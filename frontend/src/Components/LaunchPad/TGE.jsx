import React, { useState } from "react";
import MIcon from "../../assets/MIcon.png";
import Coin from "../../assets/BigCoinIcon.svg";
import Gamefi from "../../assets/GamefiIcon.png";
import { useUser } from '../../context/index';

import PopUp from '../PopUp/index';

const initialCards = [
	{
		id: 1,
		name: "MemeFi",
		logo1: MIcon,
		logo2: Coin,
		balance: 5000,
		level: 10,
		bgColor: "memefi-bg",
		tgeToggle: 'launchpad'
	},
	{
		id: 2,
		name: "Gamefi",
		logo1: Gamefi,
		logo2: Coin,
		balance: 5000,
		level: 19,
		bgColor: "gamefi2-bg",
		tgeToggle: 'launchpad'
	},
	{
		id: 3,
		name: "Gamefi",
		logo1: Gamefi,
		logo2: Coin,
		balance: 5000,
		level: 19,
		bgColor: "gamefi1-bg",
		tgeToggle: 'launchpad'
	}
];

const TGE = () => {
	const [cards, setCards] = useState(initialCards);

	const { isModalOpen, setModalOpen, setSendData } = useUser();

	const handleToggleChange = (id, toggleValue) => {
		setModalOpen(true);
		cards?.forEach((card) => {
			if (card.id === id) {
				card.tgeToggle = toggleValue; 
				setSendData(card);
			}
		});
	};

	// Card Component
	const Card = ({ id, name, logo1, logo2, balance, level, bgColor, tgeToggle }) => (
		<div className={`h-[17vh] px-4 py-1 rounded-[20px] text-[#FFF] overflow-hidden ${bgColor}`}>
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
			<div className='mt-1 flex items-center gap-2 text-[18.519px] font-normal'>
				<div className=''>
					<img
						src={logo2}
						alt='Coin-Icon'
						width="17"
					/>
				</div>
				<div className='text-[16px]'>{balance.toLocaleString()}</div>
			</div>
			<div className="flex items-center w-[20vh] mt-2 gap-1">
				{/* level */}
				<div
					className="w-[4vh] text-[6px] font-medium bg-[rgba(0,0,0,0.3)] p-1 rounded-[5px]">
					<p className="opacity-100">lvl {level}</p>
				</div>
				{/* Toggler */}
				<div className="w-[15vh]">
					<div className="bg-white rounded-2xl text-black font-bold text-[6px] flex gap-1 p-0.5">
						<span
							onClick={() => handleToggleChange(id, 'launchpad')}
							className={`p-1 rounded-xl flex gap-1 ${tgeToggle === 'launchpad' && 'border-[1px] border-[#209734] text-green-600'}`}
						>
							{tgeToggle === 'launchpad' ? (
								<svg
									className="bg-green-700 rounded-full"
									xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 4 4" fill="none">
									<path d="M3.20452 0.986049L1.95484 2.2355L1.47605 1.75671C1.39414 1.67493 1.28313 1.629 1.16739 1.629C1.05165 1.629 0.940636 1.67493 0.858733 1.75671C0.776952 1.83862 0.731018 1.94963 0.731018 2.06537C0.731018 2.18111 0.776952 2.29212 0.858733 2.37403L1.61894 3.13423C1.6271 3.144 1.63572 3.15354 1.64492 3.16274C1.72726 3.24461 1.83866 3.29057 1.95478 3.29057C2.0709 3.29057 2.1823 3.24461 2.26464 3.16274C2.27384 3.15354 2.28246 3.144 2.29062 3.13423L3.82184 1.60325C3.90362 1.52134 3.94955 1.41033 3.94955 1.29459C3.94955 1.17885 3.90362 1.06784 3.82184 0.985934C3.73992 0.904168 3.6289 0.858255 3.51316 0.858276C3.39741 0.858298 3.28641 0.904252 3.20452 0.986049Z" fill="white" />
								</svg>
							) : (
								<></>
							)}
							Launch Pad
						</span>
						<span
							onClick={() => handleToggleChange(id, 'airtap')}
							className={`p-1 rounded-xl flex gap-1 ${tgeToggle === 'airtap' && 'border-[1px] border-[#209734] text-green-600'}`}
						>
							{tgeToggle === 'airtap' ? (
								<svg
									className="bg-green-700 rounded-full"
									xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 4 4" fill="none">
									<path d="M3.20452 0.986049L1.95484 2.2355L1.47605 1.75671C1.39414 1.67493 1.28313 1.629 1.16739 1.629C1.05165 1.629 0.940636 1.67493 0.858733 1.75671C0.776952 1.83862 0.731018 1.94963 0.731018 2.06537C0.731018 2.18111 0.776952 2.29212 0.858733 2.37403L1.61894 3.13423C1.6271 3.144 1.63572 3.15354 1.64492 3.16274C1.72726 3.24461 1.83866 3.29057 1.95478 3.29057C2.0709 3.29057 2.1823 3.24461 2.26464 3.16274C2.27384 3.15354 2.28246 3.144 2.29062 3.13423L3.82184 1.60325C3.90362 1.52134 3.94955 1.41033 3.94955 1.29459C3.94955 1.17885 3.90362 1.06784 3.82184 0.985934C3.73992 0.904168 3.6289 0.858255 3.51316 0.858276C3.39741 0.858298 3.28641 0.904252 3.20452 0.986049Z" fill="white" />
								</svg>
							) : (
								<></>
							)}
							Air Tap
						</span>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			{isModalOpen && (
				<PopUp />
			)}
			<div className='grid grid-cols-2 gap-3 h-[37vh] overflow-scroll'>
				{cards.map((card) => (
					<Card
						key={card.id}
						{...card}
					/>
				))}
			</div>
		</>
	);
};

export default TGE;
