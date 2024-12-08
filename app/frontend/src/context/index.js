import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {

    const navigate = useNavigate();

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
    const [profilePic, setProfilePic] = useState('not set');
    const [level, setLevel] = useState(null);
    const [currentRank, setCurrentRank] = useState(null);
    const [balance, setBalance] = useState(0);
    const [tapBalance, setTapBalance] = useState(0);
    const [coinsPerMinute, setCoinsPerMinute] = useState(0);
    const [referrals, setReferrals] = useState([]);
    const [remaningTime, setRemaningTime] = useState(null);

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

    // Leaderboard 

    const [topUsers, setTopUsers] = useState(null);

    // Others 
    const [loader, setLoader] = useState(false);

    const [loaderErrorMes, setLoaderErrorMes] = useState(null);

    const [sendData, setSendData] = useState(false);

    const [sendTokenData, setSendTokenData] = useState(false);

    const [tgeToggle, setTgeToggle] = useState('launchpad');

    const [projectLoader, setProjectLoader] = useState(false);

    const [kolsLoader, setKolsLoader] = useState(false);

    const [tgeProjects, setTgeProjects] = useState();

    const [currentProjects, setCurrentProjects] = useState();

    const [missedProjects, setMissedProjects] = useState();

    const [kols, setKols] = useState([]);

    const [vcs, setVcs] = useState([]);

    const [patners, setPatners] = useState([]);

    const [comboCards, setComboCards] = useState([]);

    useEffect(() => {
        if (!userId) {
            initializeUser();
        }
    }, [])


    // Reamning time updater
    useEffect(() => {
        setRemaningTime(calculateRemainingTime());

        const interval = setInterval(() => {
            const newTime = calculateRemainingTime();
            setRemaningTime(newTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Refill energy over time
    useEffect(() => {
        const interval = setInterval(() => {
            setEnergy(prevEnergy => Math.min(prevEnergy + 1, energyLimit));
        }, 1000);

        return () => clearInterval(interval);
    }, [energy, setEnergy]);

    // Socket connection
    useEffect(() => {
        if (telegramId) {
            const newSocket = io(apiUrl);

            setTimeout(() => {
                newSocket.emit('register', telegramId);
                setSocket(newSocket);
            }, 300)

            newSocket.on('refresh', (user) => {
                setBalance(user.balance);
                setReferrals(user.referrals);
            });

            newSocket.on('levelup', (user) => {
                const percentage = (user.currentRank / 10) * 100;
                setLevelPercentage(percentage);
                setCurrentRank(user.currentRank);
                setLevel(user.level);
            });



            return () => {
                newSocket.disconnect();
            };
        }
    }, [apiUrl, userId]);

    const check1day = (inputDate) => {
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const input = new Date(inputDate);
        const diff = currentDate - input;

        if (diff <= oneDay) {
            return true;
        } else {
            return false;
        }
    };

    const calculateRemainingTime = () => {
        const currentDate = new Date();
        const nextMidnight = new Date(currentDate);

        nextMidnight.setDate(currentDate.getDate() + 1);
        nextMidnight.setHours(0, 0, 0, 0);

        const diff = nextMidnight - currentDate;

        if (diff <= 0) {
            return "00:00:00";
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        let referrerId = null, isPremium = false, profileUrl = "not set";
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
                referrerId = window.Telegram.WebApp.initDataUnsafe.start_param;
            }

            if (referrerId) {
                if (staticUser !== 'true') {
                    const res = await axios.post(`${apiUrl}/user/check-premium`, {
                        telegramId: telegramUser.id
                    });
                    if (res.data.status === 'success') {
                        isPremium = res.data.isPremium;
                    } else {
                        console.log("Error checking premium, ", res.data.message);
                    }
                }
            }

            if (telegramUser) {
                const res = await axios.post(`${apiUrl}/user/fetch-user`, {
                    telegramId: telegramUser.id,
                    firstName: telegramUser.first_name,
                    lastName: telegramUser.last_name,
                    username: telegramUser.username || `${telegramUser.first_name || ''} ${telegramUser.last_name || ''}`.trim(),
                    referrerId: referrerId,
                    isPremium: isPremium
                });

                if (res.data.status === 'success') {
                    initilizeStates(res.data.user);
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

    const initilizeStates = async (user) => {
        try {
            const percentage = (user.currentRank / 10) * 100;
            setUserId(user._id);
            setTelegramId(user.telegramId);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setProfilePic(user.profilePic);
            setLevel(user.level);
            setCurrentRank(user.currentRank + 1);
            setBalance(user.balance);
            setCoinsPerMinute(user.coinsPerMinute.value);
            setReferrals(user.referrals);
            setComboCards(user.comboCards);
            setClaimed(user.dailyReward.claimed);
            if (user.dailyReward.date) {
                const is1Day = check1day(user.dailyReward.date);
                if (is1Day) {
                    setCurrentDay(user.dailyReward.day - 1);
                } else {
                    setCurrentDay(user.dailyReward.day);
                }
            } else {
                setCurrentDay(user.dailyReward.day);
            }
            // 4 boosters
            if (user.unlimitedTaps.status = true) {
                if (user.unlimitedTaps.lastClaimed) {
                    const lastClaimed = new Date(user.unlimitedTaps.lastClaimed);
                    const currentDate = new Date();
                    const timeDifferenceInMilliseconds = currentDate.getTime() - lastClaimed.getTime();
                    if (timeDifferenceInMilliseconds >= 30000) {
                        setDisableEnergy(false);
                        await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                            userId: user._id
                        });
                    } else {
                        setDisableEnergy(true);
                        setTimeout(async () => {
                            setDisableEnergy(false);
                            await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                                userId: user._id
                            });
                        }, timeDifferenceInMilliseconds)
                    }
                }
            } else {
                setDisableEnergy(user.unlimitedTaps.status);
            }
            setAvaliableUnlimitedTaps(user.unlimitedTaps.available);
            setAvaliableEnergyRefill(user.energyRefill.available);
            setEnergy(user.energy.limit);
            setEnergyLevel(user.energy.level);
            setEnergyLimit(user.energy.limit);
            setMultitapLevel(user.multitaps.level);
            setAddCoins(user.multitaps.value);
            setLevelPercentage(percentage);
            navigate('/');
        } catch (error) {
            console.log('Error initializing states!');
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
                        setDisableEnergy(false);
                        const res = await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                            userId: userId
                        });
                        if (res.data.status === 'success') {
                            console.log("Status updated succesfuly!");
                        } else {
                            console.log("Error updating state!");
                        }
                    }, 30000)
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
                initilizeStates(res.data.user);
                return { success: true, mess: res.data.message };
            } else {
                return { success: false, mess: res.data.message };
            }
        } catch (error) {
            console.log("Error claiming daily reward", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const fetchLeaderboardUsers = async () => {
        try {
            setLoader(true);
            console.log("Fetching Top Users...");
            const response = await axios.post(`${apiUrl}/user/fetch-leaderboard`, {
                userId: userId
            });
            if (response.data.status === 'success') {
                setTopUsers(response.data.leaderboard);
            }
        } catch (error) {
            console.log("Internal Server Error!");
            return ({ success: false, message: 'Internal Server Error!' });
        } finally {
            setLoader(false);
        }
    }

    const fetchProjects = async () => {
        try {
            setProjectLoader(true);
            const res = await axios.post(`${apiUrl}/user/fetch-user-projects`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                setCurrentProjects(res.data.projects.current);
                setTgeProjects(res.data.projects.tge);
                setMissedProjects(res.data.projects.missed)
                setProjectLoader(false);
                return ({ success: true, mess: 'projects fetched succesfuly!' });
            } else {
                return ({ success: false, mess: 'Error Fetching Projects!' });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const upgradeProjectLevel = async (projectId) => {
        try {
            const res = await axios.post(`${apiUrl}/user/upgrade-project-level`, {
                userId: userId,
                projectId: projectId
            });
            if (res.data.status === 'success') {
                await fetchProjects();
                setBalance(res.data.balance);
                setCoinsPerMinute(res.data.cpm);
                setComboCards(res.data.comboCards);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const fetchUserProjectDetails = async (projectId) => {
        try {
            const response = await axios.post(`${apiUrl}/user/fetch-projects-details`, {
                userId: userId,
                projectId: projectId
            });
            if (response.data.status === 'success') {
                return ({ success: true, data: response.data });
            } else {
                return ({ success: false, data: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, data: 'Internal Server Error!' });
        }
    }

    const fetchKols = async () => {
        try {
            setKolsLoader(true);
            const res = await axios.post(`${apiUrl}/user/fetch-user-kols`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                setKols(res.data.response);
                setKolsLoader(false);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const upgradeKolsLevel = async (kolId) => {
        try {
            const res = await axios.post(`${apiUrl}/user/upgrade-kol-level`, {
                userId: userId,
                kolId: kolId
            });
            if (res.data.status === 'success') {
                await fetchKols();
                setBalance(res.data.balance);
                setCoinsPerMinute(res.data.cpm);
                setComboCards(res.data.comboCards);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const fetchPatners = async () => {
        try {
            const res = await axios.post(`${apiUrl}/user/fetch-user-patners`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                setPatners(res.data.response);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const upgradePatnerLevel = async (patnerId) => {
        try {
            const res = await axios.post(`${apiUrl}/user/upgrade-patner-level`, {
                userId: userId,
                patnerId: patnerId
            });
            if (res.data.status === 'success') {
                await fetchPatners();
                setBalance(res.data.balance);
                setCoinsPerMinute(res.data.cpm);
                setComboCards(res.data.comboCards);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const fetchVcs = async () => {
        try {
            const res = await axios.post(`${apiUrl}/user/fetch-user-vcs`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                setVcs(res.data.response);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const upgradeVcLevel = async (vcId) => {
        try {
            const res = await axios.post(`${apiUrl}/user/upgrade-vc-level`, {
                userId: userId,
                vcId: vcId
            });
            if (res.data.status === 'success') {
                await fetchVcs();
                setBalance(res.data.balance);
                setCoinsPerMinute(res.data.cpm);
                setComboCards(res.data.comboCards);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const claimProjectTask = async (projectId, taskId) => {
        try {
            const res = await axios.post(`${apiUrl}/user/claim-project-task`, {
                userId: userId,
                projectId: projectId,
                taskId: taskId,
            });
            if (res.data.status === 'success') {
                return ({ success: true, mess: res.data.message, data: res.data });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!");
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    return (
        <UserContext.Provider value={{
            initializeUser,
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
            tapBalance,
            setTapBalance,
            coinsPerMinute,
            referrals,
            topUsers,
            fetchLeaderboardUsers,
            loader,
            setLoader,

            projectLoader,
            currentProjects,
            tgeProjects,
            missedProjects,
            fetchProjects,
            fetchUserProjectDetails,
            upgradeProjectLevel,
            claimProjectTask,

            kols,
            fetchKols,
            upgradeKolsLevel,

            patners,
            fetchPatners,
            upgradePatnerLevel,

            vcs,
            fetchVcs,
            upgradeVcLevel,

            comboCards,

            remaningTime,

        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;