import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/Firebase';

const DailyComboCard = () => {
    const navigate = useNavigate();
    const { } = useFirebase();

    const [recentTenCollaborators, setRecentTenCollaboratos] = useState(null);

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

    return (
        <>
            <div>
                <div className='flex flex-row justify-between'>
                    <h1 className='font-bold text-left mx-10 w-full max-w-2xl'>
                        Daily Combo Card
                    </h1>
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
                        </tr>
                    </thead>
                    {recentTenCollaborators && (
                        <>
                            <tbody>
                                {recentTenCollaborators
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
                                                A
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                B
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                C
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

export default DailyComboCard;