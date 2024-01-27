import { useState, useEffect } from 'react';

const DeliveryCalculator = () => {

  const [cartValue, setCartValue] = useState<string>('');
  const [deliveryDistance, setDeliveryDistance] = useState<string>('');
  const [numberOfItems, setNumberOfItems] = useState<string>('');
  const [orderTime, setOrderTime] = useState<Date>(new Date());
  const [deliveryCost, setDeliveryCost] = useState<number | null>(0);


  const handleCartValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;
  
    // Remove non-digit characters, except for the first zero
    newValue = newValue.replace(/[^0-9.,]|^0+(?=[1-9])/, '');
    
    // Replace multiple dots or commas with a single dot
    newValue = newValue.replace(/[.,]{2,}/g, '.');
    newValue = newValue.replace(',', '.');
    
    // If the input starts with a dot or comma, prepend a zero
    newValue = newValue.replace(/^[.,]/, '0$&');
    
    // Allow only two digits after the dot or comma
    newValue = newValue.replace(/([.,]\d{2})\d+/g, '$1');
    
    // Validate as a number and set the state
    if (!isNaN(Number(newValue))) {
      setCartValue(newValue);
    }
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;
  
    // Remove leading zeros
    newValue = newValue.replace(/^0+/, '');
  
    // If the value is an empty string, allow it
    if (newValue === '') {
      setDeliveryDistance(newValue);
      return;
    }
  
    // Validate as a positive integer and set the state
    if (/^\d+$/.test(newValue)) {
      setDeliveryDistance(newValue);
    }
  };

  const handleNumberOfItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;
  
    // Remove leading zeros
    newValue = newValue.replace(/^0+/, '');
  
    // If the value is an empty string, allow it
    if (newValue === '') {
      setNumberOfItems(newValue);
      return;
    }
  
    // Validate as a positive integer and set the state
    if (/^\d+$/.test(newValue)) {
      setNumberOfItems(newValue);
    }
  };

  const handleOrderTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;
    if (newValue) setOrderTime(new Date(newValue));

  };

  const buttonHandler = () => {

    let newDeliveryCost: number = 0;

    // Add delivery cost based on cart value
    if (Number(cartValue) < 10) {
      newDeliveryCost = 10 - Number(cartValue);
    }

    // Add delivery cost based on distance
    const distance: number = Number(deliveryDistance);
    newDeliveryCost += 2
    if (distance > 1000) {
      newDeliveryCost += 1 * Math.ceil((distance - 1000) / 500);
    }

    // Add delivery cost based on number of items
    const items: number = Number(numberOfItems);
    if ( items > 4) {
      newDeliveryCost += (items - 4) * 0.50;
    }
    if ( items > 12) {
      newDeliveryCost += 1.20;
    }

    // Add delivery cost based on order time
    if (orderTime.getDay() === 5 && orderTime.getHours() >= 15 && orderTime.getHours() < 19) {
      newDeliveryCost *= 1.2;
    }

    // Correct the delivery cost based on other confitions
    if (newDeliveryCost > 15) {
      newDeliveryCost = 15;
    }
    if (Number(cartValue) >= 200) {
      newDeliveryCost = 0;
    }

    setDeliveryCost(newDeliveryCost);

  }

  // Reset delivery cost to null when any of the input values change
  useEffect(() => {
    setDeliveryCost(null)
    
  }, [cartValue, deliveryDistance, numberOfItems, orderTime])

  return (
    <div className='w-[400px] h-[600px] border-4 border-zinc-100 rounded-lg flex flex-col justify-center items-start'>
      <div className='ml-12'>
        <label htmlFor="cartValue" className="block text-sm font-medium leading-6 text-gray-900">
          Cart value
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
          <input
            type="text"
            id="cartValue"
            data-test-id="cartValue"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleCartValueInputChange}
            value={cartValue}
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <span className="text-gray-500 mr-2 sm:text-sm">EUR</span>
          </div>
        </div>
      </div>
      
      <div className='mt-5 ml-12'>
        <label htmlFor="deliveryDistance" className="block text-sm font-medium leading-6 text-gray-900">
          Delivery distance
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            id="deliveryDistance"
            data-test-id="deliveryDistance"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleDistanceChange}
            value={deliveryDistance}
            placeholder="0"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <span className="text-gray-500 mr-2 sm:text-sm">meters</span>
          </div>
        </div>
      </div>
      
      <div className='mt-5 ml-12'>
        <label htmlFor="numberOfItems" className="block text-sm font-medium leading-6 text-gray-900">
          Number of items
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            id="numberOfItems"
            data-test-id="numberOfItems"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleNumberOfItems}
            value={numberOfItems}
            placeholder="0"
          />
        </div>
      </div>
      
      <div className='mt-5 ml-12'>
        <label htmlFor="orderTime" className="block text-sm font-medium leading-6 text-gray-900">
          Time
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="datetime-local"
            id="orderTime"
            data-test-id="orderTime"
            onChange={handleOrderTimeChange}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <button type="button" 
        className="mt-14 ml-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={buttonHandler}>
        <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
          {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
          <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/>
        </svg>
        Calculate delivery
      </button>

      <div className='w-full h-16 mt-8 pl-12 bg-blue-600 flex items-center'>
        <h2 className='text-xl font-semibold text-white'>Delivery cost:</h2>
        <div
          data-test-id="fee" 
          className='ml-2 w-20 h-9 bg-zinc-100 rounded-md flex justify-center items-center text-xl font-semibold'>{deliveryCost?.toFixed(2)}</div>
        <div className='ml-2 text-xl text-white'>EUR</div>
      </div>
      
    </div>
  );
};

export default DeliveryCalculator;