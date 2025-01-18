import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { Await, useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const [page, setPage] = useState('dashboard');

    const [userId, setUserId] = useState(null);

    const [username, setUsername] = useState(null);

    const [userType, setUserType] = useState(null);

    const [isAuth, setAuth] = useState(null);

    const [loading, setLoading] = useState(false);

    const [sendData, setSendData] = useState(null);

    const [projects, setProjects] = useState(null);

    const [patners, setPatners] = useState(null);

    const [kols, setKols] = useState(null);

    const [vcs, setVcs] = useState(null);

    const [projectTasks, setProjectTasks] = useState([]);

    const [twoComboCards, setTwoComboCards] = useState([]);

    const [socialTasks, setSocialTasks] = useState([]);

    const [dailyTasks, setDailyTasks] = useState([]);

    const [patnerTasks, setPatnerTasks] = useState([]);

    const refreshAuth = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            setLoading(true);
            const response = await axios.post(`${apiUrl}/refresh`, {
                originalRefreshToken: refreshToken
            });

            if (response.data.status === 'success') {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                setUserId(response.data.user._id);
                setAuth(response.data.auth);
                setUsername(`${response.data.user.fname} ${response.data.user.lname}`);
                setUserType(response.data.user.userType);
            }
            else {
                localStorage.setItem('accessToken', '');
                localStorage.setItem('refreshToken', '');
                setAuth(false);
                setUsername(null);
                setUserId(null);
                setUserType(null);
            }
        } catch (error) {
            console.log("Internal Server Error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            refreshAuth();
            navigate('/');
        }
    }, []);

    const registerUser = async (fname, lname, email, password, confirmPassword, tick) => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/register-user`, {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                tick: tick
            }, {
                withCredentials: true
            })
            if (!tick) {
                return { success: true };
            }
            else {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                setUserId(response.data.user._id);
                setAuth(response.data.auth);
                setUsername(`${response.data.user.fname} ${response.data.user.lname}`);
                setUserType('user');
                return { success: true };
            }
        } catch (error) {
            console.error("Error during registration:", error);
            return { success: false, message: "Error creating user!" };
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/login-user`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })

            console.log('Response 1', response.data);

            if (response.data.status === 'success') {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                setUserId(response.data.user._id);
                setAuth(response.data.auth);
                setUsername(`${response.data.user.fname} ${response.data.user.lname}`);
                setUserType(response.data.user.userType);
                return { success: true };
            }
        } catch (error) {
            console.error("Error logging in:", error);
            return { success: false, message: "Error logging in!" };
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            return
        }
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/logout-user`, {
                refreshToken: refreshToken
            });

            if (response.data.status === 'success') {
                localStorage.setItem('accessToken', '');
                localStorage.setItem('refreshToken', '');
                setAuth(false);
                setUserId(null);
                setUsername(null);
                setUserType(null);
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (error) {
            console.error("Error logging out:", error);
            return { success: false, message: "Error logging out!" };
        } finally {
            setLoading(false);
        }
    };

    // Project Functions

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${apiUrl}/project/fetch`);
            if (response.data.status === 'success') {
                setProjects(response.data.projects);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const createProject = async (data) => {
        const numberOfLevel = parseFloat(data.numberOfLevel);
        const baseCost = parseFloat(data.baseCost);
        const baseReward = parseFloat(data.baseReward);
        const baseCpm = parseFloat(data.baseCpm);
        const costMultiplier = parseFloat(data.costMultiplier);
        const rewardMultiplier = parseFloat(data.rewardMultiplier);
        const cpmMultiplier = parseFloat(data.cpmMultiplier);
        try {
            const response = await axios.post(`${apiUrl}/project/create`, {
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                lineFromColor: data.lineFromColor,
                lineToColor: data.lineToColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseReward: baseReward,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    rewardMultiplier: rewardMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchProjects();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const updateProject = async (data, id) => {
        const numberOfLevel = parseFloat(data.numberOfLevel, 10);
        const baseCost = parseFloat(data.baseCost, 10);
        const baseReward = parseFloat(data.baseReward, 10);
        const baseCpm = parseFloat(data.baseCpm, 10);
        const costMultiplier = parseFloat(data.costMultiplier, 10);
        const rewardMultiplier = parseFloat(data.rewardMultiplier, 10);
        const cpmMultiplier = parseFloat(data.cpmMultiplier, 10);
        try {
            const response = await axios.post(`${apiUrl}/project/update`, {
                projectId: id,
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                lineFromColor: data.lineFromColor,
                lineToColor: data.lineToColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseReward: baseReward,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    rewardMultiplier: rewardMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchProjects();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const deleteProject = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/project/remove`, {
                data: {
                    projectId: id
                }
            });

            if (response.data.status === 'success') {
                setProjects((prevData) => prevData.filter((project) => project._id !== id));
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const toggleProjectCombo = async (projectId) => {
        try {
            const response = await axios.post(`${apiUrl}/project/toogle-combo-card`, {
                projectId: projectId,
            });

            if (response.data.status === 'success') {
                const updatedProject = response.data.project;

                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project._id === projectId
                            ? { ...project, card: updatedProject.card }
                            : project
                    )
                );

                return { success: true, mess: response.data.message };
            } else {
                return { success: false, mess: response.data.message };
            }
        } catch (error) {
            console.error("Error toggling project combo card:", error);
            return { success: false, mess: 'Internal Server Error!' };
        }
    };

    const fetchProjectTasks = async (projectId) => {
        try {
            const res = await axios.post(`${apiUrl}/project/fetch-project-task`, {
                projectId: projectId
            });
            if (res.data.status === 'success') {
                console.log("Project Tasks", res.data.tasks);
                setProjectTasks(res.data.tasks);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const addProjectTask = async (projectId, taskType, iconType, title, link, reward) => {
        try {
            const res = await axios.post(`${apiUrl}/project/add-project-task`, {
                projectId: projectId,
                taskType: taskType,
                iconType: iconType,
                title: title,
                link: link,
                reward: reward
            });
            if (res.data.status === 'success') {
                fetchProjectTasks(projectId);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const removeProjectTask = async (projectId, taskId) => {
        try {
            const res = await axios.post(`${apiUrl}/project/remove-project-task`, {
                projectId: projectId,
                taskId: taskId
            });
            if (res.data.status === 'success') {
                fetchProjectTasks(projectId);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const updateProjectTask = async (projectId, taskId, newTaskType, newIconType, newTitle, newLink, newReward) => {
        try {
            const res = await axios.post(`${apiUrl}/project/update-project-task`, {
                projectId: projectId,
                taskId: taskId,
                newTaskType: newTaskType,
                newIconType: newIconType,
                newTitle: newTitle,
                newLink: newLink,
                newReward: newReward,
            });
            if (res.data.status === 'success') {
                setProjectTasks(prevTasks =>
                    prevTasks.map(task =>
                        task._id === taskId
                            ? { ...task, iconType: newIconType, title: newTitle, link: newLink, reward: newReward }
                            : task
                    )
                );
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const addTgeDate = async (projectId, tgeDate) => {
        try {
            const res = await axios.post(`${apiUrl}/project/add-tge-date`, {
                projectId: projectId,
                tgeDate: tgeDate
            });
            if (res.data.status === 'success') {
                fetchProjects();
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error' })
        }
    }

    // Kols Functions 

    const fetchKols = async () => {
        try {
            const response = await axios.get(`${apiUrl}/kols/fetch-kol`);
            if (response.data.status === 'success') {
                setKols(response.data.kols);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const createKol = async (data) => {
        const numberOfLevel = parseFloat(data.numberOfLevel, 10);
        const baseCost = parseFloat(data.baseCost, 10);
        const baseCpm = parseFloat(data.baseCpm, 10);
        const costMultiplier = parseFloat(data.costMultiplier, 10);
        const cpmMultiplier = parseFloat(data.cpmMultiplier, 10);
        try {
            const response = await axios.post(`${apiUrl}/kols/add-kol`, {
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                logo: {
                    name: data.logo.name,
                    data: data.logo.data,
                    contentType: data.logo.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchKols();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const updateKol = async (data, id) => {
        const numberOfLevel = parseFloat(data.numberOfLevel, 10);
        const baseCost = parseFloat(data.baseCost, 10);
        const baseCpm = parseFloat(data.baseCpm, 10);
        const costMultiplier = parseFloat(data.costMultiplier, 10);
        const cpmMultiplier = parseFloat(data.cpmMultiplier, 10);
        try {
            const response = await axios.post(`${apiUrl}/kols/update-kol`, {
                kolId: id,
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                logo: {
                    name: data.logo.name,
                    data: data.logo.data,
                    contentType: data.logo.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchKols();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const deleteKol = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/kols/remove-kol`, {
                data: {
                    kolId: id
                }
            });

            if (response.data.status === 'success') {
                setKols((prevKols) => prevKols.filter((kol) => kol._id !== id));
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    // Patners Functions 

    const fetchPathners = async () => {
        try {
            const response = await axios.get(`${apiUrl}/patners/fetch-patner`);
            if (response.data.status === 'success') {
                setPatners(response.data.patners);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const createPatner = async (data) => {
        const numberOfLevel = parseFloat(data.numberOfLevel, 10);
        const baseCost = parseFloat(data.baseCost, 10);
        const baseCpm = parseFloat(data.baseCpm, 10);
        const costMultiplier = parseFloat(data.costMultiplier, 10);
        const cpmMultiplier = parseFloat(data.cpmMultiplier, 10);
        try {
            const response = await axios.post(`${apiUrl}/patners/add-patner`, {
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                logo: {
                    name: data.logo.name,
                    data: data.logo.data,
                    contentType: data.logo.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchPathners();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const updatePatner = async (data, id) => {
        const numberOfLevel = parseFloat(data.numberOfLevel, 10);
        const baseCost = parseFloat(data.baseCost, 10);
        const baseCpm = parseFloat(data.baseCpm, 10);
        const costMultiplier = parseFloat(data.costMultiplier, 10);
        const cpmMultiplier = parseFloat(data.cpmMultiplier, 10);
        try {
            const response = await axios.post(`${apiUrl}/patners/update-patner`, {
                patnerId: id,
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                logo: {
                    name: data.logo.name,
                    data: data.logo.data,
                    contentType: data.logo.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchPathners();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const deletePatner = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/patners/remove-patner`, {
                data: {
                    patnerId: id
                }
            });

            if (response.data.status === 'success') {
                setPatners((prevPatner) => prevPatner.filter((patner) => patner._id !== id));
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    // Vcs Functions 

    const fetchVcs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/vcs/fetch-vc`);
            if (response.data.status === 'success') {
                console.log("VCS", response.data.vcs);
                setVcs(response.data.vcs);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const createVc = async (data) => {
        const numberOfLevel = parseFloat(data.numberOfLevel, 10);
        const baseCost = parseFloat(data.baseCost, 10);
        const baseCpm = parseFloat(data.baseCpm, 10);
        const costMultiplier = parseFloat(data.costMultiplier, 10);
        const cpmMultiplier = parseFloat(data.cpmMultiplier, 10);
        try {
            const response = await axios.post(`${apiUrl}/vcs/add-vc`, {
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                logo: {
                    name: data.logo.name,
                    data: data.logo.data,
                    contentType: data.logo.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchVcs();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const updateVc = async (data, id) => {
        const numberOfLevel = parseFloat(data.numberOfLevel, 10);
        const baseCost = parseFloat(data.baseCost, 10);
        const baseCpm = parseFloat(data.baseCpm, 10);
        const costMultiplier = parseFloat(data.costMultiplier, 10);
        const cpmMultiplier = parseFloat(data.cpmMultiplier, 10);
        try {
            const response = await axios.post(`${apiUrl}/vcs/update-vc`, {
                vcId: id,
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                logo: {
                    name: data.logo.name,
                    data: data.logo.data,
                    contentType: data.logo.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor,
                numberOfLevel: numberOfLevel,
                baseValues: {
                    baseCost: baseCost,
                    baseCpm: baseCpm
                },
                multipliers: {
                    costMultiplier: costMultiplier,
                    cpmMultiplier: cpmMultiplier
                }
            });
            if (response.data.status === 'success') {
                await fetchVcs();
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    };

    const deleteVc = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/vcs/remove-vc`, {
                data: {
                    vcId: id
                }
            });

            if (response.data.status === 'success') {
                setVcs((prevPatner) => prevPatner.filter((patner) => patner._id !== id));
                return ({ success: true, mess: response.data.message });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const fetchTwoComboCards = async () => {
        try {
            const res = await axios.get(`${apiUrl}/fetch-dailyComboCard`);
            if (res.data.status === 'success') {
                setTwoComboCards(res.data.data);
                return ({ success: true, mess: 'Card data fetched!' });
            } else {
                return ({ success: false, mess: 'Error fetching card data!' });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    //Tasks Function 

    const fetchSocialTasks = async () => {
        try {
            const res = await axios.get(`${apiUrl}/task/fetch-social`);
            console.log("social Takss", res.data);
            if (res.data.status === 'success') {
                setSocialTasks(res.data.socialTasks);
            }
        } catch (error) {
            console.log("Error fetching social tasks");
            return ({ success: false, mess: "Internal Server Error!" });
        }
    }

    const fetchDailyTasks = async () => {
        try {
            const res = await axios.get(`${apiUrl}/task/fetch-daily`);
            if (res.data.status === 'success') {
                console.log("Daily Takss", res.data.dailyTasks);
                setDailyTasks(res.data.dailyTasks);
            }
        } catch (error) {
            console.log("Error fetching daily tasks");
            return ({ success: false, mess: "Internal Server Error!" });
        }
    }

    const fetchPatnerTasks = async () => {
        try {
            const res = await axios.get(`${apiUrl}/task/fetch-patner`);
            if (res.data.status === 'success') {
                setPatnerTasks(res.data.patnerTasks);
            }
        } catch (error) {
            console.log("Error fetching daily tasks");
            return ({ success: false, mess: "Internal Server Error!" });
        }
    }

    const addTask = async (taskType, iconType, title, link, reward, priority) => {
        console.log('Priority', priority);
        try {
            let res;
            if (taskType === 'social') {
                res = await axios.post(`${apiUrl}/task/create-social`, {
                    taskType: taskType,
                    iconType: iconType,
                    title: title,
                    link: link,
                    reward: reward,
                    priority: priority
                });
                if (res.data.status === 'success') {
                    await fetchSocialTasks();
                    return ({ success: true, mess: res.data.message });
                } else {
                    return ({ success: false, mess: res.data.message });
                }
            } else if (taskType === 'daily') {
                res = await axios.post(`${apiUrl}/task/create-daily`, {
                    taskType: taskType,
                    iconType: iconType,
                    title: title,
                    link: link,
                    reward: reward,
                    priority: priority
                });
                if (res.data.status === 'success') {
                    await fetchDailyTasks();
                    return ({ success: true, mess: res.data.message });
                } else {
                    return ({ success: false, mess: res.data.message });
                }
            } else if (taskType === 'partner') {
                res = await axios.post(`${apiUrl}/task/create-partner`, {
                    taskType: taskType,
                    iconType: iconType,
                    title: title,
                    link: link,
                    reward: reward,
                    priority: priority
                });
                if (res.data.status === 'success') {
                    await fetchPatnerTasks();
                    return ({ success: true, mess: res.data.message });
                } else {
                    return ({ success: false, mess: res.data.message });
                }
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error' })
        }
    }

    const updateTask = async (task, taskType, title, link, reward, priority) => {
        try {
            if (taskType === 'social') {
                const res = await axios.post(`${apiUrl}/task/update-social`, {
                    taskId: task._id,
                    newTaskTitle: title,
                    newTaskLink: link,
                    newTasksReward: reward,
                    newPriority: priority
                });
                if (res.data.status === 'success') {
                    setSocialTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === res.data.task._id ? res.data.task : task
                        )
                    );
                    return ({ success: true, mess: res.data.message });
                } else {
                    return ({ success: false, mess: res.data.message });
                }
            } else if (taskType === 'daily') {
                const res = await axios.post(`${apiUrl}/task/update-daily`, {
                    taskId: task._id,
                    newTaskTitle: title,
                    newTaskLink: link,
                    newTasksReward: reward,
                    newPriority: priority
                });
                if (res.data.status === 'success') {
                    setDailyTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === res.data.task._id ? res.data.task : task
                        )
                    );
                    return ({ success: true, mess: res.data.message });
                } else {
                    return ({ success: false, mess: res.data.message });
                }
            } else if (taskType === 'partner') {
                const res = await axios.post(`${apiUrl}/task/update-partner`, {
                    taskId: task._id,
                    newTaskTitle: title,
                    newTaskLink: link,
                    newTasksReward: reward,
                    newPriority: priority
                });
                if (res.data.status === 'success') {
                    setPatnerTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === res.data.task._id ? res.data.task : task
                        )
                    );
                    return ({ success: true, mess: res.data.message });
                } else {
                    return ({ success: false, mess: res.data.message });
                }
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error' })
        }
    }

    const removeTask = async (taskId, taskType) => {
        try {
            const res = await axios.delete(`${apiUrl}/task/remove`, {
                data: {
                    taskId: taskId,
                }
            });
            if (res.data.status === 'success') {
                if (taskType === 'social') {
                    await fetchSocialTasks();
                } else if (taskType === 'daily') {
                    await fetchDailyTasks();
                } else if (taskType === 'partner') {
                    await fetchPatnerTasks();
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

    const toggleTaskStatus = async (taskId, taskType) => {
        try {
            const res = await axios.post(`${apiUrl}/task/toggle-task-status`, {
                taskId: taskId,
                taskType: taskType
            });
            let updatedStatus = res.data.updatedStatus;
            if (res.data.status === 'success') {
                if (taskType === 'social') {
                    setSocialTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === taskId ? { ...task, status: updatedStatus } : task
                        )
                    );
                } else if (taskType === 'daily') {
                    setDailyTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === taskId ? { ...task, status: updatedStatus } : task
                        )
                    );
                } else if (taskType === 'partner') {
                    setPatnerTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === taskId ? { ...task, status: updatedStatus } : task
                        )
                    );
                }
                return ({ success: true, mess: 'Task status updated successfully!' });
            } else {
                return ({ success: false, mess: 'Error updating task status!' });
            }
        } catch (error) {
            console.log('Internal Server Errro!', error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    return (
        <FirebaseContext.Provider value={{
            registerUser,
            loginUser,
            logoutUser,
            setLoading,
            loading,
            userId,
            username,
            isAuth,
            userType,
            setPage,
            page,
            setSendData,
            sendData,

            projects,
            fetchProjects,
            createProject,
            deleteProject,
            updateProject,
            toggleProjectCombo,
            setProjects,
            projectTasks,
            setProjectTasks,
            fetchProjectTasks,
            addProjectTask,
            removeProjectTask,
            updateProjectTask,
            addTgeDate,

            fetchKols,
            createKol,
            updateKol,
            deleteKol,
            setKols,
            kols,

            fetchPathners,
            createPatner,
            updatePatner,
            deletePatner,
            setPatners,
            patners,

            fetchVcs,
            createVc,
            updateVc,
            deleteVc,
            setVcs,
            vcs,

            fetchTwoComboCards,
            twoComboCards,

            fetchSocialTasks,
            fetchDailyTasks,
            fetchPatnerTasks,
            addTask,
            updateTask,
            removeTask,
            toggleTaskStatus,
            socialTasks,
            dailyTasks,
            patnerTasks,

        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;
