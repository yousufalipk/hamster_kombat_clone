import React, { useState, useEffect } from "react";
import TonConnect from "@tonconnect/sdk";
import TonCoin from '../../assets/ton.svg';
import StarCoin from '../../assets/star.svg';
import { useUser } from '../../context/index';
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import WithdrawIcon from '../../assets/wallet/withdraw.svg';
import CommingSoon from '../../assets/root/comingSoon.svg';
import RectangleBg from '../../assets/wallet_Rectangle.svg';
import RightPopupEllipse from '../../assets/walletEllipse.svg';
import PoupHorizontalLine from '../../assets/optimizedImages/popup/horizontalLine.webp';
import WalletCard from '../../Components/WalletCard/WalletCard';
import WalletCardRectangleBg from '../../assets/WalletCardRectangleBg.svg';

import { useTonConnectUI, TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import axios from "axios";
import { use } from "react";

const Wallet = () => {

	const Ptap_Per_Ton = 1000000;
	const Ptap_Per_Star = 1000;

	const tonPackages = [
		{
			price: 0.1
		},
		{
			price: 0.2
		},
		{
			price: 0.3
		},
		{
			price: 0.4
		},
	]

	const starsPackages = [
		{
			price: 1
		},
		{
			price: 2
		},
		{
			price: 3
		},
		{
			price: 4
		},
	]

	const { balance, formatNumberWithSpaces, triggerToast, fetchProjectsBalance, projectBalance, updateWalletAddress, userId, setBalance } = useUser();

	const apiUrl = process.env.REACT_APP_URL;

	const [tonConnectUI, setOptions] = useTonConnectUI();

	const wallet = useTonWallet();

	const [isConnected, setIsConnected] = useState(false);

	const [walletAddress, setWalletAddress] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	const [dots, setDots] = useState('');

	const [buttonLoading, setButtonLoading] = useState(false);

	const [card, setCard] = useState('star');

	const [starValue, setStarValue] = useState('');

	const [tonValue, setTonValue] = useState('');

	const [starError, setStarError] = useState('');

	const [tonError, setTonError] = useState('');

	const [tonPrice, setTonPrice] = useState(null);

	// Buy PTAP with stars
	const handleStarSubmit = async (e, starPrice) => {
		try {

			e.preventDefault();

			const starAmount = starPrice ?? starValue;

			const parsedStarValue = parseFloat(starAmount);
			if (isNaN(parsedStarValue) || parsedStarValue <= 0) {
				triggerToast('Star value must be a number greater than 0.', 'error');
				return;
			}

			const response = await axios.post(`${apiUrl}/exchange/generate-invoice-link`, {
				userId,
				amount: parsedStarValue
			});

			const { status, invoiceId, invoiceLink, message } = response.data;

			if (status !== 'success' || !invoiceId || !invoiceLink) {
				console.error('Error generating invoice:', message);
				triggerToast('Error generating invoice. Please try again later.', 'error');
				return;
			}

			window.Telegram.WebApp.openInvoice(invoiceLink, async (paymentStatus) => {
				try {
					const pTapGiven = parsedStarValue * Ptap_Per_Star;

					const updateResponse = await axios.post(`${apiUrl}/exchange/update-invoice`, {
						userId,
						invoidId: invoiceId,
						pTapGiven,
						status: paymentStatus === "paid" ? 'success' : 'failed'
					});

					if (updateResponse.data.status === 'success') {
						setBalance(updateResponse.data.newBalance);
						triggerToast('Transaction Successful!', 'success');
					} else {
						console.error('Error updating invoice:', updateResponse.data.message);
						triggerToast('Failed to update transaction status!', 'error');
					}
				} catch (updateError) {
					console.error('Error during invoice update:', updateError);
					triggerToast('An error occurred while updating the transaction.', 'error');
				}
			});
		} catch (error) {
			console.error('Internal Server Error:', error);
			triggerToast('An error occurred while processing your transaction.', 'error');
		} finally {
			setStarValue('');
		}
	};

	// Buy PTAP with ton
	const handleTonSubmit = async (e, tonPrice) => {
		try {

			e.preventDefault();

			const tonAmount = tonPrice ?? tonValue;

			const parsedTonValue = parseFloat(tonAmount);

			if (isNaN(parsedTonValue) || parsedTonValue <= 0) {
				triggerToast('Please enter a valid TON value greater than 0.', 'error');
				return;
			}

			const nanoValue = Math.floor(parsedTonValue * 1e9).toString();

			const response = await axios.post(`${apiUrl}/exchange/initiate-transaction`, {
				userId: userId,
				amount: parsedTonValue,
				nanoValue
			});

			if (response.data.status !== 'success') {
				console.log('Error buying coins!');
				triggerToast('Transaction Failed!', 'error');
			}

			const transactionId = response.data.transactionId;

			const transaction = {
				validUntil: Date.now() + 5 * 60 * 1000,
				messages: [
					{
						address:
							"UQAkrvQdD6S4rhwbvdUXQiQdBp5XA3nAwyEzQnF2lucRxpsn",
						amount: nanoValue,
					},
				],
			};

			const results = await tonConnectUI.sendTransaction(transaction);

			if (results && results.boc) {
				const response = await axios.post(`${apiUrl}/exchange/update-transaction`, {
					transactionId,
					status: 'success',
					pTapGiven: Math.floor(parsedTonValue * Ptap_Per_Ton),
				});

				if (response.data.status === 'success') {
					setTonValue('');
					triggerToast('Transaction Succesfull!', 'success');
					setBalance(response.data.newBalance);
				}
			}
		} catch (error) {
			console.error('Internal Server Error:', error);
			triggerToast('Error Buying Ptap!', 'error');
		} finally {
			setTonValue('');
		}
	};

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

	/*
	const truncateWalletAddress = (address) => {
		if (!address || address.length <= 10) return address;
		const start = address.slice(0, 5);
		const end = address.slice(-5);
		return `${start}...${end}`;
	};
	*/

	useEffect(() => {
		const updateAddress = async () => {
			if (wallet && wallet.account) {
				const walletAddress = wallet.account.address;
				try {
					await updateWalletAddress(walletAddress);
				} catch (error) {
					console.error("Failed to update wallet address:", error);
				}
			} else {
				await updateWalletAddress();
			}
		};

		updateAddress();
	}, [wallet]);

	useEffect(() => {
		const fetchTonPrice = async () => {
			try {
				const response = await fetch(
					"https://api.binance.com/api/v3/ticker/price?symbol=TONUSDT"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch TON price");
				}
				const data = await response.json();
				setTonPrice(parseFloat(data.price * 200).toFixed(2));
			} catch (err) {
				console.log('Error fetch ton realtime price!', err);
			}
		};

		fetchTonPrice();

		const interval = setInterval(fetchTonPrice, 60000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!projectBalance) {
			fetchProjectsBalance();
		}
	}, [projectBalance])

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

	return (
		<>
			<div className="w-full h-[94vh] flex flex-col justify-start items-center gap-2 relative p-2 pt-5 overflow-hidden">
				<img src={RightPopupEllipse} alt="ellispse" className="absolute -top-5 -right-5" />
				<div
					style={{ backgroundImage: `url(${RectangleBg})` }}
					className="w-full h-[16vh] bg-cover bg-center border border-gray-500 rounded-md overflow-hidden text-white p-2 flex flex-col justify-start items-center gap-1"
				>
					<div className="w-full h-[50%] flex justify-between items-center">
						<div className="w-1/2 h-50% flex flex-col justify-start items-center gap-1">
							<h1 className="h-[25%] w-full text-[18px] font-semibold text-start">
								Avaliable balance
							</h1>
							<p className="h-[25%] w-full flex justify-start items-center gap-1 text-[18px]">
								$ {formatNumberWithSpaces(balance)} <img src={LittleCoin} alt="coin" />
							</p>
						</div>
						<div className="w-1/2 h-full flex justify-center items-center">
							{/* Connect Disconnect Button */}
							<TonConnectButton />
						</div>
					</div>
					<div className="w-full h-[50%] relative text-white flex justify-between items-center">
						{/* Withdraw Button */}
						<div className="relative w-full h-10 flex justify-center items-center">
							<button
								className="w-full bg-gradient-to-t from-darkBlue to-lightBlue rounded-md text-[14px] flex justify-center items-center gap-1 p-2 grayscale"
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
							<img src={CommingSoon} alt="comming_soon" width={50} className="absolute top-0 right-0" />
						</div>
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
					className="relative w-full h-[52vh] bg-center"
					style={{
						backgroundImage: `url(${WalletCardRectangleBg})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "contain",
					}}
				>
					<div className="absolute z-20 w-full h-full px-3 flex flex-col items-center justify-start gap-2">
						<div className="w-full h-[5.5vh] flex justify-center items-end text-white" >
							<button
								onClick={() => {
									setCard('star');
								}}
								className={`w-1/2 h-[5vh] ${card === 'star' ? 'custom-orange-border' : 'custom-grayBottom-border'}`}
							>
								STAR
							</button>
							<button
								onClick={() => {
									setCard('crypto')
								}}
								className={`w-1/2 h-[5vh] ${card === 'crypto' ? 'custom-orange-border' : 'custom-grayBottom-border'}`}
							>
								CRYPTO
							</button>
						</div>
						<div className="w-full h-[80%] text-white">
							{card === 'star' ? (
								<div className="w-full h-full flex flex-col justify-start items-center py-1 gap-1 px-3">
									<form onSubmit={handleStarSubmit} className="w-full h-[12vh] flex flex-col justify-center items-center gap-2">
										<div className="relative w-full h-[2.1rem] rounded-md border-gradient-gray">
											<input
												type="number"
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
									<div className="w-full h-[2vh] flex justify-center items-center gap-1 text-center text-[#727272] text-[12px]">
										200
										<img src={StarCoin} alt="starcoin" />
										= 2$
									</div>
									<div className="w-full h-[2vh] flex justify-center items-center text-center text-white text-[12px]">
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
										<h1>
											or
										</h1>
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
									</div>
									<div className="w-full h-full flex flex-col justify-start items-center gap-2">
										{starsPackages.map((pack, index) => {
											return (
												<div
													onClick={(e) => {
														handleStarSubmit(e, pack.price);
													}}
													key={index}
													className="w-full h-[4vh] bg-[#32324D] rounded-sm flex justify-between items-center px-2 text-[12px] font-thin custom-button"
												>
													<div className="w-[25%] h-full flex justify-start items-center gap-1">
														{pack.price * Ptap_Per_Star}
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
								<div className="w-full h-full flex flex-col justify-start items-center py-1 gap-1 px-3">
									<form onSubmit={handleTonSubmit} className="w-full h-[12vh] flex flex-col justify-center items-center gap-2">
										<div className="relative w-full h-[2.1rem] rounded-md border-gradient-gray">
											<input
												type="number"
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
									<div className="w-full h-[2vh] flex justify-center items-center gap-1 text-center text-[#727272] text-[12px]">
										200
										<img src={TonCoin} alt="starcoin" />
										= 2$
									</div>
									<div className="w-full h-[2vh] flex justify-center items-center text-center text-white text-[12px]">
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
										<h1>
											or
										</h1>
										<img src={PoupHorizontalLine} alt="horizontal_ling" className="w-[40vw]" />
									</div>
									<div className="w-full h-full flex flex-col justify-start items-center gap-2">
										{tonPackages.map((pack, index) => {
											return (
												<div
													onClick={(e) => {
														handleTonSubmit(e, pack.price);
													}}
													key={index}
													className="w-full h-[4vh] bg-[#32324D] rounded-sm flex justify-between items-center px-2 text-[12px] font-thin custom-button"
												>
													<div className="w-[25%] h-full flex justify-start items-center gap-1">
														{pack.price * Ptap_Per_Ton}
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
			</div >
		</>
	);
};

export default Wallet;
