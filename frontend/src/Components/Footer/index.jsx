import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './index.css';

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
            <div className="w-screen h-[14vh] flex justify-center items-center">
                <div className='bg-custom-image1 bg-cover px-5 h-[6vh] w-[90%] flex justify-between items-center rounded-[27px]'>
                    {/* Wallet */}
                    <div
                        className={`w-[35px] h-[35px] flex justify-center items-center rounded-full ${
                            activeIcon === "Helmet" ? "bg-[#44466b] shadow-inner" : "bg-transparent"
                        }`}
                        onClick={() => handleClick("Helmet")}>
                        <img
                            src={HelmetIcon}
                            alt='Helmet-Icon'
                            width="22"
                        />
                    </div>
                    {/* Bottle Cap */}
                    <div
                        className={`w-[35px] h-[35px] flex justify-center items-center rounded-full ${
                            activeIcon === "BottleCap" ? "bg-[#44466b] shadow-inner" : "bg-transparent"
                        }`}
                        onClick={() => {
                            handleClick("BottleCap");
                        }}>
                        <img
                            src={BottleCapIcon}
                            alt='BottleCap-Icon'
                            width="22"
                        />
                    </div>
                    {/* Home */}
                    <div className='w-20 px-2 -mt-1 flex justify-center items-center'>
                        <div className='relative'>
                            {/* Glow effect */}
                            <div className='absolute inset-0 flex justify-center items-center'>
                                <div className='w-[100px] h-[100px] rounded-full'></div>
                            </div>
                            <img
                                className='w-[80px] h-[80px] rounded-full'
                                src={LittlePandaBgIcon}
                                alt='Outer-Circle'
                            />
                            <div className='absolute top-[24%] left-[33%]'>
                                <img
                                    src={LittlePandaIcon}
                                    alt='Panda-Icon'
                                />
                            </div>
                        </div>
                    </div>
                    {/* Hammer */}
                    <div
                        className={`w-[35px] h-[35px] flex justify-center items-center rounded-full ${
                            activeIcon === "Hammer" ? "bg-[#44466b] shadow-inner" : "bg-transparent"
                        }`}
                        onClick={() => {
                            handleClick("Hammer");
                        }}>
                        <img
                            src={HammerIcon}
                            alt='Hammer-Icon'
                            width="22"
                        />
                    </div>
                    {/* Invite Friends */}
                    <div
                        className={`w-[35px] h-[35px] flex justify-center items-center rounded-full ${
                            activeIcon === "Group" ? "bg-[#44466b] shadow-inner" : "bg-transparent"
                        }`}
                        onClick={() => handleClick("Group")}>
                        <img
                            src={GroupIcon}
                            alt='Group-Icon'
                            width="22"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
