import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../../Context/Firebase';

const ProjectForm = () => {
    const { createProject, updateProject, sendData } = useFirebase();
    const navigate = useNavigate();

    const [selectedFileName, setSelectedFileName] = useState(sendData.icon?.name || 'No file chosen');

    // Formik Setup
    const formik = useFormik({
        initialValues: {
            name: sendData.name || '',
            fromColor: sendData.fromColor || '#ffffff',
            toColor: sendData.toColor || '#ffffff',
            icon: sendData.icon || null,
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
                        className="mx-2 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        type="submit"
                        onClick={formik.handleSubmit}
                    >
                        {sendData.tick === 'update' ? 'Confirm Changes' : 'Add Project'}
                    </button>
                </div>
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

                {/* From Color Picker */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Gradient From Color</label>
                    <input
                        type="color"
                        name="fromColor"
                        className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.fromColor && formik.touched.fromColor ? 'border-red-500' : ''
                            }`}
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
                        className={`text-black border rounded-md p-2 w-full h-[6vh] ${formik.errors.toColor && formik.touched.toColor ? 'border-red-500' : ''
                            }`}
                        value={formik.values.toColor}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.toColor && formik.touched.toColor && (
                        <p className="text-red-500 text-md font-semibold text-center mt-2">{formik.errors.toColor}</p>
                    )}
                </div>

                {/* Icon Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Project Icon</label>
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

export default ProjectForm;
