import { useState } from 'react';
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';

interface IProps {
  name: string;
  price: string;
}

const ProductDetail = ({ name, price }: IProps) => {
  const [quantity, setQuantity] = useState(0);

  const addQty = () => {
    setQuantity(quantity + 1);
  };

  const minusQty = () => {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  };

  const handleAddToCart = () => {
    //Function to add to cart
  };

  return (
    <div className='flex p-2 flex-col justify-between'>
      {/* Name */}
      <h2 className='text-3xl text-red-500 font-bold '>{name}</h2>
      {/* Price */}
      <div className='flex w-full h-[80px] items-center px-2 gap-2 border-b-2'>
        <span className='text-lg'>Price:</span>
        <span className='text-5xl text-orange-400 font-number'>RM {price}</span>
      </div>
      {/* Quantity */}
      <div className='flex w-full px-2 gap-2'>
        <span className='text-lg'>Quantity:</span>
        <div className='flex flex-row gap-1'>
          <div className='flex justify-center cursor-pointer' onClick={addQty}>
            <FiPlusSquare size={30} />
          </div>
          <div className='flex'>
            <input
              type='text'
              className='rounded border-2 border-black w-10 text-center'
              name='quantity'
              value={quantity}
              onChange={({ value }: any) => setQuantity(value)}
            />
          </div>
          <div className='flex justify-center cursor-pointer' onClick={minusQty}>
            <FiMinusSquare size={30} />
          </div>
        </div>
      </div>
      {/* Add to Cart Button */}
      <div className='border flex justify-center h-12 bg-orange-400 cursor-pointer'>
        <button className='text-white font-semibold text-lg' onClick={handleAddToCart}>
          <p>Add To Cart</p>
        </button>
      </div>
      {/* Like button (coming soon) */}
    </div>
  );
};

export default ProductDetail;
