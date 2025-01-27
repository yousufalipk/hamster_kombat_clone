import React, { useState, useEffect } from "react";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import WalletIcon from '../../assets/wallet/wallet.svg';
import WithdrawIcon from '../../assets/wallet/withdraw.svg';
import ConnectIcon from '../../assets/wallet/connect.svg';
import circleimg from "../../assets/wallet/round_circles.svg"
import walletsvg from "../../assets/wallet/walletsvg.svg";
import HelmetIcon from "../../assets/HelmetIcon.svg";

import PopupLine from '../../assets/line.svg'
import WalletImage from '../../assets/walletImg.svg';

import walletLie from "../../assets/wallet/walletline.svg"
import walletLeft from "../../assets/wallet/walletLeft.svg"
import walletRight from "../../assets/wallet/walletRight.svg";

import { useUser } from '../../context/index';

import { RxCross1 } from "react-icons/rx";
import { FaCopy } from "react-icons/fa";

import CommingSoon from '../../assets/root/comingSoon.svg';

import RectangleBg from '../../assets/wallet_Rectangle.svg';
import RectangleBg2 from '../../assets/walletRectangeBg2.svg';

import RightPopupEllipse from '../../assets/walletEllipse.svg';

import TonCoin from '../../assets/ton.svg';
import StarCoin from '../../assets/star.svg';

import PoupHorizontalLine from '../../assets/optimizedImages/popup/horizontalLine.webp';

import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";

const Wallet = () => {
	const [tonConnectUI, options] = useTonConnectUI();


	const Ptap_Per_Ton = 1000;

	const [walletAddress, setWalletAddress] = useState(null);
	const { balance, formatNumberWithSpaces, triggerToast, fetchProjectsBalance, projectBalance, handleConnectWallet, handleDisconnectWallet, checkTonTransactionAndGiveReward } = useUser();

	const [dots, setDots] = useState('');
	const [buttonLoading, setButtonLoading] = useState(false);

	useEffect(() => {
		console.log('Wallet Address', walletAddress);
	}, [walletAddress])

	const [card, setCard] = useState('star');

	const [iswithdraw, setIsPopupWithdraw] = useState(false);
	const [isconnect, setIsPopupConnect] = useState(false);

	const [popupClosing, setPopupClosing] = useState(false);

	const [starValue, setStarValue] = useState('');
	const [tonValue, setTonValue] = useState('');
	const [starError, setStarError] = useState('');
	const [tonError, setTonError] = useState('');

	const connectWallet = async (walletAddress) => {
		try {
			setWalletAddress(walletAddress);
			const res = await handleConnectWallet(walletAddress);
			if (res.success) {
				triggerToast('Wallet connected successfully!', 'success');
			} else {
				triggerToast('Error connecting wallet', 'error');
			}
		} catch (error) {
			console.error('Error connecting wallet:', error);
			triggerToast('Error connecting wallet', 'error');
		}
	};

	const disconnectWallet = async () => {
		try {
			setWalletAddress(null);
			const res = await handleDisconnectWallet(null);
			if (res.success) {
				triggerToast('Wallet disconnected successfully!', 'success');
			} else {
				triggerToast('Error disconnecting wallet', 'error');
			}
		} catch (error) {
			console.error('Error disconnecting wallet:', error);
			triggerToast('Error disconnecting wallet', 'error');
		}
	};

	useEffect(() => {
		const checkWalletConnection = async () => {
			if (tonConnectUI?.account?.address) {
				setWalletAddress(tonConnectUI.account.address);
			} else {
				setWalletAddress(null);
			}
		};

		checkWalletConnection();

		const unsubscribe = tonConnectUI?.onStatusChange((wallet) => {
			if (wallet?.account?.address) {
				setWalletAddress(wallet.account.address);
			} else {
				setWalletAddress(null);
			}
		});

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [tonConnectUI]);


	const handleWalletAction = async () => {
		try {
			if (tonConnectUI?.connected) {
				await tonConnectUI.disconnect();
				await disconnectWallet();
			} else {
				await tonConnectUI.openModal();

				const unsubscribe = tonConnectUI?.onStatusChange((wallet) => {
					if (wallet?.account?.address) {
						connectWallet(wallet.account.address);
					}
					if (unsubscribe) unsubscribe();
				});
			}
		} catch (error) {
			console.error('Error handling wallet action:', error);
			triggerToast('Error handling wallet action', 'error');
		}
	};

	// Buy PTAP with stars
	const handleStarSubmit = (e) => {
		e.preventDefault();

		if (!starValue || isNaN(starValue)) {
			setStarError('Please enter a valid numeric value.');
		} else {
			setStarError('');
			console.log(`Star Form Value: ${starValue}`);
			setStarValue('');
		}
	};

	// Buy PTAP with ton
	const handleTonSubmit = async (e) => {
		try {
			e.preventDefault();

			if (!tonValue || isNaN(tonValue)) {
				setTonError('Please enter a valid numeric value.');
			} else {
				setTonError('');

				const tonAmountInNanoCoins = tonValue * 1e9;

				const transaction = {
					messages: [
						{
							address: '0QCyOzE91WU2rEsNDgU-I2cI5aOzBHKond_PuWnJfZEdOgY_',
							amount: "10",
						},
					],
				};

				const response = await tonConnectUI.sendTransaction(transaction);

				console.log('response', response);

				if (response && response.transactionHash) {
					const res = await checkTonTransactionAndGiveReward(tonValue, response.transactionHash);

					if (res.success) {
						triggerToast(res.mess, 'success');
					} else {
						triggerToast(res.mess, 'error');
					}
				} else {
					triggerToast('Transaction failed!', 'error');
				}
			}
		} catch (error) {
			console.log('Internal Server Error', error);
		} finally {
			setTonValue('');
		}
	};

	useEffect(() => {
		if (!projectBalance) {
			fetchProjectsBalance();
		}
	}, [projectBalance])

	const truncateWalletAddress = (address) => {
		if (!address || address.length <= 10) return address;
		const start = address.slice(0, 5);
		const end = address.slice(-5);
		return `${start}...${end}`;
	};

	useEffect(() => {
		let interval;
		if (buttonLoading) {
			interval = setInterval(() => {
				setDots(prev => (prev.length < 4 ? prev + '.' : ''));
			}, 300);
		} else {
			setDots('');
		}
		return () => clearInterval(interval);
	}, [buttonLoading]);

	const copyToClipboard = async () => {
		try {
			if (walletAddress) {
				await navigator.clipboard.writeText(walletAddress);
				triggerToast('Wallet address copied to clipboard!', 'success');
			} else {
				triggerToast('No wallet address to copy.', 'error');
			}
		} catch (error) {
			console.error("Failed to copy wallet address:", error);
			triggerToast('Failed to copy wallet address', 'error');
		}
	};

	const tonPackages = [
		{
			reward: 200000,
			price: 200
		},
		{
			reward: 400000,
			price: 400
		},
		{
			reward: 600000,
			price: 600
		},
		{
			reward: 800000,
			price: 800
		},
	]

	const starsPackages = [
		{
			reward: 200000,
			price: 200
		},
		{
			reward: 400000,
			price: 400
		},
		{
			reward: 600000,
			price: 600
		},
		{
			reward: 800000,
			price: 800
		},
	]

	return (
		<>
			<div className="w-full h-[86vh] flex flex-col justify-start items-center gap-2 relative p-2 py-5 overflow-hidden">
				<div className="absolute top-2 right-2 bg-red-600">
					<TonConnectButton />
				</div>
				<img src={RightPopupEllipse} alt="ellispse" className="absolute -top-5 -right-5" />
				<div
					style={{ backgroundImage: `url(${RectangleBg})` }}
					className="w-full h-[16vh] bg-cover bg-center border border-gray-500 rounded-md overflow-hidden text-white p-2 flex flex-col justify-start items-center gap-1"
				>
					<h1 className="h-[25%] w-full text-start text-[18px] font-semibold">
						Avaliable balance:
					</h1>
					<p className="h-[25%] w-full flex justify-start items-center gap-1 text-[18px]">
						$ {formatNumberWithSpaces(balance)} <img src={LittleCoin} alt="coin" />
					</p>
					<div className="w-full h-[50%] relative text-white flex justify-between items-center gap-3">
						<button
							id="ton-connect-btn"
							className={`w-1/2 h-7 bg-gradient-to-t from-darkBlue to-lightBlue rounded-md text-[14px] flex justify-center items-center gap-1 p-2 ${walletAddress && 'grayscale'}`}
							onClick={() => {
								handleWalletAction();
							}}
						>
							{!walletAddress ? (
								<>
									<img
										src={ConnectIcon}
										alt="connect"
										width={15}
									/>
									Connect Wallet
								</>
							) : (
								<>
									<img
										src={ConnectIcon}
										alt="connect"
										width={15}
									/>
									Disconnect Wallet
								</>
							)}
						</button>
						<button
							className="w-1/2 h-7 bg-gradient-to-t from-darkBlue to-lightBlue rounded-md text-[14px] flex justify-center items-center gap-1 p-2 grayscale"
							onClick={() => {
								// navigate to withdraw page
							}}
							disabled={true}
						>
							<img
								src={WithdrawIcon}
								alt="connect"
								width={20}
							/>
							Withdraw
						</button>
						<img src={CommingSoon} alt="comming_soon" width={50} className="absolute top-2 right-0" />
					</div>
				</div>

				<div className="relative w-full h-[26vh] border border-gray-700 rounded-md text-white">
					<div className="w-full h-full absolute z-20 p-2">
						<h1 className="w-full h-[15%] text-[#6D6D6D] text-[12px]">Balance</h1>
						<div className="w-full h-[85%]">
							{projectBalance && projectBalance.length > 0 ? (
								<div className="w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-scroll">
									{projectBalance.map((project, index) => (
										<div
											key={index}
											className="flex justify-center items-center w-full h-[40px] shrink-0 border border-gray-500 rounded-sm px-2 bg-[#12121C]"
										>
											<div className="w-[15%] h-full flex justify-start items-center">
												<img src={project.icon.data} alt="project_icon" width={30} className="rounded-full overflow-hidden" />
											</div>
											<div className="w-[40%] h-full flex flex-col justify-center items-start">
												<h1 className="h-1/2 w-full text-[14px]">
													{project.name}
												</h1>
												<p className="h-1/2 w-full text-[10px] text-[#ADADAD]">
													{project.name.charAt(2)}
												</p>
											</div>
											<div className="w-[40%] flex justify-end items-center text-[12px] gap-1">
												<h1>
													${formatNumberWithSpaces(project.balance)}
												</h1>
												<img src={LittleCoin} alt="coin" width={12} />
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="w-full h-full flex justify-center items-center text-white">
									No projects!
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					style={{
						backgroundImage: `url(${RectangleBg2})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
					className="relative w-full h-[38vh] overflow-hidden bg-center"
				>
					<div className="w-full h-full absolute z-10 px-5 flex flex-col items-center justify-start">
						<div className="w-full h-[5.5vh] flex justify-center items-end text-white">
							<button
								onClick={() => {
									setCard('star');
								}}
								className={`w-1/2 h-[5vh] ${card === 'star' && 'custom-orange-border'}`}
							>
								STAR
							</button>
							<button
								onClick={() => {
									setCard('crypto')
								}}
								className={`w-1/2 h-[5vh] ${card === 'crypto' && 'custom-orange-border'}`}
							>
								CRYPTO
							</button>
						</div>
						<div className="w-full h-[80%] text-white">
							{card === 'star' ? (
								<div className="w-full h-full flex flex-col justify-start items-center py-1 px-3">
									<form onSubmit={handleStarSubmit} className="w-full h-[12vh] flex flex-col justify-center items-center gap-2">
										<div className="relative w-full h-[2.1rem] rounded-md border-gradient-gray">
											<input
												type="text"
												id="starInput"
												value={starValue}
												onChange={(e) => setStarValue(e.target.value)}
												required
												className="w-full h-8 bg-black rounded-md absolute text-white px-2 text-[14px] outline-none focus:outline-none focus:ring-0"
												style={{
													background: 'radial-gradient(circle, rgba(17, 17, 55, 1) 0%, rgba(11, 11, 29, 1) 49%, rgba(0, 0, 0, 1) 100%)',
												}}
											/>
										</div>
										{starError && <p style={{ color: 'red' }}>{starError}</p>}
										<button
											className={`w-full h-8 text-[14px] bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-md`}
											type='submit'
											disabled={buttonLoading}
										>
											{buttonLoading ? (
												<span className="flex justify-center items-center text-5xl font-bold w-full">
													<p className="absolute -mt-6">
														{dots}
													</p>
												</span>
											) : (
												<>
													BUY
												</>
											)}
										</button>
									</form>
									<div className="w-full h-[2.5vh] flex justify-center items-center gap-1 text-center text-[#727272] text-[12px] mt-1">
										200
										<img src={StarCoin} alt="starcoin" />
										= 2$
									</div>
									<div className="w-full h-[2.5vh] flex justify-center items-center text-center text-white text-[12px]">
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
										<h1>
											or
										</h1>
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
									</div>
									<div className="w-full h-full flex flex-col justify-center items-center gap-2">
										{starsPackages.map((pack, index) => {
											return (
												<div
													key={index}
													className="w-full h-[3vh] bg-[#32324D] rounded-sm flex justify-between items-center px-2 text-[12px] font-thin custom-button"
												>
													<div className="w-[25%] h-full flex justify-start items-center gap-1">
														{pack.reward}
														<img src={LittleCoin} alt="little_coin" />
													</div>
													<div className="w-[25%] h-full flex justify-end items-center gap-1">
														{pack.price}
														<img src={StarCoin} alt="ton_coin" />
													</div>
												</div>
											)
										})}
									</div>
								</div>
							) : (
								<div className="w-full h-full flex flex-col justify-start items-center py-1 px-3">
									<form onSubmit={handleTonSubmit} className="w-full h-[12vh] flex flex-col justify-center items-center gap-2">
										<div className="relative w-full h-[2.1rem] rounded-md border-gradient-gray">
											<input
												type="text"
												id="tonInput"
												value={tonValue}
												onChange={(e) => setTonValue(e.target.value)}
												required
												className="w-full h-8 bg-black rounded-md absolute text-white px-2 text-[14px] outline-none focus:outline-none focus:ring-0"
												style={{
													background: 'radial-gradient(circle, rgba(17, 17, 55, 1) 0%, rgba(11, 11, 29, 1) 49%, rgba(0, 0, 0, 1) 100%)',
												}}
											/>
										</div>
										{tonError && <p style={{ color: 'red' }}>{tonError}</p>}
										<button
											className={`w-full h-8 text-[14px] bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-md`}
											type='submit'
											disabled={buttonLoading}
										>
											{buttonLoading ? (
												<span className="flex justify-center items-center text-5xl font-bold w-full">
													<p className="absolute -mt-6">
														{dots}
													</p>
												</span>
											) : (
												<>
													BUY
												</>
											)}
										</button>
									</form>
									<div className="w-full h-[2.5vh] flex justify-center items-center gap-1 text-center text-[#727272] text-[12px] mt-1">
										200
										<img src={TonCoin} alt="tonCoin" />
										= 2$
									</div>
									<div className="w-full h-[2.5vh] flex justify-center items-center text-center text-white text-[12px]">
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
										<h1>
											or
										</h1>
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
									</div>
									<div className="w-full h-full flex flex-col justify-center items-center gap-2">
										{tonPackages.map((pack, index) => {
											return (
												<div
													key={index}
													className="relative w-full h-[3vh] bg-[#32324D] rounded-sm flex justify-between items-center px-2 text-[12px] font-thin custom-button"
												>
													<div className="w-[25%] h-full flex justify-start items-center gap-1">
														{pack.reward}
														<img src={LittleCoin} alt="little_coin" />
													</div>
													<div className="w-[25%] h-full flex justify-end items-center gap-1">
														{pack.price}
														<img src={TonCoin} alt="ton_coin" />
													</div>
												</div>
											)
										})}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Wallet;
