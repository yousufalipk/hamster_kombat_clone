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
