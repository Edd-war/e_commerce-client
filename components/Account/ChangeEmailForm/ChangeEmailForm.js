import React from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function ChangeEmailForm(props) {
    const {user, logout, setReloadUser} = props;

    
    return (
        <div className="change-email-form">
            <h4>
                Actualziar Correo Electrónico
                <span>
                    (Tu correo electrónico actual: {user.email})))    
                </span>    
            </h4>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid 
                      name="email" 
                      label='Nuevo Correo Electrónico' 
                      placeholder='Nuevo Correo Electrónico' 
                    />
                    <Form.Input fluid 
                      name="repeatEmail" 
                      label='Confirmar Nuevo Correo Electrónico' 
                      placeholder='Confirmar Nuevo Correo Electrónico' 
                    />
                </Form.Group>
                <Button type='submit' className="submit">Actualizar Correo Electrónico</Button>
            </Form>

        </div>
    )
}
