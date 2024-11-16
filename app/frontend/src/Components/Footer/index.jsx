import React, { useEffect, useState } from "react";
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
    const [togglePanda, setTogglePanda] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            togglePandaLogo();
        }, 800);
    }, [togglePanda])


    const togglePandaLogo = () => {
        if (togglePanda === true) {
            setTogglePanda(false);
        } else {
            setTogglePanda(true);
        }
    }
    const navigate = useNavigate();

    const handleClick = (iconName, route) => {
        setActiveIcon(iconName);
        navigate(route);
    };

    const iconData = [
        { name: "Helmet", icon: HelmetIcon, route: "/wallet" },
        { name: "BottleCap", icon: BottleCapIcon, route: "/bottle-cap" },
        { name: "Hammer", icon: HammerIcon, route: "/hammer" },
        { name: "Group", icon: GroupIcon, route: "/invite-friends" },
    ];

    return (
        <div className="w-screen h-[14vh] flex justify-center items-center">
            <div className='bg-custom-image1 bg-cover px-3 h-[7vh] w-[90%] flex items-center rounded-[27px]'>
                {/* Left Icons */}
                <div className='flex-1 flex justify-center gap-5'>
                    {iconData.slice(0, 2).map(({ name, icon, route }) => (
                        <div
                            key={name}
                            className={`w-[35px] h-[35px] flex justify-center items-center rounded-full ${activeIcon === name ? "bg-[#44466b] shadow-inner" : "bg-transparent"
                                }`}
                            onClick={() => handleClick(name, route)}
                        >
                            <img src={icon} alt={`${name}-Icon`} width="22" />
                        </div>
                    ))}
                </div>

                {/* Home Icon in the Center */}
                <div className='flex justify-center items-center'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex justify-center items-center'>
                            <div className='w-[100px] h-[100px] rounded-full'></div>
                        </div>
                        <img
                            className='w-[80px] h-[80px] rounded-full'
                            src={LittlePandaBgIcon}
                            alt='Outer-Circle'
                            onClick={() => handleClick("Home", "/")}
                        />
                        <div className='absolute top-[24%] left-[33%]'>
                            {togglePanda ? (
                                <>
                                    <img
                                        src={LittlePandaIcon}
                                        alt='Panda-Icon'
                                        onClick={() => handleClick("Home", "/")}
                                    />
                                </>
                            ) : (
                                <>
                                    <p
                                        onClick={() => handleClick("Home", "/")}
                                        className="text-white font-semibold"
                                    >
                                        Tap & Earn
                                    </p>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                {/* Right Icons */}
                <div className='flex-1 flex justify-center gap-5'>
                    {iconData.slice(2).map(({ name, icon, route }) => (
                        <div
                            key={name}
                            className={`w-[35px] h-[35px] flex justify-center items-center rounded-full ${activeIcon === name ? "bg-[#44466b] shadow-inner" : "bg-transparent"
                                }`}
                            onClick={() => handleClick(name, route)}
                        >
                            <img src={icon} alt={`${name}-Icon`} width="22" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;
