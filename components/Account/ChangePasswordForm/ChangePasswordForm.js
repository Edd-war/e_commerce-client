import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'; 

export default function ChangePasswordForm(props) {
    const {user, logout} = props;

    return (
        <div className="change-password-form">
            <h4>Actualizar Contraseña</h4>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid
                        name="password"
                        label='Nueva Contraseña'
                        placeholder='Nueva Contraseña'
                        type='password'
                    />
                    <Form.Input fluid
                        name="repeatPassword"
                        label='Confirmar Nueva Contraseña'
                        placeholder='Confirmar Nueva Contraseña'
                        type='password'
                    />
                </Form.Group>
                <Button type='submit' className="submit">Actualizar Contraseña</Button>
            </Form>
        </div>
    );
}
