import React, { useState } from "react";
import { toast } from 'react-toastify';
import Coin from "../../assets/BigCoinIcon.svg";
import FriendsPic from "../../assets/FriendsPic.png";
import GiftBox from "../../assets/GiftBox.png";
import Friend1 from "../../assets/Friend1.svg";
import Invite from "../../assets/InviteIcon.svg";
import Copy from "../../assets/CopyIcon.svg";
import DomeProfilePic from "../../assets/profile.png";
import { useUser } from '../../context/index';
import { Link } from 'react-router-dom';

const InviteFriends = () => {
	const { telegramId, username, referrals } = useUser();

	const formatBalanceWithCommas = (balance) => {
		return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const copyToClipboard = async () => {
		const reflink = `https://t.me/pandatapbot/startapp?startapp=${telegramId}`;

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
			description: "+10,000 for you and your friend",
		},
		{
			id: 2,
			img1: Coin,
			img2: GiftBox,
			text: "Invite a Friend with Telegram Premium",
			description: "+25,000 for you and your friend",
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

							{referrals.length === 0 ? (
								<>
									<h1
										className="text-xs text-center my-5 h-[10vh]"
									>
										No referral yet
									</h1>
								</>
							) : (
								<>
									{/* Friends List Cards */}
									{referrals.map((user, index) => {
										const username = `${user.firstName || ''} ${user.lastName || ''}`;
										return (
											<div
												key={index}
												className='bg-[#12121C] text-white text-base font-medium flex justify-between items-center rounded-[14px] gap-4 py-1 px-3 my-2'
											>
												<div className='flex items-center gap-4 py-1'>
													{/* Sr.No */}
													<div className='w-[18px] text-xs rounded-full border border-[#21212D] flex items-center justify-center'>
														<p>{index + 1}</p>
													</div>

													{/* Display Picture */}
													{user.profilePic === 'not set' ? (
														<>
															<div>
																<img
																	width="40"
																	src={DomeProfilePic}
																	alt='Coin-Icon'
																	className="rounded-full"
																/>
															</div>
														</>
													) : (
														<>
															<div>
																<img
																	width="40"
																	src={user.profilePic}
																	alt='Coin-Icon'
																	className="rounded-full"
																/>
															</div>
														</>
													)}
													{/* Name & Reward */}
													<div className=''>
														<div className='text-[15px]'>{username}</div>
														<div className='-mt-1 flex items-center gap-1'>
															<div className=''>
																<img
																	width="13"
																	src={Coin}
																	alt='Coin-Icon'
																/>
															</div>
															<div className='text-[12px]'>+{formatBalanceWithCommas(user.reward)}</div>
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</>
							)}

						</div>
					</div>

					{/* Invite a Friend */}
					<div className="sticky bottom-0 w-screen">
						<div className='flex gap-2 justify-start items-center text-[#FFF] text-base font-semibold'>
							{/* Invite a friend */}
							<div className='w-[57%] rounded-2xl border border-gray-500 text-center bg-gradient-to-t from-[#2226FF] to-[#00B2FF]'>
								<div className='h-[7vh] flex items-center gap-3 p-2 justify-center'>
									<div className=''>
										<img
											src={Invite}
											alt=''
										/>
									</div>
									<Link
										to={`https://t.me/share/url?url=t.me/pandatapbot/startapp?startapp=${telegramId}&text=:tada: Welcome ${username} to PandaTap! :panda_face: Ready to see how high you can climb? Tap away and watch your fortunes grow! Step into the world of PandaTap and begin your journey from the ground up to the prestigious Founder level! Upgrade your cards and level up by tapping and completing various tasks within the app. And remember, adventures are best with friends. :handshake: Invite your friends: more friends — more profit! :money_with_wings:`}
										className='text-md font-semibold'
									>
										Invite a Friend
									</Link>
								</div>
							</div>
							{/* Copy Link */}
							<div className='w-[32%] rounded-2xl border border-gray-500 text-center bg-gradient-to-t from-[#2226FF] to-[#00B2FF]'>
								<div className='h-[7vh] flex items-center gap-1 p-2 justify-center'>
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
