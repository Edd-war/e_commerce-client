import React, { useEffect, useState } from 'react';
import { Table, Image, Icon } from 'semantic-ui-react';
import { forEach, map, size } from 'lodash';
import useCart from '../../../hooks/useCart';

export default function SummaryCart(props) {
    const { products } = props;
    // console.log(products);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        forEach(products, (product) => {
            total += product[0].price;
        });
        setTotalPrice(total);
    }, [products]);

    return (
        <div className="summary-cart">
            <div className="title">Resumen del carrito</div>
            <div className="data">
                <Table celled structured>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Producto</Table.HeaderCell>
                            <Table.HeaderCell>Paltaforma</Table.HeaderCell>
                            <Table.HeaderCell>Entrega</Table.HeaderCell>
                            <Table.HeaderCell>Precio</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {map(products, (product) => (
                            <Table.Row key={product[0]._id} className="summary-cart__product">
                                <Table.Cell>
                                    <Icon 
                                        name="close" 
                                        link 
                                        onClick={() => console.log(product)} 
                                    />
                                    <Image src={product[0].poster.url} alt={product[0]} />
                                    <div className="name">{product[0].title}</div>
                                </Table.Cell>
                                <Table.Cell>{product[0].platform.title}</Table.Cell>
                                <Table.Cell>Inmediata</Table.Cell>
                                <Table.Cell>$ {product[0].price}</Table.Cell>
                            </Table.Row>
                        ))}                        
                        <Table.Row className="summary-cart__resume">
                            <Table.Cell className="clear"/>
                            <Table.Cell colSpan="2">Total: </Table.Cell>
                            <Table.Cell className="total-price">$ {(totalPrice).toFixed(2)}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
