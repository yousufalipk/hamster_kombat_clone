import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home/index';
import BottleCap from '../Pages/BottleCap/index';
import Hammer from '../Pages/Hammer/index';
import InviteFriends from '../Pages/InviteFriends/index';
import Wallet from '../Pages/Wallet/index';
import Footer from '../Components/Footer';

import Rankings from '../Components/Rankings/index';

const Layout = () => {
    return (
        <>
            <div className='relative h-full w-screen overflow-hidden z-20'>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/bottle-cap" element={<BottleCap />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/hammer" element={<Hammer />} />
                        <Route path="/invite-friends" element={<InviteFriends />} />
                        <Route path="/rankings" element={<Rankings />} />
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
