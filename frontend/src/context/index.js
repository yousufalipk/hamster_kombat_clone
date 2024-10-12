import { createContext, useContext, useEffect, useState } from 'react';
import ProfilePic from "../assets/ProfilePicIcon.svg";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {

    const staticUser = process.env.REACT_APP_STATIC_USER;

    // Userdata 

    const [userData, setUserData] = useState({
        telegramId: null,
        firstName: null,
        lastName: null,
        username: null
    });



    // Others 
    const [isModalOpen, setModalOpen] = useState(false);

    const [sendData, setSendData] = useState(false);

    const [sendTokenData, setSendTokenData] = useState(false);

    const [tgeToggle, setTgeToggle] = useState('launchpad');


    useEffect(() => {
        initializeUser();
    }, [])

    // Initilize User
    const initializeUser = () => {
        let telegramUser;
        console.log("STatic user ========> ", staticUser);
        console.log(typeof staticUser);
        if (staticUser === 'true') {
            telegramUser = {
                id: 5840841171,
                username: "yousuf_bhatti2",
                first_name: "Yousuf",
                last_name: "Bhatti 2",
            };
        } else {
            const tg = window.Telegram.WebApp;
            tg.ready();
            telegramUser = tg.initDataUnsafe?.user;
        }

        const percentage = (6 / 10) * 100;

        const fetchedData = {
            telegramId: telegramUser.id,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            username: telegramUser.username || `${telegramUser.first_name} ${telegramUser.last_name}`,
            pic: ProfilePic,
            level: 'Silver',
            currentRank: 6,
            percentage: percentage,
            balance: 6000000
        }
        setUserData(fetchedData);
    }

    /* 
    levels
    1 - Silver
    2 - Gold
    3 - Daimond
    4 - Platimum 
    5 - Legendary 
    6 - Master
    7 - Grand Master 
    8 - Epic  */

    return (
        <UserContext.Provider value={{
            isModalOpen,
            setModalOpen,
            sendData,
            setSendData,
            tgeToggle,
            setTgeToggle,
            userData,
            setUserData,
            sendTokenData,
            setSendTokenData
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;