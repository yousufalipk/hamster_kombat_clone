import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../../Context/Firebase';
import CoinImage from '../../../Assets/coin.svg';

const ProjectForm = () => {
    const { createProject, updateProject, sendData } = useFirebase();
    const navigate = useNavigate();

    const [selectedFileName, setSelectedFileName] = useState(sendData?.icon?.name || 'No file chosen');

    // Formik Setup
    const formik = useFormik({
        initialValues: {
            name: sendData?.name || '',
            fromColor: sendData?.fromColor || '#dba211',
            toColor: sendData?.toColor || '#dba211',
            icon: sendData?.icon || null,
            numberOfLevel: sendData?.numberOfLevel || '',
            baseCost: sendData?.baseCost || '',
            baseReward: sendData?.baseReward || '',
            baseCpm: sendData?.baseCpm || '',
            costMultiplier: sendData?.costMultiplier || '',
            rewardMultiplier: sendData?.rewardMultiplier || '',
            cpmMultiplier: sendData?.cpmMultiplier || '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Project name is required')
                .min(3, 'Name must be at least 3 characters'),
            fromColor: Yup.string()
                .required('From Color is required')
                .matches(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid HEX color'),
            toColor: Yup.string()
                .required('To Color is required')
                .matches(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid HEX color'),
            icon: Yup.mixed().required('An icon file is required'),
            numberOfLevel: Yup.number()
                .required('Number of Level is required!')
                .min(10, 'Number of Level must be at least 10!')
                .max(50, 'Number of Level must be at most 50!'),
            baseCost: Yup.number()
                .required('Base cost is required!')
                .min(0, 'Base cost cannot be negative!'),
            baseReward: Yup.number()
                .required('Base Reward is required!')
                .min(0, 'Base Reward cannot be negative!'),
            baseCpm: Yup.number()
                .required('Base Cpm is required!')
                .min(0, 'Base Cpm cannot be negative!'),
            costMultiplier: Yup.number()
                .required('Cost multiplier is required!')
                .min(0, 'Cost multiplier cannot be negative!'),
            rewardMultiplier: Yup.number()
                .required('Reward multiplier is required!')
                .min(0, 'Reward multiplier cannot be negative!'),
            cpmMultiplier: Yup.number()
                .required('Cpm multiplier is required!')
                .min(0, 'Cpm multiplier cannot be negative!')
        }),
        onSubmit: async (values) => {
            try {
                if (sendData.tick === 'update') {
                    const res = await updateProject(values, sendData.id);
                    if (res.success) {
                        toast.success(res.mess);
                        navigate('/manage-projects');
                    } else {
                        toast.error(res.mess);
                        navigate('/manage-projects');
                    }
                } else {
                    const res = await createProject(values);
                    if (res.success) {
                        toast.success(res.mess);
                        navigate('/manage-projects');
                    } else {
                        toast.error(res.mess);
                        navigate('/manage-projects');
                    }
                }
            } catch (error) {
                if (sendData.tick === 'update') {
                    toast.error('Failed to update project.');
                } else {
                    toast.error('Failed to create project.');
                }
            }
        },
    });

    // Handle File Input
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const maxSize = 1 * 1024 * 1024;
            if (file.size > maxSize) {
                formik.setFieldError('icon', 'File size must not exceed 1MB');
                setSelectedFileName('No file chosen');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('icon', {
                    name: file.name,
                    data: reader.result.split(',')[1],
                    contentType: file.type,
                });
                setSelectedFileName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        navigate('/manage-projects');
    };


    const Card = ({ name, icon, fromColor, toColor }) => {
        return (
            <div
                className={`w-[24vw] h-[29vh] p-5 rounded-3xl text-white`}
                style={{
                    background: `linear-gradient(to left, ${fromColor}, ${toColor})`,
                }}
            >
                <div className="flex justify-between items-center">
                    <div className="text-sm font-semibold">
                        <p className='text-2xl font-semibold'>{name || 'no_name'}</p>
                    </div>
                    {!icon ? (
                        <div className="h-full ml-2 flex justify-center text-center items-center shadow-xl p-5 rounded-3xl">
                            No Image
                        </div>
                    ) : (
                        <div>
                            <img
                                src={`data:image/jpeg;base64,${icon.data}`}
                                alt={name ? `${name}-img` : "Image"}
                                width={70}
                            />
                        </div>
                    )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[18.519px] font-normal">
                    <div>
                        <img src={CoinImage} alt="Coin-Icon" width="17" />
                    </div>
                    <div className="text-[16px]">100000</div>
                </div>
                <div
                    className="mt-2 text-[8px] font-medium bg-[rgba(0,0,0,0.3)] w-fit p-1 rounded-[5px]"
                >
                    <p className="opacity-100">lvl 0</p>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4">
            <div className="flex flex-row justify-between items-center mb-5">
                <h1 className="font-bold text-left text-xl">
                    {sendData.tick === 'update' ? 'Edit Project' : 'Add Project'}
                </h1>
                <div className="flex">
                    <button
                        className="mx-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="mx-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        onClick={formik.handleSubmit}
                    >
                        {sendData.tick === 'update' ? 'Confirm Changes' : 'Add Project'}
                    </button>
                </div>
            </div>

            <div className='w-full flex justify-center items-center'>
                <Card
                    name={formik.values.name}
                    icon={formik.values.icon}
                    fromColor={formik.values.fromColor}
                    toColor={formik.values.toColor}
                />
            </div>

            <hr className="my-5 border-gray-300" />
            <form onSubmit={formik.handleSubmit}>
                {/* Project Name Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter project name"
                        className={`text-black border rounded-md p-2 w-full ${formik.errors.name && formik.touched.name ? 'border-red-500' : ''}`}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.name}</p>
                    )}
                </div>

                {/* From Color Picker */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Gradient From Color</label>
                    <input
                        type="color"
                        name="fromColor"
                        className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.fromColor && formik.touched.fromColor ? 'border-red-500' : ''}`}
                        value={formik.values.fromColor}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.fromColor && formik.touched.fromColor && (
                        <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.fromColor}</p>
                    )}
                </div>

                {/* To Color Picker */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Gradient To Color</label>
                    <input
                        type="color"
                        name="toColor"
                        className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.toColor && formik.touched.toColor ? 'border-red-500' : ''}`}
                        value={formik.values.toColor}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.toColor && formik.touched.toColor && (
                        <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.toColor}</p>
                    )}
                </div>

                {/* Number of Levels */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Number of Levels</label>
                    <input
                        type="text"
                        name="numberOfLevel"
                        placeholder='No of Levels'
                        className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.numberOfLevel && formik.touched.numberOfLevel ? 'border-red-500' : ''}`}
                        value={formik.values.numberOfLevel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.numberOfLevel && formik.touched.numberOfLevel && (
                        <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.numberOfLevel}</p>
                    )}
                </div>

                <hr />
                <h1>Base Values</h1>
                <div className='w-full flex justify-center items-center gap-2'>
                    {/* Base cost input */}
                    <div className="mb-4 w-[33%]">
                        <input
                            type="text"
                            name="baseCost"
                            placeholder="Base Cost"
                            className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.baseCost && formik.touched.baseCost ? 'border-red-500' : ''}`}
                            value={formik.values.baseCost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.baseCost && formik.touched.baseCost && (
                            <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.baseCost}</p>
                        )}
                    </div>

                    {/* Base reward input */}
                    <div className="mb-4 w-[33%]">
                        <input
                            type="text"
                            name="baseReward"
                            placeholder="Base Reward"
                            className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.baseReward && formik.touched.baseReward ? 'border-red-500' : ''}`}
                            value={formik.values.baseReward}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.baseReward && formik.touched.baseReward && (
                            <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.baseReward}</p>
                        )}
                    </div>

                    {/* Base cpm input */}
                    <div className="mb-4 w-[33%]">
                        <input
                            type="text"
                            name="baseCpm"
                            placeholder="Base CPM"
                            className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.baseCpm && formik.touched.baseCpm ? 'border-red-500' : ''}`}
                            value={formik.values.baseCpm}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.baseCpm && formik.touched.baseCpm && (
                            <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.baseCpm}</p>
                        )}
                    </div>
                </div>

                <hr />
                <h1>Multipliers</h1>
                <div className='w-full flex justify-center items-center gap-2'>
                    {/* Cost multiplier input */}
                    <div className="mb-4 w-[33%]">
                        <input
                            type="text"
                            name="costMultiplier"
                            placeholder="Cost Multiplier"
                            className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.costMultiplier && formik.touched.costMultiplier ? 'border-red-500' : ''}`}
                            value={formik.values.costMultiplier}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.costMultiplier && formik.touched.costMultiplier && (
                            <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.costMultiplier}</p>
                        )}
                    </div>

                    {/* Reward multiplier input */}
                    <div className="mb-4 w-[33%]">
                        <input
                            type="text"
                            name="rewardMultiplier"
                            placeholder="Reward Multiplier"
                            className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.rewardMultiplier && formik.touched.rewardMultiplier ? 'border-red-500' : ''}`}
                            value={formik.values.rewardMultiplier}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.rewardMultiplier && formik.touched.rewardMultiplier && (
                            <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.rewardMultiplier}</p>
                        )}
                    </div>

                    {/* Cpm multiplier input */}
                    <div className="mb-4 w-[33%]">
                        <input
                            type="text"
                            name="cpmMultiplier"
                            placeholder="CPM Multiplier"
                            className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.cpmMultiplier && formik.touched.cpmMultiplier ? 'border-red-500' : ''}`}
                            value={formik.values.cpmMultiplier}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.cpmMultiplier && formik.touched.cpmMultiplier && (
                            <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.cpmMultiplier}</p>
                        )}
                    </div>
                </div>

                {/* Icon File Upload */}
                <label className="block text-sm font-medium mb-1">Project Icon</label>
                <div className='flex gap-2 mt-3'>
                    <div>
                        <input
                            type="file"
                            name="icon"
                            id="file-input"
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg"
                            style={{ display: 'none' }}
                        />
                        <label
                            htmlFor="file-input"
                            className="cursor-pointer py-2 px-4 rounded-md bg-bluebtn text-white"
                        >
                            Choose File
                        </label>
                    </div>
                    <div className="mb-4">
                        <span>{selectedFileName}</span>
                        {formik.errors.icon && formik.touched.icon && (
                            <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.icon}</p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
