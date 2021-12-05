import React, { useEffect, useState } from 'react';
import { Grid  } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout';
import { getOrdersApi } from '../api/order';
import useAuth from '../hooks/useAuth';
import { result } from 'lodash';

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
                    <p>Mis adquisiciones</p>
                </div>
            </div>
        </BasicLayout>
    );
}
