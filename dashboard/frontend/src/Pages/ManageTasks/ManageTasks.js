import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '../../Assets/close.svg';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const ManageTasks = () => {
    const {
        fetchSocialTasks,
        fetchDailyTasks,
        fetchPatnerTasks,
        addTask,
        updateTask,
        removeTask,
        socialTasks,
        dailyTasks,
        patnerTasks,
        toggleTaskStatus,
        buttonLoading,
        dots
    } = useFirebase();

    useEffect(() => {
        if (socialTasks.length === 0) {
            fetchSocialTasks();
        }
        if (dailyTasks.length === 0) {
            fetchDailyTasks();
        }
        if (patnerTasks.length === 0) {
            fetchPatnerTasks();
        }
    }, [])

    const [addTaskPopup, setAddTaskPopup] = useState(false);
    const [updateTaskPopup, setUpdateTaskPopup] = useState(false);
    const [updateTaskId, setUpdateTaskId] = useState(null);

    const formik = useFormik({
        initialValues: {
            taskType: updateTaskId ? updateTaskId.taskType : '',
            iconType: updateTaskId ? updateTaskId.iconType : '',
            priority: updateTaskId ? updateTaskId.priority : '',
            title: updateTaskId ? updateTaskId.title : '',
            link: updateTaskId ? updateTaskId.link : '',
            reward: updateTaskId ? updateTaskId.reward : ''
        },
        validationSchema: Yup.object({
            taskType: Yup.string().required('Task type is required!'),
            iconType: Yup.string().required('Task sub-type is required!'),
            priority: Yup.number().required('Task priority is required!'),
            title: Yup.string().required('Title is required!'),
            link: Yup.string().required('Link is required!'),
            reward: Yup.number().required('Reward is required!'),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log('Form Submited', values);
            try {
                let res;
                if (updateTaskId) {
                    // Update Task
                    res = await updateTask(updateTaskId, values.taskType, values.title, values.link, values.reward, values.priority);
                } else {
                    // Add Task
                    res = await addTask(values.taskType, values.iconType, values.title, values.link, values.reward, values.priority);
                }

                if (res.success) {
                    toast.success(res.mess);
                    if (updateTaskId) {
                        setUpdateTaskPopup(false);
                    } else {
                        setAddTaskPopup(false);
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

    const handleDeleteTask = async (taskId, taskType) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');

        if (isConfirmed) {
            try {
                const res = await removeTask(taskId, taskType);
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

    const handleToggleTaskStatus = async (taskId, taskType) => {
        const userConfirmed = window.confirm("Are you sure you want to toggle the task status?");
        if (!userConfirmed) {
            return;
        }

        try {
            const res = await toggleTaskStatus(taskId, taskType);
            if (res.success) {
                toast.success(res.mess);
            } else {
                toast.error(res.mess);
            }
        } catch (error) {
            toast.error('Internal Server Error!');
        }
    };

    return (
        <>
            <div className="w-full h-full flex flex-col justify-start items-center">
                <div className="w-full flex flex-row justify-between items-center mb-5 px-18">
                    <h1 className="font-bold text-left text-xl">Social Tasks</h1>
                    <div className="flex">
                        <button
                            className="mx-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => setAddTaskPopup(true)}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
                <hr className="my-5 border-gray-300 w-full" />
                <div className="mx-2 my-10 overflow-y-auto overflow-x-hidden w-[80vw] h-[70vh]">
                    {socialTasks && (
                        <div>
                            <div className='w-full h-[10vh] flex justify-between items-center'>
                                <hr className='w-[40%] flex justify-center items-center' />
                                <div className='w-[20%] flex justify-center items-center'>
                                    <h1 className="font-bold text-3xl">Social Tasks</h1>
                                </div>
                                <hr className='w-[40%] flex justify-center items-center' />
                            </div>
                            <table className="table-fixed w-full bg-transparent border-collapse border border-gray-200 my-5">
                                <thead>
                                    <tr>
                                        {[
                                            "Priority",
                                            "Task Type",
                                            "Icon Type",
                                            "Status",
                                            "Title",
                                            "Link",
                                            "Reward",
                                            "Edit",
                                            "Delete",
                                        ].map((header) => (
                                            <th
                                                key={header}
                                                className="px-4 py-2 border-b-2 border-gray-300 text-sm text-center"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {socialTasks
                                        .sort((a, b) => a.priority - b.priority)
                                        .map((cls, i) => (
                                            <tr key={cls._id}>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.taskType}>
                                                    {cls.taskType}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.iconType}>
                                                    {cls.iconType}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center">{cls.priority}</td>
                                                <td
                                                    onClick={() => handleToggleTaskStatus(cls._id, cls.taskType)}
                                                    className={`px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer ${cls.status ? `text-green-500` : `text-red-700`}`}
                                                >
                                                    {cls.status ? "Active" : "Disabled"}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.title}>
                                                    {cls.title}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.link}>
                                                    {cls.link}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center">{cls.reward}</td>
                                                <td
                                                    className="px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer"
                                                    onClick={() => {
                                                        setUpdateTaskId(cls);
                                                        setUpdateTaskPopup(true);
                                                    }}
                                                >
                                                    <FaRegEdit className="text-bluebtn w-5 h-5 hover:text-gray-500 mx-auto" />
                                                </td>
                                                <td
                                                    className="px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer"
                                                    onClick={() => handleDeleteTask(cls._id, cls.taskType)}
                                                >
                                                    <RiDeleteBin5Line className="text-bluebtn w-5 h-5 hover:text-gray-700 mx-auto" />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {dailyTasks && (
                        <div>
                            <div className='w-full h-[10vh] flex justify-between items-center'>
                                <hr className='w-[40%] flex justify-center items-center' />
                                <div className='w-[20%] flex justify-center items-center'>
                                    <h1 className="font-bold text-3xl">Daily Tasks</h1>
                                </div>
                                <hr className='w-[40%] flex justify-center items-center' />
                            </div>
                            <table className="table-fixed w-full bg-transparent border-collapse border border-gray-200 my-5">
                                <thead>
                                    <tr>
                                        {[
                                            "Priority",
                                            "Task Type",
                                            "Icon Type",
                                            "Status",
                                            "Title",
                                            "Link",
                                            "Reward",
                                            "Edit",
                                            "Delete",
                                        ].map((header) => (
                                            <th
                                                key={header}
                                                className="px-4 py-2 border-b-2 border-gray-300 text-sm text-center"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dailyTasks
                                        .sort((a, b) => a.priority - b.priority)
                                        .map((cls, i) => (
                                            <tr key={cls._id}>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center">{cls.priority}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.taskType}>
                                                    {cls.taskType}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.iconType}>
                                                    {cls.iconType}
                                                </td>
                                                <td
                                                    onClick={() => handleToggleTaskStatus(cls._id, cls.taskType)}
                                                    className={`px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer ${cls.status ? `text-green-500` : `text-red-700`}`}
                                                >
                                                    {cls.status ? "Active" : "Disabled"}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.title}>
                                                    {cls.title}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.link}>
                                                    {cls.link}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center">{cls.reward}</td>
                                                <td
                                                    className="px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer"
                                                    onClick={() => {
                                                        setUpdateTaskId(cls);
                                                        setUpdateTaskPopup(true);
                                                    }}
                                                >
                                                    <FaRegEdit className="text-bluebtn w-5 h-5 hover:text-gray-500 mx-auto" />
                                                </td>
                                                <td
                                                    className="px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer"
                                                    onClick={() => handleDeleteTask(cls._id, cls.taskType)}
                                                >
                                                    <RiDeleteBin5Line className="text-bluebtn w-5 h-5 hover:text-gray-700 mx-auto" />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {patnerTasks && (
                        <div>
                            <div className='w-full h-[10vh] flex justify-between items-center'>
                                <hr className='w-[40%] flex justify-center items-center' />
                                <div className='w-[20%] flex justify-center items-center'>
                                    <h1 className="font-bold text-3xl">Partner Tasks</h1>
                                </div>
                                <hr className='w-[40%] flex justify-center items-center' />
                            </div>
                            <table className="table-fixed w-full bg-transparent border-collapse border border-gray-200 my-5">
                                <thead>
                                    <tr>
                                        {[
                                            "Priority",
                                            "Task Type",
                                            "Icon Type",
                                            "Status",
                                            "Title",
                                            "Link",
                                            "Reward",
                                            "Edit",
                                            "Delete",
                                        ].map((header) => (
                                            <th
                                                key={header}
                                                className="px-4 py-2 border-b-2 border-gray-300 text-sm text-center"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {patnerTasks
                                        .sort((a, b) => a.priority - b.priority)
                                        .map((cls, i) => (
                                            <tr key={cls._id}>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center">{cls.priority}</td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.taskType}>
                                                    {cls.taskType}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.iconType}>
                                                    {cls.iconType}
                                                </td>
                                                <td
                                                    onClick={() => handleToggleTaskStatus(cls._id, cls.taskType)}
                                                    className={`px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer ${cls.status ? `text-green-500` : `text-red-700`}`}
                                                >
                                                    {cls.status ? "Active" : "Disabled"}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.title}>
                                                    {cls.title}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center truncate" title={cls.link}>
                                                    {cls.link}
                                                </td>
                                                <td className="px-4 py-2 border-b border-gray-200 text-sm text-center">{cls.reward}</td>
                                                <td
                                                    className="px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer"
                                                    onClick={() => {
                                                        setUpdateTaskId(cls);
                                                        setUpdateTaskPopup(true);
                                                    }}
                                                >
                                                    <FaRegEdit className="text-bluebtn w-5 h-5 hover:text-gray-500 mx-auto" />
                                                </td>
                                                <td
                                                    className="px-4 py-2 border-b border-gray-200 text-sm text-center cursor-pointer"
                                                    onClick={() => handleDeleteTask(cls._id, cls.taskType)}
                                                >
                                                    <RiDeleteBin5Line className="text-bluebtn w-5 h-5 hover:text-gray-700 mx-auto" />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div >

            {/* Add/Update Task Popup */}
            {
                (addTaskPopup || updateTaskPopup) && (
                    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center">
                        <div className="w-full h-full absolute bg-black opacity-50 z-0"></div>
                        <div className="bg-gray-800 w-1/2 rounded-3xl p-10 text-white z-50">
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">
                                    {addTaskPopup ? 'Add Task' : 'Update Task'}
                                </h1>
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    onClick={() => {
                                        formik.resetForm();
                                        setAddTaskPopup(false);
                                        setUpdateTaskPopup(false);
                                    }}
                                    className="cursor-pointer"
                                />
                            </div>
                            <hr className="my-5 border-gray-300" />
                            <form
                                onSubmit={formik.handleSubmit}
                                className="w-full flex flex-col justify-center items-start gap-2 px-20"
                            >
                                {!updateTaskPopup && (
                                    <>
                                        <label className="block text-sm font-medium mb-1">Task Type</label>
                                        <select
                                            className={`text-black border rounded-md p-2 w-full bg-gray-300 ${formik.errors.iconType && formik.touched.iconType ? 'border-red-500' : ''}`}
                                            id='taskType'
                                            name='taskType'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.taskType}
                                        >
                                            <option value='' disabled>Select Type</option>
                                            <option value='social'>Social</option>
                                            <option value='daily'>Daily</option>
                                            <option value='partner'>Partner</option>
                                        </select>
                                        {formik.errors.taskType && formik.touched.taskType && (
                                            <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.taskType}</p>
                                        )}
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
                                            <option value='instagram'>Instagram</option>
                                        </select>
                                        {formik.errors.iconType && formik.touched.iconType && (
                                            <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.iconType}</p>
                                        )}
                                    </>
                                )}
                                <label className="block text-sm font-medium mb-1">Priority</label>
                                <input
                                    type="number"
                                    name="priority"
                                    id="priority"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.priority}
                                    className={`w-full p-2 text-black rounded-md bg-gray-300 ${formik.errors.priority && formik.touched.priority ? 'border-red-500' : ''}`}
                                />
                                {formik.errors.priority && formik.touched.priority && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.priority}</p>
                                )}
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
                                {formik.errors.title && formik.touched.title && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.title}</p>
                                )}
                                <label className="block text-sm font-medium mb-1">{`Link: https://www.xyx.com`}</label>
                                <input
                                    type="text"
                                    name="link"
                                    id="link"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.link}
                                    className={`w-full p-2 text-black rounded-md bg-gray-300 ${formik.errors.link && formik.touched.link ? 'border-red-500' : ''}`}
                                />
                                {formik.errors.link && formik.touched.link && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.link}</p>
                                )}
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
                                {formik.errors.reward && formik.touched.reward && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.reward}</p>
                                )}
                                <button
                                    disabled={buttonLoading}
                                    type="submit"
                                    className="py-1 px-4 rounded-md bg-bluebtn text-gray-700 hover:bg-transparent hover:border-2 hover:border-bluebtn hover:text-bluebtn mx-auto mt-5"
                                >
                                    {
                                        buttonLoading ? (
                                            <span className="flex justify-center items-center text-5xl font-bold w-full">
                                                <p className="absolute -mt-6">
                                                    {dots}
                                                </p>
                                            </span>
                                        ) : (
                                            <>
                                                {addTaskPopup ? 'Add Task' : 'Update Task'}
                                            </>
                                        )
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ManageTasks;
