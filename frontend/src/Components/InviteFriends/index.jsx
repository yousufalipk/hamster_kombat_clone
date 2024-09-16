import React from "react";
import BackIcon from "../../assets/BackIcon.svg";
import Coin from "../../assets/BigCoinIcon.svg";
import FriendsPic from "../../assets/FriendsPic.png";
import GiftBox from "../../assets/GiftBox.png";
import Friend1 from "../../assets/Friend1.svg";
import Friend2 from "../../assets/Friend2.svg";
import Invite from "../../assets/InviteIcon.svg";
import Copy from "../../assets/CopyIcon.svg";
import Footer from "../Footer";

const InviteFriends = () => {
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
	];
	return (
		<>
			<div className='overflow-hidden'>
				<div className='relative'>
					<div className='absolute -inset-3 bg-[#23a7ff] min-h-[40%] blur rounded-[50px]'></div>
					<div className='bg-[#0C0C0C] min-h-[33vh] pt-5 px-5 relative rounded-br-3xl rounded-bl-3xl'>
						<div className='bg-[#060611] p-4 relative'>
							<div className='flex items-center gap-4'>
								<div className=''>
									<img
										src={BackIcon}
										alt='Back-Icon'
									/>
								</div>
								<div className='text-[#FFF] text-[18px] font-semibold'>
									PandaTap
								</div>
							</div>
							<div className='pt-10'>
								<div className='flex flex-col items-center'>
									<div className='bg-[#222222] w-fit px-5 pt-4 -mt-1 rounded-[15px] mx-auto'>
										<div className='flex items-center gap-2'>
											<div className=''>
												<img
													src={FriendsPic}
													alt='BigCoin-Icon'
												/>
											</div>
										</div>
									</div>
									<div className='text-[#FFF] text-[28px] font-semibold'>
										<p>Invite Friends</p>
									</div>
									<div className='text-[#FFF] text-sm font-normal'>
										<p>You and your friend will receive bonuses</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='bg-[#1B1B27] px-4 pt-12 -mt-4'>
					<div className=''>
						<div className=''>
							{data.map((values) => {
								const { id, img1, img2, text, description } = values;
								return (
									<div
										key={id}
										className='bg-[#272a2f] text-[#FFF] text-base font-medium flex justify-between items-center rounded-[14px] gap-4 p-4 my-3'>
										<div className=''>
											<div className='flex flex-shrink-0'>{text}</div>
											<div className='flex items-center gap-1 py-2'>
												<div className=''>
													<img
														className='w-[17px]'
														src={img1}
														alt='Coin-Icon'
													/>
												</div>
												<div className='-mt-1'>{description}</div>
											</div>
										</div>
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
					<div className='bg-[#272a2f] p-4 text-[#FFF] text-lg font-semibold'>
						<div className=''>
							<p>Friends</p>
						</div>
						<div className=''>
							{friendsData.map((values) => {
								const { id, img1, img2, name, coins } = values;
								return (
									<div
										key={id}
										className='bg-[#1B1B27] text-[#FFF] text-base font-medium flex justify-between items-center rounded-[14px] gap-4 p-4 my-3'>
										<div className=''>
											<div className='flex items-center gap-4 py-2'>
												<div className='w-[18px] text-xs rounded-full border flex items-center pl-[4px] '>
													<p>{id}</p>
												</div>
												<div className=''>
													<img
														className='w-[50px]'
														src={img1}
														alt='Coin-Icon'
													/>
												</div>
												<div className=''>
													<div className=''>{name}</div>
													<div className='-mt-1 flex items-center gap-1'>
														<div className=''>
															<img
																className='w-[15px]'
																src={img2}
																alt='Coin-Icon'
															/>
														</div>
														<div className=''>{coins}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className='flex justify-between text-[#FFF] text-base font-semibold py-4'>
						<div className='w-[50%] rounded-[14px] text-center button-grad'>
							<div className='flex items-center gap-3 p-6'>
								<div className=''>
									<img
										src={Invite}
										alt=''
									/>
								</div>
								<div className=''>Invite a Friend</div>
							</div>
						</div>
						<div className='w-[45%] rounded-[14px] text-center button-grad'>
							<div className='flex items-center gap-3 p-6'>
								<div className=''>
									<img
										src={Copy}
										alt=''
									/>
								</div>
								<div className=''>Copy Link</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className=''>
				<Footer />
			</div>
		</>
	);
};

export default InviteFriends;
