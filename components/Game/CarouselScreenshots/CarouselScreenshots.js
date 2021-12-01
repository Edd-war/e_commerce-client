import React from 'react';
import { Image } from 'semantic-ui-react'
import Slider from 'react-slick';
import { map } from 'lodash';

const setting ={
    className: 'carousel-screenshots',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swiperToSlider: true,
    autoplay: true,
    autoplayTimeout: 3000,
}

export default function CarouselScreenshots(props) {
    const { title, screenshoots } = props;
    // console.log(screenshoots);

    return (
        <Slider {...setting}>
            {
                map(screenshoots, ({id, url, name}) => (
                    <Image
                        key={id}
                        src={url}
                        alt={name}
                        onClick={() => { console.log('Abrir Iamgen') }}
                    />
                )
            )}
        </Slider>
    );
}
