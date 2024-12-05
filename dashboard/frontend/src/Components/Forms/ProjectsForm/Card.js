import React from 'react';

import cardbg from "../../../Assets/token/tokencardbg.svg";
import loadcoin from "../../../Assets/token/loadcoin.svg";
import BigCoin from "../../../Assets/BigCoinIcon.svg";
import LittleCoin from "../../../Assets/LittleCoinIcon.svg";

const Card = ({
    fromColor,
    toColor,
    lineFromColor,
    lineToColor,
    name,
    icon
}) => {

    return (
        <>
            {/* Main Card */}
            <button
                style={{
                    position: "relative",
                    padding: "2px",
                    background:
                        `linear-gradient(to bottom, ${toColor},${fromColor})`,
                    borderRadius: "16px",
                    clipPath:
                        " polygon(0 0, 0 21%, 2% 35%, 2% 65%, 0 79%, 0 100%, 100% 100%, 100% 79%, 98% 65%, 98% 35%, 100% 21%, 100% 0)",
                }}
                className="card-container w-full h-[35vh]"
            >
                <div
                    style={{
                        position: "relative",
                        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
                        borderRadius: "14px",
                        clipPath:
                            " polygon(0 0, 0 21%, 2% 35%, 2% 65%, 0 79%, 0 100%, 100% 100%, 100% 79%, 98% 65%, 98% 35%, 100% 21%, 100% 0)",
                    }}
                    className="card-container w-full h-[34.5vh]"
                >
                    <div className="absolute left-10 -top-3">
                        <div className=" relative flex justify-end items-center w-[12vw] h-[30vh]">
                            <img
                                src={cardbg}
                                alt=""
                                className="opacity-10"
                            />
                            <div className=" flex items-center justify-center absolute">
                                <p className="font-italianno text-[6rem]   text-slate-100 opacity-10">
                                    {name.charAt(0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`rounded-[14px]`}>
                        <div className="justify-between">
                            <div className="w-full">
                                <div className="text-xs  bg-opacity-30 w-full flex justify-between py-1">
                                    <p
                                        style={{
                                            background: `linear-gradient(to bottom, #00B2FF, #2226FF)`
                                        }}
                                        className="text-base py-1 w-[4vw] bg-slate-900 text-center rounded-md text-white ml-1 mt-1"
                                    >
                                        {`lvl ${10}`}
                                    </p>
                                    <div className="text-[#FFF] flex items-center mr-10 gap-1">
                                        <span>
                                            <img
                                                src={LittleCoin}
                                                alt="Coin-Icon"
                                                className=" w-10 h-8"
                                            />
                                        </span>
                                        <p className="text-xl">
                                            {10000}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`flex justify-between items-center`}
                                >
                                    <div className="flex items-center gap-2 ml-8 mt-6">
                                        {icon ? (
                                            <>
                                                <img
                                                    className="w-[40px] h-[40px]"
                                                    src={`data:image/jpeg;base64,${icon.data}`}
                                                    alt="BigCoin-Icon"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-[40px] h-[40px] flex justify-center items-center">
                                                    No Logo
                                                </div>
                                            </>
                                        )}
                                        <div className="text-xl text-white">
                                            <p>{name}</p>
                                        </div>
                                    </div>
                                    <div className=" items-center mr-8">
                                        <p className="text-[#F39E09] font-semibold">
                                            Balance
                                        </p>
                                        <div className="flex gap-2">
                                            <img src={BigCoin} alt="Coin-Icon" />
                                            <p className="text-white">
                                                {5000}
                                                <span className="text-xs">{name.match(/[A-Z]/g)?.join('')}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-24 left-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 464.94 93.53" width={380} height={100}>
                                        <defs>
                                            <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: fromColor, stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: toColor, stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                        <polyline
                                            points="0 92.53 464.94 92.53 310.98 92.53 310.98 0"
                                            style={{
                                                stroke: 'url(#gradientStroke)',
                                                fill: 'none',
                                                strokeWidth: '1',
                                                strokeLinejoin: 'miter',
                                                strokeLinecap: 'butt',
                                            }}
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="px-5 mt-10 flex justify-between w-full">
                                <div className="text-[#FFF] text-xs font-normal gap-2 flex items-center w-[60%]">
                                    <div>Coins Per Minute</div>
                                    <div>
                                        <img src={loadcoin} alt="" width={12} />
                                    </div>
                                    <div className="text-xl text-[#FF8F00] font-medium">
                                        <p>+{20}</p>
                                    </div>
                                </div>
                                <div className="w-[40%] flex items-center gap-2 border justify-center border-[#5B5B5B] rounded-xl py-1">
                                    <img
                                        width={15}
                                        src={BigCoin}
                                        alt="Coin-Icon"
                                    />
                                    <div className="text-[#FFF] text-[15px] font-normal text-xs ">
                                        <p> + {1500} {name.match(/[A-Z]/g)?.join('')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-4 right-0.5 overflow-hidden">
                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 284.32 101.81" width="100" height="100">
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: lineFromColor, stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: lineToColor, stopOpacity: 1 }} />
                            </linearGradient>
                            <style>
                                {`
                                    .cls-1 {
                                        fill: none;
                                        stroke: url(#gradient1);
                                        stroke-width: 3px;
                                        stroke-miterlimit: 10;
                                        filter: drop-shadow(0px 0px 10px ${fromColor});
                                    }
                                `}
                            </style>
                        </defs>
                        <polyline className="cls-1" points="284.32 30.61 140.94 30.61 111.06 1.5 34.32 1.5" />
                        <polyline className="cls-1" points="284.32 73.5 210.64 73.5 180.77 100.31 83.49 100.31 59.74 73.5 0 73.5" />
                    </svg>
                </div>
            </button>
        </>
    );
};

export default Card;
