import React from 'react'

export default function LoginForm(props) {
    const { showRegisterForm } = props;
    return (
        <div>
            <h1>LoginForm</h1>
            <button onClick={showRegisterForm}>Register</button>
        </div>
    )
}
