
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { Row, Container, Button, Col } from 'react-bootstrap';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import {loadCards} from '../actions/cardActions';

const Cards = () => {

    let jsx = null;
    let title = null;

    const cardz = useSelector(state => state.cards)

    const totalPages = 68;

    const [load, setLoad] = useState(false);

    const [pageCounter, setCounter] = useState(1);

    const [localStart, setLocal] = useState(1);
    
    const [page, setPage] = useState(1);
    const [cardsDisplayed, setCardsDisplayed] = useState([]);

    const [pageData, setPageData] = useState(0); // this is only used for card count

    const [allCards, setAllCards] = useState([]);
    const [cards, setPageCards] = useState([]);

    const dispatch = useDispatch();


    // use selector is like mapStateToProps (pull down data from global state)

    // useDispatch is used to update the global state

    // const dispatch = useDispatch();

    useEffect(()=>{

        console.log(`cardz value in Cards: ${cardz}`)

        async function fetchData(){

                let response = await fetch(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=${page}&access_token=USwrKJY7SlLnqdhZm1uiYZbnretrvlOil1`);
                let data = await response.json();

                setPageData(data.cardCount);
                setPageCards(data.cards);

                if(page === 1)
                {
                    setCardsDisplayed(data.cards)
                }

                setPage(page + 1)

                if(page <= totalPages)
                {   

                    setAllCards(allCards => allCards.concat(cards))

                    if(page === totalPages)
                    {
                        setLoad(true);
                    }

                    console.log(`page ${page}`)

                }
        }


            fetchData();



        console.log(allCards)
        
    }, [allCards])


    // when all the cards have loaded (load=true), save them to the global state
    // in the cards: [] array
    useEffect(()=>{

        console.log(`userEFfect-dispatch ${load}`)
        dispatch(loadCards(allCards))

    }, [load])


    // rerenders the page with specific array items when the page number is altered
    useEffect(()=>{

        let start;

        if(pageCounter === 1)
        {
            start = 0;
        }
        else
        {
            start = (pageCounter * 40)-40;
        }

        let end = start + 40;
        let newPage = allCards.slice(start, end);
        setCardsDisplayed(newPage);

    }, [pageCounter])

    let handleNext = () => {

        setCounter(pageCounter + 1);
        setLocal(localStart + 41);

    }

    let handlePrevious = () => {

        if(pageCounter > 1){
            setCounter(pageCounter - 1)
            setLocal(localStart - 41)
        }

    }

    // this is meant to keep the jsx from rendering until all of the pages are loaded
    if(page >= totalPages)
    {
        jsx = cardsDisplayed.map(card => {

            if(card.cardTypeId !== 3)
            {
                return <SingleCard key={card.slug} card={card}/>
            }
            else{
                return null;
            }
    
        })

        title =  <Row className="justify-content-center">
        <h1 id="cardsHeader" className="mb-0 mt-5">Showing {localStart} - {localStart + 40} of {allCards.length} total cards</h1>

    </Row>


    }
    else{
        // ....loading jsx
        jsx = <>{/*h1 style={{fontFamily:'Belwe',fontSize:'1.5em'}}>Loading cards... </h1>*/}
                    <div>
                        <img style={{height:'200px', width:'200px'}} alt="loading" src="https://www.jettools.com/images/animated_spinner.gif"/>
                    </div></>
        title = null;
    }

    return (
        <>

            <Container>

            {title}

                <br/>
            <Row className="justify-content-center">
                {jsx}
            </Row>

                <br/>

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

