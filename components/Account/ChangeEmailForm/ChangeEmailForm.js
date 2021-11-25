import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function ChangeEmailForm(props) {
    const {user, logout, setReloadUser} = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: (formData) => {
            console.log(formData);
        }
    });
    
    return (
        <div className="change-email-form">
            <h4>
                Actualziar Correo Electrónico
                <span>
                    (Tu correo electrónico actual: {user.email})))    
                </span>    
            </h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input fluid 
                      name="email" 
                      label='Nuevo Correo Electrónico' 
                      placeholder='Nuevo Correo Electrónico' 
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={formik.errors.email}
                      />
                    <Form.Input fluid 
                      name="repeatEmail" 
                      label='Confirmar Nuevo Correo Electrónico' 
                      placeholder='Confirmar Nuevo Correo Electrónico' 
                      onChange={formik.handleChange}
                      value={formik.values.repeatEmail}
                      error={formik.errors.repeatEmail}
                      />
                </Form.Group>
                <Button type='submit' className="submit">Actualizar Correo Electrónico</Button>
            </Form>

        </div>
    )
}

function initialValues() {
    return {
        email: '',
        repeatEmail: ''
    }
}

function validationSchema(){
    return Yup.object(
        {
        email: Yup.string()
            .email('El email no es válido')
            .required('El email es obligatorio')
            .oneOf([Yup.ref('repeatEmail'), null], 'Los emails no coinciden'),
        repeatEmail: Yup.string()
            .email('El email no es válido')
            .required('El email es obligatorio')
            .oneOf([Yup.ref('email'), null], 'Los emails no coinciden')
        }
    );
}