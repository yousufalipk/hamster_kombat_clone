import React, { useState, useEffect } from "react";
import { useUser } from "../../context/index";
import { toast } from "react-toastify";
import HelmetIcon from "../../assets/HelmetIcon.svg";
import { RxCross1 } from "react-icons/rx";
import { FaCopy } from "react-icons/fa";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import { TonConnect } from "@tonconnect/sdk";

const Wallet = () => {
	const { balance } = useUser();
	const [walletConnected, setWalletConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState(null);

	const tonConnect = new TonConnect();

	useEffect(() => {
		// Restore wallet connection if already connected
		const restoreConnection = async () => {
			try {
				const session = tonConnect.restoreConnection();
				if (session) {
					const address = session.account?.address || null;
					setWalletAddress(address);
					setWalletConnected(!!address);
				}
			} catch (error) {
				console.error("Error restoring connection:", error);
				toast.error("Failed to restore wallet connection.");
			}
		};

		restoreConnection();

		// Listen for connection status changes
		const handleStatusChange = (status) => {
			if (status === "connected") {
				const address = tonConnect.wallet?.account?.address || null;
				setWalletAddress(address);
				setWalletConnected(!!address);
			} else {
				setWalletAddress(null);
				setWalletConnected(false);
			}
		};

		tonConnect.onStatusChange(handleStatusChange);

		// Cleanup listener on unmount
		return () => tonConnect.offStatusChange(handleStatusChange);
	}, [tonConnect]);

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
			await tonConnect.connectWallet();
			const session = tonConnect.wallet?.account;
			if (session) {
				setWalletAddress(session.address);
				setWalletConnected(true);
				toast.success("Wallet connected successfully!");
			} else {
				toast.error("Failed to retrieve wallet address.");
			}
		} catch (error) {
			console.error("Error connecting wallet:", error);
			toast.error(`Error connecting wallet: ${error.message}`);
		}
	};

	const disconnectWallet = async () => {
		try {
			if (!walletConnected) {
				toast.error("Wallet is not connected. Nothing to disconnect.");
				return;
			}

			await tonConnect.disconnect();
			setWalletConnected(false);
			setWalletAddress(null);
			toast.success("Wallet disconnected successfully!");
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

				<div className="relative text-white flex mt-8 w-4/5">
					<button
						className="w-full h-12 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg font-semibold text-sm flex items-center justify-center gap-2 text-white"
						onClick={walletConnected ? disconnectWallet : connectWallet}
					>
						{walletConnected ? "Disconnect Wallet" : "Connect Wallet"}
					</button>
				</div>
			</div>

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
