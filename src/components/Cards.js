import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import UniqueModal from './UniqueModal';
import { Row, Container, Button, Col, Form, FormControl, Modal } from 'react-bootstrap';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadCards } from '../actions/cardActions';

const Cards = () => {

    let jsx = null;
    let title = null;
    let pageJSX = null;

    // array of all cards in global state
    const reduxDeck = useSelector(state => state.cards);
    const dispatch = useDispatch();

    // stateful variables
    const [classCards, setClassCards] = useState([])
    const [classToShow, setClassToShow] = useState('')
    const [showingClass, setShowingClass] = useState(false)

    let getClassCards = () => {

        let classObj = {
            mage: [],
            paladin: [],
            shaman: [],
            rogue: [],
            warlock: [],
            warrior: [],
            hunter: [],
            druid: [],
            priest: [],
            demonHunter: [],
            neutral: []
        };
        
        let mage = reduxDeck.filter(card =>  card.classId === 4)
        let druid = reduxDeck.filter(card => card.classId === 2)
        let hunter = reduxDeck.filter(card => card.classId === 3)
        let paladin = reduxDeck.filter(card => card.classId === 5)
        let priest = reduxDeck.filter(card =>  card.classId === 6)
        let rogue = reduxDeck.filter(card => card.classId === 7)
        let shaman = reduxDeck.filter(card => card.classId === 8)
        let warlock = reduxDeck.filter(card => card.classId === 9)
        let warrior = reduxDeck.filter(card => card.classId === 10)
        let demonHunter = reduxDeck.filter(card => card.classId === 14)
        let neutral = reduxDeck.filter(card => card.classId === 12)

        classObj.mage.push(...mage)
        classObj.druid.push(...druid)
        classObj.hunter.push(...hunter)
        classObj.paladin.push(...paladin)
        classObj.priest.push(...priest)
        classObj.rogue.push(...rogue)
        classObj.shaman.push(...shaman)
        classObj.warlock.push(...warlock)
        classObj.warrior.push(...warrior)
        classObj.demonHunter.push(...demonHunter)
        classObj.neutral.push(...neutral)

        return classObj;
    }

    // const [myCollection, setMyCollection] = useState([]);

    const [pageCounter, setCounter] = useState(1);
    const [localStart, setLocal] = useState(1);

    const [metaData] = useState([]);

    const [cards, setPageCards] = useState([]);
    const [currentTitle, setCurrentTitle] = useState('All')

    const [searchResults, setSearchResults] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    // used to render specified modal
    const [cardID, setCardID] = useState('');


    let getToken = async () => {

        let token;
        await fetch('http://localhost:3000/api')
        .then(res => res.json())
        .then(data => {
            console.log(`Inside of getToken: ${data.aToken}`)
            token = data.aToken

        })
        .catch(err => console.log(err))

        return token

    }

    let getMetaData = async () => {

        let accessToken = await getToken();
        // first make a call to localhost:3000/api to receive an oauth token as a response

        await fetch(`https://us.api.blizzard.com/hearthstone/metadata?locale=en_US&access_token=${accessToken}`)
        .then(res => res.json())
        .then(data => {
            metaData.push(...data.sets)
            console.log(metaData)
        })
        .catch(err => console.log(err))
    }


    // component did mount

    useEffect(()=> {

        getMetaData()
        let classObj = getClassCards()
        setClassCards(classObj)

    }, [])

    useEffect(()=>{

        async function getCards() {

            let accessToken = await getToken();
            // first make a call to localhost:3000/api to receive an oauth token as a response
            // if all the cards are not in the redux state, then dispatch loadCards action (redux thunk)

            console.log(reduxDeck)
            if(reduxDeck.length < 2810)
            {
                dispatch(loadCards(accessToken))
            }

        }

        getCards()



    }, [reduxDeck.length, dispatch, reduxDeck])


    // rerenders the page with specific array items when the page number is altered
    useEffect(()=>{

        console.log(classToShow)

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
        let newPage = reduxDeck.slice(start, end);

        if(searchResults === '')
        {
            if(showingClass === false)
            {
                setPageCards(newPage);
            }
            else
            {
                if(classToShow === "mage")
                {
                    setPageCards(classCards.mage.slice(start,end))
                }
                if(classToShow === "druid")
                {
                    setPageCards(classCards.druid.slice(start,end))
                }
                if(classToShow === "hunter")
                {
                    setPageCards(classCards.hunter.slice(start,end))
                }
                if(classToShow === "demon hunter")
                {
                    setPageCards(classCards.demonHunter.slice(start,end))
                }
                if(classToShow === "priest")
                {
                    setPageCards(classCards.priest.slice(start,end))
                }
                if(classToShow === "paladin")
                {
                    setPageCards(classCards.paladin.slice(start,end))
                }
                if(classToShow === "rogue")
                {
                    setPageCards(classCards.rogue.slice(start,end))
                }
                if(classToShow === "shaman")
                {
                    setPageCards(classCards.shaman.slice(start,end))
                }
                if(classToShow === "warlock")
                {
                    setPageCards(classCards.warlock.slice(start,end))
                }
                if(classToShow === "warrior")
                {
                    setPageCards(classCards.warrior.slice(start,end))
                }
                if(classToShow === "neutral")
                {
                    setPageCards(classCards.neutral.slice(start,end))
                }
            }

        }
        else
        {
            let filteredList;
            console.log(searchResults)

            filteredList = reduxDeck.filter(card => {
                return card.name.toLowerCase().includes(searchResults.toLowerCase())
            })

            newPage = filteredList.slice(start, end);

            setPageCards(newPage);
        }
    }, [pageCounter, reduxDeck, classCards])

    useEffect(()=> {

        let start;
        if(pageCounter === 1) { start = 0; }
        else {start = (pageCounter * 40)-40;}
        let end = start + 40;

        if(searchResults !== ''){
            let filteredList;
            console.log(searchResults)

            filteredList = reduxDeck.filter(card => {
                return card.name.toLowerCase().includes(searchResults.toLowerCase())
            })

            let newPage = filteredList.slice(start, end);

            setPageCards(newPage);
        }

        else if(searchResults === '' || searchResults === undefined){
            setPageCards(reduxDeck.slice(0, 40))
        }

    }, [searchResults])

    // functions
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    let handleNext = () => {
        setCounter(pageCounter + 1);
        console.log(pageCounter)
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

        setCounter(1)
        setClassToShow(e.target.innerHTML.toLowerCase())
        console.log(e.target.innerHTML.toLowerCase())
        console.log(classToShow)
        // console.log(mageCards)

        // const classToShow = reduxDeck.filter(card => {
        //     return card.classId === parseInt(e.target.dataset.filter)
        // })
        // console.log(classCards.mage)


        let myVar = e.target.innerHTML.toLowerCase()
        if(e.target.innerHTML === "Demon Hunter")
        {
            myVar = "demonHunter"
        }

        let toSlice = classCards[myVar].slice(0,40)
        setPageCards(toSlice)
        setShowingClass(true)
        setCurrentTitle(e.target.innerHTML)

    }



    let handleSearch = (e) => {

        setCounter(1)

        setSearchResults(e.target.value)
        setCurrentTitle(e.target.value)

    }

    let handleClear = (e) => {
        
        setSearchResults('')
        setCurrentTitle('All')

        let input = document.getElementById('search');
        input.value = '';

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

        if(cards.length <= 40)
        {

    
            // filter out the hero "cards"
            let filtered = reduxDeck.filter(card => {
                return card.cardTypeId !== 3 
            })

            let newPage = filtered.slice(start, end);
            setPageCards(newPage);
        }
        else{
            setPageCards(cards.slice(start,end))
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

        if(currentTitle === 'All' || currentTitle === '')
        {
            title =  <Row className="justify-content-center">
            <h1 id="cardsHeader" className="mb-0 mt-5">{currentTitle} ({reduxDeck.length})</h1>
            </Row>
        }


        else{
            title =  <Row className="justify-content-center">
            <h1 id="cardsHeader" className="mb-0 mt-5">{currentTitle} ({cards.length})</h1>
        </Row>
        }

        return title;
    }

    let loadPageButtons = () => {

        let leftButton = null;

        if(cards.length >= 40)
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

            if(pageCounter === 1) {leftButton = null;}
            else
            {
                leftButton = <Button id="prevButton" className="mb-4" variant="dark" onClick={handlePrevious}><i className="fa fa-arrow-left" aria-hidden="true"></i></Button>
            }

            pageJSX = <Row className="mt-0 pt-0">

                        <Col className="d-flex justify-content-center">
                            {leftButton}
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <p id="pageNumber">That's it!</p>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            
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
        console.log(e.target.id)
        openModal()

    }

    let addToCollection = () => {
        // stretch goal
    }

    let showSets = async () => {

        let setCards = reduxDeck.filter(card => {
            return card.cardSetId === 1466
        })

        console.log(setCards)

        setPageCards(setCards)
    }

    let generateUniqueModal = () => {

        let score = 0;
        // console.log(reduxDeck)
        let singleCard = reduxDeck.filter(card => {

            return card.slug === cardID
        })

        // calculate score here based on health, attack, manaCost and effects

        if(isOpen === true)
        {
            let health;
            let attack;
            if(singleCard[0].health)
            {
                health = parseInt(singleCard[0].health);
                attack = parseInt(singleCard[0].attack);
            }
            else
            {
                health = 0;
                attack = 0;
            }

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

            // if the card is a spell and not a minion, jsut display its mana cost in the modal
            if(singleCard[0].health === undefined || singleCard[0].health === null)
            {
                jsxModalHP =  <Modal.Title><img style={{height:'60px', width:'60px'}} src="./images/mana_crystal.png" alt="hi"/> {singleCard[0].manaCost}</Modal.Title>
            }
            // otherwise display mana cost health and attack
            else
            {
                jsxModalHP = <>
                <Modal.Title><img style={{height:'60px', width:'60px'}} src="./images/mana_crystal.png" alt="hi"/>{singleCard[0].manaCost}</Modal.Title>
                <Modal.Title><img style={{height:'60px', width:'50px', marginLeft:'40px', marginRight: '5px'}} src="./images/attack.png" alt="hi"/>{singleCard[0].attack}</Modal.Title>
                <Modal.Title><img style={{height:'60px', width:'45px', marginLeft:'40px', marginRight: '5px'}} src="./images/health.png" alt="hi"/>{singleCard[0].health}</Modal.Title></>
            }

            let setName = "";

            // loop through metaData and match the card set ID to the setName

            metaData.forEach(setObject => {

                if(singleCard[0].cardSetId === setObject.id)
                {
                    setName = setObject.name
                }
            })

            let card = reduxDeck.filter(card => {
                return card.slug === cardID
            })

            let cardImage = card[0].image


            // start of modal
            return <UniqueModal singleCard={singleCard} cardImage={cardImage} 
                                score={score} bgc={bgc} setName={setName} jsxModalHP={jsxModalHP} 
                                isOpen={isOpen} closeModal={closeModal}
                                addToCollection={addToCollection}
                    />

        }
        else {return null;}
    } // end of generateUniqueModal

    // if the entire redux deck has been loaded in, then load the cards
    return reduxDeck.length > 2800 ? (
        <>

            <Container fluid>

                {setTitle()}
                <br/>

                {/* search */}

                <Row className="justify-content-center">

                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className="d-flex justify-content-end ml-2 mr-0 pr-0">
                        <Form >
                            <FormControl autoComplete="off" id="search" onKeyUp={handleSearch} style={{fontSize:'0.7em', fontFamily:'Belwe'}} type="text" placeholder="Search all cards" className="mr-2" />
                        </Form>
                    </Col>
                    <Col xl={5} lg={5} md={5} sm={5} xs={5} className="d-flex justify-content-start ml-0 pl-0">
                        <Button onClick={handleClear} style={{fontSize:'0.7em', fontFamily:'Belwe'}} id="searchButton" variant="outline-dark" >Reset</Button>
                    </Col>

                </Row>

                {/* <Button onClick={showSets}>MTDF</Button> */}

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

                <Row className="justify-content-center align-items-center mx-4">
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

