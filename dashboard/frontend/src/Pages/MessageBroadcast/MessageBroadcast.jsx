import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/Firebase';

const MessageBroadcast = () => {
    const { twoComboCards, fetchTwoComboCards } = useFirebase();

    useEffect(() => {
        if (twoComboCards.length === 0) {
            fetchTwoComboCards();
        }
    }, [])

    return (
        <>
            <div>
                <div className='flex flex-row justify-between'>
                    <h1 className='font-bold text-left mx-10 w-full max-w-2xl'>
                        Broadcast Message
                    </h1>
                </div>
                <hr className='my-5 border-1 border-[white] mx-2' />
            </div>
            <div className='mx-2 my-10'>

            </div >
        </>
    )
}

export default MessageBroadcast;