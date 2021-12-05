import React, { useEffect, useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';
import "moment/locale/es";
import BasicLayout from '../../../layouts/BasicLayout/BasicLayout';

export default function Order(props) {
    const { order } = props;
    const { game, totalPayment, createdAt, addressShipping } = order;
    const { title, poster, url } = game;
    console.log(title);
    return (
        <>
            <div className="order">
                    <div className="order__header">
                        <Link href={`/${url}`}>
                            <a>
                                <Image src={poster.url} alt={title} />
                            </a>
                        </Link>
                    </div>
                    <div className="order__info">
                        <h3>{title}</h3>
                        <p>$ {totalPayment} </p>
                    </div>
                    <div className="order__other">
                        <p className="order__other-date">
                            {moment(createdAt).format('LL')} - {moment(createdAt).format('LT')}
                        </p>
                        <Icon 
                            name="eye" 
                            circular 
                            link
                            onClick={() => console.log('ver info')}
                        />
                    </div>
            </div>
        </>
    );
}
