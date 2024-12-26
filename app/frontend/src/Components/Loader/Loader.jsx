import React, { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';

const Loader = ({ size }) => {

    return (
        <div className="flex justify-center items-center h-screen bg-custom-image bg-cover bg-center">
            <HashLoader
                size={size || 200}
                color="#00B2FF"
                aria-label="loading"
            />
        </div>
    );
};

export default Loader;
