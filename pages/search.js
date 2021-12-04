import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';

export default function Search() {

    useEffect(() => {
        document.getElementById('search-game').focus();
    }, []);

    return (
        <BasicLayout>
            <h1>Search</h1>
        </BasicLayout>
    );
}
