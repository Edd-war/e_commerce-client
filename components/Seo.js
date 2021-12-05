import React from 'react';
import Head from 'next/head';

export default function Seo(props) {
    const { title, description } = props;

    return (
        <Head>
            <title>{title}</title>
            <meta 
                name="description" 
                property="description"
                content={description} 
            />
        </Head>
    );
}

Seo.defaultProps = {
    title: 'GameOn!',
    description: 'El mejor sitio para hacerte de tus videojuegos favoritos al mejor costo',
};
