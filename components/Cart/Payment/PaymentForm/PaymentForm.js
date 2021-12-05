import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { size } from 'lodash';
import useAuth from '../../../../hooks/useAuth';
import useCart from '../../../../hooks/useCart';

export default function PaymentForm(props) {
    const { products, address } = props;

    const handleSubmit = (event) => {
        event.preventDefault();          //EJEMPLO DE LA BUENA APLICACIÓN DE ESTÁNDARES, SON FÁCILES DE ADAPTAR A NUEVAS TECNOLOGÍAS, SE PRETENDE COMO SE RECOMIENDA QUE TODOS SIGAN TALES REGLAS
        console.log('Procesando pago'); // PROCESANDO PAGO
    };

    return (
        <form className="form-payment" onSubmit={handleSubmit}>
            <CardElement />
            <Button type="submit">
                Pagar
            </Button>
        </form>
    );
}
