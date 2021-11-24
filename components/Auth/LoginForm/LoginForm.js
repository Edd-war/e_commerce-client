import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function LoginForm(props) {
    const { showRegisterForm } = props;
    return (
        <Form className="login-form">
            <Form.Input
                name="identifier"
                type="text"
                placeholder="Correo Electrónico"
            />
            <Form.Input
                name="password"
                type="passwrod"
                placeholder="Contraseña"
            />

            <div className="actions">
                <Button type="button" basic onClick={showRegisterForm}>
                    Registrarse
                </Button>
                <div>
                    <Button className="submit" type="submit">
                        Iniciar Sesión
                    </Button>
                    <Button type="button">
                        Olvidé mi contraseña
                    </Button>
                </div>
            </div>
        </Form>
    )
}
