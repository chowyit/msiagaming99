import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage';

export interface ICartProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useCartHook = () => {
  const queryClient = useQueryClient();

  const cartItemsFromLS = getFromLocalStorage('cartItems');

  const [cart, setCart] = useState<ICartProps[]>([]);

  useEffect(() => {
    if (cartItemsFromLS) {
      setCart(JSON.parse(cartItemsFromLS));
    }
  }, [cartItemsFromLS]);

  const addItemToCart = useCallback(
    (item: ICartProps) => {
      const updatedCartItems = [...cart];
      const existingItemIndex = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        updatedCartItems[existingItemIndex].quantity += item.quantity;
      } else {
        updatedCartItems.push({ ...item });
      }
      saveToLocalStorage('cartItems', JSON.stringify(updatedCartItems));
      setCart(updatedCartItems);
    },
    [cart]
  );

  const removeItemFromCart = (item: ICartProps) => {
    const updatedCartItems = cart.filter((cartItem: ICartProps) => cartItem.id !== item.id);
    saveToLocalStorage('cartItems', JSON.stringify(updatedCartItems));
    setCart(updatedCartItems);
  };

  const getCartTotalPrice = () => {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  };

  const clearCart = () => {
    removeFromLocalStorage('cartItems');
    setCart([]);
  };

  useEffect(() => {
    queryClient.setQueryData(['cartItems'], () => cart);
  }, [, queryClient, cart]);

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery(['cartItems'], () => cart, { initialData: [] });

  return {
    addItemToCart,
    removeItemFromCart,
    getCartTotalPrice,
    clearCart,
    cartItems,
    isLoading,
    isError,
  };
};
