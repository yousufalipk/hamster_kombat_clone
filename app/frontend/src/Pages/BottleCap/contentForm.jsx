import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CopyIcon from '../../assets/CopyIcon.svg';
import { useUser } from '../../context';

const ContentForm = () => {
    const staticUser = process.env.REACT_APP_STATIC_USER;
    const navigate = useNavigate();

    const { triggerToast, submitContent } = useUser();

    const [buttonLoading, setButtonLoading] = useState(false);
    const [dots, setDots] = useState('');

    const [contentLink, setContentLink] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [errors, setErrors] = useState({ contentLink: '', additionalInfo: '' });

    useEffect(() => {
        if (staticUser === 'false') {
            const tg = window.Telegram.WebApp;

            tg.BackButton.show();
            tg.BackButton.onClick(() => {
                navigate('/bottle-cap');
            });

            return () => {
                tg.BackButton.hide();
                tg.BackButton.offClick();
            };
        }
    }, [navigate]);

    const validateFields = () => {
        const newErrors = { contentLink: '', additionalInfo: '' };
        const linkRegex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

        if (!contentLink.trim()) {
            newErrors.contentLink = 'Content Link is required.';
        } else if (!linkRegex.test(contentLink)) {
            newErrors.contentLink = 'Please enter a valid URL.';
        }

        if (!additionalInfo.trim()) {
            newErrors.additionalInfo = 'Additional Info is required.';
        }

        setErrors(newErrors);
        return !newErrors.contentLink && !newErrors.additionalInfo;
    };

    const handleContentSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            try {
                setButtonLoading(true);
                const res = await submitContent(contentLink, additionalInfo);
                if (res.success) {
                    triggerToast('Content Submited Succesfuly!', 'success');
                } else {
                    triggerToast('Error submitting content!', 'error');
                }
            } catch (error) {
                setButtonLoading(false);
                triggerToast('Error submitting content!', 'error');
                console.error('Submission Error:', error);
            } finally {
                setButtonLoading(false);
                setContentLink('');
                setAdditionalInfo('');
                setErrors({ contentLink: '', additionalInfo: '' });
            }
        }
    };

    const handleCopyLink = () => {
        try {
            if (contentLink.trim()) {
                navigator.clipboard.writeText(contentLink);
                triggerToast('Link copied!', 'success');
                console.log('Link copied:', contentLink);
            } else {
                triggerToast('Link not avaliable!', 'error');
                console.error('No link available to copy.');
            }
        } catch (error) {
            console.error('Copy Error:', error);
        }
    };

    useEffect(() => {
        if (buttonLoading) {
            const interval = setInterval(() => {
                setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [buttonLoading]);

    return (
        <div className='w-full h-[90vh] p-5 text-white'>
            <div className='w-full h-[10vh] flex justify-center items-center'>
                <h1 className='w-full text-center text-[32px] font-semibold'>
                    Send
                </h1>
            </div>
            <div className='w-full h-[40vh]'>
                <form
                    onSubmit={handleContentSubmit}
                    className='w-full h-full flex flex-col justify-start items-center gap-2 py-2'
                >
                    <div className='w-full flex flex-col justify-start items-center'>
                        <label htmlFor="link" className='w-full'>
                            Paste your Content Link Here!
                        </label>
                        <div className='w-full flex justify-center items-center'>
                            <input
                                type="text"
                                value={contentLink}
                                onChange={(e) => setContentLink(e.target.value)}
                                className='p-2 w-[85%] h-10 rounded-l-md bg-transparent border border-r-0 border-gray-300 outline-none focus:ring-0'
                            />
                            <div
                                onClick={handleCopyLink}
                                className='w-[15%] h-full rounded-r-md flex justify-center items-center bg-gradient-to-r from-[#5BB4F6] via-[#2191E5] to-[#007EDB]'
                            >
                                <img src={CopyIcon} alt="copy_link" />
                            </div>
                        </div>
                        {errors.contentLink && <p className="text-red-500 mt-2">{errors.contentLink}</p>}
                    </div>
                    <div className='w-full flex flex-col justify-start items-center'>
                        <label htmlFor="additionalInfo" className='w-full'>
                            Additional Info
                        </label>
                        <textarea
                            id="additionalInfo"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className='p-2 w-full h-28 rounded-md bg-transparent border border-gray-300 outline-none focus:ring-0'
                        />
                        {errors.additionalInfo && <p className="text-red-500 mt-2">{errors.additionalInfo}</p>}
                    </div>
                </form>
            </div>

            <div className='w-full h-[33vh] flex flex-col justify-end items-center'>
                <button
                    className={`w-full h-12 z-50 font-semibold p-2 bg-gradient-to-t from-[#2226FF] to-[#00B2FF] rounded-lg text-md`}
                    onClick={handleContentSubmit}
                    disabled={buttonLoading}
                >
                    {buttonLoading ? (
                        <span className="flex justify-center items-center text-5xl font-bold w-full">
                            <p className="absolute -mt-6">
                                {dots}
                            </p>
                        </span>
                    ) : (
                        <>Send</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ContentForm;
