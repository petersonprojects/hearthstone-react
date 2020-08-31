
import React from 'react';
import {Col} from 'react-bootstrap';
import './Cards.css'

const SingleCard = ({card}) => {

    if(card.imageGold === "")
    {
        card.imageGold = card.image
    }

    return (
        <>
            <Col className="mx-xl-3 ml-lg-2 d-flex justify-content-center pl-0 pr-0 pb-3" xl={2} lg={3} md={4} sm={6} id={card.slug}>
                <img  src={card.imageGold} alt={card.name}></img>
            </Col>
        </>
    )
}

export default SingleCard
