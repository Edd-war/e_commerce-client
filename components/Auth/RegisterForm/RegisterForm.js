import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function RegisterForm(props) {
    const { showLoginForm } = props;
    return (
        <Form className="login-form">
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Usuario' 
              type="text"
              name="username"
            />
            
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Nombre' 
              type="text"
              name="name"
            />
            
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Apellidos' 
              type="text"
              name="lastname"
            />
            
            <Form.Input 
              fluid icon='email' 
              iconPosition='left' 
              placeholder='Correo electrónico' 
              type="email"
              name="email"
            />
            
            <Form.Input 
              fluid icon='password' 
              iconPosition='left' 
              placeholder='Contraseña' 
              type="password"
              name="password"
            />

            <div className="actions">
                <Button type="button" basic>
                    Iniciar Sesión
                </Button>
                <Button type="submit" className="submit">
                    Registrar
                </Button> 
            </div>
        </Form>
    )
}
