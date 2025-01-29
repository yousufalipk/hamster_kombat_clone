import React, { useState } from 'react';
import axios from 'axios';

const BroadcastMessageForm = () => {
    const [message, setMessage] = useState('');
    const [buttons, setButtons] = useState([{ text: '', link: '' }]);
    const [file, setFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleAddButton = () => {
        setButtons([...buttons, { text: '', link: '' }]);
    };

    const handleRemoveButton = (index) => {
        const newButtons = buttons.filter((_, i) => i !== index);
        setButtons(newButtons);
    };

    const handleButtonChange = (e, index) => {
        const newButtons = buttons.slice();
        newButtons[index][e.target.name] = e.target.value;
        setButtons(newButtons);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message || buttons.some(button => !button.text || !button.link)) {
            setStatusMessage('Message and all button fields are required.');
            setTimeout(() => {
                setStatusMessage('');
            }, 3000);
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('message', message);
            formData.append('btnData', JSON.stringify(buttons));
            if (file) {
                formData.append('file', file);
            }

            const response = await axios.post(`${apiUrl}/broadcast-message`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setStatusMessage(response.data.message || 'Broadcast sent successfully!');
        } catch (error) {
            setStatusMessage('Error: ' + (error.response?.data?.error || error.message));
        } finally {
            setMessage('');
            setButtons([{ text: '', link: '' }]);
            setFile(null);
            setLoading(false);
            setTimeout(() => {
                setStatusMessage('');
            }, 3000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">Broadcast Message to Telegram Users</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-lg font-medium">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md bg-transparent text-white"
                        required
                        rows="8"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium">Buttons</label>
                    {buttons.map((button, index) => (
                        <div key={index} className="flex mb-4 items-center">
                            <div className="mr-4">
                                <input
                                    type="text"
                                    name="text"
                                    value={button.text}
                                    onChange={(e) => handleButtonChange(e, index)}
                                    placeholder="Button Text"
                                    className="p-3 border border-gray-300 rounded-md text-white bg-transparent"
                                    required
                                />
                            </div>
                            <div className="mr-4">
                                <input
                                    type="url"
                                    name="link"
                                    value={button.link}
                                    onChange={(e) => handleButtonChange(e, index)}
                                    placeholder="Button Link"
                                    className="p-3 border border-gray-300 rounded-md text-white bg-transparent"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveButton(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddButton}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                        Add Button
                    </button>
                </div>

                <div className="mb-4">
                    <label htmlFor="file" className="block text-lg font-medium">Upload Image (Optional)</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Broadcast'}
                    </button>
                </div>
            </form>

            {statusMessage && (
                <div className={`mt-4 p-3 text-center ${statusMessage.includes('Error') ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md`}>
                    {statusMessage}
                </div>
            )}
        </div>
    );
};

export default BroadcastMessageForm;
