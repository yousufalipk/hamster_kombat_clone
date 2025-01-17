import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SmallCoin from '../../assets/optimizedImages/SmallCoin.svg';

const AffiliateProgram = () => {
    const staticUser = process.env.REACT_APP_STATIC_USER;
    const navigate = useNavigate();

    const affiliateButtons = [
        {
            id: 1,
            text: 'Create content',
            description: 'It should be a video, a post, or an article about the app.',
            path: '/content'
        },
        {
            id: 2,
            text: 'Publish it',
            description: 'On any social network. Be sure to provide a link to the application',
            path: '/affiliate-program'
        },
        {
            id: 3,
            text: 'Get up to 200 TON',
            description: 'Depending ont the number of views, interactions, your audience and other important factors, we will detemine the amount of your reward.',
            path: '/affiliate-program'
        },
    ]
    const recentRewardUsers = [
        {
            id: 1,
            profilePic: 'https://picsum.photos/100?random=1',
            username: 'yousufbhatti_1',
            formatedDateTime: '22.11.2024  18:45',
            reward: 5000
        },
        {
            id: 2,
            profilePic: 'https://picsum.photos/100?random=2',
            username: 'user2_name',
            formatedDateTime: '22.11.2024  18:50',
            reward: 5000
        },
        {
            id: 3,
            profilePic: 'https://picsum.photos/100?random=3',
            username: 'user3_name',
            formatedDateTime: '22.11.2024  18:55',
            reward: 5000
        },
        {
            id: 4,
            profilePic: 'https://picsum.photos/100?random=4',
            username: 'user4_name',
            formatedDateTime: '22.11.2024  19:00',
            reward: 5000
        },
    ];

    useEffect(() => {
        if (staticUser === 'false') {
            const tg = window.Telegram.WebApp;

            tg.BackButton.show();
            tg.BackButton.onClick(() => {
                navigate("/bottle-cap");
            });

            return () => {
                tg.BackButton.hide();
                tg.BackButton.offClick();
            };
        }
    }, [navigate]);

    return (
        <div className='w-full h-[92vh] overflow-x-hidden overflow-y-scroll p-5 flex flex-col justify-start items-center text-white'>
            {/* Title */}
            <div className='w-full h-[10vh] flex justify-center items-center'>
                <h1 className='text-[32px] font-bold'>
                    Affiliate Program
                </h1>
            </div>
            {/* Affiliate Buttons */}
            <div className='w-full h-[40vh] flex flex-col justify-center items-center gap-3 mt-4'>
                {affiliateButtons.map((btn, index) => {
                    return (
                        <button
                            key={index}
                            className='rounded-xl border-2 border-[#23A7FF] w-full flex justify-between items-center bg-[#1B1B27]'
                            onClick={() => {
                                navigate(btn.path)
                            }}
                        >
                            <div className='w-[20%] h-full flex justify-center items-center'>
                                <p className='bg-black rounded-full w-10 h-10 border-2 border-[#23A7FF] flex justify-center items-center text-center'>
                                    {btn.id}
                                </p>
                            </div>
                            <div className='w-[80%] h-full flex flex-col justify-start items-center gap-1 py-2 text-start'>
                                <h1 className='w-full h-[40%] text-[19px] font-medium'>
                                    {btn.text}
                                </h1>
                                <p className='w-full text-[11px] text-[#506B83]'>
                                    {btn.description}
                                </p>
                            </div>
                        </button>
                    )
                })}
            </div>
            <div className='w-full h-[40vh] mt-5 rounded-t-2xl bg-gradient-to-b from-black to-transparent p-3'>
                <div className='w-full h-[5vh]'>
                    <h1 className='text-[18px] font-semibold flex justify-start items-center text-start'>
                        Recent Rewards
                    </h1>
                </div>
                <div className='w-full min-h-[40vh] flex flex-col justify-start items-center gap-2'>
                    {recentRewardUsers.map((user, index) => {
                        return (
                            <div
                                key={index}
                                className='rounded-xl border-2 border-[#23A7FF] w-full flex justify-between items-center bg-[#1B1B27]'
                            >
                                <div className='w-[20%] h-full flex justify-center items-center'>
                                    <p className='bg-black rounded-full w-10 h-10 overflow-hidden flex justify-center items-center text-center'>
                                        <img src={user.profilePic} alt="profile_pic" className='rounded-full' />
                                    </p>
                                </div>
                                <div className='w-[50%] h-full flex flex-col justify-start items-center py-2 text-start'>
                                    <h1 className='w-full h-[40%] text-[18px] font-medium'>
                                        {user.username}
                                    </h1>
                                    <p className='w-full text-[14px] text-[#506B83]'>
                                        {user.formatedDateTime}
                                    </p>
                                </div>
                                <div className='w-[30%] h-full flex justify-center items-center gap-1'>
                                    <img src={SmallCoin} alt="small_coin" />
                                    <p className='text-[#FF8F00]'>
                                        +
                                        {user.reward}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AffiliateProgram;
