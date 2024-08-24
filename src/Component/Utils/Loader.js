import React from 'react';
import { useSelector } from 'react-redux';
import { isLoading } from './AllSelector';


const Loader = () => {


  const roleLoader = useSelector(isLoading)
  console.log("roleLoader", roleLoader);


  return (
    <>
      <div className='mainLoader'>
        <span class="loader"></span>
      </div>
    </>
  );
}

export default Loader;
