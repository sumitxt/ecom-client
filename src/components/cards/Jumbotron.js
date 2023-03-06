import React, { useState } from 'react';

const Jumbotron = ({
  title,
  subTitle = "Welcome to React E-commerce",
}) =>  {
  return (
        <div
            className='p-5 text-center bg-image'
            style={{ backgroundImage: "url('https://images.pexels.com/photos/35550/ipad-tablet-technology-touch.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", height: '400px' }}
        >
          <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div className='text-white'>
                <h1 className='mb-3'>{title}</h1>
                <h4 className='mb-3'>{subTitle}</h4>
              </div>
            </div>
          </div>
        </div>
  );
}
export default Jumbotron;



