import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { map, size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getOrdersApi } from '../api/order';
import useAuth from '../hooks/useAuth';
import Order from '../components/Orders/Order';

export default function Orders() {
    const { auth, logout } = useAuth();

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getOrdersApi(auth.idUser, logout);
            const result = await response.json();
            // console.log(result);
            setOrders(result || []);
        })();
    }, []);

    return (
        <BasicLayout className="orders">
            <div className="orders__block">
                <div className="title">Mis Pedidos</div>
                <div className="data">
                    {
                        size(orders) === 0 ?
                            <h2>No has adquirido juegos todavía</h2>
                        :
                            <OrderList orders={orders} />
                    }
                </div>
            </div>
        </BasicLayout>
    );
}

function OrderList(props) {
    const { orders } = props;
    // console.log(orders);
    return (
        // <Order orders={orders[0]} />
        <Grid>
            {
                map(orders, (order) => (
                    // console.log(order);
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Order order={order} />
                    </Grid.Column>
                ))
            }
        </Grid>
    );
}