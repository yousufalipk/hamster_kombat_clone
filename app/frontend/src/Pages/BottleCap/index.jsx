import React, { useState } from "react";
import BackIcon from "../../assets/BackIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";
import Twitter from "../../assets/pages/twitter.svg";
import Telegram from "../../assets/pages/telegram.svg";
import Youtube from "../../assets/pages/Yutube.svg";
import padaIcon from "../../assets/pages/pandaicon.svg"
import arrow from "../../assets/pages/arrow.svg";
import linbottle from '../../assets/token/LineBottle.svg'
import closebutton from "../../assets/token/closebutton.svg"
const BottleCap = () => {
	const [isPopup, setisPopup] = useState(false)
	const [isClosing, setIsClosing] = useState(false);
	const balance = {
		current: 450000,
	};
	const data = [
		{
			id: 1,
			img: Twitter,
			name: "Join X and get",
			amount: "50,000MFI",
		},
		{
			id: 2,
			img: Telegram,
			name: "Join TG and get",
			amount: "50,000MFI",
		},
		{
			id: 3,
			img: Youtube,
			name: "Subscribe YouTube",
			amount: "50,000 MFI",
		},
	];
	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setisPopup(false);
			setIsClosing(false);
		}, 700)
	};
	return (
		<>
			<div className='h-[86vh] w-[100vw] bg-gradient-to-t from-[#1B1B27] to-black overflow-y-scroll overflow-x-hidden'>
				{isPopup && (
					<>
						<div
							className={`popup-overlay absolute w-[100vw] h-[100vh] top-0 bg-black bg-opacity-50 z-20 flex items-end ${isClosing ? "" : "closing "}`}
							style={{
								animation: ` ${isClosing ? "closePopup 0.7s ease-in-out" : "openPopup 0.7s ease-in-out"}`,
							}}
						>         <div>
								<div className="relative bg-[#06060E] w-[100vw] rounded-t-[30px]  text-white">
									<div className="absolute bottom-0 -inset-1 bg-[#23a7ff] rounded-[35px] -z-10"></div>
									<div className="absolute bottom-0 -inset-2 bg-[#23a7ff] blur rounded-[50px] -z-10"></div>
									<div className="flex flex-col items-center relative">
										<div className="absolute top-3 right-7" onClick={handleClose}><img src={closebutton} alt="" /></div>
										<div className="h-1 w-16 bg-[#D9D9D9] rounded-md  mt-2 opacity-70"></div>
										<div className="flex justify-center flex-col items-center gap-2 mt-3">
											<img src={Twitter} alt="battery" />
										</div>
										<div className="text-xl text-white mt-3">
											<p>Retweet post on X </p>
										</div>
										<div className="mt-5">
											<button className="bg-white py-2  rounded-md text-black px-6  font-medium">
												Retweet
											</button>
										</div>
										<div className="mt-5">
											<p className="border border-[#242434] py-1  rounded-md text-[#FF8F00] px-6 text-lg font-medium">
												+50,0000 PTap
											</p>
										</div>
										<div className="text-center text-md flex flex-col mt-5 ">
											<img src={linbottle} alt="" />
										</div>
										<div className="flex w-full mt-3 items-center justify-center gap-4 z-40 mb-4 px-3">
											<button className="w-full  py-2 bg-gradient-to-b from-[#00B2FF]  to-[#2226FF] text-white font-bold rounded-md">Check</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				{/* Upper Yellow Card */}
				<div className='relative pt-10 mt-5 h-[35vh]'>
					<div className='absolute back-color h-[30vh] -inset-2 blur-[20px]'></div>
					<div className=' w-fit px-12 py-4 -mt-1 rounded-[25px] mx-auto relative'>
						<div className='flex items-center justify-center gap-2'>
							<div className=''>
								<img
									src={BigCoin}
									alt='BigCoin-Icon'
								/>
							</div>
							<div className='text-[#FFF] text-[24px] font-medium'>
								<p>{balance.current}</p>
							</div>
						</div>
						<div className='flex pt-3'>
							<div className='mx-auto bg-[#0199FF] h-20 w-20 p-1 rounded-full  shadow-[0_0_20px_0px_rgba(0,0,0,0.2)] shadow-[#0199FF]'>
								<img
									src={padaIcon}
									alt='Panda-Pic'
								/>
							</div>
						</div>
						<div className="text-white mt-5 text-lg">
							<p>Complete tasks and Earn more!</p>
						</div>
					</div>
				</div>
				{/* Tasks Section */}
				<div className="h-[60vh] px-4 pt-4 border-t-2 mt-5 rounded-tl-[30px] rounded-tr-[30px] border-[#0099FF]  shadow-lg  ">
					{/* Heading 1 */}
					<div>
						<p className="text-[#9595A9] text-lg ">Daily Task</p>
					</div>
					<div>
						{data.map((values) => {
							const { id, img, name, amount } = values;
							return (
								<div
									onClick={() => { setisPopup(true) }}
									key={id}
									className="bg-[#1B1B27] text-white   flex justify-between items-center border border-[#0099FF] rounded-[14px] gap-4 py-2 px-3 my-3"
								>
									<div className="flex gap-3 justify-center items-center py-1 w-full">
										{/* Icon */}
										<div className="flex flex-shrink-0 ">
											<img
												src={img}
												alt="Icons"
												width="60"
												className=""
											/>
										</div>
										{/* Name */}
										<div className="flex justify-between items-center w-full">
											<div>
												<div className="flex   text-lg">{name}</div>
												<div className=" text-[#FF8F00] gap-1 rounded-md text-lg flex items-center ">
													<img src={BigCoin} alt="" className="h-4 w-5" />
													<span>+{amount}</span>
												</div>
											</div>
											<div>
												<img src={arrow} alt="" />
											</div>
										</div>
									</div>
									{/* White Box */}
								</div>
							);
						})}
					</div>
					{/* Heading 2 */}
					<div className="pt-3">
						<p className="text-[#9595A9] text-lg ">Social Media</p>
					</div>
					{/* Social Media Cards */}
					<div>
						{data.map((values) => {
							const { id, img, name, amount } = values;
							return (
								<div
									onClick={() => { setisPopup(true) }}
									key={id}
									className="bg-[#1B1B27] text-white   flex justify-between items-center border border-[#0099FF] rounded-[14px] gap-4 py-2 px-3 my-3 "
								>
									<div className="flex gap-3 justify-center items-center py-1 w-full ">
										<div className="flex flex-shrink-0">
											<img src={img} alt="Icons" width="40" />
										</div>
										<div className="flex justify-between items-center w-full">
											<div>
												<div className="flex   text-lg">{name}</div>
												<div className=" text-[#FF8F00] gap-1 rounded-md text-lg flex items-center ">
													<img src={BigCoin} alt="" className="h-4 w-5" />
													<span>+{amount}</span>
												</div>
											</div>
											<div>
												<button className="bg-white  rounded-md text-black px-6 mt-8 font-medium">
													JOIN{" "}
												</button>
											</div>
										</div>
									</div>
									{/* White Box */}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};
export default BottleCap;