import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function LoginForm(props) {
    const { showRegisterForm } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            console.log(formData);
        }
    });

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="identifier"
                type="text"
                placeholder="Correo Electrónico"
                onChange={formik.handleChange}
                error={formik.errors.identifier}
            />
            <Form.Input
                name="password"
                type="passwrod"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                error={formik.errors.password}
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

function initialValues() {
    return {
        identifier: '',
        password: ''
    }
}

function validationSchema() {
    return Yup.object({
        identifier: Yup.string()
            .email('Correo electrónico inválido')
            .required('Correo electrónico es requerido'),
        password: Yup.string()
            .required('Contraseña es requerida')
    })
}