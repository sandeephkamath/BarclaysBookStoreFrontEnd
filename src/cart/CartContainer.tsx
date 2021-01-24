import React, { useEffect, useState } from 'react';
import { Cart, CartItem } from '../book/Book';
import { BookGrid } from '../book/BookGrid';

interface CartContainerProps {
    cart: Cart;
    onAddToCart: (cartItem: CartItem) => void;
}

export const CartContainer = (props: CartContainerProps) => {
    return (
        <React.Fragment>
            <BookGrid cartItems={props.cart.cartItems} books={[]} onAddToCart={props.onAddToCart} />
        </React.Fragment>
    );
};
