import React from 'react';
import { CartItem } from '../book/Book';
import { BookCard } from '../book/BookCard';

interface CartItemProps {
    cartItem: CartItem;
    onAddToCart: (cartItem: CartItem) => void;
}

export const CartItemCard = (props: CartItemProps) => {
    return <BookCard book={props.cartItem.book} onAddToCart={props.onAddToCart} quantity={props.cartItem.quantity} />;
};
