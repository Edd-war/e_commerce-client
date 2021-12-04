import { createContext } from 'react';

const CartContext = createContext({
    productsCart: 0,
    addProductCart: () => {},
    removeProductCart: () => {},
    getProductsCart: () => {},
    removeProdcutsCart: () => {},
});

export default CartContext;
