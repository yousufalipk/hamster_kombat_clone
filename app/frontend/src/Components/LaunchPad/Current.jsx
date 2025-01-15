import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/index';

import Coin from "../../assets/BigCoinIcon.svg";
import CutomLoader from '../Loader/Loader';


const Current = () => {

	const { setSendTokenData, currentProjects, tgeProjects, missedProjects, fetchProjects, projectLoader, formatBalance } = useUser();

	const navigate = useNavigate();

	const handleCardClick = (project) => {
		setSendTokenData(project);
		navigate('/token');
	}

	useEffect(() => {
		if (!currentProjects && !tgeProjects && !missedProjects) {
			fetchProjects()
		}
	}, [])

	if (projectLoader) {
		return (
			<>
				<div className="h-[33vh] w-full flex justify-center items-center">
					<CutomLoader size={100} />
				</div>
			</>
		)
	}

	return (
		<>
			{currentProjects ? (
				<div className='grid grid-cols-2 gap-3 h-[37vh]'>
					{currentProjects?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((project, index) => {
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
									level={project.userData?.level || 0}
									fromColor={project.fromColor}
									toColor={project.toColor}
									formatBalance={formatBalance}
								/>
							</div>
						)
					})}
				</div>
			) : (
				<div className="h-[33vh] w-full flex justify-center items-center text-white">
					<span className="text-xl font-semibold text-white">No projects!</span>
				</div>
			)}
		</>
	);
};

const Card = ({ name, logo1, logo2, balance, level, fromColor, toColor, formatBalance }) => (
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
			<div className='text-[16px]'>{formatBalance(balance)}</div>
		</div>
		<div
			className="mt-2 text-[8px] font-medium bg-[rgba(0,0,0,0.3)] w-fit p-1 rounded-[5px]">
			<p className="opacity-100">lvl {level}</p>
		</div>
	</div>
);

export default Current;