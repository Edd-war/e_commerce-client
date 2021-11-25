import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateEmailApi } from '../../../api/user';

export default function ChangeEmailForm(props) {
    const {user, logout, setReloadUser} = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateEmailApi(user.id, formData, logout);
            if(response && response.code === 200){  // Si la respuesta es correcta y el código es 200 (OK) entonces se actualiza el email del usuario
                // toast.success(response.message);
                setReloadUser(true);
                toast.success("Email actualizado correctamente");
                formik.handleReset();
            }else{
                toast.error("Error al actualizar el correo");
            }
            setLoading(false);
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
                <Button type='submit' className="submit" loading={loading}>Actualizar Correo Electrónico</Button>
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