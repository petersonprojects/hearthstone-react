
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { Row, Container, Button, Col, Form, FormControl, Modal } from 'react-bootstrap';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import {loadCards} from '../actions/cardActions';

const Cards = () => {

    let jsx = null;
    let title = null;
    let pageJSX = null;

    const totalPages = 68;

    // array of all 2663 cards in global state
    const reduxDeck = useSelector(state => state.cards);

    // the counter that changes with page click
    // the counter that displays what cards being shown in array (42-82)
    // the counter used to load all 68 pages of cards

    const [pageCounter, setCounter] = useState(1);
    const [localStart, setLocal] = useState(1);

    const [cards, setPageCards] = useState([]);
    const [currentTitle, setCurrentTitle] = useState('All')

    const [searchResults, setSearchResults] = useState('');

    const [isOpen, setIsOpen] = useState(false);

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

// functions

    const scrollTop = () => {

        window.scrollTo({top: 0, behavior: 'smooth'});

    }

    let handleNext = () => {

        setCounter(pageCounter + 1);
        setLocal(localStart + 41);
        scrollTop()
    }

    let handlePrevious = () => {

        if(pageCounter > 1){
            setCounter(pageCounter - 1)
            setLocal(localStart - 41)
            scrollTop()
        }

    }

    let handleClass = (e) => {

            const classToShow = reduxDeck.filter(card => {
                return card.classId === parseInt(e.target.dataset.filter)
            })

            setPageCards(classToShow)
            setCurrentTitle(e.target.innerHTML)

    }

    useEffect(()=> {
        
        if(searchResults !== ''){
            let filteredList;
            console.log(searchResults)
    
            if(searchResults !== '')
            {
                filteredList = cards.filter(card => {
                    return card.name.toLowerCase().includes(searchResults.toLowerCase())
                })
    
                setPageCards(filteredList)
            }
            else if(searchResults === '' || searchResults == undefined){
                setPageCards(cards)
            }
        }

    }, [searchResults])

    let handleSearch = (e) => {

        var key = e.keyCode || e.charCode;

        if( key == 8 ){
            //backspace pressed do nothing
            setSearchResults('')
        }

        else if(key !== 8)
        {
            setSearchResults(e.target.value)
        }

    }

    let handleClear = (e) => {
        
        setSearchResults('')

        let input = document.getElementById('search');
        input.value = '';

        if(cards.length <= 40)
        {
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
        }
        else{
            setPageCards(cards)
        }

    }

    let loadView = () => {

        jsx = cards.map(card => {

            if(card.cardTypeId !== 3)
            {
                return <SingleCard triggerModal={triggerModal} key={card.slug} card={card}/>
            }
            else{
                return null;
            }

        })

        return jsx;
    }

    let setTitle = () => {

        // display the total class cards 

        if(cards.length > 40)
        {
            title =  <Row className="justify-content-center">
            <h1 id="cardsHeader" className="mb-0 mt-5">{currentTitle} ({cards.length})</h1>
            </Row>
        }
        else{
            title =  <Row className="justify-content-center">
            <h1 id="cardsHeader" className="mb-0 mt-5"> Page {pageCounter} of {totalPages}</h1>
        </Row>
        }

        return title;
    }

    // <Button onClick={scrollTop} id="scrollTop" style={{height: 40, display: showScroll ? 'flex' : 'none'}} title="Go to top">Top</Button>

    let loadPageButtons = () => {

        if(cards.length <= 40)
        {
            pageJSX = <Row className="mt-0 pt-0">

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
        }
        else{

            pageJSX = <Row className="mt-0 pt-0">

            <Col className="d-flex justify-content-center">
                <p id="pageNumber">That's it!</p>
            </Col>

            </Row>
        }

        return pageJSX;
    }

    let openModal = () => {

        setIsOpen(true)
    }

    let closeModal = () => {

        setIsOpen(false)
    }


    let triggerModal = (e) => {

        console.log(e.target.id)
        openModal()
    }



    // if the entire redux deck has been loaded in, then load the cards
    return reduxDeck.length > 2662 ? (
        <>

            <Container fluid>

                {setTitle()}
                <br/>

                {/* search */}

                <Row className="justify-content-center">
                    <Form  inline>
                        <FormControl autocomplete="off" id="search" onChange={handleSearch} style={{fontSize:'0.8em'}} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button  onClick={handleClear} style={{fontSize:'0.8em'}} id="searchButton" variant="outline-dark" >Reset</Button>
                    </Form>
                </Row>


                {/*filtering buttons can go here*/}

                <Row className="mt-3 mb-3 justify-content-center">
                    <Button id="classButton" style={{backgroundColor:'#5e3023', color:'white'}} size="sm" data-filter={2} onClick={handleClass}>Druid</Button>
                    <Button id="classButton" style={{backgroundColor:'#a7c957'}} size="sm" data-filter={3} onClick={handleClass}>Hunter</Button>
                    <Button id="classButton" style={{backgroundColor: '#48bfe3'}} size="sm" data-filter={4} onClick={handleClass}>Mage</Button>
                    <Button id="classButton" style={{backgroundColor: '#c08552'}} size="sm" data-filter={5} onClick={handleClass}>Paladin</Button>
                    <Button id="classButton" style={{backgroundColor:'#d3d3d3'}} size="sm" data-filter={6} onClick={handleClass}>Priest</Button>
                    <Button id="classButton" style={{backgroundColor:'#495057', color:'white'}} size="sm" data-filter={7} onClick={handleClass}>Rogue</Button>
                    <Button id="classButton" style={{backgroundColor:'#006494', color:'white'}} size="sm" data-filter={8} onClick={handleClass}>Shaman</Button>
                    <Button id="classButton" style={{backgroundColor:'#240046', color:'white'}} size="sm" data-filter={9} onClick={handleClass}>Warlock</Button>
                    <Button id="classButton" style={{backgroundColor:'#a4161a', color:'white'}} size="sm" data-filter={10} onClick={handleClass}>Warrior</Button>
                    <Button id="classButton" style={{backgroundColor:'#386641', color:'white'}} size="sm" data-filter={14} onClick={handleClass}>Demon Hunter</Button>
                    <Button id="classButton" style={{backgroundColor:'#bcac9b'}} size="sm" data-filter={12} onClick={handleClass}>Neutral</Button>
                </Row>

                <Row className="justify-content-center">
                    {loadView()}
                </Row>


                {loadPageButtons()}

            </Container>

            {/* modal code */}
            <Modal show={isOpen} onHide={closeModal}>

                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={closeModal} variant="secondary">Close</Button>
                </Modal.Footer>

            </Modal>

        </>
    // else show the loading image
    ) : (<><div className="mt-3 mb-3">
            <img style={{height:'200px', width:'200px'}} alt="loading" src="https://www.jettools.com/images/animated_spinner.gif"/>
        </div></>)
    
}

export default Cards

