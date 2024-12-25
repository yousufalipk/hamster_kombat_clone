import React, { useState, useEffect } from "react";
import { useUser } from "../../context/index";
import { toast } from "react-toastify";
import HelmetIcon from "../../assets/HelmetIcon.svg";
import { RxCross1 } from "react-icons/rx";
import { FaCopy } from "react-icons/fa";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

const Wallet = () => {
	const { balance, walletAddress, setWalletAddress } = useUser();
	const apiUrl = process.env.REACT_APP_URL;

	// Initialize ton wallet
	const wallet = useTonWallet();


	useEffect(() => {
		const walletAddress = wallet?.account?.address || '';
		console.log('Wallet Address', walletAddress);
	}, [wallet]);



	const truncateWalletAddress = (address) => {
		if (!address || address.length <= 10) return address;
		const start = address.slice(0, 5);
		const end = address.slice(-5);
		return `${start}...${end}`;
	};

	const copyToClipboard = async () => {
		try {
			if (walletAddress) {
				await navigator.clipboard.writeText(walletAddress);
				toast.success("Wallet address copied to clipboard!");
			} else {
				toast.error("No wallet address to copy.");
			}
		} catch (error) {
			console.error("Failed to copy wallet address:", error);
			toast.error("Failed to copy wallet address.");
		}
	};

	const connectWallet = async () => {
		try {

		} catch (error) {
			console.error("Error connecting wallet:", error);
			toast.error(`Error connecting wallet: ${error.message}`);
		}
	};

	const disconnectWallet = async () => {
		try {

		} catch (error) {
			console.error("Error disconnecting wallet:", error);
			toast.error("Failed to disconnect wallet.");
		}
	};

	return (
		<div className="h-[86vh] w-[100vw] flex flex-col items-center relative">
			<div className="w-[100vw] h-[40vh] flex flex-col justify-center items-center z-10">
				<div className="text-white flex flex-col justify-center items-center">
					<p className="mb-2 text-gray-200">Available balance</p>
					<div className="flex gap-2">
						<h1 className="text-xl font-semibold">{balance}</h1>
						<img src={LittleCoin} alt="coin_img" />
					</div>
					<p className="text-gray-500">≈ {balance * 0.00} $</p>
				</div>

				{/* Connect Wallet button */}
				<div className="relative text-white flex mt-8 w-4/5">
					<TonConnectButton className="w-full h-12 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg font-semibold text-sm flex items-center justify-center gap-2" />
				</div>
			</div>

			{/* Wallet address display and copy option */}
			{walletAddress && (
				<div className="w-[80vw] h-[33vh] rounded-2xl bg-[#0d121c] flex flex-col justify-center items-center gap-3 shadow-sm shadow-white">
					<h1 className="text-center text-gray-200 text-xl font-semibold px-4">
						Your TON wallet is connected
					</h1>
					<p className="text-center text-gray-400 text-md">
						You can disconnect or copy wallet address
					</p>
					<div className="w-full h-12 flex justify-between items-center gap-1 px-2">
						<div
							onClick={disconnectWallet}
							className="w-[20%] h-full bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg flex justify-center items-center"
						>
							<RxCross1 size={25} className="opacity-50" />
						</div>
						<div className="relative w-[60%] h-full rounded-lg p-[1px] bg-gradient-to-t from-[#2226FF] to-[#00B2FF]">
							<div className="w-full h-full bg-gradient-to-r from-[#0d121c] to-gray-700 rounded-lg flex justify-center items-center gap-2">
								<img src={HelmetIcon} alt="wallet" width={20} />
								<p
									style={{
										background: "linear-gradient(to right, #2226FF, #00B2FF)",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
										fontSize: "1rem",
										fontWeight: "bold",
									}}
								>
									{truncateWalletAddress(walletAddress)}
								</p>
							</div>
						</div>
						<div
							onClick={copyToClipboard}
							className="w-[20%] h-full bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg flex justify-center items-center"
						>
							<FaCopy size={25} className="opacity-50" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Wallet;
