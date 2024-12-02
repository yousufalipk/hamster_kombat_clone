import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HelmetIcon from "../../assets/HelmetIcon.svg";
import BottleCapIcon from "../../assets/BottleCapIcon.svg";
import LittlePandaIcon from "../../assets/littlePandaIcon.png";
import HammerIcon from "../../assets/HammerIcon.svg";
import GroupIcon from "../../assets/GroupIcon.svg";
import LittlePandaBgIcon from "../../assets/LittlePandaBg.svg";

const Footer = () => {
    const [activeIcon, setActiveIcon] = useState(null);
    const [togglePanda, setTogglePanda] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setTogglePanda((prev) => !prev);
        }, 800);
        return () => clearTimeout(timer);
    }, [togglePanda]);

    const handleClick = (iconName, route) => {
        setActiveIcon(iconName);
        navigate(route);
    };

    const iconData = [
        { name: "Helmet", icon: HelmetIcon, route: "/wallet" },
        { name: "BottleCap", icon: BottleCapIcon, route: "/bottle-cap" },
        { name: "Tap & Earn", icon: LittlePandaBgIcon, route: "/" },
        { name: "Hammer", icon: HammerIcon, route: "/hammer" },
        { name: "Group", icon: GroupIcon, route: "/invite-friends" },
    ];

    return (
        <div className="w-screen h-[14vh] flex justify-center items-center relative z-10">
            <div className="bg-custom-image1 bg-cover px-6 h-[7vh] w-[90%] flex items-center justify-between rounded-[27px]">
                {iconData.map((cls, index) => {
                    if (cls.name !== "Tap & Earn") {
                        return (
                            <div
                                key={index}
                                className={`w-10 h-10 flex justify-center items-center rounded-full ${activeIcon === cls.name ? "bg-[#44466b]" : "bg-transparent"
                                    }`}
                                onClick={() => handleClick(cls.name, cls.route)}
                            >
                                <img src={cls.icon} alt={`${cls.name} Icon`} width="22" />
                            </div>
                        );
                    } else {
                        return (
                            <div key={index}>
                                <div
                                    className="relative w-20 h-20 flex justify-center items-center rounded-full"
                                    onClick={() => handleClick(cls.name, cls.route)}
                                >
                                    {togglePanda ? (
                                        <img
                                            src={LittlePandaIcon}
                                            alt="Panda Icon"
                                            onClick={() => handleClick("Home", "/")}
                                            className="cursor-pointer z-10"
                                        />
                                    ) : (
                                        <p
                                            onClick={() => handleClick("Home", "/")}
                                            className="text-white font-semibold cursor-pointer z-10 px-5 text-center leading-5 text-sm w-15"
                                        >
                                            Tap & Earn
                                        </p>
                                    )}
                                    <img src={cls.icon} alt={`${cls.name} Icon`} width="70" className="absolute z-0" />
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Footer;
