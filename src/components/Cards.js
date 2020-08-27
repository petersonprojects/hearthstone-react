
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { Row, Container, Button, Col } from 'react-bootstrap';
import './Cards.css';
// import { useDispatch, useSelector } from 'react-redux'
// import counterAction from '../actions/countActions';

const Cards = () => {


    let jsx = null;
    const [page, setPage] = useState(1);
    const [cardsDisplayed, setCardsDisplayed] = useState([])

    // const [pageData, setPageData] = useState([]); // this is only used for card count

    const [allCards, setAllCards] = useState([]);
    const [cards, setPageCards] = useState([]);

    // use selector is like mapStateToProps (pull down data from global state)
    // useDispatch is used to update the global state

    // const count = useSelector(state => state.counter);
    // const dispatch = useDispatch();

    // acts like componentDidMount as a react hook

    useEffect(()=>{

        async function fetchData(){

                let response = await fetch(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=${page}&access_token=USfK7xek5QNoa3fob0UELeNOELqg4ujeVH`);
                let data = await response.json();

                // setPageData(data.cardCount)
                setPageCards(data.cards)

                if(page === 1)
                {
                    setCardsDisplayed(data.cards)
                }

                setPage(page + 1)

                if(page <= 5)
                {   
                    setAllCards(allCards.concat(cards))
                }

        }
    
        fetchData();

        console.log(allCards)
        
    }, [allCards])

    let handleNext = () => {
        // in this function now we want to access the array of objects that is "allCards"
        // we want to slice it and show the next 40 items in the list starting from the one after the last displayed
        let newPage = allCards.slice(40,80)
        setCardsDisplayed(newPage);
    }
    // let handlePrevious = () => {

    //     if(page > 1)
    //     {
    //         setPage(page - 1)
    //     }
    //     console.log(page)
    // }

    // useEffect(()=>{

    //     async function fetchData(){

    //         let response = await fetch(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=${page}&access_token=USfK7xek5QNoa3fob0UELeNOELqg4ujeVH`);
    //         let data = await response.json();

    //         setData(data)
    //         setCards(data.cards)


    //         console.log(data)

    //     }
    
    //     fetchData();

    // }, [page])

    // this is meant to keep the jsx from rendering until all of the pages are loaded
        if(page >= 5)
        {
            console.log(cardsDisplayed)
            jsx = cardsDisplayed.map(card => {

                if(card.cardTypeId !== 3)
                {
                    return <SingleCard key={card.slug} card={card}/>
                }
                else{
                    return null;
                }
        
            })
        }




    return (
        <>

            <Container>

            <Row className="justify-content-center">
                {/* <h1 id="cardsHeader" className="mb-0 mt-5">Search from {pageData.cardCount} cards</h1> */}
            </Row>

                <br/>
            <Row>
                {jsx}
            </Row>

                <br/>
                {/* {data.cards[0].name} */}
                {/* {count} */}
                {/* <button onClick={()=> dispatch(counterAction())}>+</button> */}

            {/* <Row className="mt-0 pt-0">
                <Col className="d-flex justify-content-center">
                    <Button id="prevButton" className="mb-4" variant="dark" onClick={handlePrevious}><i class="fa fa-arrow-left" aria-hidden="true"></i></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <p id="pageNumber">{page}</p>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button id="nextButton" className="mb-4"  variant="dark" onClick={handleNext}><i class="fa fa-arrow-right" aria-hidden="true"></i></Button>
                </Col>
                

            </Row> */}

            </Container>

        </>
    )
}

export default Cards

