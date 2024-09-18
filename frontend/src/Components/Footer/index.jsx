import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import HelmetIcon from "../../assets/HelmetIcon.svg";
import BottleCapIcon from "../../assets/BottleCapIcon.svg";
import LittlePandaIcon from "../../assets/littlePandaIcon.png";
import HammerIcon from "../../assets/HammerIcon.svg";
import GroupIcon from "../../assets/GroupIcon.svg";
import LittlePandaBgIcon from "../../assets/LittlePandaBg.svg";

const Footer = () => {
	const [activeIcon, setActiveIcon] = useState(null);

	const navigate = useNavigate();

	const handleClick = (iconName) => {
		setActiveIcon(iconName);
		if(iconName === 'Helmet' || iconName === 'wallet'){
			navigate('/wallet')
		}	
		else if(iconName === 'BottleCap'){
			navigate('bottle-cap')
		}
		else if(iconName === 'Home'){
			navigate('/')
		}
		else if(iconName === 'Hammer'){
			navigate('/hammer')
		}
		else if(iconName === 'Group'){
			navigate('/invite-friends')
		}
	};

	return (
		<>
			<div className='bg-[#5e6395] px-4 h-[80%] flex justify-between items-center rounded-[27px]'>
				{/* Wallet */}
				<div
					className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
						activeIcon === "Helmet" ? "bg-[#4e517f]" : "bg-transparent"
					}`}
					onClick={() => handleClick("Helmet")}>
					<img
						src={HelmetIcon}
						alt='Helmet-Icon'
					/>
				</div>
				{/* Bottle Cap */}
				<div
					className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
						activeIcon === "BottleCap" ? "bg-[#4e517f]" : "bg-transparent"
					}`}
					onClick={() => {
						handleClick("BottleCap");
					}}>
					<img
						src={BottleCapIcon}
						alt='BottleCap-Icon'
					/>
				</div>
				{/* Home */}
				<div className='px-2 -mt-1 flex justify-center items-center'>
					<div className='relative' 
						onClick={() => {
							handleClick("Home");
						}}
					>
						<img
							className='w-[80px] h-[80px] rounded-full'
							src={LittlePandaBgIcon}
							alt='Outer-Circle'
						/>
						<div className='absolute top-[24%] left-[36%]'>
							<img
								src={LittlePandaIcon}
								alt='Panda-Icon'
							/>
						</div>
					</div>
				</div>
				{/* Hammer */}
				<div
					className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
						activeIcon === "Hammer" ? "bg-[#4e517f]" : "bg-transparent"
					}`}
					onClick={() => {
						handleClick("Hammer");
					}}>
					<img
						src={HammerIcon}
						alt='Hammer-Icon'
					/>
				</div>
				{/* Invite Friends */}
				<div
					className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
						activeIcon === "Group" ? "bg-[#4e517f]" : "bg-transparent"
					}`}
					onClick={() => handleClick("Group")}>
					<img
						src={GroupIcon}
						alt='Group-Icon'
					/>
				</div>
			</div>
		</>
	);
};

export default Footer;
