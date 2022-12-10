import { FiXCircle } from "react-icons/fi";

const CartItemList = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div>Pic</div>
      <div>Title</div>
      <div>Price and quantity</div>
      <div>
        <FiXCircle />
      </div>
    </div>
  );
};

export default CartItemList;
