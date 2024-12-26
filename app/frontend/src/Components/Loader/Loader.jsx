import React, { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';

const Loader = ({ size }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex justify-center items-center h-screen bg-custom-image bg-cover bg-center">
            {isLoading && (
                <FadeLoader
                    size={size || 200}
                    color="#00B2FF"
                    aria-label="loading"
                />
            )}
        </div>
    );
};

export default Loader;
