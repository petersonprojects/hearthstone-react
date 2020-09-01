
import React from 'react';
import {Col} from 'react-bootstrap';
import './Cards.css'

const SingleCard = ({card, triggerModal}) => {

    if(card.imageGold === "")
    {
        card.imageGold = card.image
    }

    return (
        <>
            <Col onClick={triggerModal} className="mx-xl-3 ml-lg-2 d-flex justify-content-center pl-0 pr-0 pb-3" xl={2} lg={3} md={4} sm={6}>
                <img src={card.imageGold}  id={card.slug} alt={card.name}></img>
            </Col>
        </>
    )
}

export default SingleCard
