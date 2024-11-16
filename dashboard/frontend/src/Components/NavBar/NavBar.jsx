import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <div>
        <Link to='/'>
          <p className='mt-8 mx-5 px-7 text-5xl text-white'>Panda Tap</p>
        </Link>
      </div>
    </>
  )
}

export default NavBar;
