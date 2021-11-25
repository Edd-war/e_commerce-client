import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function AddressForm() {
    return (
        <Form>
            <Form.Input 
                name="title"
                type="text"
                label="Nombre de la dirección" 
                placeholder="Nombre de la dirección" 
            />
            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombre y Apellidos"
                    placeholder="Nombre y Apellidos"
                />
                <Form.Input
                    name="address"
                    type="text"
                    label="Dirección"
                    placeholder="Dirección"
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Ciudad"
                />
                <Form.Input
                    name="state"
                    type="text"
                    label="Estado"
                    placeholder="Estado"
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="zip"
                    type="text"
                    label="Código Postal"
                    placeholder="Código Postal"
                />
                <Form.Input
                    name="country"
                    type="text"
                    label="País"
                    placeholder="País"
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="phone"
                    type="text"
                    label="Teléfono"
                    placeholder="Teléfono"
                />
                <Form.Input
                    name="mobile"
                    type="text"
                    label="Celular"
                    placeholder="Celular"
                />
            </Form.Group>
            <div className="actions">
                <Button type="submit" className="submit">
                    Guardar Dirección
                </Button>
            </div>
        </Form>
    );
}
