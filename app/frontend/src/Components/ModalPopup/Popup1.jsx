import React from "react";
import MIcon from "../../assets/MIcon.png";
import LittleCoin from "../../assets/LittleCoinIcon.svg";
import BigCoin from "../../assets/BigCoinIcon.svg";

const Popup1 = () => {
	return (
		<>
			<div className='bg-[#1b1b27] p-4 text-[#FFF]'>
				<div className='button-grad w-fit float-right rounded-2xl px-3 py-1'>
					<div className='text-xs font-medium'>
						<p>Launch Pad</p>
					</div>
				</div>
				<div className=''>
					<pre> </pre>
				</div>
				<div className='relatve pt-4 flex flex-col'>
					<div className='relative mx-auto'>
						<div className='absolute back-color -inset-2 blur rounded-[40px]'></div>
						<div className='relative'>
							<img
								className='w-[70px]'
								src={MIcon}
								alt='M-Icon'
							/>
						</div>
					</div>
					<div className='text-lg font-medium flex mx-auto'>
						<p>MemeFi</p>
					</div>
				</div>
				<div className='text-base font-light text-center py-3'>
					<p>You will get +60 MemeFi coins against pandatap coins.</p>
				</div>
				<div className='flex'>
					<div className='mx-auto'>
						<div className='flex gap-2 items-center'>
							<div className=''>
								<img
									src={LittleCoin}
									alt='Coin-Icon'
								/>
							</div>
							<div className='text-[11.655px] font-medium'>+ 60 </div>
							<div className='text-[10px] font-medium'>MemeFi</div>
						</div>
					</div>
				</div>
				<div className='flex pt-4 text-lg font-normal'>
					<div className='mx-auto flex items-center gap-2'>
						<div className=''>
							<img
								className='w-[18px]'
								src={BigCoin}
								alt='Coin-Icon'
							/>
						</div>
						<div className=''>2,500</div>
					</div>
				</div>
				<div className='flex justify-between text-base font-semibold py-4'>
					<div className='w-[47%] mx-auto rounded-lg text-center button-grad'>
						<button className='py-4'>Confirm</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Popup1;
