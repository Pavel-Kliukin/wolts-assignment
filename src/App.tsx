import React from 'react';
import DeliveryCalculator from './DeliveryCalculator';

function App() {

  const deliveryLable: HTMLDivElement | null = document.getElementById('deliveryLable') as HTMLDivElement;
  const portalLable: HTMLDivElement | null = document.getElementById('portalLable') as HTMLDivElement;
  
  return (
    <div className="bg-sky-400 w-screen min-h-[100vh] flex flex-col justify-start items-center">
      <div className='w-full flex justify-start'>
        <div className='ml-10 mt-10 w-40 max-sm:w-28'>
          <img src="./assets/wolt.png" alt="wolt logo" />
        </div>
      </div>
      <div className='mt-12 mb-[500px] flex-1 flex flex-col justify-center items-start'>
        
        <div className='w-[280px] sm:w-[400px] flex justify-start'>
          {/* Delivery calculator label */}
          <div 
            id='deliveryLable'
            // onClick={deliveryLableHandler}
            className='relative z-10 ml-5 w-[47%] max-sm:w-[72%] bg-sky-400 border-4 border-b-0 border-zinc-100 rounded-t-lg text-center text-xl font-wolt_Bold'
            >
            Delivery calculator
            <div className='absolute z-10 bottom-[-4px] left-0 w-full h-[4px] bg-sky-400'></div>
          </div>
          {/* Mystery portal label */}
          <div 
            id='portalLable'
            // onClick={portalLableHandler}
            className='relative w-[40%] max-sm:w-[60%] translate-x-[-4px] text-white text-lg max-sm:text-sm bg-zinc-500 border-4 border-b-0 border-l-0 border-zinc-100 rounded-t-lg text-center'>
            Mystery portal
            <div className='absolute hidden z-10 bottom-[-4px] left-0 w-full h-[4px] bg-sky-400'></div>
          </div>
        </div>

        <div className='relative w-[270px] h-[500px] sm:w-[400px] sm:h-[600px]'>
          <DeliveryCalculator />
        </div>
      </div>
    </div>
  );
}

export default App;