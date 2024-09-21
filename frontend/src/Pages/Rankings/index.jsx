import React from "react";
import { useNavigate } from 'react-router-dom'; 

import BackIcon from "../../assets/BackIcon.svg";
import Friend1 from "../../assets/Friend1.svg";
import Friend2 from "../../assets/Friend2.svg";
import Coin from "../../assets/BigCoinIcon.svg";
import Rank1 from "../../assets/1stRank.svg";
import Rank2 from "../../assets/2ndRank.svg";
import Rank3 from "../../assets/3rdRank.svg";
import Panda from "../../assets/PandaPicture.png";
import Top1 from "../../assets/Top1.svg";
import Top2 from "../../assets/Top2.svg";
import Top3 from "../../assets/Top3.svg";

const Rankings = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate('/');
	}

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
			name: "Cameron Williamson",
			coins: "+5,000",
		},
		{
			id: 4,
			img1: Friend2,
			img2: Coin,
			name: "Leslie Alexander (you)",
			coins: "+5,000",
		},
	];

	const data = {
		name1: "Virat Kohli",
		img1: Top1,
		img2: Top2,
		img3: Top3,
		name2: "Babar",
		name3: "Misbah",
		points: 25951,
	};

	return (
		<>
			<div className='overflow-hidden h-[100vh]'>
					<div className='bg-[#080813] min-h-[37vh] pb-3 pt-5 px-5 rounded-br-3xl rounded-bl-3xl'>
						<div 
							onClick={()=> handleBack()}
							className="absolute top-0 left-0 p-5">
							<img 
								src={BackIcon}
								width='15'
							/>
						</div>
						{/* top 3 stage */}
						<div className='h-[40vh] flex mt-5 text-[#FFF] overflow-hidden'>
							<div className='flex mx-auto mt-4'>
								{/* right col */}
								<div className='mt-7 text-center'>
									<div className='mb-2'>
										<img
											src={data.img2}
											alt='Person 2'
											className='w-12 h-12 rounded-full mx-auto'
										/>
										<p className='text-sm font-medium pt-2 pb-1'>
											{data.name2}
										</p>
										<div className='ml-2 text-sm flex items-center gap-1 w-fit p-1 rounded-[7px] bg-[#262639]'>
											<div className=''>
												<img
													className='w-[14px]'
													src={Coin}
													alt=''
												/>
											</div>
											<div className=''>
												<p>{data.points}</p>
											</div>
										</div>
									</div>
									<div className='relative'>
										<img
											src={Rank2}
											alt=''
										/>
										<div className='rank-number pt-4'>2</div>
									</div>
								</div>
								{/* mid col */}
								<div className='text-center'>
									<div className='mb-2'>
										<img
											src={data.img1}
											alt='Person 1'
											className='w-12 h-12 rounded-full mx-auto'
										/>
										<p className='text-sm font-medium pt-2 pb-1'>
											{data.name1}
										</p>
										<div className='ml-2 text-sm flex items-center gap-1 w-fit p-1 rounded-[7px] bg-[#262639]'>
											<div className=''>
												<img
													className='w-[14px]'
													src={Coin}
													alt=''
												/>
											</div>
											<div className=''>
												<p>{data.points}</p>
											</div>
										</div>
									</div>
									<div className='relative'>
										<img
											src={Rank1}
											alt=''
										/>
										<div className='rank-number pt-8'>
											<img
												src={Panda}
												alt='Rank-1'
											/>
										</div>
									</div>
								</div>
								{/* right col */}
								<div className='mt-12 text-center'>
									<div className='mb-2'>
										<img
											src={data.img3}
											alt='Person 3'
											className='w-12 h-12 rounded-full mx-auto'
										/>
										<p className='text-sm font-medium pt-2 pb-1'>
											{data.name3}
										</p>
										<div className='ml-2 text-sm flex items-center gap-1 w-fit p-1 rounded-[7px] bg-[#262639]'>
											<div className=''>
												<img
													className='w-[14px]'
													src={Coin}
													alt=''
												/>
											</div>
											<div className=''>
												<p>{data.points}</p>
											</div>
										</div>
									</div>
									<div className='relative'>
										<img
											src={Rank3}
											alt=''
										/>
										<div className='rank-number pt-2'>3</div>
									</div>
								</div>
							</div>
						</div>
						{/* List of competitors */}
						<div className='bg-[#272a2f] pb-3 pt-5 px-5 rounded-tl-[14px] rounded-tr-[14px] overflow-scroll h-[60vh]'>
							{friendsData.map((values) => {
								const { id, img1, img2, name, coins } = values;
								return (
									<div
										key={id}
										className={`${
											id === 4 ? "bg-black" : "bg-[#202029]"
										} text-[#FFF] text-base font-medium flex justify-between items-center rounded-[14px] gap-4 p-4 my-3`}>
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
			</div>
		</>
	);
};

export default Rankings;
