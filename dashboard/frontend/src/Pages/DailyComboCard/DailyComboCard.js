import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/Firebase';

const DailyComboCard = () => {
    const { twoComboCards, fetchTwoComboCards } = useFirebase();

    useEffect(() => {
        if (twoComboCards.length === 0) {
            fetchTwoComboCards();
        }
    }, [])

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
                {twoComboCards.length > 0 ? (
                    <table className="w-full bg-transparent border-collapse border border-gray-300">
                        <thead className="thead-dark">
                            <tr>
                                <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Sr.no</th>
                                <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Name</th>
                                <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Type</th>
                                <th className='px-3 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Combo Card</th>
                            </tr>
                        </thead>
                        <>
                            <tbody>
                                {twoComboCards
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
                                                {cls.type}
                                            </td>
                                            <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                                                {cls.card ? ('Enabled') : ('Disabled')}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </>
                    </table>
                ) : (
                    <>
                        <div className='relative w-[30vw] h-[30vh] px-10 text-xl font-semibold flex justify-center items-center mx-auto text-center border mt-40 rounded-3xl shadow-2xl'>
                            No Collaborator daily combo card activated!
                        </div>
                    </>
                )}
            </div >
        </>
    )
}

export default DailyComboCard;