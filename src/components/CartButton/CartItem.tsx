import CartItemList from './CartItemList';

const CartItem = () => {
  const currency = '$';
  const itemNumber = 2;
  return (
    <div className='flex w-full flex-col gap-5 justify-between'>
      <CartItemList />
      <div className='flex flex-row justify-between bottom-0 mt-5 border-t-2 pt-2'>
        <div className='flex flex-col'>
          <div className='text-black text-lg font-bold'>Total items: {itemNumber}</div>
          <div className='text-black text-lg font-bold'>Total: {currency} 100.00</div>
        </div>
        <div className='flex bg-orange-500 px-10 text-white'>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
