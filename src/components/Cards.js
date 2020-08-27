
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { Row, Container, Button, Col } from 'react-bootstrap';
import './Cards.css';
// import { useDispatch, useSelector } from 'react-redux'
// import counterAction from '../actions/countActions';

const Cards = () => {


    let jsx = null;

    const [pageCounter, setCounter] = useState(1);
    
    const [page, setPage] = useState(1);
    const [cardsDisplayed, setCardsDisplayed] = useState([])

    const [pageData, setPageData] = useState(0); // this is only used for card count

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

                setPageData(data.cardCount)
                setPageCards(data.cards)

                if(page === 1)
                {
                    setCardsDisplayed(data.cards)
                }

                setPage(page + 1)

                if(page <= 15)
                {   
                    setAllCards(allCards.concat(cards))
                }

        }
    
        fetchData();

        console.log(allCards)
        
    }, [allCards])

    useEffect(()=>{

        let start;

        if(pageCounter === 1)
        {
            start = 0;
        }
        else{
            start = (pageCounter * 40)-40;
        }

        let end = start + 40;
        let newPage = allCards.slice(start, end);
        console.log(allCards);
        setCardsDisplayed(newPage);

        // let start = (pageCounter * 40)-40;
        // let end = pageCounter * 40;
        // let newPage = allCards.slice(start, end)
        // setCardsDisplayed(newPage);

    }, [pageCounter])

    let handleNext = () => {
        setCounter(pageCounter + 1)

    }

    let handlePrevious = () => {

        if(pageCounter > 1){
            setCounter(pageCounter - 1)
        }

    }



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
        if(page >= 15)
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
        else{
            // ....loading jsx
        }




    return (
        <>

            <Container>

            <Row className="justify-content-center">
                <h1 id="cardsHeader" className="mb-0 mt-5">Search from {pageData} cards</h1>
            </Row>

                <br/>
            <Row>
                {jsx}
            </Row>

                <br/>
                {/* {data.cards[0].name} */}
                {/* {count} */}
                {/* <button onClick={()=> dispatch(counterAction())}>+</button> */}

            <Row className="mt-0 pt-0">
                <Col className="d-flex justify-content-center">
                    <Button id="prevButton" className="mb-4" variant="dark" onClick={handlePrevious}><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <p id="pageNumber">{pageCounter}</p>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button id="nextButton" className="mb-4"  variant="dark" onClick={handleNext}><i className="fa fa-arrow-right" aria-hidden="true"></i></Button>
                </Col>
                

            </Row>

            </Container>

        </>
    )
}

export default Cards

