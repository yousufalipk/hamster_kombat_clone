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
    const [levelName, setLevelName] = useState(null);
    const [balance, setBalance] = useState(0);
    const [tapBalance, setTapBalance] = useState(0);
    const [coinsPerMinute, setCoinsPerMinute] = useState(0);
    const [referrals, setReferrals] = useState([]);
    const [remaningTime, setRemaningTime] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);

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

    const [playComboAnimation, setPlayComboAnimation] = useState(false);

    useEffect(() => {
        console.log('Play Combo Animation', playComboAnimation);
    }, [playComboAnimation])

    useEffect(() => {
        const updateAllTimeBalance = async () => {
            if (userId) {
                try {
                    const res = await axios.post(`${apiUrl}/user/update-all-time-balance`, {
                        userId: userId,
                        balance: balance,
                    });
                    if (res.data.status === 'success') {
                        console.log('All Time Balance Updated Successfully!');
                    } else {
                        console.log('Error setting all time balance');
                    }
                } catch (error) {
                    console.log('Error updating all time balance!', error);
                }
            }
        };
        updateAllTimeBalance();
    }, [balance]);

    useEffect(() => {
        if (userSocialTasks.length === 0 && userDailyTasks.length === 0) {
            fetchUserTask();
        }
        if (inviteFriends.length === 0) {
            fetchInviteFriends();
        }
    }, [userId]);

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

    const [patnerLoader, setPatnerLoader] = useState(false);

    const [vcLoader, setVcLoader] = useState(false);

    const [tgeProjects, setTgeProjects] = useState();

    const [currentProjects, setCurrentProjects] = useState();

    const [missedProjects, setMissedProjects] = useState();

    const [kols, setKols] = useState([]);

    const [vcs, setVcs] = useState([]);

    const [patners, setPatners] = useState([]);

    const [comboCards, setComboCards] = useState([]);

    const [userSocialTasks, setUserSocialTasks] = useState([]);

    const [userDailyTasks, setUserDailyTasks] = useState([]);

    const [userPatnerTask, setUserPatnerTask] = useState([]);

    const [inviteFriends, setInviteFriends] = useState([]);

    const [avaliableCpm, setAvaliableCpm] = useState(0);

    const [rankLoader, setRankLoader] = useState(false);

    const [mainLoader, setMainLoader] = useState(false);

    const levelsData = [
        { id: 1, name: 'Adventurous', rangeFrom: 0, rangeTo: 5000 },
        { id: 2, name: 'Energetic', rangeFrom: 5000, rangeTo: 50000 },
        { id: 3, name: 'Rockstar', rangeFrom: 50000, rangeTo: 250000 },
        { id: 4, name: 'Astronaut', rangeFrom: 250000, rangeTo: 500000 },
        { id: 5, name: 'Super Hero', rangeFrom: 500000, rangeTo: 1000000 },
        { id: 6, name: 'Detective', rangeFrom: 1000000, rangeTo: 2500000 },
        { id: 7, name: 'Ninja', rangeFrom: 2500000, rangeTo: 5000000 },
        { id: 8, name: 'Pirate', rangeFrom: 5000000, rangeTo: 20000000 },
        { id: 9, name: 'Samurai Panda', rangeFrom: 20000000, rangeTo: 50000000 },
        { id: 10, name: 'Tapster', rangeFrom: 50000000, rangeTo: 150000000 },
        { id: 11, name: 'Tech Genius', rangeFrom: 150000000, rangeTo: 500000000 },
        { id: 12, name: 'Cyber Warrior', rangeFrom: 500000000, rangeTo: 1000000000 },
        { id: 13, name: 'Flare', rangeFrom: 1000000000, rangeTo: 3000000000 },
        { id: 14, name: 'The Crypto', rangeFrom: 3000000000, rangeTo: 'max' },
    ];

    const energyUpgradeCost = [0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000, 1024000, 2048000, 4096000, 8192000, 16384000, 32768000];
    const energyLimits = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000];

    const multitapUpgradeCost = [0, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000, 1024000, 2048000, 4096000, 8192000, 16384000, 32768000];
    const multitapValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    const formatNumberWithSuffix = (value, decimals = 2) => {
        if (value === null || value === undefined || isNaN(value)) return '0';

        const absValue = Math.abs(value);
        let formattedValue = value;

        if (absValue >= 1e12) {
            formattedValue = `${(value / 1e12).toFixed(decimals)}T`;
        } else if (absValue >= 1e9) {
            formattedValue = `${(value / 1e9).toFixed(decimals)}B`;
        } else if (absValue >= 1e6) {
            formattedValue = `${(value / 1e6).toFixed(decimals)}M`;
        } else if (absValue >= 1e3) {
            formattedValue = `${(value / 1e3).toFixed(decimals)}K`;
        } else {
            formattedValue = value.toFixed(decimals);
        }

        return formattedValue;
    };

    const formatCpm = (value) => {
        if (isNaN(value)) {
            return "Invalid input";
        }
        return parseFloat(value).toFixed(2);
    }

    const formatBalance = (balance) => {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balance);
    };

    useEffect(() => {
        if (!userId) {
            initializeUser();
        }
    }, [])

    // Reamning time updater
    useEffect(() => {
        const fetchRemainingTime = async () => {
            const time = await calculateRemainingTime();
            setRemaningTime(time);
        };

        fetchRemainingTime();

        const interval = setInterval(() => {
            fetchRemainingTime();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                const percentage = ((user.level + 1) / levelsData.length) * 100;
                setLevelPercentage(percentage);
                setLevel(user.level + 1);
                setLevelName(levelsData[user.level].name);
            });



            return () => {
                newSocket.disconnect();
            };
        }
    }, [apiUrl, userId]);

    const checkSameDate = async (inputDate) => {
        let timestamp;
        const res = await axios.get(`${apiUrl}/user/get-server-timestamp`);
        if (res.data.status === 'success') {
            timestamp = res.data.serverTime.dateTime;
        }

        const currentDate = new Date(timestamp);
        const input = new Date(inputDate);

        const normalizedCurrentDate = currentDate.toISOString().split('T')[0];
        const normalizedInputDate = input.toISOString().split('T')[0];

        if (normalizedCurrentDate === normalizedInputDate) {
            return true;
        } else {
            return false;
        }
    };

    const calculateRemainingTime = async () => {
        let timestamp;
        const res = await axios.get(`${apiUrl}/user/get-server-timestamp`);

        if (res.data.status === 'success') {
            timestamp = res.data.serverTime.dateTime;
        }

        const currentDate = new Date(timestamp);
        const utcCurrentDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds()));

        const nextMidnight = new Date(utcCurrentDate);
        nextMidnight.setUTCDate(utcCurrentDate.getUTCDate() + 1);
        nextMidnight.setUTCHours(0, 0, 0, 0);

        const diff = nextMidnight - utcCurrentDate;

        if (diff <= 0) {
            return "00:00:00";
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return timeString;
    };

    // Initilize User
    const initializeUser = async () => {
        let referrerId = null, isPremium = false, profileUrl = "not set";
        setMainLoader(true);
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
                    if (res.data.cpm) {
                        setAvaliableCpm(res.data.balanceToAdd);
                        initilizeStates(res.data.user);
                    } else {
                        initilizeStates(res.data.user);
                    }
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
        }
    }

    const initilizeStates = async (user) => {
        try {
            const percentage = ((user.level + 1) / levelsData.length) * 100;
            setUserId(user._id);
            setTelegramId(user.telegramId);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setProfilePic(user.profilePic);
            setLevel(user.level + 1);
            setLevelName(levelsData[user.level].name);
            setBalance(user.balance);
            setCoinsPerMinute(user.coinsPerMinute.value);
            setReferrals(user.referrals);
            setComboCards(user.comboCards);
            setClaimed(user.dailyReward.claimed);

            if (user.dailyReward.date) {
                const is1Day = await checkSameDate(user.dailyReward.date);
                console.log('Check Day!', is1Day);
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
                        setAddCoins(user.multitaps.value);
                        await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                            userId: user._id
                        });
                    } else {
                        setDisableEnergy(true);
                        const tempAddCoinValue = user.multitaps.value * 2;
                        setAddCoins(tempAddCoinValue);
                        setTimeout(async () => {
                            setDisableEnergy(false);
                            const tempAddCoinValue = user.multitaps.value;
                            setAddCoins(tempAddCoinValue);
                            await axios.post(`${apiUrl}/user/toggle-unlimited-taps-status`, {
                                userId: user._id
                            });
                        }, timeDifferenceInMilliseconds)
                    }
                } else {
                    setAddCoins(user.multitaps.value);
                }
            } else {
                setAddCoins(user.multitaps.value);
                setDisableEnergy(user.unlimitedTaps.status);
            }
            setAvaliableUnlimitedTaps(user.unlimitedTaps.available);
            setAvaliableEnergyRefill(user.energyRefill.available);
            setEnergyLevel(user.energy.level);
            setEnergyLimit(user.energy.limit);
            setMultitapLevel(user.multitaps.level);
            setLevelPercentage(percentage);
            navigate('/');
        } catch (error) {
            console.log('Error initializing states!');
        }
    }

    const energyUpgrade = async () => {
        try {
            if (energyLevel === energyLimits.length - 1) {
                console.log('Max level reached!');
                return;
            }
            const res = await axios.post(`${apiUrl}/user/energy-level-upgrade`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                await initilizeStates(res.data.user);
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
            if (multitapLevel === multitapValues.length - 1) {
                console.log('Max level reached!');
                return;
            }
            const res = await axios.post(`${apiUrl}/user/multitap-level-upgrade`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                await initilizeStates(res.data.user);
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
                    setAddCoins((prevAddCoin) => prevAddCoin * 2);
                    setAvaliableUnlimitedTaps((prevTaps) => prevTaps - 1);
                    setTimeout(async () => {
                        setDisableEnergy(false);
                        setAddCoins((prevAddCoin) => prevAddCoin / 2);
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
            setRankLoader(true);
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
            setRankLoader(false);
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
                if (res.data.playAnimation) {
                    setPlayComboAnimation(res.data.playAnimation);
                    setTimeout(() => {
                        setPlayComboAnimation(null);
                    }, 10000) // 10 sec
                }
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
                setBalance(res.data.balance);
                setCoinsPerMinute(res.data.cpm);
                setComboCards(res.data.comboCards);
                // Updated Kol Data in kols array 

                const updatedKol = res.data.updatedKol;

                setKols((prevKols) =>
                    prevKols.map((kol) =>
                        kol._id === updatedKol._id ? { ...kol, ...updatedKol } : kol
                    )
                );

                if (res.data.playAnimation) {
                    setPlayComboAnimation(res.data.playAnimation);
                    setTimeout(() => {
                        setPlayComboAnimation(null);
                    }, 10000) // 10 sec
                }
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
            setPatnerLoader(true);
            const res = await axios.post(`${apiUrl}/user/fetch-user-patners`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                setPatners(res.data.response);
                setPatnerLoader(false);
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
                setBalance(res.data.balance);
                setCoinsPerMinute(res.data.cpm);
                setComboCards(res.data.comboCards);

                const updatedPatner = res.data.updatedPatner;

                setPatners((prevPatners) =>
                    prevPatners.map((patner) =>
                        patner._id === updatedPatner._id ? { ...patner, ...updatedPatner } : patner
                    )
                );

                if (res.data.playAnimation) {
                    setPlayComboAnimation(res.data.playAnimation);
                    setTimeout(() => {
                        setPlayComboAnimation(null);
                    }, 10000) // 10 sec
                }
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
            setVcLoader(true);
            const res = await axios.post(`${apiUrl}/user/fetch-user-vcs`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                setVcs(res.data.response);
                setVcLoader(false);
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
                setBalance(res.data.balance);
                setCoinsPerMinute(res.data.cpm);
                setComboCards(res.data.comboCards);

                // Updated Vc Data in kols array 

                const updatedVc = res.data.updatedVc;

                setVcs((prevVcs) =>
                    prevVcs.map((vc) =>
                        vc._id === updatedVc._id ? { ...vc, ...updatedVc } : vc
                    )
                );

                if (res.data.playAnimation) {
                    setPlayComboAnimation(res.data.playAnimation);
                    setTimeout(() => {
                        setPlayComboAnimation(null);
                    }, 10000) // 10 sec
                }
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

    const claimUserTask = async (taskId, taskType) => {
        try {
            const res = await axios.post(`${apiUrl}/user/claim-user-task`, {
                userId: userId,
                taskId: taskId,
                taskType: taskType
            });
            if (res.data.status === 'success') {
                return ({ success: true, mess: res.data.message, data: res.data });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const fetchUserTask = async () => {
        try {
            const res = await axios.post(`${apiUrl}/user/fetch-user-tasks`, {
                userId: userId,
            })
            if (res.data.status === 'success') {
                console.log('RESPONSE ', res.data);
                setUserSocialTasks(res.data.socialTasks);
                setUserDailyTasks(res.data.dailyTasks);
                setUserPatnerTask(res.data.partnerTasks);
                return ({ success: true, data: res.data.tasks, daily: res.data.dailyTasks, social: res.data.socialTasks, partner: res.data.partnerTasks });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const fetchInviteFriends = async () => {
        try {
            const res = await axios.post(`${apiUrl}/user/fetch-invite-friends`, {
                userId: userId
            });
            if (res.data.status === 'success') {
                setInviteFriends(res.data.inviteFriendsTasks);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!");
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const claimInviteFriendTask = async (rewardId) => {
        try {
            const res = await axios.post(`${apiUrl}/user/claim-refferal-reward`, {
                userId: userId,
                rewardId: rewardId
            });
            if (res.data.status === 'success') {
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!");
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const claimCpmCoins = async () => {
        try {
            const res = await axios.post(`${apiUrl}/user/claim-cpm`, {
                userId: userId,
                balanceToAdd: avaliableCpm
            });
            if (res.data.status === 'success') {
                setBalance(res.data.balance);
                setAvaliableCpm(0);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error");
            return ({ success: true, mess: "Internal Server Error!" });
        }
    }

    const updateWalletAddressToDb = async (walletAddress) => {
        try {
            const res = await axios.post(`${apiUrl}/user/update-wallet-address`, {
                userId: userId,
                walletAddress: walletAddress || null
            });
            if (res.data.status === 'success') {
                return ({ success: false, mess: 'Wallet Connected Succesfuly!' })
            } else {
                return ({ success: false, mess: 'Error Connecting Wallet!' })
            }
        } catch (error) {
            console.log('Internal Server Error!');
            return ({ success: false, mess: 'Internal Server Error!' })
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
            levelName,
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
            kolsLoader,

            patners,
            fetchPatners,
            upgradePatnerLevel,
            patnerLoader,

            vcs,
            fetchVcs,
            upgradeVcLevel,
            vcLoader,

            comboCards,

            remaningTime,

            claimUserTask,
            fetchUserTask,
            userSocialTasks,
            setUserSocialTasks,
            userDailyTasks,
            setUserDailyTasks,
            setUserPatnerTask,
            userPatnerTask,

            fetchInviteFriends,
            inviteFriends,
            setInviteFriends,
            claimInviteFriendTask,

            avaliableCpm,
            claimCpmCoins,
            setAvaliableCpm,
            levelsData,

            walletAddress,
            setWalletAddress,
            updateWalletAddressToDb,

            rankLoader,
            setRankLoader,

            mainLoader,
            setMainLoader,

            formatBalance,
            formatNumberWithSuffix,
            formatCpm,

            playComboAnimation,

            energyUpgradeCost,
            energyLimits,
            multitapUpgradeCost,
            multitapValues

        }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContext;