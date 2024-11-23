import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '../../Assets/close.svg';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const ProjectTasks = () => {
    const {
        sendData,
        fetchProjectTasks,
        projectTasks,
        setProjectTasks,
        addProjectTask,
        removeProjectTask,
        updateProjectTask
    } = useFirebase();
    const navigate = useNavigate();

    const [addLevelPopup, setAddLevelPopup] = useState(false);
    const [updateLevelPopup, setUpdateLevelPopup] = useState(false);
    const [updateTask, setUpdateTask] = useState(null);

    useEffect(() => {
        if (sendData) {
            if (!projectTasks) {
                fetchProjectTasks(sendData._id);
            }
        } else {
            setProjectTasks(null);
            navigate('/manage-projects');
        }
    }, [sendData, projectTasks]);

    const formik = useFormik({
        initialValues: {
            iconType: updateTask ? updateTask.iconType : '',
            title: updateTask ? updateTask.title : '',
            reward: updateTask ? updateTask.reward : ''
        },
        validationSchema: Yup.object({
            iconType: Yup.string().required('Task Type is required!'),
            title: Yup.string().required('Title is required!'),
            reward: Yup.number().required('Reward is required!'),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                let res;
                if (updateTask) {
                    // Update Task
                    res = await updateProjectTask(sendData._id, updateTask._id, values.iconType, values.title, values.reward);
                } else {
                    // Add Task
                    res = await addProjectTask(sendData._id, values.iconType, values.title, values.reward);
                }

                if (res.success) {
                    toast.success(res.mess);
                    if (updateTask) {
                        setUpdateLevelPopup(false);
                    } else {
                        setAddLevelPopup(false);
                    }
                } else {
                    toast.error(res.mess);
                }
            } catch (error) {
                console.error("Error submitting data!", error);
                toast.error('Internal Server Error');
            } finally {
                formik.resetForm();
            }
        },
    });

    const handleBack = () => {
        formik.resetForm();
        setProjectTasks(null);
        navigate('/manage-projects');
    };

    const handleDeleteTask = async (taskId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');

        if (isConfirmed) {
            try {
                const res = await removeProjectTask(sendData._id, taskId);
                if (res.success) {
                    toast.success(res.mess);
                } else {
                    toast.error(res.mess);
                }
            } catch (error) {
                console.error("Internal Server Error!", error);
                toast.error('Internal Server Error');
            }
        }
    };

    return (
        <>
            {sendData && (
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div className="w-full flex flex-row justify-between items-center mb-5 px-18">
                        <h1 className="font-bold text-left text-xl">{sendData.name} Tasks</h1>
                        <div className="flex">
                            <button
                                className="mx-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                            <button
                                className="mx-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                                onClick={() => setAddLevelPopup(true)}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                    <hr className="my-5 border-gray-300 w-full" />
                    <div className="mx-2 my-10">
                        <table className="min-w-full bg-transparent border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">SR.No</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Icon Type</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Title</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Reward</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Edit</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Delete</th>
                                </tr>
                            </thead>
                            {projectTasks && (
                                <tbody>
                                    {projectTasks.map((cls, i) => (
                                        <tr key={cls._id}>
                                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">{i + 1}</td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">{cls.iconType}</td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">{cls.title}</td>
                                            <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">{cls.reward}</td>
                                            <td
                                                className="px-6 py-4 border-b border-gray-200 text-sm text-center"
                                                onClick={() => {
                                                    setUpdateTask(cls);
                                                    setUpdateLevelPopup(true);
                                                }}
                                            >
                                                <FaRegEdit className="text-bluebtn w-5 h-5 hover:text-gray-500 mx-auto" />
                                            </td>
                                            <td
                                                className="px-6 py-4 border-b border-gray-200 text-sm text-center"
                                                onClick={() => handleDeleteTask(cls._id)}
                                            >
                                                <RiDeleteBin5Line className="text-bluebtn w-5 h-5 hover:text-gray-700 mx-auto" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Update Task Popup */}
            {(addLevelPopup || updateLevelPopup) && (
                <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center">
                    <div className="w-full h-full absolute bg-black opacity-50 z-0"></div>
                    <div className="bg-gray-800 w-1/2 rounded-3xl p-10 text-white z-50">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold">
                                {addLevelPopup ? 'Add Task' : 'Update Task'}
                            </h1>
                            <img
                                src={CloseIcon}
                                alt="close"
                                onClick={() => {
                                    setAddLevelPopup(false);
                                    setUpdateLevelPopup(false);
                                }}
                                className="cursor-pointer"
                            />
                        </div>
                        <hr className="my-5 border-gray-300" />
                        <form
                            onSubmit={formik.handleSubmit}
                            className="w-full flex flex-col justify-center items-start gap-2 px-20"
                        >
                            <label className="block text-sm font-medium mb-1">Icon Type</label>
                            <select
                                className={`text-black border rounded-md p-2 w-full bg-gray-300 ${formik.errors.iconType && formik.touched.iconType ? 'border-red-500' : ''}`}
                                id='iconType'
                                name='iconType'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.iconType}
                            >
                                <option value='' disabled>Select Type</option>
                                <option value='twitter'>Twitter</option>
                                <option value='telegram'>Telegram</option>
                                <option value='youtube'>Youtube</option>
                            </select>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                                className={`w-full p-2 text-black rounded-md bg-gray-300 ${formik.errors.title && formik.touched.title ? 'border-red-500' : ''}`}
                            />
                            <label className="block text-sm font-medium mb-1">Reward</label>
                            <input
                                type="number"
                                name="reward"
                                id="reward"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.reward}
                                className={`w-full p-2 text-black rounded-md bg-gray-300 ${formik.errors.reward && formik.touched.reward ? 'border-red-500' : ''}`}
                            />
                            <button
                                type="submit"
                                className="py-1 px-4 rounded-md bg-bluebtn text-gray-700 hover:bg-transparent hover:border-2 hover:border-bluebtn hover:text-bluebtn mx-auto mt-5"
                            >
                                {addLevelPopup ? 'Add Task' : 'Update Task'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectTasks;
