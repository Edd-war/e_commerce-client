import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { registerApi } from '../../../api/user';

export default function RegisterForm(props) {
    const { showLoginForm } = props;

    const [loading, setLoading] = useState(false);


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            // console.log(formData);
            setLoading(true);
            const response = await registerApi(formData);
            console.log(response);
            if (response?.jwt) {
                showLoginForm();
            }
            else {
                // console.log('Error al registrar el usuario');
                toast.error('Error al registrar el usuario');
            }
            setLoading(false);
        }
    });

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Usuario' 
              type="text"
              name="username"
              onChange={formik.handleChange}
              error={formik.errors.username}
            />
            
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Nombre' 
              type="text"
              name="name"
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
            
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Apellidos' 
              type="text"
              name="lastname"
              onChange={formik.handleChange}
              error={formik.errors.lastname}
            />
            
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Correo electrónico' 
              type="email"
              name="email"
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Contraseña' 
              type="password"
              name="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
            />

            <div className="actions">
                <Button type="button" basic>
                    Iniciar Sesión
                </Button>
                <Button type="submit" className="submit" loading={loading}>
                    Registrar
                </Button> 
            </div>
        </Form>
    )
}


function initialValues() {
    return {
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
    }
}

function validationSchema() {
    return {
        username: Yup.string().required('El nombre de usuario es obligatorio'),
        name: Yup.string().required('El nombre es requerido'),
        lastname: Yup.string().required('Los apellidos son requeridos'),
        email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
        password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es obligatoria'),
    }
}