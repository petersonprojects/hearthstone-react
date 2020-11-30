
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

    const totalPages = 70;

    // array of all cards in global state
    const reduxDeck = useSelector(state => state.cards);

    const [myCollection, setMyCollection] = useState([]);

    // the counter that changes with page click
    // the counter that displays what cards being shown in array (42-82)
    // the counter used to load all 68 pages of cards

    const [pageCounter, setCounter] = useState(1);
    const [localStart, setLocal] = useState(1);

    const [cards, setPageCards] = useState([]);
    const [currentTitle, setCurrentTitle] = useState('All')

    const [searchResults, setSearchResults] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [cardID, setCardID] = useState('');

    const dispatch = useDispatch();

    // acts like a component did mount
    useEffect(()=>{

        if(reduxDeck.length < 2662)
        {
            dispatch(loadCards())
        }

    }, [])

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
                filteredList = reduxDeck.filter(card => {
                    return card.name.toLowerCase().includes(searchResults.toLowerCase())
                })
    
                setPageCards(filteredList)
            }

        }
        else if(searchResults === '' || searchResults === undefined){
            setPageCards(reduxDeck.slice(0,40))
        }

    }, [searchResults])

    let handleSearch = (e) => {

        var key = e.keyCode || e.charCode;

        if( key === 8 ){
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

        setCardID(e.target.id)

        openModal()

    }

    let addToCollection = () => {
        // stretch goal
    }

    let generateUniqueModal = () => {

        let score = 0;

        let singleCard = reduxDeck.filter(card => {

            return card.slug === cardID
        })

        // calculate score here based on health, attack, manaCost and effects

        if(isOpen === true)
        {

            let health = parseInt(singleCard[0].health);
            let attack = parseInt(singleCard[0].attack);
            let mana = parseInt(singleCard[0].manaCost);

            let bgc = 'white';

            if((mana * 2) === (health + attack))
            {
                score =  3;
            }
            else if((mana * 2) <= (health + attack))
            {
                score = 5
            }
            // this is also going to include all spells
            else
            {
                score = 1;
            }
            
            if(singleCard[0].text)
            {
                score = score + 1;
            }

            if(singleCard[0].rarityId === 1 || singleCard[0].rarityId === 2)
            {
                // commmon types get no score increase
                score = score + 0;
                bgc = 'lightgray'
            }
            else if(singleCard[0].rarityId === 5)
            {
                // legendary
                score = score + 3;
                bgc = 'orange'
            }
            else if(singleCard[0].rarityId === 3)
            {
                // rare
                score = score + 1
                bgc = '#0077b6'
            }
            else if(singleCard[0].rarityId === 4)
            {
                // epic
                score = score + 2
                bgc = 'rebeccapurple'
            }

            // if the card is a weapon or a spell, just double score
            // (because attack and health are used to calc score)

            if(score * 2 <= 20 && (!health))
            {
                score = score * 2
                if(score > 10)
                {
                    score = 10;
                }
            }

            let jsxModalHP;

            if(singleCard[0].health === undefined || singleCard[0].health === null)
            {
                jsxModalHP =  <Modal.Title><img style={{height:'50px', width:'50px'}} src="./images/mana_crystal.png" alt="hi"/> {singleCard[0].manaCost}</Modal.Title>
            }
            else
            {
                jsxModalHP = <>
                <Modal.Title><img style={{height:'60px', width:'50px'}} src="./images/mana_crystal.png" alt="hi"/> {singleCard[0].manaCost}</Modal.Title>
                <Modal.Title><img style={{height:'60px', width:'50px', marginLeft:'40px'}} src="./images/attack.png" alt="hi"/> {singleCard[0].attack}</Modal.Title>
                <Modal.Title><img style={{height:'60px', width:'50px', marginLeft:'40px'}} src="./images/health.png" alt="hi"/> {singleCard[0].health}</Modal.Title></>
            }

            return <Modal style={{fontFamily:'Belwe'}} show={isOpen} onHide={closeModal}>

            <Modal.Header>
            <Row className="justify-content-center">
                <Col className="d-flex justify-content-center">
                    <img style={{height:'80px', width: '400px', display: 'block'}} src={singleCard[0].cropImage} alt="cropimage"/>
                </Col>

                <Col className="d-flex justify-content-center mb-0 mt-3" lg={12}>
                    <Modal.Title style={{marginLeft:'10px'}}>{singleCard[0].name}</Modal.Title>
                </Col>

                <Col xl={12}>
                    <hr style={{height:'10px', backgroundColor: bgc}}></hr>
                </Col>


                <br/>

                {jsxModalHP}

            </Row>

            </Modal.Header>
    
            <Modal.Body id="modalBod">

            <Row className="align-items-center">

                <Col className="d-flex justify-content-end" xl={8} lg={8} md={8} sm={8} xs={8}>Raw Score (1-10) </Col>
                <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                    <img style={{height:'50px', width:'50px'}} src="./images/score.png" alt="score"></img>
                    {score}
                </Col>

            </Row>

            <Row className="justify-content-center ml-4 mr-4" style={{fontSize:'0.3em'}}>
                Raw Score is calculated based on mana cost, health, attack, rarity and card text. Creating a deck based only off of high raw scores is not a good idea. It is merely a data point used
                to steer you in the right direction, but it is up to you to decide the synergy of your deck!
            </Row>


            </Modal.Body>
    
            <Modal.Footer>

                <Row className="justify-content-center">

                    <Col className="d-flex justify-content-center mb-4" xl={12} lg={12} md={12} sm={12} xs={12}>
                        <i style={{fontFamily: 'Belwe', fontSize:'0.7em'}}>{singleCard[0].flavorText}</i>
                    </Col>
                    <Col className="d-flex justify-content-center" xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Button id="add" onClick={addToCollection} variant="outline-info">+Add to collection</Button>
                    </Col>

                </Row>

            </Modal.Footer>
    
            </Modal>
        }
        else{
            return null;
        }


    }



    // if the entire redux deck has been loaded in, then load the cards
    return reduxDeck.length > 2662 ? (
        <>

            <Container fluid>

                {setTitle()}
                <br/>

                {/* search */}

                <Row className="justify-content-center">

                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="d-flex justify-content-end ml-2 mr-0 pr-0">
                        <Form >
                            <FormControl autoComplete="off" id="search" onChange={handleSearch} style={{fontSize:'0.7em', fontFamily:'Belwe'}} type="text" placeholder="Search all cards" className="mr-2" />
                        </Form>
                    </Col>
                    <Col xl={5} lg={5} md={5} sm={5} xs={5} className="d-flex justify-content-start ml-0 pl-0">
                        <Button onClick={handleClear} style={{fontSize:'0.7em', fontFamily:'Belwe'}} id="searchButton" variant="outline-dark" >Reset</Button>
                    </Col>

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

            {generateUniqueModal()}

        </>
    // else show the loading image
    ) : (<><div className="mt-3 mb-3">
            <img style={{height:'200px', width:'200px'}} alt="loading" src="https://www.jettools.com/images/animated_spinner.gif"/>
        </div></>)
    
}

export default Cards

