
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { Row, Container, Button, Col } from 'react-bootstrap';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import {loadCards} from '../actions/cardActions';

const Cards = () => {

    let jsx = null;
    let title = null;
    // const totalPages = 68;

    // array of all 2663 cards in global state
    const reduxDeck = useSelector(state => state.cards);
    const demonHunter = reduxDeck.filter(card => {
        return card.classId === 14 && card.cardTypeId !== 3
    })

    // the counter that changes with page click
    // the counter that displays what cards being shown in array (42-82)
    // the counter used to load all 68 pages of cards

    const [pageCounter, setCounter] = useState(1);
    const [localStart, setLocal] = useState(1);

    const [cards, setPageCards] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{

        if(reduxDeck.length < 2662)
        {
            dispatch(loadCards())
        }

    }, [])

    // // rerenders the page with specific array items when the page number is altered
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

        // filter out the hero "cards"
        let filtered = reduxDeck.filter(card => {
            return card.cardTypeId !== 3 
        })

        let end = start + 40;
        let newPage = filtered.slice(start, end);
        setPageCards(newPage);

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

    // useEffect(()=>{

    let loadView = () => {

        jsx = demonHunter.map(card => {

            if(reduxDeck.cardTypeId !== 3)
            {
                return <SingleCard key={card.slug} card={card}/>
            }
            else{
                return null;
            }

        })

        return jsx;
    }

    let setTitle = () => {

        title =  <Row className="justify-content-center">
                    <h1 id="cardsHeader" className="mb-0 mt-5">Showing {localStart} - {localStart + 40} of {reduxDeck.length} total cards</h1>
                </Row>

        return title;

    }

            // this is meant to keep the jsx from rendering until all of the pages are loaded


    // }, [reduxDeck])

    return reduxDeck.length > 2662 ? (
        <>

            <Container>

                {setTitle()}

                    <br/>
                <Row className="justify-content-center">
                    {loadView()}
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

    ) : (<><div className="mt-3 mb-3">
            <img style={{height:'200px', width:'200px'}} alt="loading" src="https://www.jettools.com/images/animated_spinner.gif"/>
        </div></>)
    
}

export default Cards

