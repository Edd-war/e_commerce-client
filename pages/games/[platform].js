import React from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../../layouts/BasicLayout';

export default function Platform() {
    const { query } = useRouter();
    // console.log(router);
    return (
        <BasicLayout className="platform">
            <h1>Estás en la plataforma: {query.platform}</h1>
        </BasicLayout>
    );
}
