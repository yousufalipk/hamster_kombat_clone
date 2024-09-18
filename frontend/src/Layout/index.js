import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home/index';
import BottleCap from '../Pages/BottleCap/index';
import Hammer from '../Pages/Hammer/index';
import MemeFi from '../Pages/MemeFi/index';
import InviteFriends from '../Pages/InviteFriends/index';
import Rankings from '../Pages/Rankings/index';
import Footer from '../Components/Footer';

import BackgroundImg from '../assets/background/bg.png';

const Layout = () => {
    return (
        <> 
            {/* Background Layer */}
            <div className='absolute inset-0 bg-gradient-to-t from-[#1B1B27] to-black z-10 overflow-hidden'>
                <div className='absolute h-[70vh] bottom-[4vh] w-[54vh] flex justify-center'>
                    <img src={BackgroundImg} alt="Custom Effect" className="max-w-full max-h-full transform scale-[1.1]" />
                </div>
            </div>

            {/* Routes and Footer Layer */}
            <div className='relative h-full w-screen overflow-hidden z-20'>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/bottle-cap" element={<BottleCap />} />
                        <Route path="/hammer" element={<Hammer />} />
                        <Route path="/meme-fi" element={<MemeFi />} />
                        <Route path="/invite-friends" element={<InviteFriends />} />
                        <Route path="/rankings" element={<Rankings />} />
                    </Routes>
                </div>
                <div>
                    {/* Bottom Menu */}
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Layout;
