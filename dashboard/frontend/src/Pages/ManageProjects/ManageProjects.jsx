import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/Firebase';

import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaTasks } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '../../Assets/close.svg';

const ManageProjects = () => {
    const navigate = useNavigate();
    const { setSendData, projects, fetchProjects, deleteProject, toggleProjectCombo, addTgeDate } = useFirebase();

    const [tgeDatePopup, setTgeDatePopup] = useState(null);
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        if (!projects) {
            fetchProjects();
        }
    }, [])

    const handleAddProject = () => {
        setSendData({
            tick: true
        })
        setTimeout(() => {
            navigate(`/project-form`)
        }, 200);
    }

    const handleUpdateProject = (id, name, icon, fromColor, toColor) => {
        setSendData({
            tick: 'update',
            id: id,
            name: name,
            icon: icon,
            fromColor: fromColor,
            toColor: toColor
        });
        setTimeout(() => {
            navigate(`/project-form`)
        }, 200);
    }

    const handleDeleteProject = async (id, name) => {
        try {
            const res = await deleteProject(id);
            if (res.success) {
                toast.success(res.mess);
            } else {
                toast.error(res.mess);
            }
        } catch (error) {
            toast.error("Internal Server Error!");
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    const handleToogleComboCard = async (projectId) => {
        const confirm = window.confirm("Are you sure you want to toggle the combo card?");

        if (!confirm) {
            return;
        }

        try {
            const res = await toggleProjectCombo(projectId);
            if (res.success) {
                toast.success(res.mess);
            } else {
                toast.error(res.mess);
            }
        } catch (error) {
            console.log("Internal Server Error!");
            toast.error('Internal Server Error!');
        }
    };

    const handleManageLevels = (project) => {
        setSendData(project);
        navigate('/project-levels');
    }

    const handleManageTasks = (project) => {
        setSendData(project);
        navigate('/project-tasks');
    }
    const handleAddTgeDate = async (projectId) => {
        const isConfirmed = window.confirm("Are you sure you want to add the TGE date?");

        if (isConfirmed) {
            setTgeDatePopup(true);
            setProjectId(projectId);
        } else {
            console.log("Action canceled");
        }
    }


    const formatDateTime = (dateString) => {
        const date = new Date(dateString);

        const optionsDate = { day: '2-digit', month: 'short', year: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-GB', optionsDate);

        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-GB', optionsTime).toUpperCase();

        return `${formattedDate} ${formattedTime}`;
    }

    const formik = useFormik({
        initialValues: {
            tgeDate: '',
            tgeTime: ''
        },
        validationSchema: Yup.object({
            tgeDate: Yup.string()
                .required('Date is required!')
                .test('is-future', 'Date must be in the future', function (value) {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);
                    return selectedDate > currentDate;
                }),
            tgeTime: Yup.string()
                .required('Time is required!')
                .test('is-future', 'Time must be in the future', function (value) {
                    const { tgeDate } = this.parent;
                    const currentDate = new Date();
                    const selectedDateTime = new Date(`${tgeDate}T${value}`);
                    return selectedDateTime > currentDate;
                })
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const { tgeDate, tgeTime } = values;

                const dateTime = new Date(`${tgeDate}T${tgeTime}`);
                const timestamp = dateTime.toISOString();

                const res = await addTgeDate(projectId, timestamp);
                if (res.success) {
                    toast.success(res.mess);
                    setTgeDatePopup(false);
                } else {
                    toast.error(res.mess);
                }
            } catch (error) {
                console.log("Error submitting data!", error);
                toast.error('Internal Server Error');
            } finally {
                formik.resetForm();
            }
        },
    });

    return (
        <>
            <div>
                {tgeDatePopup && (
                    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center">
                        <div className="w-full h-full absolute bg-black opacity-50 z-0"></div>
                        <div className="bg-gray-800 w-1/2 rounded-3xl p-10 text-white z-50">
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">Add Date and Time</h1>
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    onClick={() => {
                                        setTgeDatePopup(false);
                                        formik.resetForm();
                                    }}
                                    className="cursor-pointer"
                                />
                            </div>
                            <hr className="my-5 border-gray-300" />
                            <form
                                onSubmit={formik.handleSubmit}
                                className="w-full flex flex-col justify-center items-start gap-2 px-20"
                            >
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    name="tgeDate"
                                    placeholder="TGE Date"
                                    className={`text-black border rounded-md p-2 w-full ${formik.errors.tgeDate && formik.touched.tgeDate ? 'border-red-500' : ''}`}
                                    value={formik.values.tgeDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.tgeDate && formik.touched.tgeDate && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.tgeDate}</p>
                                )}
                                <label className="block text-sm font-medium mb-1 mt-3">Time</label>
                                <input
                                    type="time"
                                    name="tgeTime"
                                    placeholder="TGE Time"
                                    className={`text-black border rounded-md p-2 w-full ${formik.errors.tgeTime && formik.touched.tgeTime ? 'border-red-500' : ''}`}
                                    value={formik.values.tgeTime}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.tgeTime && formik.touched.tgeTime && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2 w-full">{formik.errors.tgeTime}</p>
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
                <div className='flex flex-row justify-between'>
                    <h1 className='font-bold text-left mx-10 w-full max-w-2xl'>
                        Manage Projects
                    </h1>
                    <div className='w-2/4 max-10 flex flex-row justify-end'>
                        <button
                            className='mx-2 py-1 px-4 rounded-md bg-bluebtn text-gray-700 hover:bg-transparent hover:border-2 hover:border-bluebtn hover:text-bluebtn'
                            onClick={handleAddProject}
                        >
                            Add Project
                        </button>
                    </div>
                </div>
                <hr className='my-5 border-1 border-[white] mx-2' />
            </div>
            <div className='mx-2 my-10'>
                <table className="w-full bg-transparent border-collapse border border-gray-300">
                    <thead className="thead-dark">
                        <tr>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Sr.no</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Name</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Icon</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">From Color</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">To Color</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Max Level</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">No. Tasks</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Combo Card</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">TGE</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Launch Date</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Delete</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Update</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Manage Levels</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Manage Tasks</th>
                        </tr>
                    </thead>
                    {projects && (
                        <>
                            <tbody>
                                {projects
                                    .slice()
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((cls, key) => (
                                        <tr key={key}>
                                            <th scope="row" className='border-b border-gray-200'>
                                                <span style={{ fontWeight: "bold" }}>
                                                    {key + 1}
                                                </span>
                                            </th>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                {cls.name}
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <img src={`data:image/jpeg;base64,${cls.icon.data}`} alt="icon_img" width={40} />
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200'>
                                                <div
                                                    style={{ backgroundColor: cls.fromColor }}
                                                    className="w-6 h-6 rounded-full mx-auto"
                                                ></div>
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200'>
                                                <div
                                                    style={{ backgroundColor: cls.toColor }}
                                                    className="w-6 h-6 rounded-full mx-auto"
                                                ></div>
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-center'>
                                                {cls.levels.length}
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-center'>
                                                {cls.tasks.length}
                                            </td>
                                            <td
                                                onClick={() => {
                                                    handleToogleComboCard(cls._id);
                                                }}
                                                className={`px-6 py-4 border-b border-gray-200 text-center hover:cursor-pointer ${cls.card ? 'text-green-500' : 'text-red-500'
                                                    }`}
                                            >
                                                {cls.card ? 'Active' : 'In-Active'}
                                            </td>
                                            <td
                                                className={`px-6 py-4 border-b border-gray-200 text-center`}
                                            >
                                                {cls.tgeDate ? (
                                                    <>
                                                        {formatDateTime(cls.tgeDate)}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div
                                                            onClick={() => handleAddTgeDate(cls._id)}
                                                        >
                                                            <MdAdd className="text-bluebtn w-5 h-5 hover:text-gray-500 mx-auto" />
                                                        </div>
                                                    </>
                                                )}
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                {formatDate(cls.createdAt)}
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <button
                                                    className="p-2"
                                                    onClick={() => handleDeleteProject(cls._id, cls.name)}
                                                >
                                                    <RiDeleteBin5Line className="text-bluebtn w-5 h-5 hover:text-gray-500" />
                                                </button>
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <button
                                                    className="p-2"
                                                    onClick={() =>
                                                        handleUpdateProject(
                                                            cls._id,
                                                            cls.name,
                                                            cls.icon,
                                                            cls.fromColor,
                                                            cls.toColor
                                                        )
                                                    }
                                                >
                                                    <FaRegEdit className="text-bluebtn w-5 h-5 hover:text-gray-500" />
                                                </button>
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <button
                                                    className='p-2'
                                                    onClick={() => {
                                                        handleManageLevels(cls)
                                                    }}
                                                >
                                                    <SiLevelsdotfyi className="text-bluebtn w-5 h-5 hover:text-gray-500" />
                                                </button>
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <button
                                                    className='p-2'
                                                    onClick={() => {
                                                        handleManageTasks(cls)
                                                    }}
                                                >
                                                    <FaTasks className="text-bluebtn w-5 h-5 hover:text-gray-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </>
                    )}
                </table>
            </div >
        </>
    )
}

export default ManageProjects;