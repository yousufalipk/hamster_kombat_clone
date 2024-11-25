import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../../Context/Firebase';

const KolsForm = () => {
    const { createKol, updateKol, sendData } = useFirebase();
    const navigate = useNavigate();

    const [selectedFileName, setSelectedFileName] = useState(sendData.icon?.name || 'No file chosen');

    // Formik Setup
    const formik = useFormik({
        initialValues: {
            name: sendData.name || '',
            icon: sendData.icon || null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Project name is required')
                .min(3, 'Name must be at least 3 characters'),
            icon: Yup.mixed().required('An icon file is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (sendData.tick === 'update') {
                    const res = await updateKol(values, sendData.id);
                    if (res.success) {
                        toast.success(res.mess);
                        navigate('/manage-kols');
                    } else {
                        toast.error(res.mess);
                        navigate('/manage-kols');
                    }
                } else {
                    const res = await createKol(values);
                    if (res.success) {
                        toast.success(res.mess);
                        navigate('/manage-kols');
                    } else {
                        toast.error(res.mess);
                        navigate('/manage-kols');
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
        navigate('/manage-kols');
    };

    return (
        <div className="p-4">
            <div className="flex flex-row justify-between items-center mb-5">
                <h1 className="font-bold text-left text-xl">
                    {sendData.tick === 'update' ? 'Edit Kol' : 'Add Kol'}
                </h1>
                <div className="flex">
                    <button
                        className="mx-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        className="mx-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        type="submit"
                        onClick={formik.handleSubmit}
                    >
                        {sendData.tick === 'update' ? 'Confirm Changes' : 'Add Kol'}
                    </button>
                </div>
            </div>
            <hr className="my-5 border-gray-300" />
            <form onSubmit={formik.handleSubmit}>
                {/* Project Name Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Kol Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter kol name"
                        className={`text-black border rounded-md p-2 w-full ${formik.errors.name && formik.touched.name ? 'border-red-500' : ''
                            }`}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.name}</p>
                    )}
                </div>

                {/* Icon Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Kol Icon</label>
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="file-input"
                            onChange={handleFileChange}
                            onBlur={formik.handleBlur}
                        />
                        <label
                            htmlFor="file-input"
                            className="cursor-pointer py-2 px-4 rounded-md bg-bluebtn"
                        >
                            Choose File
                        </label>
                        <span className="text-white font-semibold text-lg">{selectedFileName}</span>
                    </div>
                    {formik.errors.icon && formik.touched.icon && (
                        <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.icon}</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default KolsForm;
