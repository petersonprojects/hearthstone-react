import React from 'react';
import { Row, Col} from 'react-bootstrap';
import './Cards.css'
import { useSelector } from 'react-redux';

const Heroes = (props) => {

    const cards = useSelector(state => state.cards)

    console.log(cards)

    let filtered = cards.filter(card => {
        return card.cardTypeId === 3 && card.manaCost === 0
    })

    console.log(filtered)

    let heroes = filtered.map(card =>{
        if(card.imageGold === "")
        {
            card.imageGold = card.image
        }
        return <Col className="d-flex justify-content-center pl-0 pr-0 pb-3 mr-0" lg={3} md={4} sm={12} id={card.slug} key={card.slug}>

            <img  src={card.imageGold} alt={card.name}></img>

        </Col>
    })

    return (
    <>

            <Row className="justify-content-center">
                <h1 id="cardsHeader" className="mb-0 mt-5">collectible heroes</h1>
            </Row>

        <Row>

            {heroes}
        </Row>

    </>
    )
}

export default Heroes
