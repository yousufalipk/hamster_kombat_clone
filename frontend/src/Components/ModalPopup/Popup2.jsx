import React from "react";
import MIcon from "../../assets/MIcon.png";
import InfoIcon from "../../assets/InfoSmallIcon.svg";

const Popup2 = () => {
	return (
		<>
			<div className='bg-[#1b1b27] p-4 text-[#FFF]'>
				<div className='button-grad w-fit float-right rounded-2xl px-3 py-2'>
					<div className='text-xs font-medium'>
						<p>Launch Pad</p>
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
				<div className='text-base font-light text-center py-3'>
					<p>
						You will get X token at the time of IDO. You need to keep toN in
						your Wallet to participate.
					</p>
				</div>
				<div className='flex items-center py-3'>
					<div className='mx-auto flex items-center gap-1 border border-[#666666] p-2 rounded-md'>
						<div className=''>
							<img
								className='w-[15px]'
								src={InfoIcon}
								alt='Info-Icon'
							/>
						</div>
						<div className='text-base font-medium -mt-1'>
							<p>This action cannot be undone</p>
						</div>
					</div>
				</div>
				<div className='flex justify-between text-base font-semibold py-4'>
					<div className='w-[47%] rounded-lg text-center bg-[#242434]'>
						<button className='py-4'>Cancel</button>
					</div>
					<div className='w-[47%] rounded-lg text-center button-grad'>
						<button className='py-4'>Confirm</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Popup2;
