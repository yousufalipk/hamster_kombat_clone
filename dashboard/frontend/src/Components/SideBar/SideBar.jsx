import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/Firebase';

const SideBar = () => {
  const { username, userType, logoutUser, page, setPage } = useFirebase();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    // LogOut Logic 
    try {
      const response = await logoutUser();
      if (response.success) {
        setTimeout(() => {
          toast.success("Logged Out Succesfully!")
        }, 1000)
        navigate('/')
      }
      else {
        setTimeout(() => {
          toast.error("Error Logging Out!")
        }, 1000)
      }
    } catch (error) {
      console.log(error);
      toast.error('Logging Out Failed!');
    }
  }

  return (
    <>
      <div className='flex flex-col justify-between h-screen bg-transparent backdrop-blur-3xl'>
        {/* Logo */}
        <div className='flex flex-col items-center mt-4'>
          <Link to='/'>
            <p className='mt-8 mx-5 px-7 text-4xl text-white'>PandaTap</p>
          </Link>

          {/* Menu*/}
          <div className='flex flex-col mt-4 w-full'>
            <div className='w-1/2 mx-auto text-center'>
              Welcome Back!
              <p className='text-bluebtn mb-8'>{username}</p>
            </div>
            <Link
              onClick={() => {
                setPage('dashboard');
              }}
              className={`w-full py-5 px-10 ${[page === 'dashboard' && 'text-bluebtn']}`}
              to='/'
            >
              Dashboard
            </Link>
            <hr className='border-1 border-[gray] w-4/5 mx-auto' />

            {userType === 'admin' ? (
              <>
                <Link
                  onClick={() => {
                    setPage('projects');
                  }}
                  className={`w-full py-5 px-10 ${[page === 'projects' && 'text-bluebtn']}`}
                  to='/manage-projects'
                >
                  Manage Projects
                </Link>
                <hr className='border-1 border-[gray] w-4/5 mx-auto' />
                <Link
                  onClick={() => {
                    setPage('kols');
                  }}
                  className={`w-full py-5 px-10 ${[page === 'kols' && 'text-bluebtn']}`}
                  to='/manage-kols'
                >
                  Manage Kols
                </Link>
              </>
            ) : (
              <>

              </>
            )}
            <hr className='border-1 border-[gray] w-4/5 mx-auto' />
          </div>
        </div>

        {/* Logout button*/}
        <div className='my-10 w-full'>
          <button className='flex flex-row px-10 py-5 w-full hover:text-bluebtn' onClick={handleLogOut}>
            Log Out <FiLogOut className='mx-3 mt-1' />
          </button>
        </div>
      </div>
    </>

  )
}

export default SideBar;