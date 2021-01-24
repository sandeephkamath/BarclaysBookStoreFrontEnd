import { Avatar, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Cart } from '../book/Book';

interface CartIconProps {
    cart: Cart;
}

export const CartIcon = (props: CartIconProps) => {
    return (
        <Badge count={props.cart.cartItems.length}>
            <Avatar shape="square" icon={<ShoppingCartOutlined />} />
        </Badge>
    );
};
