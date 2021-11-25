import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function ChangeNameForm(props) {
    const { user } = props;
    return (
        <div className="change-name-form">
            <h4>Cambia nombre y apellidos</h4>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input 
                        fluid label="Nombre"  
                        name="name" 
                        placeholder="Nombre nuevo" 
                        value={user.name}
                    />
                    <Form.Input 
                        fluid label="Apellidos" 
                        name="lastname" 
                        placeholder="Apellidos nuevos" 
                        value={user.lastname}
                    />
                </Form.Group>
                <Button className="submit">Guardar Cambios</Button>
            </Form>
        </div>
    );
}
