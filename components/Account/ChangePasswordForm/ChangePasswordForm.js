import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function ChangePasswordForm(props) {
    const {user, logout} = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            console.log(formData);
        }
    });


    return (
        <div className="change-password-form">
            <h4>Actualizar Contraseña</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input fluid
                        name="password"
                        label='Nueva Contraseña'
                        placeholder='Nueva Contraseña'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
                    />
                    <Form.Input fluid
                        name="repeatPassword"
                        label='Confirmar Nueva Contraseña'
                        placeholder='Confirmar Nueva Contraseña'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword}
                    />
                </Form.Group>
                <Button type='submit' className="submit">Actualizar Contraseña</Button>
            </Form>
        </div>
    );
}

function initialValues() {
    return {
        password: '',
        repeatPassword: ''
    }
}

function validationSchema() {
    return Yup.object().shape({
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('La contraseña es obligatoria'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
            .required('La confirmación de la contraseña es obligatoria')
    });
}