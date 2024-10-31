import React, { useState } from "react";
import { toast } from 'react-toastify';
import Coin from "../../assets/BigCoinIcon.svg";
import FriendsPic from "../../assets/FriendsPic.png";
import GiftBox from "../../assets/GiftBox.png";
import Friend1 from "../../assets/Friend1.svg";
import Friend2 from "../../assets/Friend2.svg";
import Invite from "../../assets/InviteIcon.svg";
import Copy from "../../assets/CopyIcon.svg";
import { useUser } from '../../context/index';
import { Link } from 'react-router-dom';

const InviteFriends = () => {
	const { telegramId, balance } = useUser();

	const copyToClipboard = async () => {
		const reflink = `https://t.me/pandatap_mini_bot/pandatap?startapp=${telegramId}`;

		const textArea = document.createElement("textarea");
		textArea.value = reflink;
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand("copy");
			toast.success('Copied!');
		} catch (err) {
			toast.error('Failed to copy!');
			console.error("Failed to copy", err);
		}
		document.body.removeChild(textArea);
	};


	const data = [
		{
			id: 1,
			img1: Coin,
			img2: GiftBox,
			text: "Invite a Friends",
			description: "+5,000 for you and your friend",
		},
		{
			id: 2,
			img1: Coin,
			img2: GiftBox,
			text: "Invite a Friend with Telegram Premium",
			description: "+5,000 for you and your friend",
		},
	];

	const friendsData = [
		{
			id: 1,
			img1: Friend1,
			img2: Coin,
			name: "Jane Cooper",
			coins: "+5,000",
		},
		{
			id: 2,
			img1: Friend2,
			img2: Coin,
			name: "Esther Howard",
			coins: "+5,000",
		},
		{
			id: 3,
			img1: Friend2,
			img2: Coin,
			name: "Esther Howard",
			coins: "+5,000",
		},
		{
			id: 4,
			img1: Friend2,
			img2: Coin,
			name: "Esther Howard",
			coins: "+5,000",
		},
	];
	return (
		<>
			<div className='relative h-[86vh] w-[100vw] overflow-y-scroll overflow-x-hidden'>
				<div className='relative h-[30vh]'>
					<div className="absolute -inset-1 bg-[#23a7ff] rounded-[35px]"></div>
					<div className="absolute -inset-1 bg-[#23a7ff] blur rounded-[35px]"></div>
					{/* header invite Friends */}
					<div className='bg-[#060611] h-[30vh] p-4 relative rounded-b-[26px]'>
						<div className='pt-7'>
							<div className='flex flex-col items-center'>
								<div className='bg-[#222222] w-fit px-5 pt-4 -mt-1 rounded-[15px] mx-auto'>
									<div className='flex items-center gap-2'>
										<div className=''>
											<img
												src={FriendsPic}
												alt='BigCoin-Icon'
												width="95"
											/>
										</div>
									</div>
								</div>
								<div className='text-[#FFF] text-[25px] font-semibold pt-2'>
									<p>Invite Friends</p>
								</div>
								<div className='text-[#FFF] text-sm font-normal'>
									<p>You and your friend will receive bonuses</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className='h-[56vh] px-4 pt-4 flex flex-col mt-2'>

					<div>

						{/* Invite Friends */}
						<div className="h-[25vh]">
							<div className="flex flex-col gap-2">
								{data.map((values) => {
									const { id, img1, img2, text, description } = values;
									return (
										<div
											key={id}
											className='bg-[#272A2F] text-[#FFF] text-base font-medium flex justify-between items-center rounded-[14px] gap-4 p-2 px-3'>
											<div>
												{/* Heading */}
												<div className='flex flex-shrink-0'>{text}</div>
												{/* Img with description */}
												<div className='flex items-center gap-1 py-1'>
													<div>
														<img
															width="15"
															src={img1}
															alt='Coin-Icon'
														/>
													</div>
													<div className='text-[10px]'>{description}</div>
												</div>

											</div>
											{/* Gift Box Img */}
											<div className='flex flex-shrink-0'>
												<img
													src={img2}
													alt='Gift-Icons'
												/>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* List of Friends */}
						<div className='bg-[#1B1B27] p-4 text-[#FFF] text-lg font-semibold rounded-[14px] mt-4'>
							{/* Title */}
							<div className='text-[15px]'>
								<p>Friends</p>
							</div>

							{/* Friends List Cards */}
							{friendsData.map((values) => {
								const { id, img1, img2, name, coins } = values;
								return (
									<div
										key={id}
										className='bg-[#12121C] text-white text-base font-medium flex justify-between items-center rounded-[14px] gap-4 py-1 px-3 my-2'
									>
										<div className='flex items-center gap-4 py-1'>
											{/* Sr.No */}
											<div className='w-[18px] text-xs rounded-full border border-[#21212D] flex items-center justify-center'>
												<p>{id}</p>
											</div>

											{/* Display Picture */}
											<div>
												<img
													width="40"
													src={img1}
													alt='Coin-Icon'
												/>
											</div>
											{/* Name & Reward */}
											<div className=''>
												<div className='text-[15px]'>{name}</div>
												<div className='-mt-1 flex items-center gap-1'>
													<div className=''>
														<img
															width="13"
															src={img2}
															alt='Coin-Icon'
														/>
													</div>
													<div className='text-[12px]'>{coins}</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Invite a Friend */}
					<div className="sticky bottom-0 w-screen">
						<div className='flex gap-2 justify-start items-center text-[#FFF] text-base font-semibold'>
							{/* Invite a friend */}
							<div className='w-[57%] rounded-[10px] text-center bg-gradient-to-t from-[#2226FF] to-[#00B2FF]'>
								<div className='flex items-center gap-3 p-2 justify-center'>
									<div className=''>
										<img
											src={Invite}
											alt=''
										/>
									</div>
									<Link
										to={`https://t.me/share/url?url=t.me/pandatap_mini_bot/pandatap?startapp=${telegramId}&text=Hey  I just made ${balance} $MFI Points on Panda Tap To Earn Game ! The airdrop is definitely going to be huge ! Join via my referral link and we both can get a headstart.`}
										className='text-md font-semibold'
									>
										Invite a Friend
									</Link>
								</div>
							</div>
							{/* Copy Link */}
							<div className='w-[32%] rounded-[14px] text-center bg-gradient-to-t from-[#2226FF] to-[#00B2FF]'>
								<div className='flex items-center gap-1 p-2 justify-center'>
									<img
										src={Copy}
										alt=''
										width="16"
									/>
									<div
										onClick={() => copyToClipboard()}
										className='text-md font-semibold'>Copy Link</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InviteFriends;
