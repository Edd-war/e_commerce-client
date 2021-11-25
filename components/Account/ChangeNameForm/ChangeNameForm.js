import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateMeApi } from '../../../api/user';

export default function ChangeNameForm(props) {
    const { user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(user.name, user.lastname),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            // console.log(formData);
            setLoading(true);
            const response = await updateMeApi(user.id, formData, logout);
            console.log(response);
            if (response) {
                // toast.success(response.message);
                toast.success("Nombre y apellidos actualizados correctamente");
                setReloadUser(true);
                // console.log("Nombre y apellidos actualizados correctamente");
            }else{
                toast.error("Error al actualizar los datos");
                // console.log("Error al actualizar los datos");
            }
            setLoading(false);
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
                <Button className="submit" type="submit" loading={loading}>Guardar Cambios</Button>
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