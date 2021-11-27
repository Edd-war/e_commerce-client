import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { getAddressesApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressList() {
    const [addresses, setAddresses] = useState([]);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            const result = await response.json();
            setAddresses(result || []);
            // console.log(result);
        })();
    }, []);
    console.log(size(addresses));
    return (
        <div className="address-list">
            {size(addresses) < 0 ? (
                <h3>No hay direcciones</h3>
            ) : (
                <Grid>
                    {map(addresses, (address) => (
                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                            <Address address={address} />
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    );
}
        

function Address(props) {
    const { address } = props;
    return (
        <div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.zip}</p>
            <p>{address.country}</p>
            <p>{address.phone}</p>
            <p>{address.nobile}</p>

            <div className="actions">
                <Button primary>Editar</Button>
                <Button negative>Eliminar</Button>
            </div>
        </div>
    );
}