import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/BackIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";
import Twitter from "../../assets/pages/twitter.svg";
import Telegram from "../../assets/pages/telegram.svg";
import Youtube from "../../assets/pages/Yutube.svg";
import padaIcon from "../../assets/pages/pandaicon.svg"
import arrow from "../../assets/pages/arrow.svg";
import linbottle from '../../assets/token/LineBottle.svg'
import closebutton from "../../assets/token/closebutton.svg"
import { useUser } from "../../context/index";
import { toast } from 'react-toastify';
import Instagram from '../../assets/token/instagram.svg';
import LittleCoin from "../../assets/LittleCoinIcon.svg";

import invite1 from '../../assets/invite/1.svg';
import invite2 from '../../assets/invite/2.svg';
import invite3 from '../../assets/invite/3.svg';


const BottleCap = () => {
	const { claimUserTask, fetchUserTask, userSocialTasks, setUserSocialTasks, userDailyTasks, setUserDailyTasks, balance, fetchInviteFriends, inviteFriends, claimInviteFriendTask } = useUser();

	const [selectedTask, setSelectedTask] = useState(null);
	const [taskPopUp, setTaskPopup] = useState(false);
	const [popupClosing, setPopupClosing] = useState(false);
	const [timeDifference, setTimeDifference] = useState(0);
	const [isPopup, setisPopup] = useState(false)
	const [isClosing, setIsClosing] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [dots, setDots] = useState('');

	const [inviteFriendsPopup, setInviteFriendsPopup] = useState(false);
	const [selectedInviteFriendTask, setSelectedInviteFriendTask] = useState(false);

	const [] = useState();

	useEffect(() => {
		if (inviteFriends.length === 0) {
			fetchInviteFriends();
		}
	}, [])

	const iconMapping = {
		twitter: Twitter,
		telegram: Telegram,
		youtube: Youtube,
		instagram: Instagram,
	};

	const inviteIconMapping = {
		1: invite1,
		2: invite2,
		3: invite3
	};

	const buttonText = {
		twitter: "Follow",
		telegram: "Join",
		youtube: "Watch",
		instagram: "Follow",
	};

	useEffect(() => {
		if (userSocialTasks.length === 0 && userDailyTasks.length === 0) {
			fetchUserTask();
		}
	}, []);

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

	const handleClaimTask = async () => {
		try {
			setButtonLoading(true);
			if (!selectedTask?.claimedStatus) {
				console.log('setting status to true!');
				setSelectedTask((prevTask) => ({
					...prevTask,
					claimedStatus: true,
				}));
				window.open(selectedTask.link, '_blank');
				return;
			}
			const res = await claimUserTask(selectedTask._id);
			if (res.success) {
				console.log('res', res);
				if (res.data.claimedStatus === 'pending') {
					setTimeDifference(30);
				}
				const res2 = await fetchUserTask();
				if (res2.success) {
					const allTasks = res2.data.project.tasks;
					setUserDailyTasks(allTasks.filter(task => task.taskType === "daily"));
					setUserSocialTasks(allTasks.filter(task => task.taskType === "social"));
					const updatedDailyTask = res2.data.tasks.tasks.daily.find((t) => t._id === selectedTask._id);
					const updatedSocialTask = res2.data.tasks.tasks.social.find((t) => t._id === selectedTask._id);
					if (updatedDailyTask) {
						setSelectedTask(updatedDailyTask);
					} else {
						setSelectedTask(updatedSocialTask);
					}
				}
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log("Internal Server Error", error);
			toast.error('Internal Server Error! 2222');
		} finally {
			setButtonLoading(false);
		}
	}

	const handleClaimInviteReward = async (rewardId) => {
		try {
			const res = await claimInviteFriendTask(rewardId);
			if (res.success) {
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log('Internal Server Error', error);
			toast.error('Internal Server Error');
		}
	}

	return (
		<>
			<div className='h-[100vh] w-[100vw] bg-gradient-to-t from-[#1B1B27] to-black overflow-y-scroll overflow-x-hidden'>
				{taskPopUp && selectedTask && (
					<>
						<div
							style={{
								animation: `${popupClosing ? "fadeOut" : "fadeIn"
									} 0.5s ease-in-out forwards`,
							}}
							className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end"
						>
							<div
								style={{
									animation: `${popupClosing ? "closePopup" : "openPopup"
										} 0.5s ease-in-out forwards`,
								}}
							>
								<div className="relative bg-[#06060E] w-[100vw] rounded-t-[30px]  text-white">
									<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
									<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
									<div className="flex flex-col items-center relative">
										<div className="absolute top-3 right-7"
											onClick={() => {
												setPopupClosing(true);
												setTimeout(() => {
													setTaskPopup(false);
													setPopupClosing(false);
												}, 500);
											}}
										>
											<img src={closebutton} alt="" />
										</div>
										<div className="h-1 w-16 bg-[#D9D9D9] rounded-md  mt-2 opacity-70"></div>
										<div className="flex justify-center flex-col items-center gap-2 mt-3">
											<img src={iconMapping[selectedTask.iconType]} alt="icon" />
										</div>
										<div className="text-xl text-white mt-3">
											<p>{selectedTask.title}</p>
										</div>
										<div className="mt-5">
											<button
												onClick={() => {
													window.open(selectedTask.link, '_blank');
												}}
												className="bg-white py-2 rounded-md text-black px-6 font-medium"
											>
												{buttonText[selectedTask.iconType]}
											</button>
										</div>
										{selectedTask.claimedStatus === 'pending' && (
											<div className="text-gray-200 text-sm px-5 text-center mt-4">
												Please wait {timeDifference} minutes for moderation check to claim the prize
											</div>
										)}
										<div className="mt-5">
											<p className="flex justify-center items-center gap-2 border border-[#242434] py-1  rounded-md text-[#FF8F00] px-6 text-lg font-medium">
												<img
													src={LittleCoin}
													alt="Little coin"
													width={25}
													height={25}
												/>
												{selectedTask.reward} PTAP
											</p>
										</div>
										{selectedTask.claimedStatus !== 'claimed' ? (
											<>
												<div className="text-center text-md flex flex-col mt-5 ">
													<img src={linbottle} alt="" />
												</div>
												<div className="flex w-full mt-3 items-center justify-center gap-4 z-40 mb-4 px-3">
													<button
														onClick={() => {
															handleClaimTask(selectedTask);
														}}
														disabled={selectedTask.claimedStatus === 'pending' || buttonLoading}
														className={`w-full py-2 bg-gradient-to-b from-[#00B2FF] to-[#2226FF] text-white font-bold rounded-md ${selectedTask.claimedStatus === 'pending' ? 'filter grayscale' : ''}`}
													>
														{buttonLoading ? (
															<span className="h-6 font-bold">
																{dots}
															</span>) : 'Check'}
													</button>
												</div>
											</>
										) : (
											<div className="p-5"></div>
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{inviteFriendsPopup && selectedInviteFriendTask && (
					<>
						<div
							style={{
								animation: `${popupClosing ? "fadeOut" : "fadeIn"
									} 0.5s ease-in-out forwards`,
							}}
							className="popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end"
						>
							<div
								style={{
									animation: `${popupClosing ? "closePopup" : "openPopup"
										} 0.5s ease-in-out forwards`,
								}}
							>
								<div className="relative bg-[#06060E] w-[100vw] rounded-t-[30px]  text-white">
									<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
									<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
									<div className="flex flex-col items-center relative">
										<div className="absolute top-3 right-7"
											onClick={() => {
												setPopupClosing(true);
												setTimeout(() => {
													setInviteFriendsPopup(false);
													setPopupClosing(false);
												}, 500);
											}}
										>
											<img src={closebutton} alt="" />
										</div>
										<div className="h-1 w-16 bg-[#D9D9D9] rounded-md  mt-2 opacity-70"></div>
										<div className="flex justify-center flex-col items-center gap-2 mt-3">
											<img src={inviteIconMapping[selectedInviteFriendTask.id]} alt="icon" />
										</div>
										<div className="text-xl text-white mt-3">
											<p>{selectedInviteFriendTask.title}</p>
										</div>
										<div className="mt-5">
											<p className="flex justify-center items-center gap-2 border border-[#242434] py-1  rounded-md text-[#FF8F00] px-6 text-lg font-medium">
												<img
													src={LittleCoin}
													alt="Little coin"
													width={25}
													height={25}
												/>
												{selectedInviteFriendTask.reward} PTAP
											</p>
										</div>
										{!selectedInviteFriendTask.claimed ? (
											<>
												<div className="text-center text-md flex flex-col mt-5 ">
													<img src={linbottle} alt="" />
												</div>
												<div className="flex w-full mt-3 items-center justify-center gap-4 z-40 mb-4 px-3">
													<button
														onClick={() => {
															handleClaimInviteReward(selectedInviteFriendTask.id);
														}}
														disabled={buttonLoading}
														className={`w-full py-2 bg-gradient-to-b from-[#00B2FF] to-[#2226FF] text-white font-bold rounded-md ${selectedInviteFriendTask.claimed ? 'filter grayscale' : ''}`}
													>
														{buttonLoading ? (
															<span className="h-6 font-bold">
																{dots}
															</span>) : 'Check'}
													</button>
												</div>
											</>
										) : (
											<div className="p-5"></div>
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{/* Upper Card */}
				<div className='relative h-[30vh] py-5'>
					<div className=' w-full px-12 flex flex-col justify-center items-center relative'>
						<div className='flex items-center justify-center gap-2'>
							<div className=''>
								<img
									src={BigCoin}
									alt='BigCoin-Icon'
								/>
							</div>
							<div className='text-[#FFF] text-[24px] font-medium'>
								<p>{balance}</p>
							</div>
						</div>
						<div className='flex pt-3'>
							<div className='mx-auto bg-[#0199FF] w-20 p-1 rounded-full  shadow-[0_0_20px_0px_rgba(0,0,0,0.2)] shadow-[#0199FF]'>
								<img
									src={padaIcon}
									alt='Panda-Pic'
								/>
							</div>
						</div>
						<div className="text-white mt-3 text-lg font-semibold">
							<p>Complete tasks and Earn more!</p>
						</div>
					</div>
				</div>

				{/* Tasks Section */}
				<div className="h-[80vh] relative z-10 border-6 px-4 pt-5 border-t-2 mt-5 rounded-tl-[30px] rounded-tr-[30px] border-[#0099FF] shadow-[#0099ff92]  shadow-lg">
					{/* Heading 1 */}
					<div>
						<p className="text-[#9595A9] text-lg ">Daily Task</p>
					</div>
					{/* Pandatop News Cards */}
					{userDailyTasks.length > 0 ? (
						<div>
							{userDailyTasks.map((task, index) => {
								return (
									<div
										onClick={() => {
											setTaskPopup(true);
											setSelectedTask(task);
											if (task.claimedStatus === 'pending') {
												const currentTime = new Date();
												const timeDifference = (currentTime - new Date(task.claimedDate)) / (1000 * 60);
												const remaningMin = 30 - Math.floor(timeDifference);
												if (remaningMin <= 0) {
													setSelectedTask((prevTask) => ({
														...prevTask,
														claimedStatus: true,
													}));
												}
												setTimeDifference(30 - Math.floor(timeDifference));
											}
										}}
										key={index}
										className="bg-[#1B1B27] text-white flex justify-between items-center border border-[#0099FF] rounded-[14px] gap-4 py-2 px-3 my-3 "
									>
										<div className="flex gap-3 justify-center items-center py-1 w-full">
											{/* Icon */}
											<div className="flex flex-shrink-0 ">
												<img src={iconMapping[task.iconType]} alt="icon" width={40} height={40} />
											</div>
											{/* Name */}
											<div className="flex justify-between items-center w-full">
												<div>
													<div className="flex text-md">{task.title}</div>
													<div className=" text-[#FF8F00] gap-1 rounded-md text-lg flex items-center ">
														<img src={BigCoin} alt="" className="h-4 w-5" />
														<span className="text-sm">+{task.reward}</span>
													</div>
												</div>
												<div>
													<img src={arrow} alt="arrow" width={15} />
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="h-[30vh] w-full flex justify-center items-center">
							No Daily Task's
						</div>
					)}
					{/* Heading 2 */}
					<div>
						<p className="text-[#9595A9] text-lg ">Social Media</p>
					</div>
					{/* Pandatop News Cards */}
					{userSocialTasks.length > 0 ? (
						<div>
							{userSocialTasks.map((task, index) => {
								return (
									<div
										onClick={() => {
											setTaskPopup(true);
											setSelectedTask(task);
											if (task.claimedStatus === 'pending') {
												const currentTime = new Date();
												const timeDifference = (currentTime - new Date(task.claimedDate)) / (1000 * 60);
												const remaningMin = 30 - Math.floor(timeDifference);
												if (remaningMin <= 0) {
													setSelectedTask((prevTask) => ({
														...prevTask,
														claimedStatus: true,
													}));
												}
												setTimeDifference(30 - Math.floor(timeDifference));
											}
										}}
										key={index}
										className="bg-[#1B1B27] text-white   flex justify-between items-center border border-[#0099FF] rounded-[14px] gap-4 py-2 px-3 my-3 "
									>
										<div className="flex gap-3 justify-center items-center py-1 w-full">
											{/* Icon */}
											<div className="flex flex-shrink-0 ">
												<img src={iconMapping[task.iconType]} alt="icon" width={40} height={40} />
											</div>
											{/* Name */}
											<div className="flex justify-between items-center w-full">
												<div>
													<div className="flex text-md">{task.title}</div>
													<div className=" text-[#FF8F00] gap-1 rounded-md text-lg flex items-center ">
														<img src={BigCoin} alt="" className="h-4 w-5" />
														<span className="text-sm">+{task.reward}</span>
													</div>
												</div>
												<div>
													<img src={arrow} alt="arrow" width={15} />
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="h-[30vh] w-full flex justify-center items-center">
							No Social Task's
						</div>
					)}

					{inviteFriends && (
						<>
							{inviteFriends.map((task, index) => {
								return (
									<div
										onClick={() => {
											setSelectedInviteFriendTask(task);
											setInviteFriendsPopup(true);
										}}
										key={index}
										className="bg-[#1B1B27] text-white   flex justify-between items-center border border-[#0099FF] rounded-[14px] gap-4 py-2 px-3 my-3 "
									>
										<div className="flex gap-3 justify-center items-center py-1 w-full">
											{/* Icon */}
											<div className="flex flex-shrink-0 ">
												<img src={inviteIconMapping[task.id]} alt="icon" width={40} height={40} />
											</div>
											{/* Name */}
											<div className="flex justify-between items-center w-full">
												<div>
													<div className="flex text-md">{task.title}</div>
													<div className=" text-[#FF8F00] gap-1 rounded-md text-lg flex items-center ">
														<img src={BigCoin} alt="" className="h-4 w-5" />
														<span className="text-sm">+{task.reward}</span>
													</div>
												</div>
												<div>
													<img src={arrow} alt="arrow" width={15} />
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
		</>
	);
};
export default BottleCap;