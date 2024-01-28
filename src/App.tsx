import React from 'react';
import DeliveryCalculator from './DeliveryCalculator';

function App() {
  return (
    <div className="bg-sky-400 w-screen min-h-[100vh] flex flex-col justify-start items-center">
      <div className='w-full flex justify-start'>
        <div className='ml-10 mt-10 w-40 max-sm:w-28'>
          <img src="./assets/wolt.png" alt="wolt logo" />
        </div>
      </div>
      <div className='mt-5 mb-[500px] flex-1 flex justify-center items-start'>
        <DeliveryCalculator />
      </div>
    </div>
  );
}

export default App;
