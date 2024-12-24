import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';

const Loader = ({ size }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <div className='flex justify-center items-center h-screen bg-custom-image bg-cover bg-center'>
                {isLoading ? (
                    <HashLoader
                        height={size || 200}
                        width={size || 200}
                        color="#00B2FF"
                        aria-label="loading"
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}

export default Loader;
