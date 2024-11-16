import React, { useState, useEffect } from "react";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import WalletIcon from '../../assets/wallet/wallet.svg';
import WithdrawIcon from '../../assets/wallet/withdraw.svg';
import ConnectIcon from '../../assets/wallet/connect.svg';


const Wallet = () => {

	const [buttonType, setButtonType] = useState('connect');

	const toggleButtonType = (btn) => {
		if (btn === 2) {
			setButtonType('withdraw');
		} else {
			setButtonType('connect');
		}
	}

	return (
		<>
			<div className='h-[86vh] w-[100vw] flex flex-col items-center overflow-y-scroll overflow-x-hidden'>
				<div className="w-[100vw] h-[40vh] flex flex-col justify-center items-center">
					<div className="text-white flex flex-col justify-center items-center">
						<p className="mb-2 text-gray-200">Avalibale balance</p>
						<div className="flex gap-2">
							<h1 className="text-xl font-semibold">25 951 748</h1>
							<img src={LittleCoin} alt='coin_img' />
						</div>
						<p className="text-gray-500">≈ 0.00897 $</p>

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
				<div className="w-[100vw] h-[43vh] text-white">
					{buttonType === 'connect' ? (
						<>
							<div className="w-[100vw] h-[43vh] flex flex-col gap-3 items-center justify-center">
								<h1 className="text-xl font-semibold">Connect Wallet</h1>
								<img src={WalletIcon} alt="wallet_icon" width={140} />
								<p className="text-xs px-5 justify-center text-center text-gray-300">
									Easily access you <span className="text-white font-semibold">Telegram wallet</span> and make transactions directly from our <span className="text-white font-semibold">wallet.</span>
								</p>
								<button className="bg-gradient-to-t from-[#2226FF] to to-[#00B2FF] py-2 px-10 rounded-lg text-xs font-semibold">
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
										<input className='rounded-md px-2 py-1 bg-[#303941]' name='coin' id="coin" placeholder="Coin" type="text" />
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="address" className="text-xs text-gray-500">ADDRESS</label>
										<input className='rounded-md px-2 py-1 bg-[#303941]' name='address' id="address" placeholder="Enter your wallet address" type="text" />
									</div>
									<div className="flex flex-col gap-1">
										<label htmlFor="address" className="text-xs text-gray-500">YOU ARE SENDING</label>
										<div className="flex w-full justify-center">
											<input className='rounded-l-md px-2 py-1 w-2/4 bg-[#303941]' name='amount' id="amount" placeholder="Min 1000000" type="number" />
											<div className="bg-[#303941] w-2/4 rounded-r-md flex gap-2 px-2 justify-end items-center">
												<p className="text-sm">Coins</p>
												<button
													className="text-blue-600"
												>
													MAX
												</button>
											</div>
										</div>
									</div>
								</form>
								<div className="w-4/5 mt-2 h-[10vh] flex gap-2 justify-center items-center">
									<button
										className="w-1/2 rounded-lg p-1 mx-2 text-black bg-white font-semibold"
									>
										Save
									</button>
									<button
										className="relative w-1/2 rounded-lg p-1 mx-2 bg-[#25313A] text-gray-500 font-semibold flex justify-center items-center"
									>
										<div className="absolute w-4/5 h-[5vh] rounded-lg shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.5),0px_1px_0px_0px_rgba(255,255,255,0.5)]"></div>
										Withdraw
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div >
		</>
	);
};

export default Wallet;