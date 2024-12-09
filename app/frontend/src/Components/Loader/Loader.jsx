import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = ({ size }) => {
    return (
        <>
            <div className='flex justify-center items-center h-screen bg-custom-image bg-cover bg-center'>
                <Circles
                    height={size || 200}
                    width={size || 200}
                    color="#00B2FF"
                    ariaLabel="loading"
                />
            </div>
        </>
    )
}

export default Loader;
