import React from 'react';
import DeliveryCalculator from './DeliveryCalculator';

function App() {
  
  return (
    <div className="bg-sky-400 w-screen min-h-[100vh] flex flex-col justify-start items-center">
      <div className='z-20  w-full flex justify-start max-sm:justify-between bg-sky-400'>
        
        {/* WOLT LOGO */}
        <div className='ml-10 mt-10 w-40 max-sm:w-28'>
          <img src="./assets/wolt.png" alt="wolt logo" />
        </div>

        {/* MYSTERY PORTAL */}
        <a href="https://internship-application.netlify.app/" rel="noreferrer">
          <div className='relative ml-20 max-sm:ml-0 w-40 h-[150px] flex justify-center items-center group/portal'>
            <img 
              className='z-10 absolute left-[18px] top-[14px] w-[120px] h-[120px] transform transition-transform sm:group-hover/portal:scale-125' 
              src="./assets/ring.png" 
              alt="lightning ring" />
            <div className='w-[85px] h-[85px] transform transition-all sm:group-hover/portal:w-[100px] sm:group-hover/portal:h-[100px] rounded-full font-wolt_semiBold text-white text-2xl max-sm:text-xl flex text-center justify-center items-center overflow-hidden bg-[400%] animate-[gradient_5s_infinite]'
                style={{
                  boxShadow: '11px 11px 11px rgba(255, 165, 0, 0.34), -11px -11px 11px rgba(255, 165, 0, 0.34), 11px -11px 11px rgba(255, 165, 0, 0.34), -11px 11px 11px rgba(255, 165, 0, 0.34)',
                  backgroundImage: 'linear-gradient(to left bottom, black 45%, rgb(94, 83, 12) 47%, rgb(255, 255, 51) 50%, rgb(94, 83, 12) 53%, black 55%',
                  backgroundSize: '500% 500%',
                }}
                >
              Mystery portal
            </div>
          </div>
        </a> 

      </div>
      <div className='flex-1 flex flex-col justify-start items-start'>
        <DeliveryCalculator />
      </div>
    </div>
  );
}

export default App;