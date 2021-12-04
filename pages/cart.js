import React, { useState, useEffect} from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { getGameByUrlApi } from '../api/game';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart';


export default function Cart() {
    const { getProductsCart, removeProductCart, updateProductCart } = useCart();
    const products = getProductsCart();

    return !products 
        ? <EmptyCart />
        : <NotEmptyCart products={products} />
}

function EmptyCart() {
    return (
        <BasicLayout className="empty-cart">
            <h1>Carrito vacio</h1>
        </BasicLayout>
    );
}

function NotEmptyCart(props) {
    const { products } = props;
    const [productsData, setProductsData] = useState(null);
    // console.log(productsData);

    useEffect(() => {
        (async()=> {
            const productsTemp = [];
            for await (const product of products) {
                const data = await getGameByUrlApi(product);
                productsTemp.push(data);
            }
            setProductsData(productsTemp);
        })()
    }, []);

    return (
        <BasicLayout className="empty-cart">
            <SummaryCart products={productsData} />
        </BasicLayout>
    );
}