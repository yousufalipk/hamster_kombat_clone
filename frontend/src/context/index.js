import { createContext, useContext, useEffect, useState } from 'react';
import ProfilePic from "../assets/ProfilePicIcon.svg";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const [sendData, setSendData] = useState(false);

    const [sendTokenData, setSendTokenData] = useState(false);

    const [userData, setUserData] = useState(null);

    const [tgeToggle, setTgeToggle] = useState('launchpad');


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

    useEffect(() => {
        // static user data


        const userinitial = {
            name: "Virat Kohli",
            pic: ProfilePic,
            level: 'Silver',
            currentRank: 6,
            balance: 6000000
        };

        const percentage = (userinitial.currentRank / 10) * 100;

        const finalUser = {
            name: "Virat Kohli",
            pic: ProfilePic,
            level: 'Silver',
            currentRank: 6,
            percentage: percentage,
            balance: 6000000
        };

        setUserData(finalUser);
    }, [])

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