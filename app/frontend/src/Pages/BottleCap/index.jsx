import React, { useEffect, useState } from "react";
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

import LeftPopupEllipse from '../../assets/optimizedImages/popup/leftEllipse.webp';
import RightPopupEllipse from '../../assets/optimizedImages/popup/rightEllipse.webp';

import { Link } from 'react-router-dom';

import CustomLoader from '../../Components/Loader/Loader';


const BottleCap = () => {
	const { telegramId, claimUserTask, fetchUserTask, userSocialTasks, userDailyTasks, userPatnerTask, balance, inviteFriends, claimInviteFriendTask, username, setBalance, formatBalance, fetchInviteFriends } = useUser();

	const [selectedTask, setSelectedTask] = useState(null);
	const [taskPopUp, setTaskPopup] = useState(false);
	const [popupClosing, setPopupClosing] = useState(false);
	const [timeDifference, setTimeDifference] = useState(0);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [dots, setDots] = useState('');

	const [inviteFriendsPopup, setInviteFriendsPopup] = useState(false);
	const [selectedInviteFriendTask, setSelectedInviteFriendTask] = useState(false);

	const [tasksLoader, setTaskLoader] = useState(false);

	const iconMapping = {
		twitter: Twitter,
		telegram: Telegram,
		youtube: Youtube,
		instagram: Instagram,
	};

	const inviteIconMapping = {
		1: invite1,
		2: invite2,
		3: invite3,
		4: invite3,
		5: invite3,
		6: invite3
	};

	const buttonText = {
		twitter: "Follow",
		telegram: "Join",
		youtube: "Watch",
		instagram: "Follow",
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

	useEffect(() => {
		console.log('Selected Task', selectedTask);
	}, [selectedTask])

	const handleClaimTask = async () => {
		try {
			setButtonLoading(true);
			if (!selectedTask?.claimedStatus) {
				setSelectedTask((prevTask) => ({
					...prevTask,
					claimedStatus: true,
				}));
				if (getFirstWord(selectedTask.title) === 'quote') {
					const newLink = generateTwitterLink(selectedTask.link, username);
					window.open(newLink, '_blank');
				} else {
					window.open(selectedTask.link, '_blank');
				}
				return;
			}
			const res = await claimUserTask(selectedTask._id, selectedTask.taskType);
			if (res.success) {
				if (res.data.claimedStatus === 'pending') {
					setTimeDifference(30);
				}
				const res2 = await fetchUserTask();
				if (res2.success) {
					const updatedDailyTask = res2.daily.find((t) => t._id === selectedTask._id);
					const updatedSocialTask = res2.social.find((t) => t._id === selectedTask._id);
					const updatedPatnerTask = res2.partner.find((t) => t._id === selectedTask._id);

					if (updatedDailyTask) {
						setSelectedTask(updatedDailyTask);
					}

					if (updatedSocialTask) {
						setSelectedTask(updatedSocialTask);
					}

					if (updatedPatnerTask) {
						setSelectedTask(updatedPatnerTask);
					}
				}
				setBalance((prevBalance) => prevBalance + selectedTask.reward);
				toast.success(res.mess);
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log("Internal Server Error", error);
			toast.error('Internal Server Error!');
		} finally {
			setButtonLoading(false);
		}
	}

	const handleClaimInviteReward = async (rewardId) => {
		try {
			setButtonLoading(true);
			const res = await claimInviteFriendTask(rewardId);
			if (res.success) {
				toast.success(res.mess);
				await fetchInviteFriends();
				setBalance((prevBalance) => prevBalance + selectedInviteFriendTask.reward);
				setSelectedInviteFriendTask((prevTask) => ({
					...prevTask,
					claimed: true,
				}));
			} else {
				toast.error(res.mess);
			}
		} catch (error) {
			console.log('Internal Server Error', error);
			toast.error('Internal Server Error');
		} finally {
			setButtonLoading(false);
		}
	}

	const getFirstWord = (inputLine) => {
		if (typeof inputLine !== "string") {
			inputLine = String(inputLine);
		}
		const firstWord = inputLine.split(' ')[0];
		return firstWord.toLowerCase();
	}

	if (tasksLoader) {
		return (
			<>
				<div className="h-[33vh] w-full flex justify-center items-center">
					<CustomLoader size={200} />
				</div>
			</>
		)
	}

	const generateTwitterLink = (baseLink, username) => {
		const url = new URL(baseLink);
		const sharedText = url.searchParams.get('text');

		const updatedText = `${username} ${sharedText}`;
		url.searchParams.set('text', updatedText);

		return url.toString();
	}

	return (
		<>
			<div className='h-[100vh] w-[100vw] bg-gradient-to-t from-[#1B1B27] to-black '>
				<div className="h-[90vh] w-[100vw] overflow-y-scroll overflow-x-hidden">
					{taskPopUp && selectedTask && (
						<>
							<div
								onClick={() => {
									setPopupClosing(true);
									setTimeout(() => {
										setTaskPopup(false);
										setPopupClosing(false);
									}, 500);
								}}
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

									<div
										onClick={(e) => e.stopPropagation()}
										className="popup-content">
										<div className="relative bg-[#06060E] w-[100vw] rounded-t-[30px]  text-white">
											<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
											<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>

											<div className="popup-main flex flex-col items-center relative">
												{/* Left top ellipse */}
												<div className="-left-10 -top-20 w-52 h-52 absolute">
													<img src={LeftPopupEllipse} alt="popup-ellipse" />
												</div>
												{/* Right bottom ellipse */}
												<div className="-right-10 -bottom-5 w-52 h-52 absolute">
													<img src={RightPopupEllipse} alt="popup-ellipse" />
												</div>

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
													<img
														src={iconMapping[selectedTask.iconType]}
														alt="icon"
														style={{
															filter: "drop-shadow(0px 0px 15px #fff)",
														}}
													/>
												</div>
												<div className="text-xl text-white mt-3">
													<p>{selectedTask.title}</p>
												</div>
												<div className="mt-5">
													<button
														onClick={() => {
															if (getFirstWord(selectedTask.title) === 'quote') {
																const newLink = generateTwitterLink(selectedTask.link, username);
																window.open(newLink, '_blank');
															} else {
																window.open(selectedTask.link, '_blank');
															}
														}}
														className="bg-white py-2 rounded-md text-black px-6 font-medium"
													>
														{getFirstWord(selectedTask.title) === 'subscribe' || getFirstWord(selectedTask.title) === 'quote' || getFirstWord(selectedTask.title) === 'retweet' ? (
															getFirstWord(selectedTask.title) === 'subscribe' ? (
																<>{"Subscribe"}</>
															) : (
																getFirstWord(selectedTask.title) === 'retweet' ? (
																	<>
																		{"Retweet"}
																	</>
																) : (
																	<>
																		{"Quote"}
																	</>
																)
															)
														) : (
															<>{buttonText[selectedTask.iconType]}</>
														)}
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
														{selectedTask.reward.toLocaleString()}
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
																className={`w-full h-10 py-2 bg-gradient-to-b from-[#00B2FF] to-[#2226FF] text-white font-bold rounded-md ${selectedTask.claimedStatus === 'pending' ? 'filter grayscale' : ''}`}
															>
																{buttonLoading ? (
																	<span className="flex justify-center items-center text-5xl font-bold w-full">
																		<p className="absolute -mt-6 w-full">
																			{dots}
																		</p>
																	</span>
																) : 'Check'}
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
							</div>
						</>
					)}

					{inviteFriendsPopup && selectedInviteFriendTask && (
						<>
							<div
								onClick={() => {
									setPopupClosing(true);
									setTimeout(() => {
										setInviteFriendsPopup(false);
										setPopupClosing(false);
									}, 500);
								}}
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
										<div
											onClick={(e) => e.stopPropagation()}
											className="popup-main"
										>
											<div className="flex flex-col items-center relative">

												{/* Left top ellipse */}
												<div className="-left-10 -top-20 w-52 h-52 absolute">
													<img src={LeftPopupEllipse} alt="popup-ellipse" />
												</div>
												{/* Right bottom ellipse */}
												<div className="-right-10 -bottom-5 w-52 h-52 absolute">
													<img src={RightPopupEllipse} alt="popup-ellipse" />
												</div>

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
													<img
														src={inviteIconMapping[selectedInviteFriendTask.id]}
														alt="icon"
														style={{
															filter: "drop-shadow(0px 0px 15px #fff)",
														}}
													/>
												</div>
												<div className="text-xl text-white mt-3">
													<p>{selectedInviteFriendTask.title}</p>
												</div>
												<div className="mt-5">
													<Link
														to={`https://t.me/share/url?url=t.me/pandatapbot/startapp?startapp=${telegramId}&text=%F0%9F%8E%89%20Welcome%20${username}%20to%20PandaTap!%20%F0%9F%90%BC%20Ready%20to%20see%20how%20high%20you%20can%20climb%3F%20Tap%20away%20and%20watch%20your%20fortunes%20grow!%20Step%20into%20the%20world%20of%20PandaTap%20and%20begin%20your%20journey%20from%20the%20ground%20up%20to%20the%20prestigious%20Founder%20level!%20Upgrade%20your%20cards%20and%20level%20up%20by%20tapping%20and%20completing%20various%20tasks%20within%20the%20app.%20And%20remember%2C%20adventures%20are%20best%20with%20friends.%20%F0%9F%99%8C%20Invite%20your%20friends%3A%20more%20friends%20%E2%80%94%20more%20profit!%20%F0%9F%92%B8`}
														className="bg-white py-2 rounded-md text-black px-6 font-medium"
													>
														Invite Friend
													</Link>
												</div>
												<div className="mt-5">
													<p className="flex justify-center items-center gap-2 border border-[#242434] py-1  rounded-md text-[#FF8F00] px-6 text-lg font-medium">
														<img
															src={LittleCoin}
															alt="Little coin"
															width={25}
															height={25}
														/>
														{selectedInviteFriendTask.reward.toLocaleString()}
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
																className={`w-full py-2 h-10 bg-gradient-to-b from-[#00B2FF] to-[#2226FF] text-white font-bold rounded-md ${selectedInviteFriendTask.claimed ? 'filter grayscale' : ''}`}
															>
																{buttonLoading ? (
																	<span className="flex justify-center items-center text-5xl font-bold w-full">
																		<p className="absolute -mt-6 w-full">
																			{dots}
																		</p>
																	</span>
																) : 'Check'}
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
									<p>{formatBalance(balance)}</p>
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
							<div className="text-white mt-3 text-lg font-semibold text-center">
								<p>Complete tasks and Earn more!</p>
							</div>
						</div>
					</div>

					{/* Tasks Section */}
					<div className="h-full relative z-10 border-6 px-4 pt-5 border-t-2 mt-5 rounded-tl-[30px] rounded-tr-[30px] border-[#0099FF] shadow-[#0099ff92]">
						{/* Heading 1 */}
						<div>
							<p className="text-[#9595A9] text-lg ">Daily Task</p>
						</div>
						{/* Pandatop News Cards */}
						{userDailyTasks?.length > 0 ? (
							<div>
								{userDailyTasks.sort((a, b) => a.priority - b.priority).map((task, index) => {
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
											className={`bg-[#1B1B27] text-white flex justify-between items-center border ${task.claimedStatus ? `border-[#5dd15f] shadow-[#5dd15f] shadow-md` : `border-[#0099FF] shadow-[#0199FF] shadow-md`} rounded-[14px] gap-4 py-2 px-3 my-3`}
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
															<span className="text-sm">+{task.reward.toLocaleString()}</span>
														</div>
													</div>
													<div>
														{task.claimedStatus === 'claimed' ? (
															<>
																<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
																	<circle cx="19.5" cy="17.5" r="12" stroke="#224E00" fill="#5dd15f" />
																	<path d="M13.4802 17.8884C13.3544 18.0136 13.2546 18.1624 13.1865 18.3263C13.1184 18.4902 13.0834 18.6659 13.0834 18.8433C13.0834 19.0208 13.1184 19.1965 13.1865 19.3604C13.2546 19.5242 13.3544 19.673 13.4802 19.7982L16.344 22.6611C16.4692 22.7868 16.6179 22.8865 16.7817 22.9545C16.9455 23.0225 17.1211 23.0575 17.2984 23.0575C17.4758 23.0575 17.6514 23.0225 17.8152 22.9545C17.979 22.8865 18.1277 22.7868 18.2529 22.6611L24.9993 15.9156C25.1251 15.7905 25.2249 15.6416 25.293 15.4778C25.3611 15.3139 25.3961 15.1382 25.3961 14.9607C25.3961 14.7833 25.3611 14.6076 25.293 14.4437C25.2249 14.2798 25.1251 14.131 24.9993 14.0058C24.8741 13.8801 24.7253 13.7803 24.5615 13.7122C24.3976 13.6441 24.2219 13.609 24.0444 13.609C23.8669 13.609 23.6912 13.6441 23.5274 13.7122C23.3635 13.7803 23.2147 13.8801 23.0895 14.0058L17.2989 19.7973L15.39 17.8893C15.2648 17.7636 15.116 17.6638 14.9521 17.5957C14.7883 17.5276 14.6126 17.4925 14.4351 17.4925C14.2576 17.4925 14.0819 17.5276 13.9181 17.5957C13.7542 17.6638 13.6054 17.7627 13.4802 17.8884Z" fill="#ffffff" />
																</svg>
															</>
														) : (
															<>
																<img src={arrow} alt="arrow" width={15} />
															</>
														)}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="h-[30vh] w-full flex justify-center items-center">
							</div>
						)}
						{/* Heading 2 */}
						<div>
							<p className="text-[#9595A9] text-lg ">Partner Task</p>
						</div>
						{/* Pandatop News Cards */}
						{userPatnerTask?.length > 0 ? (
							<div>
								{userPatnerTask.sort((a, b) => a.priority - b.priority).map((task, index) => {
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
											className={`bg-[#1B1B27] text-white flex justify-between items-center border ${task.claimedStatus ? `border-[#5dd15f] shadow-[#5dd15f] shadow-md` : `border-[#0099FF] shadow-[#0199FF] shadow-md`} rounded-[14px] gap-4 py-2 px-3 my-3`}
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
															<span className="text-sm">+{task.reward.toLocaleString()}</span>
														</div>
													</div>
													<div>
														{task.claimedStatus === 'claimed' ? (
															<>
																<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
																	<circle cx="19.5" cy="17.5" r="12" stroke="#224E00" fill="#5dd15f" />
																	<path d="M13.4802 17.8884C13.3544 18.0136 13.2546 18.1624 13.1865 18.3263C13.1184 18.4902 13.0834 18.6659 13.0834 18.8433C13.0834 19.0208 13.1184 19.1965 13.1865 19.3604C13.2546 19.5242 13.3544 19.673 13.4802 19.7982L16.344 22.6611C16.4692 22.7868 16.6179 22.8865 16.7817 22.9545C16.9455 23.0225 17.1211 23.0575 17.2984 23.0575C17.4758 23.0575 17.6514 23.0225 17.8152 22.9545C17.979 22.8865 18.1277 22.7868 18.2529 22.6611L24.9993 15.9156C25.1251 15.7905 25.2249 15.6416 25.293 15.4778C25.3611 15.3139 25.3961 15.1382 25.3961 14.9607C25.3961 14.7833 25.3611 14.6076 25.293 14.4437C25.2249 14.2798 25.1251 14.131 24.9993 14.0058C24.8741 13.8801 24.7253 13.7803 24.5615 13.7122C24.3976 13.6441 24.2219 13.609 24.0444 13.609C23.8669 13.609 23.6912 13.6441 23.5274 13.7122C23.3635 13.7803 23.2147 13.8801 23.0895 14.0058L17.2989 19.7973L15.39 17.8893C15.2648 17.7636 15.116 17.6638 14.9521 17.5957C14.7883 17.5276 14.6126 17.4925 14.4351 17.4925C14.2576 17.4925 14.0819 17.5276 13.9181 17.5957C13.7542 17.6638 13.6054 17.7627 13.4802 17.8884Z" fill="#ffffff" />
																</svg>
															</>
														) : (
															<>
																<img src={arrow} alt="arrow" width={15} />
															</>
														)}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="h-[30vh] w-full flex justify-center items-center">
							</div>
						)}
						{/* Heading 3 */}
						<div>
							<p className="text-[#9595A9] text-lg ">Social Media</p>
						</div>
						{/* Pandatop News Cards */}
						{userSocialTasks?.length > 0 ? (
							<div>
								{userSocialTasks.sort((a, b) => a.priority - b.priority).map((task, index) => {
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
											className={`bg-[#1B1B27] text-white flex justify-between items-center border ${task.claimedStatus ? `border-[#5dd15f] shadow-[#5dd15f] shadow-md` : `border-[#0099FF] shadow-[#0199FF] shadow-md`} rounded-[14px] gap-4 py-2 px-3 my-3`}
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
															<span className="text-sm">+{task.reward.toLocaleString()}</span>
														</div>
													</div>
													{task.claimedStatus === 'claimed' ? (
														<>
															<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
																<circle cx="19.5" cy="17.5" r="12" stroke="#224E00" fill="#5dd15f" />
																<path d="M13.4802 17.8884C13.3544 18.0136 13.2546 18.1624 13.1865 18.3263C13.1184 18.4902 13.0834 18.6659 13.0834 18.8433C13.0834 19.0208 13.1184 19.1965 13.1865 19.3604C13.2546 19.5242 13.3544 19.673 13.4802 19.7982L16.344 22.6611C16.4692 22.7868 16.6179 22.8865 16.7817 22.9545C16.9455 23.0225 17.1211 23.0575 17.2984 23.0575C17.4758 23.0575 17.6514 23.0225 17.8152 22.9545C17.979 22.8865 18.1277 22.7868 18.2529 22.6611L24.9993 15.9156C25.1251 15.7905 25.2249 15.6416 25.293 15.4778C25.3611 15.3139 25.3961 15.1382 25.3961 14.9607C25.3961 14.7833 25.3611 14.6076 25.293 14.4437C25.2249 14.2798 25.1251 14.131 24.9993 14.0058C24.8741 13.8801 24.7253 13.7803 24.5615 13.7122C24.3976 13.6441 24.2219 13.609 24.0444 13.609C23.8669 13.609 23.6912 13.6441 23.5274 13.7122C23.3635 13.7803 23.2147 13.8801 23.0895 14.0058L17.2989 19.7973L15.39 17.8893C15.2648 17.7636 15.116 17.6638 14.9521 17.5957C14.7883 17.5276 14.6126 17.4925 14.4351 17.4925C14.2576 17.4925 14.0819 17.5276 13.9181 17.5957C13.7542 17.6638 13.6054 17.7627 13.4802 17.8884Z" fill="#ffffff" />
															</svg>
														</>
													) : (
														<>
															<img src={arrow} alt="arrow" width={15} />
														</>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className="h-[30vh] w-full flex justify-center items-center">
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
											className={`bg-[#1B1B27] text-white flex justify-between items-center border ${task.claimed ? `border-[#5dd15f] shadow-[#5dd15f] shadow-md` : `border-[#0099FF] shadow-[#0199FF] shadow-md`} rounded-[14px] gap-4 py-2 px-3 my-3`}
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
															<span className="text-sm">+{task.reward.toLocaleString()}</span>
														</div>
													</div>
													{task.claimed ? (
														<>
															<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
																<circle cx="19.5" cy="17.5" r="12" stroke="#224E00" fill="#5dd15f" />
																<path d="M13.4802 17.8884C13.3544 18.0136 13.2546 18.1624 13.1865 18.3263C13.1184 18.4902 13.0834 18.6659 13.0834 18.8433C13.0834 19.0208 13.1184 19.1965 13.1865 19.3604C13.2546 19.5242 13.3544 19.673 13.4802 19.7982L16.344 22.6611C16.4692 22.7868 16.6179 22.8865 16.7817 22.9545C16.9455 23.0225 17.1211 23.0575 17.2984 23.0575C17.4758 23.0575 17.6514 23.0225 17.8152 22.9545C17.979 22.8865 18.1277 22.7868 18.2529 22.6611L24.9993 15.9156C25.1251 15.7905 25.2249 15.6416 25.293 15.4778C25.3611 15.3139 25.3961 15.1382 25.3961 14.9607C25.3961 14.7833 25.3611 14.6076 25.293 14.4437C25.2249 14.2798 25.1251 14.131 24.9993 14.0058C24.8741 13.8801 24.7253 13.7803 24.5615 13.7122C24.3976 13.6441 24.2219 13.609 24.0444 13.609C23.8669 13.609 23.6912 13.6441 23.5274 13.7122C23.3635 13.7803 23.2147 13.8801 23.0895 14.0058L17.2989 19.7973L15.39 17.8893C15.2648 17.7636 15.116 17.6638 14.9521 17.5957C14.7883 17.5276 14.6126 17.4925 14.4351 17.4925C14.2576 17.4925 14.0819 17.5276 13.9181 17.5957C13.7542 17.6638 13.6054 17.7627 13.4802 17.8884Z" fill="#ffffff" />
															</svg>
														</>
													) : (
														<>
															<img src={arrow} alt="arrow" width={15} />
														</>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</>
						)}
						<div className="w-full h-[4vh]">

						</div>
					</div>
				</div >
			</div >
		</>
	);
};
export default BottleCap;