import React from 'react';

const Title = (props) => {
  const { name, subName, className } = props;
  return (
    // <div className={className && 'mainTitle d-flex align-items-center justify-content-between cursor-pointer'}>
    <div className={`mainTitle d-flex align-items-center justify-content-start cursor-pointer ${className || ''}`}>
      <div className={"title m-0 fw-600"}>{subName ? subName : name}</div>
      {/* <div className="titlePath">
        <span>Dashboard  <i className="ri-arrow-right-s-line"></i></span>
        <span className='text-second'> {name}</span>
        {subName && <span className='text-second'> <i className="ri-arrow-right-s-line"></i> {subName} </span>}
      </div> */}
    </div>
  );
}

export default Title;
