import { createContext } from 'react';

const CartContext = createContext({
    productsCart: 0,
    addProductCart: () => {},
    removeProductCart: () => {},
    getProductsCart: () => {},
    removeAllProdcutsCart: () => {},
});

export default CartContext;
