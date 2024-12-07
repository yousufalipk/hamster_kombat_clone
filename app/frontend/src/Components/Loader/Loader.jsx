import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <>
            <div className='flex justify-center items-center h-screen bg-custom-image bg-cover bg-center'>
                <Circles
                    height="200"
                    width="200"
                    color="#00B2FF"
                    ariaLabel="loading"
                />
            </div>
        </>
    )
}

export default Loader;
