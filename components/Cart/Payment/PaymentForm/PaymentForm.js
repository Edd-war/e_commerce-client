import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { size } from 'lodash';
import useAuth from '../../../../hooks/useAuth';
import useCart from '../../../../hooks/useCart';
import { paymentCartApi } from '../../../../api/cart';

export default function PaymentForm(props) {
    const { products, address } = props;
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { auth, logout } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();          //EJEMPLO DE LA BUENA APLICACIÓN DE ESTÁNDARES, SON FÁCILES DE ADAPTAR A NUEVAS TECNOLOGÍAS, SE PRETENDE COMO SE RECOMIENDA QUE TODOS SIGAN TALES REGLAS
        setLoading(true);
        // console.log('Procesando pago'); // PROCESANDO PAGO
        if (!stripe || !elements) return;
        
        const cardElement = elements.getElement(CardElement);
        // console.log(cardElement);
        const result = await stripe.createToken(cardElement);
        // console.log(result.token);

        if (result.error) {
            toast.error(result.error.message);  // MANEJAR ESTÁNDARES PERMITE QUE STRIPE SE ADAPTE A NUESTRO SISTEMA Y PUEDA MOSTRAR ERRORES ESPECÍFICOS DE PAGO DESDE SU SISTEMA SIN TENER NOSOTROS QUE DEFINIRLOS
        } else {
            // console.log(result);
            const response = await paymentCartApi(
                result.token,
                products,
                auth.idUser,
                address,
                logout
            );
            const responseResult = await response.json();

            if(size(responseResult) > 0) {
                toast.success("Pago realizado con éxito");
            } else {
                toast.error("Error al procesar el pago");
            }
        }

        setLoading(false);
    };

    return (
        <form className="form-payment" onSubmit={handleSubmit}>
            <CardElement />
            <Button 
                type="submit"
                loading={loading}
                disabled={!stripe || loading}
            >
                Pagar
            </Button>
        </form>
    );
}
