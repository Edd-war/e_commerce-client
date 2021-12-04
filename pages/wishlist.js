import React from 'react';
import BasicLayout from '../layouts/BasicLayout';

export default function WishList() {
    return (
        <BasicLayout className="wishlist">
            <div className="wishlist__block">
                <div className="wishlist__block-title">
                    <h2>Wishlist</h2>
                </div>
                <div className="wishlist__block-content">
                    <p>Lista de Juegos</p>
                </div>
            </div>
        </BasicLayout>
    );
}
