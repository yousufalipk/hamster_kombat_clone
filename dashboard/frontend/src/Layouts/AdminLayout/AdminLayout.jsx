import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from '../../Components/SideBar/SideBar';

import HomePage from '../../Pages/HomePage/HomePage';


import LevelsTablePage from '../../Components/LevelsTable/LevelsTable';

//Manage Project 
import ManageProjectsPage from '../../Pages/ManageProjects/ManageProjects';
import ProjectsForm from '../../Components/Forms/ProjectsForm/ProjectsForm';
import ProjectTasksPage from '../../Components/ProjectTasks/ProjectTasks';

//Manage Kols
import ManageKolsPage from '../../Pages/ManageKols/ManageKols';
import KolsForm from '../../Components/Forms/KolsForm/KolsForm';

//Manage Patners
import ManagePatnersPage from '../../Pages/ManagePatner/ManagePatner';
import PatnerForm from '../../Components/Forms/PatnersForm/PatnersForm';

//Manage Vc's
import ManageVcsPage from '../../Pages/ManageVcs/ManageVcs';
import VcsForm from '../../Components/Forms/VcsForm/VcsForm';

//Daily Combo Card
import DailyComboCardPage from '../../Pages/DailyComboCard/DailyComboCard';

//Manage Tasks
import ManageTasksPage from '../../Pages/ManageTasks/ManageTasks';

// Message Broadcast
import MessageBroadcast from '../../Pages/MessageBroadcast/MessageBroadcast';

import UserProtected from '../../Components/Protected/UserProtected';

const AdminLayout = () => {
  return (
    <>
      {/* Side Bar */}
      <div className='w-[100vw] h-[100vh] relative flex flex-row bg-custom-image bg-cover bg-center'>

        <div className='absolute w-full h-full bg-black opacity-50'></div>

        <div className='w-[15vw] h-[100vh] border-2'>
          <SideBar />
        </div>

        {/* Content */}
        <div className='w-[85vw] h-[100vh] overflow-y-scroll py-10 px-5 z-10'>
          <Routes>
            <Route path='*' element={<HomePage />} />

            <Route path='/levels' element={<UserProtected ><LevelsTablePage /></UserProtected>} />

            {/* Manage Projects */}
            <Route path='/manage-projects' element={<UserProtected ><ManageProjectsPage /></UserProtected>} />
            <Route path='/project-form' element={<UserProtected ><ProjectsForm /></UserProtected>} />
            <Route path='/project-tasks' element={<UserProtected ><ProjectTasksPage /></UserProtected>} />


            {/* Manage Kols */}
            <Route path='/manage-kols' element={<UserProtected ><ManageKolsPage /></UserProtected>} />
            <Route path='/kols-form' element={<UserProtected ><KolsForm /></UserProtected>} />

            {/* Manage Kols */}
            <Route path='/manage-patners' element={<UserProtected ><ManagePatnersPage /></UserProtected>} />
            <Route path='/patners-form' element={<UserProtected ><PatnerForm /></UserProtected>} />

            {/* Manage Vcs */}
            <Route path='/manage-vcs' element={<UserProtected ><ManageVcsPage /></UserProtected>} />
            <Route path='/vcs-form' element={<UserProtected ><VcsForm /></UserProtected>} />

            {/* Daily Combo Card */}
            <Route path='/daily-combo-card' element={<UserProtected ><DailyComboCardPage /></UserProtected>} />

            {/* Manage Tasks */}
            <Route path='/manage-tasks' element={<UserProtected ><ManageTasksPage /></UserProtected>} />

            {/* Message Broadcast */}
            <Route path='/broadcast-message' element={<UserProtected ><MessageBroadcast /></UserProtected>} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
