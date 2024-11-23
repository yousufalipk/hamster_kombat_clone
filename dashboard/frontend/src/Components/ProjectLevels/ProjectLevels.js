import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '../../Assets/close.svg';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const ProjectLevels = () => {
    const {
        sendData,
        fetchProjectLevels,
        projectLevels,
        setProjectLevels,
        addProjectLevel,
        removeProjectLevel,
        updateProjectLevel,
    } = useFirebase();
    const navigate = useNavigate();

    const [addLevelPopup, setAddLevelPopup] = useState(false);
    const [updateLevelPopup, setUpdateLevelPopup] = useState(false);
    const [updateLevel, setUpdateLevel] = useState(null);

    useEffect(() => {
        if (sendData) {
            if (projectLevels.length === 0) {
                fetchProjectLevels(sendData._id);
            }
        } else {
            setProjectLevels(null);
            navigate('/manage-projects');
        }
    }, [sendData, projectLevels]);

    const formik = useFormik({
        initialValues: {
            level: updateLevel ? updateLevel.level : 0,
            cost: updateLevel ? updateLevel.cost : 0,
            reward: updateLevel ? updateLevel.reward : 0,
            cpm: updateLevel ? updateLevel.cpm : 0,
        },
        validationSchema: Yup.object({
            level: Yup.number().required('Level is required!'),
            cost: Yup.number().required('Cost is required!'),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                if (updateLevel) {
                    // Update Level
                    const res = await updateProjectLevel(sendData._id, updateLevel._id, values.cost, values.reward, values.cpm);
                    if (res.success) {
                        toast.success(res.mess);
                        setUpdateLevelPopup(false);
                    } else {
                        toast.error(res.mess);
                    }
                } else {
                    // Add Level
                    const res = await addProjectLevel(sendData._id, values.cost, values.reward, values.cpm);
                    if (res.success) {
                        toast.success(res.mess);
                        setAddLevelPopup(false);
                    } else {
                        toast.error(res.mess);
                    }
                }
            } catch (error) {
                console.log("Error submitting data!", error);
                toast.error('Internal Server Error');
            } finally {
                formik.resetForm();
            }
        },
    });

    const handleBack = () => {
        formik.resetForm();
        setProjectLevels(null);
        navigate('/manage-projects');
    };

    const handleDeleteLevel = async (levelId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this level?');

        if (isConfirmed) {
            try {
                const res = await removeProjectLevel(sendData._id, levelId);
                if (res.success) {
                    toast.success(res.mess);
                } else {
                    toast.error(res.mess);
                }
            } catch (error) {
                console.log("Internal Server Error!", error);
                toast.error('Internal Server Error');
            }
        }
    };

    let sortedLevels;
    if (projectLevels) {
        sortedLevels = projectLevels.slice().sort((a, b) => b.level + a.level);
    }

    return (
        <>
            {sendData && (
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div className="w-full flex flex-row justify-between items-center mb-5 px-18">
                        <h1 className="font-bold text-left text-xl">{sendData.name} Levels</h1>
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
                                Add Level
                            </button>
                        </div>
                    </div>
                    <hr className="my-5 border-gray-300 w-full" />
                    <div className="mx-2 my-10">
                        <table className="min-w-full bg-transparent border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Level No</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Upgrade Cost</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Reward</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Coin's Per Minute</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Edit</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Delete</th>
                                </tr>
                            </thead>
                            {projectLevels && (
                                <>

                                    <tbody>
                                        {sortedLevels.map((cls) => (
                                            <tr key={cls._id}>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">
                                                    {cls.level}
                                                </td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">
                                                    {cls.cost}
                                                </td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">
                                                    {cls.reward}
                                                </td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">
                                                    {cls.cpm}
                                                </td>
                                                <td
                                                    className="px-6 py-4 border-b border-gray-200 text-sm text-center"
                                                    onClick={() => {
                                                        setUpdateLevel(cls);
                                                        setUpdateLevelPopup(true);
                                                    }}
                                                >
                                                    <FaRegEdit className="text-bluebtn w-5 h-5 hover:text-gray-500 mx-auto" />
                                                </td>
                                                <td
                                                    className="px-6 py-4 border-b border-gray-200 text-sm text-center"
                                                    onClick={() => handleDeleteLevel(cls._id)}
                                                >
                                                    <RiDeleteBin5Line className="text-bluebtn w-5 h-5 hover:text-gray-700 mx-auto" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            )}
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Update Level Popup */}
            {(addLevelPopup || updateLevelPopup) && (
                <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center">
                    <div className="w-full h-full absolute bg-black opacity-50 z-0"></div>
                    <div className="bg-gray-800 w-1/2 rounded-3xl p-10 text-white z-50">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold">
                                {addLevelPopup ? 'Add Level' : 'Update Level'}
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
                            {updateLevelPopup && (
                                <>
                                    <label className="block text-sm font-medium mb-1">Level</label>
                                    <input
                                        type="number"
                                        name="level"
                                        placeholder="Level"
                                        className={`text-black border rounded-md p-2 w-full bg-gray-300 ${formik.errors.level && formik.touched.level ? 'border-red-500' : ''
                                            }`}
                                        value={formik.values.level}
                                        disabled={!addLevelPopup}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.level && formik.touched.level && (
                                        <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.level}</p>
                                    )}
                                </>
                            )}
                            <label className="block text-sm font-medium mb-1">Cost</label>
                            <input
                                type="number"
                                name="cost"
                                placeholder="Cost"
                                className={`text-black border rounded-md p-2 w-full ${formik.errors.cost && formik.touched.cost ? 'border-red-500' : ''
                                    }`}
                                value={formik.values.cost}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.cost && formik.touched.cost && (
                                <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.cost}</p>
                            )}
                            <label className="block text-sm font-medium mb-1">Reward</label>
                            <input
                                type="number"
                                name="reward"
                                placeholder="Reward"
                                className={`text-black border rounded-md p-2 w-full ${formik.errors.reward && formik.touched.reward ? 'border-red-500' : ''
                                    }`}
                                value={formik.values.reward}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.reward && formik.touched.reward && (
                                <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.reward}</p>
                            )}
                            <label className="block text-sm font-medium mb-1">Coin Per Min's</label>
                            <input
                                type="number"
                                name="cpm"
                                placeholder="Coin's Per Minute"
                                className={`text-black border rounded-md p-2 w-full ${formik.errors.cpm && formik.touched.cpm ? 'border-red-500' : ''
                                    }`}
                                value={formik.values.cpm}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.cpm && formik.touched.cpm && (
                                <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.cpm}</p>
                            )}
                            <div className="w-full flex justify-center mt-5">
                                <button
                                    type="submit"
                                    className="py-1 px-4 rounded-md bg-bluebtn text-gray-700 hover:bg-transparent hover:border-2 hover:border-bluebtn hover:text-bluebtn"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectLevels;
