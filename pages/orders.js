import React from 'react';
import BasicLayout from '../layouts/BasicLayout';

export default function Orders() {
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
