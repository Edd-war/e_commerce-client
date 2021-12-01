import React, { useEffect, useState } from 'react';
import { Image, Modal } from 'semantic-ui-react'
import Slider from 'react-slick';
import { map, set } from 'lodash';

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
    const [showModal, setShowModal] = useState(false);
    const [urlImage, setUrlImage] = useState(null);
    // console.log(screenshoots);

    const openIamge = (url) => {
        setUrlImage(url);
        setShowModal(true);
    }

    return (
        <>
            <Slider {...setting}>
                {
                    map(screenshoots, ({id, url, name}) => (
                        <Image
                            key={id}
                            src={url}
                            alt={name}
                            onClick={() => openIamge(url)}
                        />
                    )
                )}
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)} size="large" >
                <Image src={urlImage} alt={title} />
            </Modal>
        </>
    );
}
