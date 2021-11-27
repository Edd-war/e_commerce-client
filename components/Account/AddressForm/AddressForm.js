import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import { createAddressApi, updateAddressApi } from '../../../api/address';
import { toast } from 'react-toastify';

export default function AddressForm(props) {
    const { setShowModal, setReloadAddresses, newAddress, address } = props;
    const [loading, setLoading] = useState(false);
    const {auth, logout} = useAuth();
    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: validationSchema(),
        onSubmit: (formData) => {
            newAddress 
            ? createAddress(formData) 
            : updateAddress(formData);
        }    
    });

    const createAddress = async (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            user: auth.idUser,
        }
        const response = await createAddressApi(formDataTemp, logout);
        // console.log(formDataTemp);
        console.log(response);
        if(response.status === 200) {
            toast.success("Dirección creada correctamente");
            setReloadAddresses(true);
            formik.resetForm();
            setShowModal(false);
        } else {
            toast.warning("Error al crear la dirección");
        }
        setLoading(false);
    }

    const updateAddress = async (formData) => {
        // console.log("Actualizando la dirección");
        // console.log(formData);
        setLoading(true);
        const formDataTemp = {
            ...formData,
            user: auth.idUser,
        };
        const response = await updateAddressApi(address._id, formDataTemp, logout);
        if(response.status === 200) {
            toast.success("Dirección actualizada correctamente");
            setReloadAddresses(true);
            formik.resetForm();
            setShowModal(false);
        } else {
            toast.warning("Error al actualizar la dirección");
        }
        setLoading(false);
    }


    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="title"
                type="text"
                label="Nombre de la dirección" 
                placeholder="Nombre de la dirección" 
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />
            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombre y Apellidos"
                    placeholder="Nombre y Apellidos"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <Form.Input
                    name="address"
                    type="text"
                    label="Dirección"
                    placeholder="Dirección"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.errors.address}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Ciudad"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.errors.city}
                />
                <Form.Input
                    name="state"
                    type="text"
                    label="Estado"
                    placeholder="Estado"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.errors.state}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="zip"
                    type="text"
                    label="Código Postal"
                    placeholder="Código Postal"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    error={formik.errors.zip}
                />
                <Form.Input
                    name="country"
                    type="text"
                    label="País"
                    placeholder="País"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={formik.errors.country}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="phone"
                    type="text"
                    label="Teléfono"
                    placeholder="Teléfono"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.errors.phone}
                />
                <Form.Input
                    name="mobile"
                    type="text"
                    label="Celular"
                    placeholder="Celular"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={formik.errors.mobile}
                />
            </Form.Group>
            <div className="actions">
                <Button type="submit" className="submit" loading={loading}>
                    {newAddress ? "Nueva dirección" : "Editar dirección"}
                </Button>
            </div>
        </Form>
    );
}

function initialValues(address) {
    return {
        title:      address?.title      || "",
        name:       address?.name       || "",
        address:    address?.address    || "",
        city:       address?.city       || "",
        state:      address?.state      || "",
        zip:        address?.zip        || "",
        country:    address?.country    || "",
        phone:      address?.phone      || "",
        mobile:     address?.mobile     || ""
    }
}

function validationSchema() {
    return Yup.object({
        title: Yup.string()
            .required('El nombre de la dirección es obligatorio'),
        name: Yup.string()
            .required('El nombre y apellidos es obligatorio'),
        address: Yup.string()
            .required('La dirección es obligatoria'),
        city: Yup.string()
            .required('La ciudad es obligatoria'),
        state: Yup.string()
            .required('El estado es obligatorio'),
        zip: Yup.string()
            .required('El código postal es obligatorio'),
        country: Yup.string()
            .required('El país es obligatorio'),
        phone: Yup.string()
            .required('El teléfono es obligatorio'),
        mobile: Yup.string()
            .required('El celular es obligatorio')
    })
}