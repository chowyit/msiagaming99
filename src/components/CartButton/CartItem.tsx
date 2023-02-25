import React from 'react';
import { useCartHook } from '../../shared/hooks/useCartHook';
import CartItemList from './CartItemList';

const CartItem = () => {
  const currency = 'RM';
  const { cartItems, getCartTotalPrice, removeItemFromCart } = useCartHook();

  return (
    <div className='flex w-full flex-col justify-between'>
      <CartItemList items={cartItems} removeItem={removeItemFromCart} />
      <div className='flex flex-row justify-between bottom-0 mt-5 border-t-2 pt-2'>
        <div className='flex flex-col'>
          <div className='text-black text-lg font-bold'>Total items: {cartItems.length}</div>
          <div className='text-black text-lg font-bold'>
            Total: {currency} {getCartTotalPrice()}
          </div>
        </div>
        <div className='flex bg-orange-500 px-10 text-white'>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
