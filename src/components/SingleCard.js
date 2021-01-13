
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
            <Col className="mx-3 mx-lg-4 d-flex justify-content-center align-items-center pl-0 pr-0 pb-3" xl={2} lg={3} md={4} sm={6} xs={12}>
                <img className="fade-in" src={card.imageGold} onClick={triggerModal} id={card.slug} alt={card.name}></img>
            </Col>
        </>
    )
}

export default SingleCard
