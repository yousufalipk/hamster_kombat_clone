import React, { useState, useEffect } from "react";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import WalletIcon from '../../assets/wallet/wallet.svg';
import WithdrawIcon from '../../assets/wallet/withdraw.svg';
import ConnectIcon from '../../assets/wallet/connect.svg';
import circleimg from "../../assets/wallet/round_circles.svg"
import walletsvg from "../../assets/wallet/walletsvg.svg"
import connstwallet from "../../assets/wallet/connecttwallet.svg"

import PopupLine from '../../assets/line.svg'
import WalletImage from '../../assets/walletImg.svg';

import walletLie from "../../assets/wallet/walletline.svg"
import walletLeft from "../../assets/wallet/walletLeft.svg"
import walletRight from "../../assets/wallet/walletRight.svg";

import { useUser } from '../../context/index';


const Wallet = () => {

	const priceInDollar = 0.001;

	const { balance } = useUser();

	const [buttonType, setButtonType] = useState('connect');
	const [iswithdraw, setIsPopupWithdraw] = useState(false);
	const [isconnect, setIsPopupConnect] = useState(false);

	const [popupClosing, setPopupClosing] = useState(false);

	const toggleButtonType = (btn) => {
		if (btn === 2) {
			setButtonType('withdraw');
		} else {
			setButtonType('connect');
		}
	}
	return (
		<>
			<div className='h-[86vh] w-[100vw] flex flex-col items-center relative'>
				<div className=" w-full h-full absolute top-40">
					<img src={circleimg} alt="" />
				</div>

				<div className="w-[100vw] h-[40vh] flex flex-col justify-center items-center z-10">
					<div className="text-white flex flex-col justify-center items-center">
						<p className="mb-2 text-gray-200">Avalibale balance</p>
						<div className="flex gap-2">
							<h1 className="text-xl font-semibold">{balance}</h1>
							<img src={LittleCoin} alt='coin_img' />
						</div>
						<p className="text-gray-500">≈ {priceInDollar * balance} $</p>
					</div>

					{/* buttons */}
					<div className="text-white flex mt-8 w-4/5">
						<button
							className={`w-1/2 p-2 rounded-l-lg gap-2 flex justify-center items-center text-xs font-semibold bg-[#303941] ${buttonType !== 'connect' && `opacity-40`} `}
							onClick={() => toggleButtonType(1)}
						>
							<img
								src={ConnectIcon}
								alt="connect"
								width={20}
							/>
							Connect Wallet
						</button>
						<button
							className={`w-1/2 p-2 rounded-r-lg gap-2 flex justify-center items-center text-xs font-semibold bg-[#303941] ${buttonType !== 'withdraw' && `opacity-40`} `}
							onClick={() => toggleButtonType(2)}
						>
							<img
								src={WithdrawIcon}
								alt="connect"
								width={25}
							/>
							Withdraw
						</button>
					</div>
				</div>

				{/* Content  */}
				<div className="w-[100vw] h-[43vh] text-white z-10">
					{buttonType === 'connect' ? (
						<>
							<div className="w-[100vw] h-[43vh] flex flex-col gap-3 items-center justify-center">
								<h1 className="text-2xl font-semibold">Connect Wallet</h1>
								<img src={WalletIcon} alt="wallet_icon" width={140} />
								<p className="text-xs px-5 justify-center text-center text-gray-300">
									Easily access you <span className="text-white font-semibold">Telegram wallet</span> and make transactions directly from our <span className="text-white font-semibold">wallet.</span>
								</p>
								<button
									onClick={() => { setIsPopupConnect(true) }}
									className="bg-gradient-to-t from-[#2226FF] to to-[#00B2FF] py-2 px-10 rounded-lg text-xs font-semibold">
									Connect
								</button>
							</div>
						</>
					) : (
						<>
							<div className="w-[100vw] h-[43vh] flex flex-col items-center justify-center">
								<form action="" className="w-4/5 flex flex-col gap-3">
									<div className="flex flex-col gap-1 w-full">
										<label htmlFor="coin" className="text-xs text-gray-500">COIN</label>
										<input className='rounded-md px-3 py-2 bg-[#303941] focus:outline-none placeholder:text-white placeholder:text-xl ' name='coin' id="coin" placeholder="TON" type="text" />
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="address" className="text-xs text-gray-500">ADDRESS</label>
										<textarea className='rounded-md px-2 py-1 bg-[#303941] focus:outline-none' name="" id="" placeholder="Enter your wallet address"></textarea>
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="address" className="text-xs text-gray-500">YOU ARE SENDING</label>
										<div className="flex w-full justify-center">
											<input className='rounded-l-md px-2 py-2 w-full bg-[#303941] focus:outline-none' name='amount' id="amount" placeholder="Min 1000000" type="number" />
											<div className="bg-[#303941]  rounded-r-md flex gap-2 px-2 justify-end items-center">
												<p className="text-sm">Coins</p>
												<button
													className="text-[#0099FF]"
												>
													MAX
												</button>
											</div>
										</div>
									</div>
								</form>
								<div className="w-4/5 mt-8 h-[10vh] flex gap-2 justify-center items-center">
									<button
										className="custom-button-2 w-2/3 rounded-xl border-b-4 p-1 mx-2 py-2 text-black font-semibold text-xl"
									>
										Save
									</button>
									<button
										onClick={() => {
											setIsPopupWithdraw(true);
										}}
										className=" custom-button relative w-2/3 rounded-xl p-1 mx-2 py-2   font-semibold flex justify-center items-center text-[#9a9898] text-xl hover:bg-black"
									>
										Withdraw
									</button>
								</div>
							</div>
						</>
					)}
				</div>

				{iswithdraw && (
					<div
						className={`popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end`}
						style={{
							animation: `${popupClosing ? "fadeOut" : "fadeIn"
								} 0.5s ease-in-out forwards`,
						}}
					>
						<div
							style={{
								animation: `${popupClosing ? "closePopup" : "openPopup"
									} 0.5s ease-in-out forwards`,
							}}
							className="popup-overlay"
						>
							<div
								className="popup-overlay relative bg-[#06060E] w-[100vw] rounded-t-3xl p-6 text-white">
								<div className="absolute -top-16 left-0"><img src={walletLeft} alt="" /></div>
								<div className="absolute bottom-10 -right-10 h-40"><img src={walletRight} alt="" /></div>

								<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
								<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
								<div className="flex flex-col items-center ">
									<div className="h-1 w-16 bg-[#D9D9D9] rounded-md"></div>
									<div className="flex justify-center flex-col items-center gap-2 h-28">
										<img src={walletsvg} alt="battery" />
									</div>
									<div className="text-center text-md flex flex-col gap-4">
										<p>Manually withdrawal selection will be deselected if you want to change the withdrawal method.</p>
									</div>
									<div className="mt-2">
										<img src={walletLie} alt="wallet line" />
									</div>
									<div className="text-center text-md flex flex-col mt-2">
										<p>Do you want to change withdrawal method?</p>
									</div>
									<div className="flex w-full mt-3 items-center justify-center gap-4 z-40">
										<button
											className="w-36 bg-white h-10 rounded-md text-black font-bold"
											onClick={() => {
												setPopupClosing(true);
												setTimeout(() => {
													setIsPopupWithdraw(false);
													setPopupClosing(false);
												}, 500);
											}}
										>
											No
										</button>
										<button className="w-36  py-2 bg-gradient-to-b from-[#00B2FF]  to-[#2226FF] text-white font-bold rounded-md">Yes</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{isconnect && (
					<div
						className={`popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end`}
						style={{
							animation: `${popupClosing ? "fadeOut" : "fadeIn"
								} 0.5s ease-in-out forwards`,
						}}
					>
						<div
							style={{
								animation: `${popupClosing ? "closePopup" : "openPopup"
									} 0.5s ease-in-out forwards`,
							}}
							className="popup-overlay"
						>
							<div className="relative bg-[#06060E] w-[100vw] rounded-t-3xl p-6 text-white">
								<div className="absolute -top-16 left-0"><img src={walletLeft} alt="" /></div>
								<div className="absolute bottom-10 -right-10 h-40"><img src={walletRight} alt="" /></div>

								<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
								<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
								<div className="flex flex-col items-center ">
									<div className="h-1 w-16 bg-[#D9D9D9] rounded-md"></div>
									<div className="flex justify-center flex-col items-center gap-2 h-28">
										<img src={WalletImage} alt="wallet" />
									</div>
									<div className="text-center text-md flex flex-col ">
										<p>Do you want to connect with your telegram wallet?</p>
									</div>
									<div className="h-2 mt-5">
										<img src={PopupLine} alt="wallet line" />
									</div>
									<div className="flex w-full mt-3 items-center justify-center gap-4 z-40">
										<button
											className="w-36 bg-white h-10 rounded-md text-black font-bold"
											onClick={() => {
												setPopupClosing(true);
												setTimeout(() => {
													setIsPopupConnect(false);
													setPopupClosing(false);
												}, 500);
											}}
										>
											No
										</button>
										<button className="w-36  py-2 bg-gradient-to-b from-[#00B2FF]  to-[#2226FF] text-white font-bold rounded-md">Yes</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div >
		</>
	);
};

export default Wallet;