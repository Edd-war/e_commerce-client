import React, { useEffect, useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { map, size } from 'lodash';
import Link from 'next/link';
import classNames from 'classnames';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressShipping() {
    const { auth, logout} = useAuth();

    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
        (async() => {
            const response = await getAddressesApi(auth.idUser, logout);
            // console.log(await response.json());
            setAddresses(await response.json() || []);
         })();
    }, []);


    return (
        <div className="address-shipping">
            <div className="title">Dirección de Envío</div>
            <div className="data">
                {size(addresses) === 0 ? (
                    <h3>
                        No tienes direcciones registradas {" "}
                        <Link href="/account">
                            <a>Agregar nueva dirección</a>
                        </Link>
                    </h3>
                ) : (
                    <Grid>
                        {map(addresses, (address) => (
                            <Grid.Column 
                                key={address.id}
                                mobile={16}
                                tablet={8}
                                computer={4}
                            >
                                <Address address={address} />
                            </Grid.Column>
                        ))}
                    </Grid>
                )}
            </div>
        </div>
    );
}

function Address(props){
    const { address } = props;

    return (
        <div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.state}, {address.zip}</p>
            <p>{address.phone}</p>
        </div>
    );
}
