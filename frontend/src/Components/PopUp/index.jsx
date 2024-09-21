import React from 'react';
import { IoMdClose } from "react-icons/io";
import { useUser } from '../../context/index';

const PopUp = () => {
    const { setModalOpen, isModalOpen } = useUser();

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-hidden'>
            <div className='bg-red-600 w-3/4 md:w-1/2 md:h-3/4 h-1/2 rounded-xl relative p-5'>
            <button onClick={handleCopy} className="text-black font-bold hover:cursor-pointer"><FaCopy className='md:text-4xl text-xl text-white' /></button>
            I am popup!
            </div>
        </div>
    )
}

export default PopUp;
