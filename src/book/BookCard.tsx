import React, { useEffect, useState } from 'react';
import { Card, InputNumber } from 'antd';
import { Book, CartItem } from './Book';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface BookCardProps {
    book: Book;
    onAddToCart: (cartItem: CartItem) => void;
    quantity: number;
}

export const BookCard = (props: BookCardProps) => {
    const [quantity, setQuantity] = useState(props.quantity);
    useEffect(() => {
        setQuantity(props.quantity);
    }, [props.quantity]);
    return (
        <Card
            actions={[
                <InputNumber
                    type={'number'}
                    key="setting"
                    min={0}
                    value={quantity}
                    defaultValue={1}
                    onStep={(value) => setQuantity(value)}
                />,
                <ShoppingCartOutlined
                    onClick={() => {
                        props.onAddToCart({ quantity: quantity, book: props.book });
                    }}
                    key="setting"
                />,
            ]}
            hoverable
            style={{ width: 240, height: 300 }}
            cover={<img style={{ height: 280 }} alt={props.book?.title} src={props.book?.imageUrl} />}
        >
            <Meta title={props.book?.title} />
        </Card>
    );
};
