import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function ChangeNameForm(props) {
    const { user } = props;
    const formik = useFormik({
        initialValues: initialValues(user.name, user.lastname),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            console.log(formData);
        }
    });

    return (
        <div className="change-name-form">
            <h4>Cambia nombre y apellidos</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input 
                        fluid label="Nombre"  
                        name="name" 
                        placeholder="Nombre nuevo"
                        onChange={formik.handleChange} 
                        value={formik.values.name}
                        error={formik.errors.name && true}
                    />
                    <Form.Input 
                        fluid label="Apellidos" 
                        name="lastname" 
                        placeholder="Apellidos nuevos" 
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={formik.errors.lastname && true}
                    />
                </Form.Group>
                <Button className="submit" type="submit">Guardar Cambios</Button>
            </Form>
        </div>
    );
}

function initialValues(name, lastname) { 
    return {
        name: name||'',
        lastname: lastname||''
    };
}

function validationSchema() { 
    return {
        name: Yup.string().required('El nombre es requerido'),
        lastname: Yup.string().required('Los apellidos son requeridos')
    };
}