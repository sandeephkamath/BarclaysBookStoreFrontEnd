import React from 'react';
import { Col, Row } from 'antd';
import { BookCard } from './BookCard';
import { Book, CartItem } from './Book';

interface BookGridProps {
    books: Array<Book>;
    onAddToCart: (cartItem: CartItem) => void;
    cartItems: Array<CartItem>;
}

export const BookGrid = (props: BookGridProps) => {
    const cartItems =
        props.cartItems && props.cartItems.length == 0
            ? props.books.map((book) => ({
                  book: book,
                  quantity: 1,
              }))
            : props.cartItems;
    return (
        <React.Fragment>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {cartItems?.map((cartItem) => (
                    <Col key={cartItem.book.id} className="gutter-row" flex={1}>
                        <BookCard quantity={cartItem.quantity} book={cartItem.book} onAddToCart={props.onAddToCart} />
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
};
