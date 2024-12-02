import React, { useEffect } from "react";
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

const Card = ({ name, logo1, logo2, balance, level, fromColor, toColor }) => (
	<div className={"h-[17vh] px-4 py-2 rounded-[20px] text-[#FFF]"}
		style={{
			background: `linear-gradient(to left, ${fromColor}, ${toColor})`,
		}}
	>
		<div className='flex justify-between items-center mt-2'>
			<div className='text-sm font-semibold'>
				<p>{name}</p>
			</div>
			<div className=''>
				<img
					src={`data:image/jpeg;base64,${logo1}`}
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

	const { setSendTokenData, currentProjects, tgeProjects, missedProjects, fetchProjects } = useUser();

	const navigate = useNavigate();

	const handleCardClick = (card) => {
		setSendTokenData(card);
		navigate('/token');
	}

	useEffect(() => {
		if (!currentProjects && !tgeProjects && !missedProjects) {
			fetchProjects()
		}
	}, [])

	return (
		<>
			{currentProjects ? (
				<div className='grid grid-cols-2 gap-3 h-[37vh]'>
					{currentProjects?.map((project, index) => {
						return (
							<div
								key={index}
								onClick={() => handleCardClick(project)}
							>
								<Card
									key={project.id}
									name={project.name}
									logo1={project.icon.data}
									logo2={Coin}
									balance={project.walletData?.balance || 0}
									level={project.userData?.level + 1 || 0}
									fromColor={project.fromColor}
									toColor={project.toColor}
								/>
							</div>
						)
					})}
				</div>
			) : (
				<div className="h-[33vh] w-full flex justify-center items-center text-white">
					<span className="text-xl font-semibold">No projects!</span>
				</div>
			)}
		</>
	);
};

export default Current;
