import React from 'react';

import MIcon from "../../assets/MIcon.png";

import { useUser } from '../../context/index';

const PopUpTGE = () => {
    const { setModalOpen, sendData } = useUser();

    const handleConfirm = () => {
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const tokens = 10;

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-85 overflow-hidden'>
            <div className='fixed bottom-0 h-[40vh] w-screen'>
                <div className="absolute -inset-1 h-[40vh] bg-[#23a7ff] rounded-[35px]"></div>
                <div className="absolute -inset-2 h-[40vh] bg-[#23a7ff] blur rounded-[50px]"></div>
                <div className='w-screen bg-[#1B1B27] h-[40vh] fixed bottom-0 rounded-t-3xl p-5 text-white'>
                    {/* Main Body */}
                    <div className='mb-5 px-2'>

                        <div className='flex relative justify-center'>
                            {/* logo */}
                            <div className='w-fit pt-2'>
                                <div
                                    style={{
                                        borderRadius: '100%',
                                        transform: 'translateZ(0)',
                                        filter: 'drop-shadow(0 0 15px rgba(255, 176, 0, 0.35))',
                                    }}
                                >
                                    <img
                                        src={MIcon}
                                        alt='M-Icon'
                                        width='60'
                                        style={{
                                            borderRadius: '12px',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='absolute right-0'>
                                {/* top card ( launchpad / airtap ) */}
                                <p className='text-xs font-medium bg-gradient-to-b from-[#00B2FF] to-[#2226FF] px-3 py-1 rounded-full'>{sendData.tgeToggle === 'airtap' ? (<>Air Tap</>) : (<>Lauch Pad</>)}</p>
                            </div>
                        </div>
                        {/* popup title */}
                        <div className='flex justify-center mt-1'>
                            <h1 className='text-sm font-medium'>{sendData.name}</h1>
                        </div>
                        {/* description */}
                        <div className='my-2'>
                            <p className='text-center font-thin text-xs'>
                                You will get {sendData.balance} token at the time of IDO. You need to keep toN in your wallet to participate.
                            </p>
                        </div>
                        {/* alert warnning */}
                        <div className='w-[70%] mx-auto mt-2 border-2 border-[#242434] p-2 flex justify-center items-center gap-2 rounded-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M7.78101 0.354187C3.6451 0.354187 0.280273 3.71906 0.280273 7.85497C0.280273 11.9909 3.6451 15.3557 7.78101 15.3557C11.9169 15.3557 15.2817 11.9909 15.2817 7.85497C15.2817 3.71906 11.9169 0.354187 7.78101 0.354187ZM7.78101 13.9919C4.39704 13.9919 1.64404 11.2389 1.64404 7.85497C1.64404 4.47104 4.39704 1.71796 7.78101 1.71796C11.165 1.71796 13.918 4.47104 13.918 7.85497C13.918 11.2389 11.1649 13.9919 7.78101 13.9919Z" fill="white" />
                                <path d="M7.78101 3.53632C7.27978 3.53632 6.87201 3.94436 6.87201 4.4459C6.87201 4.947 7.27978 5.35468 7.78101 5.35468C8.28224 5.35468 8.69001 4.947 8.69001 4.4459C8.69001 3.94436 8.28224 3.53632 7.78101 3.53632Z" fill="white" />
                                <path d="M7.78119 6.71844C7.40461 6.71844 7.0993 7.02375 7.0993 7.40033V11.4916C7.0993 11.8682 7.40461 12.1735 7.78119 12.1735C8.15777 12.1735 8.46307 11.8682 8.46307 11.4916V7.40033C8.46307 7.02375 8.15777 6.71844 7.78119 6.71844Z" fill="white" />
                            </svg>
                            <h1 className='font-semibold text-xs'>This action cannot be undone</h1>
                        </div>
                        {/* action buttons */}
                        <div className='flex gap-4 mt-3'>
                            <button 
                                className='w-1/2 p-2 bg-[#242434] rounded-lg text-sm'
                                onClick={()=>(handleConfirm())}
                            >
                                Cancel
                            </button>
                            <button 
                                className='w-1/2 p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-sm' 
                                onClick={()=>(handleCancel())}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PopUpTGE;
