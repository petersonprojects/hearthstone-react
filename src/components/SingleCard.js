
import React from 'react';
import {Col} from 'react-bootstrap';
import './Cards.css'

const SingleCard = ({card}) => {
    return (
    <>
        <Col className="d-flex justify-content-center pl-0 pr-0 pb-3" lg={3} md={4} sm={12} id={card.slug}>
            {/* <p>{card.name}</p> */}
            <img  src={card.image} alt={card.name}></img>
        </Col>
    </>
    )
}

export default SingleCard
