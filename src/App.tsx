import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import { BooksContainer } from './book/BooksContainer';
import { CartIcon } from './cart/CartIcon';
import { ApiClient } from './apiclient/ApiClient';
import { getEmail } from './Storage';
import { Cart, CartItem } from './book/Book';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { CartContainer } from './cart/CartContainer';

const { Header, Content, Footer } = Layout;

export const App = () => {
    const [cart, setCart] = useState<Cart>({ cartItems: [], total: 0 });
    const getCart = () => {
        ApiClient.get<Cart>(`/cart?email=${getEmail()}`).then((response) => {
            setCart(response.data);
        });
    };

    const postItem = (cartItem: CartItem) => {
        ApiClient.post<Cart>(`/cart?email=${getEmail()}`, cartItem).then((response) => {
            setCart(response.data);
        });
    };
    useEffect(() => {
        getCart();
    }, []);
    return (
        <BrowserRouter>
            <Layout>
                <Header title={'Book Store'} style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <Link to={'/cart'}>
                        <CartIcon cart={cart} />
                    </Link>
                </Header>
                <Switch>
                    <Route path={'/cart'}>
                        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 1024 }}>
                                <CartContainer onAddToCart={postItem} cart={cart} />
                            </div>
                        </Content>
                    </Route>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 1024 }}>
                            <BooksContainer onAddToCart={postItem} />
                        </div>
                    </Content>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
