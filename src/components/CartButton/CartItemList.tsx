import { FiXCircle } from 'react-icons/fi';
import { ICartProps } from '../../shared/hooks/useCartHook';

interface IProps {
  items: ICartProps[];
  removeItem: (item: ICartProps) => void;
}

const CartItemList = ({ items, removeItem }: IProps) => {
  const handleRemoveItemClick = (item: ICartProps) => {
    removeItem(item);
  };

  return (
    <>
      {items.length > 0 ? (
        <table className='w-full text-center'>
          <tr className='border-b-2'>
            <th className='w-[10%]'>No.</th>
            <th className='w-[50%]'>Name</th>
            <th className='w-[20%]'>Qty</th>
            <th className='w-[20%]'>Price</th>
          </tr>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className='flex-wrap'>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <FiXCircle className='cursor-pointer' onClick={() => handleRemoveItemClick(item)} />
              </td>
            </tr>
          ))}
        </table>
      ) : (
        //TO DO TRANSLATE
        <span className='text-center items-center'>No items added yet...</span>
      )}
    </>
  );
};

export default CartItemList;
