import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { getAddressesApi, deleteAddressApi } from '../../../api/address';
import useAuth from '../../../hooks/useAuth';

export default function AddressList(props) {
    const { reloadAddresses, setReloadAddresses} = props;
    const [addresses, setAddresses] = useState([]);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            const result = await response.json();
            setAddresses(result || []);
            setReloadAddresses(false);
            // console.log(result);
        })();
    }, [reloadAddresses]);

    if (!addresses) return null;

    console.log(size(addresses));
    return (
        <div className="address-list">
            {size(addresses) < 0 ? (
                <h3>No hay direcciones</h3>
            ) : (
                <Grid>
                    {map(addresses, (address) => (
                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                            <Address address={address} logout={logout} setReloadAddresses={setReloadAddresses} />
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    );
}
        

function Address(props) {
    const { address, logout, setReloadAddresses } = props;
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteAddress= async () => {
        setLoadingDelete(true);
        const response = await deleteAddressApi(address._id, logout);
        if (response.status === 200) {
            console.log('Dirección eliminada');
            setReloadAddresses(true);
        }
        setLoadingDelete(false);
    }

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
                <Button negative type="submit" onClick={deleteAddress} loading={loadingDelete}>Eliminar</Button>
            </div>
        </div>
    );
}