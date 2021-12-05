import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { STRIPE_TOKEN } from '../../../utils/constants';

// import { Elements } from 'react-stripe-elements';

const stripePromise = loadStripe(STRIPE_TOKEN);

export default function Payment(props) {
    const { products, address } = props
    return (
        <div className="payment">
            <div className="title">Pago</div>
            <div className="data">
                <Elements stripe={stripePromise}>
                    <PaymentForm products={products} address={address} />
                </Elements>
            </div>
        </div>
    )
}
