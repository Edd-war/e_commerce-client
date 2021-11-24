import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { loginApi, resetPasswordApi } from '../../../api/user';

export default function LoginForm(props) {
    const { showRegisterForm, onCloseModal } = props;
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    // console.log(auth); ESTE MENSAJE DE CONSOLA ES EL QUE COMPRUEBA EL TOKEN ACTIVO EN EL LOCALSTORAGE POR LA SESIÓN ACTIVA, auth vino de la línea anterior pero se quito por que no se necesita mas que para verificar el token

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await loginApi(formData);
            // console.log(response);
            if (response?.jwt) {
                // console.log(response);
                // console.log('Login exitoso');
                login(response.jwt);
                onCloseModal();
            }
            else {
                // console.log('Error al registrar el usuario');
                toast.error('Error al iniciar sesión');
            }
            setLoading(false);
        }
    });

    const resetPassword = () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido');
        // console.log(formik.values.identifier);
        if(validateEmail.isValid(formik.values.identifier)){
            resetPasswordApi(formik.values.identifier);
            // console.log(formik.values.identifier);
            // console.log('Correo electrónico válido');
        }
        else{
            formik.setErrors({identifier: true});
            // console.log('Correo electrónico inválido');
        }
    }

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
                    <Button type="button" onClick={resetPassword}>
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