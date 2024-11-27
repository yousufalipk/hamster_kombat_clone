import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/Firebase';

import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";

const ManageKols = () => {
    const navigate = useNavigate();
    const { setSendData, kols, fetchKols, deleteKol } = useFirebase();

    useEffect(() => {
        if (!kols) {
            fetchKols();
        }
    }, [])

    const handleAddKols = () => {
        setSendData({
            tick: true
        })
        setTimeout(() => {
            navigate(`/kols-form`)
        }, 200);
    }

    const handleUpdateKol = (kol) => {
        setSendData({
            tick: 'update',
            id: kol._id,
            name: kol.name,
            icon: kol.icon,
            logo: kol.logo,
            fromColor: kol.fromColor,
            toColor: kol.toColor,
            numberOfLevel: kol.numberOfLevel,
            baseCost: kol.baseValues.baseCost,
            baseCpm: kol.baseValues.baseCpm,
            costMultiplier: kol.multipliers.costMultiplier,
            cpmMultiplier: kol.multipliers.cpmMultiplier
        });
        setTimeout(() => {
            navigate(`/kols-form`)
        }, 200);
    }

    const handelDeleteKol = async (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the kol "${name}" ?\nThis action cannot be undone!`);

        if (!confirmDelete) {
            return;
        }

        try {
            const res = await deleteKol(id);
            if (res.success) {
                toast.success(res.mess);
            } else {
                toast.error(res.mess);
            }
        } catch (error) {
            toast.error("Internal Server Error!");
        }
    };

    const handleToogleComboCard = async (projectId) => {

        return;
        /*
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
            */
    };

    const handleManageLevels = (project) => {
        const data = {
            type: 'kols',
            data: project,
            link: '/manage-kols'
        }
        setSendData(data);
        navigate('/levels');
    }

    return (
        <>
            <div>
                <div className='flex flex-row justify-between'>
                    <h1 className='font-bold text-left mx-10 w-full max-w-2xl'>
                        Manage Kols
                    </h1>
                    <div className='w-2/4 max-10 flex flex-row justify-end'>
                        <button
                            className='mx-2 py-1 px-4 rounded-md bg-bluebtn text-gray-700 hover:bg-transparent hover:border-2 hover:border-bluebtn hover:text-bluebtn'
                            onClick={handleAddKols}
                        >
                            Add Kol
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
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">From Color</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">To Color</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Icon</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Logo</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Max Level</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Combo Card</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Delete</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Update</th>
                            <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Manage Levels</th>
                        </tr>
                    </thead>
                    {kols && (
                        <>
                            <tbody>
                                {kols
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
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <img src={`data: image / jpeg; base64, ${cls.icon.data} `} alt="icon_img" width={40} />
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <img src={`data: image / jpeg; base64, ${cls.logo.data} `} alt="icon_img" width={40} />
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-center'>
                                                {cls.levels.length}
                                            </td>
                                            <td
                                                onClick={() => {
                                                    handleToogleComboCard(cls._id);
                                                }}
                                                className={`px - 6 py - 4 border-b - gray - 200 text - center hover: cursor - pointer ${cls.card ? 'text-green-500' : 'text-red-500'
                                                    } `}
                                            >
                                                {cls.card ? 'Active' : 'In-Active'}
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <button
                                                    className="p-2"
                                                    onClick={() => handelDeleteKol(cls._id, cls.name)}
                                                >
                                                    <RiDeleteBin5Line className="text-bluebtn w-5 h-5 hover:text-gray-500" />
                                                </button>
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                <button
                                                    className="p-2"
                                                    onClick={() =>
                                                        handleUpdateKol(cls)
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

export default ManageKols;