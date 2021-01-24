import React, { useEffect, useState } from 'react';
import { Book, CartItem, Page } from './Book';
import { ApiClient } from '../apiclient/ApiClient';
import { BookGrid } from './BookGrid';
import { Col, Input, Pagination, Row, Select, Spin } from 'antd';

const { Option } = Select;
const { Search } = Input;

interface BooksContainerProps {
    onAddToCart: (cartItem: CartItem) => void;
}

export const BooksContainer = (props: BooksContainerProps) => {
    const [pagedBooks, setPagedBooks] = useState<Page<Book>>({
        content: [],
        totalPages: 0,
        size: 0,
        totalElements: 0,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('');

    const SortOptions = () => {
        return (
            <Select<string>
                value={sortOption}
                showSearch
                style={{ width: 200 }}
                placeholder="Sort "
                onChange={(value) => setSortOption(value)}
            >
                <Option value={'averageRating,ASC'}>Rating - Ascending</Option>
                <Option value={'averageRating,DESC'}>Rating - Descending</Option>
            </Select>
        );
    };

    const getQuery = () => {
        return `/books?searchQuery=${searchQuery}&size=20&page=${currentPage - 1}&sort=${sortOption}`;
    };

    const getData = () => {
        ApiClient.get<Page<Book>>(getQuery()).then((response) => {
            setIsLoading(false);
            setPagedBooks(response.data);
        });
    };

    useEffect(() => {
        getData();
    }, [currentPage, sortOption]);

    useEffect(() => {
        getData();
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <React.Fragment>
            <Row>
                <Col flex={1}>
                    <Search onSearch={(value) => setSearchQuery(value)} placeholder={'Search...'} />
                </Col>
                <Col flex={1}>
                    <SortOptions />
                </Col>
            </Row>
            <Spin spinning={isLoading} />
            <Row>
                <BookGrid
                    cartItems={[]}
                    onAddToCart={(cartItem) => {
                        setIsLoading(true);
                        props.onAddToCart(cartItem);
                    }}
                    books={pagedBooks.content}
                />
            </Row>
            <Row>
                <Pagination
                    onChange={(page) => {
                        console.log(page);
                        setCurrentPage(page);
                    }}
                    current={currentPage}
                    pageSize={20}
                    total={pagedBooks.totalPages}
                />
            </Row>
        </React.Fragment>
    );
};
