import React from 'react';

import MIcon from "../../assets/MIcon.png";

import BigCoin from "../../assets/BigCoinIcon.svg";
import LittleCoin from "../../assets/LittleCoinIcon.svg";

import { useUser } from '../../context/index';

const PopUpToken = () => {
    const { setModalOpen, sendData } = useUser();

    const handleConfirm = () => {
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const tokens = 10;

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 overflow-hidden'>
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
                        </div>
                        {/* popup title */}
                        <div className='flex justify-center mt-1'>
                            <h1 className='text-sm font-medium'>{sendData.name}</h1>
                        </div>
                        {/* description */}
                        <div className='my-2'>
                            <p className='text-center font-thin text-xs'>
                                You will get +xcoins of NAME coins against pandatop coins.
                            </p>
                        </div>
                        <div className='flex justify-center gap-2'>
                            <img 
                                src={LittleCoin} 
                                alt="Little coin" 
                            />
                            <span className='text-xs'>+60 name</span>
                        </div>
                        {/* action buttons */}
                        <div className='flex gap-4 mt-3 justify-center p-2'>
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

export default PopUpToken;
