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
    const [tapBalance, setTapBalance] = useState(0);

    // 4 Boosters 
    const [disableEnergy, setDisableEnergy] = useState(false);

    const [avaliableUnlimitedTaps, setAvaliableUnlimitedTaps] = useState(0);
    const [avaliableEnergyRefill, setAvaliableEnergyRefill] = useState(0);

    const [energy, setEnergy] = useState(1500);
    const [energyLevel, setEnergyLevel] = useState(0);
    const [energyLimit, setEnergyLimit] = useState(1500);

    const [multitapLevel, setMultitapLevel] = useState(0);
    const [addCoins, setAddCoins] = useState(1);

    const [levelPercentage, setLevelPercentage] = useState();

    // Daily Reward
    const [claimed, setClaimed] = useState([]);
    const [currentDay, setCurrentDay] = useState(null);

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



    // Socket connection
    useEffect(() => {
        const newSocket = io(apiUrl);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [apiUrl]);

    const check1day = (inputDate) => {
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const input = new Date(inputDate);
        const diff = currentDate - input;

        if (diff <= oneDay) {
            console.log("The date is within 1 day!");
            return true;
        } else {
            console.log("The date is outside 1 day.");
            return false;
        }
    };

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
                console.log("ENV", apiUrl);
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
                    setCurrentRank(res.data.user.currentRank);
                    setBalance(res.data.user.balance);

                    // Daily Reward 
                    setClaimed(res.data.user.dailyReward.claimed);

                    console.log(res.data.user.dailyReward.date)

                    if (res.data.user.dailyReward.date) {
                        const is1Day = check1day(res.data.user.dailyReward.date);
                        if (is1Day) {
                            console.log("Day 0 is going on");
                            setCurrentDay(res.data.user.dailyReward.day - 1);
                        } else {
                            console.log("is not 1 day means next day started");
                            setCurrentDay(res.data.user.dailyReward.day);
                        }
                    } else {
                        setCurrentDay(res.data.user.dailyReward.day);
                    }

                    // 4 boosters
                    if (res.data.user.unlimitedTaps.status = true) {
                        if (res.data.user.unlimitedTaps.lastClaimed) {
                            const lastClaimed = new Date("2024-10-26T11:16:55.480Z");
                            const currentDate = new Date();

                            // Calculate the difference in milliseconds
                            const timeDifferenceInMilliseconds = currentDate.getTime() - lastClaimed.getTime();

                            if (timeDifferenceInMilliseconds >= 120000) {
                                setDisableEnergy(false);
                                const response = await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                                    userId: res.data.user._id
                                });
                                if (response.data.status === 'success') {
                                    console.log("Status updated succesfuly!");
                                } else {
                                    console.log("Error updating state!");
                                }
                            } else {
                                setTimeout(async () => {
                                    setDisableEnergy(false);
                                    const response = await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                                        userId: res.data.user._id
                                    });
                                    if (response.data.status === 'success') {
                                        console.log("Status updated succesfuly!");
                                    } else {
                                        console.log("Error updating state!");
                                    }
                                }, timeDifferenceInMilliseconds)
                            }
                            console.log("Difference in milliseconds:", timeDifferenceInMilliseconds);
                        }
                    } else {
                        setDisableEnergy(res.data.user.unlimitedTaps.status);
                    }

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
            console.log("Error initlitializing user", error);
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

    const energyRefillUpgrade = async () => {
        try {
            if (energy === energyLimit) {
                return { success: false, mess: 'Energy already maxed!' }
            }
            if (avaliableEnergyRefill === 0) {
                return { success: false, mess: 'Refill Limit Reached!' }
            } else {
                const res = await axios.post(`${apiUrl}/user/refill-energy`, {
                    userId: userId
                });

                if (res.data.status === 'success') {
                    setAvaliableEnergyRefill((prevRefill) => prevRefill - 1);
                    setEnergy(energyLimit);
                    return { success: true, mess: res.data.message };
                } else {
                    return { success: false, mess: res.data.message };
                }
            }
        } catch (error) {
            console.log("Error upgrading multitaps!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const unlimitedTapsUpgrade = async () => {
        try {
            if (avaliableUnlimitedTaps === 0) {
                return {
                    success: false, mess: 'Unlimited Taps Limit Reached!'
                }
            } else {
                const res = await axios.post(`${apiUrl}/user/claim-unlimited-taps`, {
                    userId: userId
                });

                if (res.data.status === 'success') {
                    setDisableEnergy(true);
                    setAvaliableUnlimitedTaps((prevTaps) => prevTaps - 1);
                    setTimeout(async () => {
                        console.log("Reseting status after 2 minutes!");
                        setDisableEnergy(false);
                        const res = await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                            userId: userId
                        });
                        if (res.data.status === 'success') {
                            console.log("Status updated succesfuly!");
                        } else {
                            console.log("Error updating state!");
                        }
                    }, 120000)
                    return { success: true, mess: res.data.message };
                } else {
                    return { success: false, mess: res.data.message };
                }
            }
        } catch (error) {
            console.log("Error upgrading unlimited taps!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const claimDailyReward = async () => {
        try {
            const res = await axios.post(`${apiUrl}/user/claim-daily-reward`, {
                userId: userId
            });

            if (res.data.status === 'success') {
                return { success: true, mess: res.data.message };
            } else {
                return { success: false, mess: res.data.message };
            }
        } catch (error) {
            console.log("Error claiming daily reward", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        } finally {
            initializeUser();
        }
    }

    const updateBalance = async (tapBalance) => {
        try {
            const res = await axios.post(`${apiUrl}/update-balance`, {
                userId: userId,
                tapBalance: tapBalance
            });

            if (res.data.status === 'success') {
                return { success: true, mess: res.data.message };
            } else {
                return { success: false, mess: res.data.message };
            }
        } catch (error) {
            console.log("Error updating balance", error);
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
            avaliableEnergyRefill,
            energyRefillUpgrade,
            unlimitedTapsUpgrade,
            disableEnergy,
            claimed,
            currentDay,
            claimDailyReward,
            updateBalance,
            tapBalance,
            setTapBalance
        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;