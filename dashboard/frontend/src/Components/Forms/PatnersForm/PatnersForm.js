import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../../Context/Firebase';
import CoinImage from '../../../Assets/coin.svg';
import { FaAngleRight } from "react-icons/fa6";

const PatnersForm = () => {
    const { createPatner, updatePatner, sendData } = useFirebase();
    const navigate = useNavigate();

    const [selectedIconName, setSelectedIconName] = useState(sendData?.icon?.name || 'No file chosen');
    const [selectedLogoName, setSelectedLogoName] = useState(sendData?.logo?.name || 'No file chosen');

    // Formik Setup
    const formik = useFormik({
        initialValues: {
            name: sendData?.name || '',
            fromColor: sendData?.fromColor || '#dba211',
            toColor: sendData?.toColor || '#dba211',
            icon: sendData?.icon || null,
            logo: sendData?.logo || null,
            numberOfLevel: sendData?.numberOfLevel || '',
            baseCost: sendData?.baseCost || '',
            baseCpm: sendData?.baseCpm || '',
            costMultiplier: sendData?.costMultiplier || '',
            cpmMultiplier: sendData?.cpmMultiplier || '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Patner name is required')
                .min(3, 'Name must be at least 3 characters'),
            fromColor: Yup.string()
                .required('From Color is required')
                .matches(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid HEX color'),
            toColor: Yup.string()
                .required('To Color is required')
                .matches(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid HEX color'),
            icon: Yup.mixed().required('An icon file is required'),
            logo: Yup.mixed().required('An logo file is required'),
            numberOfLevel: Yup.number()
                .required('Number of Level is required!')
                .min(10, 'Number of Level must be at least 10!')
                .max(50, 'Number of Level must be at most 50!'),
            baseCost: Yup.number()
                .required('Base cost is required!')
                .min(0, 'Base cost cannot be negative!'),
            baseCpm: Yup.number()
                .required('Base Cpm is required!')
                .min(0, 'Base Cpm cannot be negative!'),
            costMultiplier: Yup.number()
                .required('Cost multiplier is required!')
                .min(0, 'Cost multiplier cannot be negative!'),
            cpmMultiplier: Yup.number()
                .required('Cpm multiplier is required!')
                .min(0, 'Cpm multiplier cannot be negative!')
        }),
        onSubmit: async (values) => {
            try {
                if (sendData.tick === 'update') {
                    const res = await updatePatner(values, sendData.id);
                    if (res.success) {
                        toast.success(res.mess);
                        navigate('/manage-patners');
                    } else {
                        toast.error(res.mess);
                        navigate('/manage-patners');
                    }
                } else {
                    const res = await createPatner(values);
                    if (res.success) {
                        toast.success(res.mess);
                        navigate('/manage-patners');
                    } else {
                        toast.error(res.mess);
                        navigate('/manage-patners');
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

    // Handle Icon Input
    const handleIconChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const maxSize = 1 * 1024 * 1024;
            if (file.size > maxSize) {
                formik.setFieldError('icon', 'File size must not exceed 1MB');
                setSelectedIconName('No file chosen');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('icon', {
                    name: file.name,
                    data: reader.result.split(',')[1],
                    contentType: file.type,
                });
                setSelectedIconName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Logo Input
    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const maxSize = 1 * 1024 * 1024;
            if (file.size > maxSize) {
                formik.setFieldError('logo', 'File size must not exceed 1MB');
                setSelectedLogoName('No file chosen');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('logo', {
                    name: file.name,
                    data: reader.result.split(',')[1],
                    contentType: file.type,
                });
                setSelectedLogoName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        navigate('/manage-patners');
    };


    const Card = ({ name, icon, logo, fromColor, toColor }) => {
        return (
            <div
                style={{
                    background: `linear-gradient(to left, ${fromColor}, ${toColor})`,
                }}
                className="relative w-[25vw] h-[20vh] text-[#FFF] text-base font-medium flex justify-center items-center rounded-[14px] mt-3 px-2
							">
                <div className="w-[50vh]">
                    {/* Card Body */}
                    <div className="flex gap-2">
                        {/* left section */}
                        <div className="left w-[70%] flex flex-col justify-center items-start gap-1">
                            {/* head */}
                            <div className="flex justify-start items-center gap-1">
                                <div className="text-lg w-15">{name || 'No Name'}</div>
                                <div
                                    style={{
                                        backgroundColor: fromColor,
                                    }}
                                    className="rounded-xl text-[8px] shadow-2xl relative"
                                >
                                    <div className='absolute bg-black w-full h-full rounded-xl opacity-20'></div>
                                    <span className='px-2 font-bold'>lvl 0</span>
                                </div>
                            </div>
                            {/* body */}
                            <div className="flex gap-1">
                                <img
                                    src={CoinImage}
                                    alt='Coin-Icon'
                                    width={20}
                                />
                                <div className="text-xs font-thin text-gray-300">
                                    <span className="mr-2 font-semibold text-xs">+{1}</span>
                                    Coin Per Minute
                                </div>
                            </div>
                            {/* upgrade button */}
                            <div className="mt-2 flex items-center justify-center gap-2 rounded-[18px] w-fit px-3 py-1 bg-[#FFF] text-black">
                                <FaAngleRight />
                                <p className="text-xs font-thin">Upgrade</p>
                            </div>
                        </div>

                        {/* right section */}
                        <div className="right w-[30%]">
                            <div className="flex justify-end gap-1">
                                <img
                                    src={CoinImage}
                                    alt='Coin-Icon'
                                    width="15"
                                />
                                <div className="text-sm">20K</div>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-3/5 flex justify-end items-end h-[10vh]">
                                    {logo ? (
                                        <>
                                            <img
                                                src={logo.data}
                                                alt={name ? `${name}-logo` : "Image"}
                                                width={85}
                                                className='absolute bottom-0 right-[7vw]'
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className='w-10 h-10 rounded-lg shadow-2xl flex justify-center items-center'>
                                                <p className='text-center'>No Logo</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="w-2/5 flex justify-end items-end h-[10vh]">
                                    {icon ? (
                                        <>
                                            <img
                                                src={icon.data}
                                                alt={name ? `${name}-icon` : "Image"}
                                                width={85}
                                                className='absolute bottom-0'
                                            />
                                        </>
                                    ) : (
                                        <div className='w-10 h-10 rounded-lg shadow-2xl flex justify-center items-center'>
                                            <p className='text-center'>No Icon</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };

    return (
        <div className="p-4">
            <div className="flex flex-row justify-between items-center mb-5">
                <h1 className="font-bold text-left text-xl">
                    {sendData.tick === 'update' ? 'Edit Patner' : 'Add Patner'}
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
                        {sendData.tick === 'update' ? 'Confirm Changes' : 'Add Patner'}
                    </button>
                </div>
            </div>

            <div className='w-full flex justify-center items-center'>
                <Card
                    name={formik.values.name}
                    icon={formik.values.icon}
                    logo={formik.values.logo}
                    fromColor={formik.values.fromColor}
                    toColor={formik.values.toColor}
                />
            </div>

            <hr className="my-5 border-gray-300" />
            <form onSubmit={formik.handleSubmit}>
                {/* Patner Name Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Patner Name</label>
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

                <div className='w-full flex justify-between items-center gap-5'>
                    {/* Icon File Upload */}
                    <div className='flex justify-start items-center gap-3'>
                        <label className="block text-sm font-medium mb-1">Patner Icon</label>
                        <div className='flex gap-2 mt-3'>
                            <div>
                                <input
                                    type="file"
                                    name="icon"
                                    id="icon-input"
                                    onChange={handleIconChange}
                                    accept="image/png, image/jpeg"
                                    style={{ display: 'none' }}
                                />
                                <label
                                    htmlFor="icon-input"
                                    className="cursor-pointer py-2 px-4 rounded-md bg-bluebtn text-white"
                                >
                                    Choose File
                                </label>
                            </div>
                            <div className="mb-4">
                                <span>{selectedIconName}</span>
                                {formik.errors.icon && formik.touched.icon && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.icon}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Logo File Upload */}
                    <div className='flex justify-end items-center gap-3'>
                        <label className="block text-sm font-medium mb-1">Patner Logo</label>
                        <div className='flex gap-2 mt-3'>
                            <div>
                                <input
                                    type="file"
                                    name="logo"
                                    id="logo-input"
                                    onChange={handleLogoChange}
                                    accept="image/png, image/jpeg"
                                    style={{ display: 'none' }}
                                />
                                <label
                                    htmlFor="logo-input"
                                    className="cursor-pointer py-2 px-4 rounded-md bg-bluebtn text-white"
                                >
                                    Choose File
                                </label>
                            </div>
                            <div className="mb-4">
                                <span>{selectedLogoName}</span>
                                {formik.errors.logo && formik.touched.logo && (
                                    <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.logo}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PatnersForm;
