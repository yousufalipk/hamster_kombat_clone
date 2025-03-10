import React from 'react';
import { useFirebase } from '../../Context/Firebase';
import { useNavigate } from 'react-router-dom';

const ProjectLevels = () => {
    const {
        sendData,
        setSendData,
    } = useFirebase();
    const navigate = useNavigate();

    const handleBack = () => {
        setSendData(null);
        navigate(sendData.link);
    };

    let sortedLevels;
    if (sendData.data.levels) {
        sortedLevels = sendData.data.levels.slice().sort((a, b) => b.level + a.level);
    }

    return (
        <>
            {sendData && (
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div className="w-full flex flex-row justify-between items-center mb-5 px-18">
                        <h1 className="font-bold text-left text-xl">{sendData.data.name} Levels</h1>
                        <div className="flex">
                            <button
                                className="mx-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                    <hr className="my-5 border-gray-300 w-full" />
                    <div className="mx-2 my-10">
                        <table className="min-w-full bg-transparent border-collapse border border-gray-200 mb-10">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Level No</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Upgrade Cost</th>
                                    {sendData.type === 'project' && (
                                        <>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Reward</th>
                                        </>
                                    )}
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-center">Coin's Per Minute</th>
                                </tr>
                            </thead>
                            {sortedLevels && (
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
                                                {sendData.type === 'project' && (
                                                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">
                                                        {cls.reward}
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-center">
                                                    {cls.cpm}
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
        </>
    );
};

export default ProjectLevels;
