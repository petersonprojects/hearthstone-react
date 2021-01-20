import React from 'react';
import {Modal, Row, Col, Button} from 'react-bootstrap';

const UniqueModal = ({singleCard, cardImage, bgc, setName, isOpen, closeModal, score, addToCollection, jsxModalHP}) => {
    return (
        <>
            <Modal className="backgroundStyle" style={{fontFamily:'Belwe', backgroundImage:`url(${cardImage})`, backgroundColor:'transparent'}} show={isOpen} onHide={closeModal}>

            <Modal.Header>
            <Row className="justify-content-center">
                <Col className="d-flex justify-content-center">
                    <img style={{height:'80px', width: '100%', display: 'block'}} src={singleCard[0].cropImage} alt="cropimage"/>
                </Col>

                <Col className="d-flex justify-content-start mb-0 mt-3" lg={12}>
                    <Modal.Title style={{marginLeft:'10px', lineHeight:'100%'}}>
                        {singleCard[0].name}
                        <Row className="d-flex justify-content-start align-items-center" style={{marginTop:'-5px',marginLeft: '0px', color:'black', fontSize:'20px'}}><i>{setName}</i></Row>
                    </Modal.Title>
                </Col>

                <Col xl={12}>
                    <hr style={{height:'10px', backgroundColor: bgc}}></hr>
                </Col>


                <br/>

                {jsxModalHP}

            </Row>

            </Modal.Header>

            <Modal.Body id="modalBod" style={{backgroundColor: '#edf2f4'}}>


            <Row className="align-items-center justify-content-center">

                <Col className="d-flex justify-content-center align-items-center" xl={12} lg={12} md={12} sm={12} xs={12} style={{fontSize:'100px'}}>
                    <img style={{height:'75px', width:'75px'}} src="./images/score.png" alt="score"></img>
                    {score}<span style={{fontSize:'15px'}}>/10</span>
                </Col>

            </Row>

            {/* <Row className="justify-content-center ml-4 mr-4" style={{fontSize:'0.3em'}}>
                Raw Score is calculated based on mana cost, health, attack, rarity and card text. Creating a deck based only off of high raw scores is not a good idea. It is merely a data point used
                to steer you in the right direction, but it is up to you to decide the synergy of your deck!
            </Row> */}


            </Modal.Body>

            <Modal.Footer>

                <Row className="justify-content-center">

                    <Col className="d-flex justify-content-center text-center mb-4" xl={12} lg={12} md={12} sm={12} xs={12}>
                        <i style={{fontFamily: 'Belwe', fontSize:'0.7em'}}>{singleCard[0].flavorText}</i>
                    </Col>
                    <Col className="d-flex justify-content-center"  xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Button id="add" onClick={addToCollection} variant="outline-info">+ add to collection</Button>
                    </Col>

                </Row>

            </Modal.Footer>

            </Modal>
        </>
    )
}

export default UniqueModal
