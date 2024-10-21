import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {

    const staticUser = process.env.REACT_APP_STATIC_USER;

    const apiUrl = process.env.REACT_APP_URL;

    // User States

    const [userDataInitilized, setUserDataInitlized] = useState(false);

    const [userId, setUserId] = useState(null);
    const [telegramId, setTelegramId] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [level, setLevel] = useState(null);
    const [currentRank, setCurrentRank] = useState(null);
    const [balance, setBalance] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [energyLimit, setEnergyLimit] = useState(0);
    const [addCoins, setAddCoins] = useState(1);

    const [levelPercentage, setLevelPercentage] = useState();

    // Others 
    const [loader, setLoader] = useState(false);

    const [loaderErrorMes, setLoaderErrorMes] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);

    const [sendData, setSendData] = useState(false);

    const [sendTokenData, setSendTokenData] = useState(false);

    const [tgeToggle, setTgeToggle] = useState('launchpad');


    useEffect(() => {
        initializeUser();
    }, [])


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


    // Initilize User
    const initializeUser = async () => {
        setLoader(true);
        const tg = window.Telegram.WebApp;
        tg.ready();
        try {
            let telegramUser;
            if (staticUser === 'true') {
                telegramUser = {
                    id: "5840841171",
                    username: "yousuf_bhatti1",
                    first_name: "Yousuf",
                    last_name: "Bhatti 1",
                };
            } else {
                telegramUser = tg.initDataUnsafe?.user;
            }

            const res = await axios.post(`${apiUrl}/user/fetch-user`, {
                telegramId: telegramUser.id,
                firstName: telegramUser.first_name,
                lastName: telegramUser.last_name,
                username: telegramUser.username || `${telegramUser.first_name} ${telegramUser.last_name}`
            });

            if (res.data.status === 'failed') {
                console.log("Error Initilizing User!");
                setLoaderErrorMes({
                    mess: "Error Initilizing User!",
                    error: 'null'
                });
                return;
            } else {
                const percentage = (res.data.user.currentRank / 10) * 100;
                setUserId(res.data.user._id);
                setTelegramId(res.data.user.telegramId);
                setFirstName(res.data.user.firstName);
                setLastName(res.data.user.lastName);
                setUsername(res.data.user.username);
                setProfilePic(res.data.user.pic);
                setLevel(res.data.user.level);
                setCurrentRank(res.data.currentRank);
                setBalance(res.data.user.balance);
                setEnergy(res.data.user.energy || 1500);
                setEnergyLimit(res.data.user.energyLimit || 1500);
                setLevelPercentage(percentage);
            }
        } catch (error) {
            console.log("Error fetching User", error);
            setLoaderErrorMes({
                mess: "Error Initilizing User! {try-catch}",
                error: error
            });
        } finally {
            setUserDataInitlized(true);
            setLoader(false);
        }
    }

    return (
        <UserContext.Provider value={{
            isModalOpen,
            setModalOpen,
            sendData,
            setSendData,
            tgeToggle,
            setTgeToggle,
            sendTokenData,
            setSendTokenData,
            userId,
            telegramId,
            firstName,
            lastName,
            username,
            profilePic,
            level,
            currentRank,
            levelPercentage,
            setBalance,
            balance,
            setEnergy,
            energy,
            setEnergyLimit,
            energyLimit,
            userDataInitilized,
            setAddCoins,
            addCoins,
            loader,
            loaderErrorMes
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;