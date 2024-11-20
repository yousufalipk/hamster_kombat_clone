import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../Context/Firebase';

const AdminHome = () => {
    const { } = useFirebase();

    return (
        <>
            <div className='h-[80vh] w-full flex justify-center items-center'>
                <h1 className='text-3xl font-semibold italic'>Admin Home!</h1>
            </div>
        </>
    );
};

export default AdminHome;
