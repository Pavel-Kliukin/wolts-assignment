import { useState, useEffect } from 'react';

const DeliveryCalculator = () => {

  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<Date>(new Date());
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value.replace(/(\.\d{2})\d+/g, '$1');
    setCartValue(Number(newValue));
  };

  const buttonHandler = () => {
    const cartValue = document.getElementById('cartValue') as HTMLInputElement;
    const deliveryDistance = document.getElementById('deliveryDistance') as HTMLInputElement;
    const numberOfItems = document.getElementById('numberOfItems') as HTMLInputElement;
    const orderTime = document.getElementById('orderTime') as HTMLInputElement;

    setCartValue(Number(cartValue.value));
    setDeliveryDistance(Number(deliveryDistance.value));
    setNumberOfItems(Number(numberOfItems.value));
    setOrderTime(new Date(orderTime.value));

  }


  useEffect(() => {
    const deliveryCost = (cartValue * 10000000) + (deliveryDistance * 100) + (numberOfItems)
    setDeliveryCost(deliveryCost);
    
  }, [cartValue, deliveryDistance, numberOfItems, orderTime])

  return (
    <div className='pl-12 w-[400px] h-[600px] border-4 border-zinc-100 rounded-lg flex flex-col justify-center items-start'>
      <div>
        <label htmlFor="cartValue" className="block text-sm font-medium leading-6 text-gray-900">
          Cart value
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
          <input
            type="number"
            id="cartValue"
            data-test-id="cartValue"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleInputChange}
            value={cartValue} 
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <span className="text-gray-500 mr-2 sm:text-sm">EUR</span>
          </div>
        </div>
      </div>
      
      <div className='mt-5'>
        <label htmlFor="deliveryDistance" className="block text-sm font-medium leading-6 text-gray-900">
          Delivery Distance
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="number"
            id="deliveryDistance"
            data-test-id="deliveryDistance"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <span className="text-gray-500 mr-2 sm:text-sm">meters</span>
          </div>
        </div>
      </div>
      
      <div className='mt-5'>
        <label htmlFor="numberOfItems" className="block text-sm font-medium leading-6 text-gray-900">
          Number of items
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="number"
            id="numberOfItems"
            data-test-id="numberOfItems"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0"
          />
        </div>
      </div>
      
      <div className='mt-5'>
        <label htmlFor="orderTime" className="block text-sm font-medium leading-6 text-gray-900">
          Time
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="datetime-local"
            id="orderTime"
            data-test-id="orderTime"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <button type="button" 
        className="mt-14 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={buttonHandler}>
        <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
          {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
          <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/>
        </svg>
        Calculate delivery
      </button>

      <div className='mt-8 flex items-center'>
        <h2 className='text-xl font-semibold'>Delivery cost:</h2>
        <div className='ml-2 w-20 h-9 bg-zinc-100 rounded-md flex justify-center items-center'>{deliveryCost}</div>
        <div className='ml-1'>EUR</div>
      </div>
      
    </div>
  );
};

export default DeliveryCalculator;