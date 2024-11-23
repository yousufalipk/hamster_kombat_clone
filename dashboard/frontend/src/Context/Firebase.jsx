import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';


const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const [page, setPage] = useState('dashboard');

    const [userId, setUserId] = useState(null);

    const [username, setUsername] = useState(null);

    const [userType, setUserType] = useState(null);

    const [isAuth, setAuth] = useState(null);

    const [loading, setLoading] = useState(false);

    const [sendData, setSendData] = useState(null);

    const [projects, setProjects] = useState(null);

    const [projectLevels, setProjectLevels] = useState([]);

    const [projectTasks, setProjectTasks] = useState([]);

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
        try {
            const response = await axios.post(`${apiUrl}/project/create`, {
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor
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
        try {
            const response = await axios.post(`${apiUrl}/project/update`, {
                id: id,
                name: data.name,
                icon: {
                    name: data.icon.name,
                    data: data.icon.data,
                    contentType: data.icon.contentType,
                },
                fromColor: data.fromColor,
                toColor: data.toColor
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

    const fetchProjectLevels = async (projectId) => {
        try {
            const res = await axios.post(`${apiUrl}/project/fetch-project-level`, {
                projectId: projectId
            });
            if (res.data.status === 'success') {
                setProjectLevels(res.data.levels);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const addProjectLevel = async (projectId, cost) => {
        try {
            const res = await axios.post(`${apiUrl}/project/add-project-level`, {
                projectId: projectId,
                cost: cost
            });
            if (res.data.status === 'success') {
                fetchProjectLevels(projectId);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const removeProjectLevel = async (projectId, levelId) => {
        try {
            const res = await axios.post(`${apiUrl}/project/remove-project-level`, {
                projectId: projectId,
                levelId: levelId
            });
            if (res.data.status === 'success') {
                fetchProjectLevels(projectId);
                return ({ success: true, mess: res.data.message });
            } else {
                return ({ success: false, mess: res.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error!", error);
            return ({ success: false, mess: 'Internal Server Error!' });
        }
    }

    const updateProjectLevel = async (projectId, levelId, newCost) => {
        try {
            const res = await axios.post(`${apiUrl}/project/update-project-level`, {
                projectId: projectId,
                levelId: levelId,
                newCost: newCost
            });
            if (res.data.status === 'success') {
                setProjectLevels(prevLevels =>
                    prevLevels.map(level =>
                        level._id === levelId
                            ? { ...level, cost: newCost }
                            : level
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

    const addProjectTask = async (projectId, iconType, title, reward) => {
        try {
            const res = await axios.post(`${apiUrl}/project/add-project-task`, {
                projectId: projectId,
                iconType: iconType,
                title: title,
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

    const updateProjectTask = async (projectId, taskId, newIconType, newTitle, newReward) => {
        try {
            const res = await axios.post(`${apiUrl}/project/update-project-task`, {
                projectId: projectId,
                taskId: taskId,
                newIconType: newIconType,
                newTitle: newTitle,
                newReward: newReward,
            });
            if (res.data.status === 'success') {
                setProjectTasks(prevTasks =>
                    prevTasks.map(task =>
                        task._id === taskId
                            ? { ...task, iconType: newIconType, title: newTitle, reward: newReward }
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
            fetchProjectLevels,
            projectLevels,
            setProjectLevels,
            setProjects,
            addProjectLevel,
            removeProjectLevel,
            updateProjectLevel,
            projectTasks,
            setProjectTasks,
            fetchProjectTasks,
            addProjectTask,
            removeProjectTask,
            updateProjectTask
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;
