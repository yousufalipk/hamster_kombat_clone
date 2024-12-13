import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';

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
                    <Circles
                        height={size || 200}
                        width={size || 200}
                        color="#00B2FF"
                        ariaLabel="loading"
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}

export default Loader;
