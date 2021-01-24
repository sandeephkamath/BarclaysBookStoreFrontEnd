export interface Book {
    title: string;
    id: number;
    imageUrl: string;
}

export interface Page<T> {
    content: Array<T>;
    totalPages: number;
    size: number;
    totalElements: number;
}

export interface CartItem {
    quantity: number;
    book: Book;
}

export interface Cart {
    total: number;
    cartItems: Array<CartItem>;
}
