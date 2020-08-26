
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { Row, Container } from 'react-bootstrap';
import './Cards.css';
// import { useDispatch, useSelector } from 'react-redux'
// import counterAction from '../actions/countActions';

const Cards = () => {

    const [data, setData] = useState([]);

    const [cards, setCards] = useState([])

    // use selector is like mapStateToProps (pull down data from global state)
    // useDispatch is used to update the global state

    // const count = useSelector(state => state.counter);
    // const dispatch = useDispatch();

    // acts like componentDidMount as a react hook

    useEffect(()=>{

        async function fetchData(){

            let response = await fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&access_token=US34LVsPfDlaDs403IhKsot9sevZsWWoXh');
            let data = await response.json();

            setData(data)
            setCards(data.cards)

        }
    
        fetchData();

        
    }, [])

    let JSX = cards.map(card => {
        if(card.cardTypeId !== 3)
        {
            return <SingleCard key={card.slug} card={card}/>
        }
        else{
            return null;
        }

    })

    return (
        <>

            <Container>

            <Row className="justify-content-center">
                <h1 id="cardsHeader" className="mb-0 mt-5">Search from {data.cardCount} cards</h1>
            </Row>

 

                <br/>
            <Row>
                {JSX}
            </Row>

                <br/>
                {/* {data.cards[0].name} */}
                {/* {count} */}
                {/* <button onClick={()=> dispatch(counterAction())}>+</button> */}

            </Container>

        </>
    )
}

export default Cards

