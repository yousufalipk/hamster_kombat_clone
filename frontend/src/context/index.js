import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {

    const staticUser = process.env.REACT_APP_STATIC_USER;

    const apiUrl = process.env.REACT_APP_URL;

    // User States

    const [userDataInitilized, setUserDataInitlized] = useState(false);

    const [socket, setSocket] = useState(null);

    const [userId, setUserId] = useState(null);
    const [telegramId, setTelegramId] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [level, setLevel] = useState(null);
    const [currentRank, setCurrentRank] = useState(null);
    const [balance, setBalance] = useState(0);

    // 4 Boosters 
    const [avaliableUnlimitedTaps, setAvaliableUnlimitedTaps] = useState(0);
    const [avaliableEnergyRefill, setAvaliableEnergyRefill] = useState(0);

    const [energy, setEnergy] = useState(1500);
    const [energyLevel, setEnergyLevel] = useState(0);
    const [energyLimit, setEnergyLimit] = useState(1500);

    const [multitapLevel, setMultitapLevel] = useState(0);
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


    useEffect(() => {
        const newSocket = io(apiUrl);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [apiUrl]);

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
                const tg = window.Telegram.WebApp;
                tg.ready();
                telegramUser = tg.initDataUnsafe?.user;
            }

            if (telegramUser) {
                const res = await axios.post(`${apiUrl}/user/fetch-user`, {
                    telegramId: telegramUser.id,
                    firstName: telegramUser.first_name,
                    lastName: telegramUser.last_name,
                    username: telegramUser.username || `${telegramUser.first_name || ''} ${telegramUser.last_name || ''}`.trim()
                });

                if (res.data.status === 'success') {
                    console.log("I am User Data =======> ", res.data.user);
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

                    // 4 boosters
                    setAvaliableUnlimitedTaps(res.data.user.unlimitedTaps.available);

                    setAvaliableEnergyRefill(res.data.user.energyRefill.available);

                    setEnergy(res.data.user.energy.limit);
                    setEnergyLevel(res.data.user.energy.level);
                    setEnergyLimit(res.data.user.energy.limit);


                    setMultitapLevel(res.data.user.multitaps.level);
                    setAddCoins(res.data.user.multitaps.value);

                    setLevelPercentage(percentage);
                }
            } else {
                setLoaderErrorMes({
                    mess: "Error getting data from telegram!",
                    error: ""
                });
            }
        } catch (error) {
            setLoaderErrorMes({
                mess: "Error Initilizing User!",
                error: ""
            });
        } finally {
            setUserDataInitlized(true);
            setLoader(false);
        }
    }

    const energyUpgrade = async () => {
        try {
            if (energyLevel === 9) {
                console.log('Max level reached!');
                return;
            }
            const res = await axios.post(`${apiUrl}/user/energy-level-upgrade`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Error upgrading energy!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }
    const multitapUpgrade = async () => {
        try {
            if (multitapLevel === 9) {
                console.log('Max level reached!');
                return;
            }
            const res = await axios.post(`${apiUrl}/user/multitap-level-upgrade`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Error upgrading multitaps!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    return (
        <UserContext.Provider value={{
            initializeUser,
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
            energyLevel,
            setEnergyLevel,
            energyLimit,
            setEnergyLimit,
            energy,
            setEnergy,
            userDataInitilized,
            setAddCoins,
            addCoins,
            loader,
            loaderErrorMes,
            socket,
            energyUpgrade,
            multitapUpgrade,
            multitapLevel,
            avaliableUnlimitedTaps,
            avaliableEnergyRefill
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;