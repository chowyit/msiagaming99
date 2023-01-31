import { FiShoppingCart } from 'react-icons/fi';
import CartItem from './CartItem';

const CartButton = () => {
  return (
    <>
      <div className='flex flex-row gap-2 justify-center px-4 h-full bg-orange-500 cursor-pointer peer'>
        <div className='flex items-center peer-hover:hidden'>
          <FiShoppingCart color='white' strokeWidth={3} />
        </div>
        <div className='items-center hidden peer-hover:block hover:block'>
          <FiShoppingCart color='black' strokeWidth={3} />
        </div>
        <div className='flex items-center'>
          <span className='font-bold text-white'>Cart</span>
        </div>
      </div>
      <div className='w-[320px] absolute right-5 hidden peer-hover:block hover:block z-20 bg-white shadow-xl flex-col p-2'>
        <CartItem />
      </div>
    </>
  );
};

export default CartButton;
