import React from "react";
import MIcon from "../../assets/MIcon.png";

const Popup4 = () => {
	return (
		<>
			<div className='bg-[#1b1b27] p-4 text-[#FFF]'>
				<div className='button-grad w-fit float-right rounded-2xl px-3 py-2'>
					<div className='text-xs font-medium'>
						<p>Air Tap</p>
					</div>
				</div>
				<div className=''>
					<pre> </pre>
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
				<div className='text-base font-light text-center py-3 px-8'>
					<p>
						You will receive your share of fish tokens via airdrop to your
						wallet. The date will be announced later.
					</p>
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

export default Popup4;
