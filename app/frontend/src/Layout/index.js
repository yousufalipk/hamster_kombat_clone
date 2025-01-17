import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home/index';
import { BottleCap } from '../Pages/BottleCap/index.jsx';
import Hammer from '../Pages/Hammer/index';
import InviteFriends from '../Pages/InviteFriends/index';
import Wallet from '../Pages/Wallet/index';
import Footer from '../Components/Footer';
import AffiliateProgram from '../Pages/BottleCap/affiliateProgram.jsx';
import ContentForm from '../Pages/BottleCap/contentForm.jsx';

import Rankings from '../Components/Rankings/index';
import LevelsPage from '../Components/Levels/Levels';

import EllipseImg from '../assets/root/ellipse.png';

import { useUser } from '../context/index.js';

const Layout = () => {
    const { triggerToast } = useUser();
    return (
        <>
            <div className='relative h-full w-screen overflow-hidden z-20'>

                {/* Cutom Toast Triggrer */}
                {/*
                <div
                    style={{
                        zIndex: 1000
                    }}
                    className='w-full h-full absolute px-10 flex justify-center items-center gap-2 bg-black'
                >
                    <button
                        onClick={() => {
                            triggerToast('Reward claim requested Comeback after 20 minutes!Reward claim requested Comeback after 20 minutes!', 'success');
                        }}
                        className='w-[50%] h-12 bg-white text-black rounded-2xl'
                    >
                        Success
                    </button>
                    <button
                        onClick={() => {
                            triggerToast('Operation was Unsuccessful!', 'fail');
                        }}
                        className='w-[50%] h-12 bg-white text-black rounded-2xl'
                    >
                        Fail
                    </button>
                </div>
                */}

                <img src={EllipseImg} alt="grad" className='absolute' />
                <img src={EllipseImg} alt="grad" className='absolute -bottom-72' />
                <div className='h-[86vh]'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/bottle-cap" element={<BottleCap />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/hammer" element={<Hammer />} />
                        <Route path="/invite-friends" element={<InviteFriends />} />
                        <Route path="/rankings" element={<Rankings />} />
                        <Route path="/levels" element={<LevelsPage />} />
                        <Route path="/affiliate-program" element={<AffiliateProgram />} />
                        <Route path="/content" element={<ContentForm />} />
                    </Routes>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Layout;
