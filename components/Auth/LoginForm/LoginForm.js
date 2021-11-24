import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { loginApi } from '../../../api/user';

export default function LoginForm(props) {
    const { showRegisterForm, onCloseModal } = props;
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    console.log(auth);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await loginApi(formData);
            // console.log(response);
            if (response?.jwt) {
                console.log(response);
                // console.log('Login exitoso');
                onCloseModal();
            }
            else {
                // console.log('Error al registrar el usuario');
                toast.error('Error al iniciar sesión');
            }
            setLoading(false);
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
                    <Button className="submit" type="submit" loading={loading}>
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