import { useState, useEffect, useCallback } from 'react';

const DeliveryCalculator = () => {

  // VARIABLES FOR THE INPUTS AND THE TOTAL DELIVERY COST
  const [cartValue, setCartValue] = useState<string>('');
  const [deliveryDistance, setDeliveryDistance] = useState<string>('');
  const [numberOfItems, setNumberOfItems] = useState<string>('');
  const [orderTime, setOrderTime] = useState<Date>(new Date());
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  // VARIABLES FOR THE RECEIPT THAT WILL BE SLIDING DOWN WHEN THE BUTTON IS CLICKED 
  const slidingReceipt: HTMLDivElement | null = document.getElementById('slidingReceipt') as HTMLDivElement;
  const [cartValuePart, setCartValuePart] = useState<number>(0);
  const [deliveryDistancePart, setDeliveryDistancePart] = useState<number>(2);
  const [numberOfItemsPart, setNumberOfItemsPart] = useState<number>(0);
  const [orderTimePart, setOrderTimePart] = useState<number>(0);
  const [discountPart, setDiscountPart] = useState<number | null>(null);
  // Current date for the receipt and it's formatting
  const todayDate: Date = new Date();
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = String(date.getFullYear());
    return `${day}.${month}.${year}`;
  };
  // Current time for the receipt and it's formatting
  const formattedTodayDate: string = formatDate(todayDate);
  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const currentTime: string = formatTime(todayDate);


  // HANDLERS FOR THE INPUTS AND THE BUTTON

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

    // CALCULATION OF THE DELIVERY COST
    
    let newDeliveryCost: number = 0;

    // Add delivery cost based on cart value
    if (Number(cartValue) < 10) {
      setCartValuePart (10 - Number(cartValue));
      newDeliveryCost += 10 - Number(cartValue)
    }

    // Add delivery cost based on distance
    const distance: number = Number(deliveryDistance);
    newDeliveryCost += 2
    if (distance > 1000) {
      setDeliveryDistancePart(2 + 1 * Math.ceil((distance - 1000) / 500))
      newDeliveryCost += 1 * Math.ceil((distance - 1000) / 500);
    }

    // Add delivery cost based on number of items
    const items: number = Number(numberOfItems);
    if ( items > 4) {
      setNumberOfItemsPart((items - 4) * 0.50);
      newDeliveryCost += (items - 4) * 0.50;
    }
    if ( items > 12) {
      setNumberOfItemsPart((items - 4) * 0.50 + 1.2)
      newDeliveryCost += 1.20;
    }

    // Add delivery cost based on order time
    if (orderTime.getDay() === 5 && orderTime.getHours() >= 15 && orderTime.getHours() < 19) {
      setOrderTimePart(0.2 * newDeliveryCost);
      newDeliveryCost *= 1.2;
    }
    
    // Correct the delivery cost based on other conditions
    if (newDeliveryCost > 15 && Number(cartValue) < 200) {
      setDiscountPart(newDeliveryCost - 15);
      newDeliveryCost = 15;
    }
    if (Number(cartValue) >= 200) {
      setDiscountPart(newDeliveryCost);
      newDeliveryCost = 0;
    }   

    setDeliveryCost(newDeliveryCost);

    // Slide down the receipt
    if (slidingReceipt) {
      slidingReceipt.classList.add('translate-y-[420px]');
      slidingReceipt.classList.add('max-sm:translate-y-[340px]');
    }

  }

  // Slide up the receipt
  const slideUpReceipt = useCallback(() => {
    if (slidingReceipt) {
      slidingReceipt.classList.remove('translate-y-[420px]');
      slidingReceipt.classList.remove('max-sm:translate-y-[340px]');
    }
  }, [slidingReceipt]);

  // Reset delivery cost and all receipt's variables to null when any of the input values change
  useEffect(() => {
    setDeliveryCost(0);
    setCartValuePart(0);
    setDeliveryDistancePart(2);
    setNumberOfItemsPart(0);
    setOrderTimePart(0);
    setDiscountPart(null);

    slideUpReceipt();
  }, [cartValue, deliveryDistance, numberOfItems, orderTime, slideUpReceipt])

  return (
    <div className='w-[500px] max-sm:w-[280px] flex flex-col justify-center items-start'>
      <div className='z-20 w-full flex-1 bg-sky-400 flex flex-col justify-center items-center'>
        <h1 className='my-12 font-wolt_Bold text-5xl text-white max-sm:text-3xl max-sm:my-6'>
          Delivery calculator
        </h1>
        <div className='w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1'>

          {/* CART VALUE INPUT */}
          <div className='flex justify-center items-center'>
            <div>
              <label htmlFor="cartValue" className="ml-3 block text-base font-wolt_Light leading-6 text-gray-700">
                Cart value
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-400 sm:text-sm">€</span>
                </div>
                <input
                  type="text"
                  id="cartValue"
                  data-test-id="cartValue"
                  onChange={handleCartValueInputChange}
                  value={cartValue}
                  placeholder="0.00"
                  className="block w-[200px] rounded-3xl border-0 py-1.5 pl-7 pr-7 max-sm:pr-4 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 text-sm leading-8"
                />
              </div>
            </div>
          </div>
          
          {/* DELIVERY DISTANCE INPUT */}
          <div className='flex justify-center items-center'>
            <div>
              <label htmlFor="deliveryDistance" className="ml-3 block text-base font-wolt_Light leading-6 text-gray-700">
                Delivery distance
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="deliveryDistance"
                  data-test-id="deliveryDistance"
                  onChange={handleDistanceChange}
                  value={deliveryDistance}
                  placeholder="0"
                  className="block w-[200px] rounded-3xl border-0 py-1.5 pl-7 pr-7 max-sm:pr-4 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 text-sm leading-8"
                />
                <div className="absolute inset-y-0 left-[140px] flex items-center">
                  <span className="text-gray-400 mr-2 text-sm">meters</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* ITEMS AMOUNT INPUT */}
          <div className='flex justify-center items-center'>
            <div>
              <label htmlFor="numberOfItems" className="ml-3 block text-base font-wolt_Light leading-6 text-gray-900">
                Number of items
              </label>
              <input
                type="text"
                id="numberOfItems"
                data-test-id="numberOfItems"
                onChange={handleNumberOfItems}
                value={numberOfItems}
                placeholder="0"
                className="block mt-2 w-[200px] rounded-3xl border-0 py-1.5 pl-7 pr-7 max-sm:pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 text-sm leading-8"
              />
            </div>
          </div>
          
          {/* DELIVERY DATE AND TIME INPUT */}
          <div className='flex justify-center items-center'>
            <div>
              <label htmlFor="orderTime" className="ml-3 block text-base font-wolt_Light leading-6 text-gray-900">
                Delivery time
              </label>
              <input
                type="datetime-local"
                id="orderTime"
                data-test-id="orderTime"
                onChange={handleOrderTimeChange}
                className="block mt-2 w-[200px] h-[44px] rounded-3xl border-0 py-1.5 pl-7 pr-7 max-sm:pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 text-sm leading-8"
              />
            </div>
          </div>
        </div>
        
        {/* CALCULATE BUTTON */}
        <button type="button" 
          className="mt-14 max-sm:mt-10 w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 text-base font-wolt_Regular rounded-3xl px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={buttonHandler}>
          <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512">
            {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
            <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/>
          </svg>
          Calculate delivery
        </button>

        {/* UPPER PART OF RECEIPT HOLE */}
        <div className='mt-10 w-full flex justify-center items-end'>
          <div className='w-[80%] max-w-[300px] h-1.5 bg-black border-2 border-b-0 rounded-t-md border-inherit'></div>
        </div>

      </div>
      
      {/* SLIDING RECEIPT */}
      <div className='w-full h-[10%] flex flex-col items-center'>
        <div className='relative w-[80%] max-w-[300px] flex flex-col items-start'>
          <div 
            onClick={slideUpReceipt}
            id='slidingReceipt'
            className='absolute z-10 inset-x-[5%] bottom-[-20px] w-[90%] h-[440px] max-sm:h-[360px] font-receipt bg-white border-slate-500 border-b-2 border-dotted transition-all duration-700 p-4 max-sm:p-2 max-sm:py-4 flex flex-col justify-between'>
              <div className='w-full flex justify-center'>
                <img className='w-[30%] opacity-70' src="./assets/wolt-black.png" alt="wolt logo" />
              </div>
              <div className='w-full mt-4 text-center text-xl max-sm:text-base'>DELIVERY FEE</div>
              <div>
                <div className='w-full mt-1 text-right max-sm:text-sm'>EUR</div>
                <div className='w-full flex justify-end'>
                  <span className='flex-1 text-left max-sm:text-xs'>'Cart value' part</span>
                  <span className='w-[70px] text-right max-sm:text-xs max-sm:w-[40px]'>{cartValuePart.toFixed(2)}</span>
                </div>
                <div className='w-full flex justify-end'>
                  <span className='flex-1 text-left max-sm:text-xs'>'Distance' part</span>
                  <span className='w-[70px] text-right max-sm:text-xs max-sm:w-[40px]'>{deliveryDistancePart.toFixed(2)}</span>
                </div>
                <div className='w-full flex justify-end'>
                  <span className='flex-1 text-left max-sm:text-xs'>'Items' part</span>
                  <span className='w-[70px] text-right max-sm:text-xs max-sm:w-[40px]'>{numberOfItemsPart.toFixed(2)}</span>
                </div>
                <div className='w-full flex justify-end'>
                  <span className='flex-1 text-left max-sm:text-xs'>'Rush hour' part</span>
                  <span className='w-[70px] text-right max-sm:text-xs max-sm:w-[40px]'>{orderTimePart.toFixed(2)}</span>
                </div>
                {discountPart &&
                  <div className='w-full flex justify-end'>
                    <span className='flex-1 pr-2 text-right max-sm:text-xs'>Discount</span>
                    <span className='w-[70px] text-right max-sm:text-xs max-sm:w-[50px]'>-{discountPart.toFixed(2)}</span>
                  </div>
                }
              </div>
              <div>
                <div className='mt-2 w-full text-right max-sm:text-sm'>========</div>
                <div className='w-full flex text-xl max-sm:text-lg'>
                  <div className='w-full ml-3 text-left'>TOTAL:</div>
                  <div 
                    data-test-id="fee" 
                    className='w-full text-right'>{deliveryCost.toFixed(2)}</div>
                </div>
                <div className='w-full text-right max-sm:text-sm'>========</div>
                <div className='mt-4 w-full flex justify-center'>
                  <img src="./assets/barcode.jpg" alt="barcode" className='w-[70%] h-[50px] max-sm:h-[35px]' />
                </div>
                <div className='mt-4 w-full flex justify-between max-sm:text-sm'>
                  <div className='text-left'>{formattedTodayDate}</div>
                  <div className='text-right'>{currentTime}</div>
                </div>
              </div>
            </div>
          </div>
        {/* LOWER PART OF RECEIPT HOLE */}
        <div className='w-[80%] max-w-[300px] h-1.5 mb-[500px] max-sm:mb-[400px] bg-black border-2 border-t-0 rounded-b-md border-inherit'></div>
      </div> 

    </div>
  );
};

export default DeliveryCalculator;