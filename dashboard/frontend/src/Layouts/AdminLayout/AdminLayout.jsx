import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from '../../Components/SideBar/SideBar';

import HomePage from '../../Pages/HomePage/HomePage';


//Manage Social Tasks
import ManageProjectsPage from '../../Pages/ManageProjects/ManageProjects';
import ProjectsForm from '../../Components/Forms/ProjectsForm/ProjectsForm';

// import SocialTaskFrom from '../../Components/Forms/SocialTaskForm/SocialTaskForm';

import UserProtected from '../../Components/Protected/UserProtected';

const AdminLayout = () => {
  return (
    <>
      {/* Side Bar */}
      <div className='relative flex flex-row bg-custom-image bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black opacity-50'></div>
        <div className='w-1/5'>
          <SideBar />
        </div>
        {/* Content */}
        <div className='p-10 w-full z-10'>
          <Routes>
            <Route path='*' element={<HomePage />} />
            {/* Manage Projects */}
            <Route path='/manage-projects' element={<UserProtected ><ManageProjectsPage /></UserProtected>} />
            <Route path='/project-form' element={<UserProtected ><ProjectsForm /></UserProtected>} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
