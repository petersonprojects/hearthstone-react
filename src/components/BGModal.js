import React from 'react';
import './BGModal.css';
import {Modal, Row, Col} from 'react-bootstrap';

// singleCard here is not an array with a single object, it is only a plain object
const BGModal = ({singleCard, cardImage, tier, isOpen, closeModal, attack, health}) => {
    return (
        <>
            <Modal className="backgroundStyle" show={isOpen} onHide={closeModal}>
            <Modal.Header>
                <Row className="justify-content-center">
                    <Col className="d-flex justify-content-center">
                        <img style={{height:'300px', width: '250px', display: 'block'}} src={singleCard.battlegrounds.image} alt="cropimage"/>
                    </Col>

                    <Col className="d-flex justify-content-start mb-0 mt-3" lg={12}>
                        <Modal.Title style={{marginLeft:'10px', lineHeight:'100%'}}>
                            {singleCard.name}
                            {/* <Row className="d-flex justify-content-start align-items-center" style={{marginTop:'-5px',marginLeft: '0px', color:'black', fontSize:'20px'}}><i>{tier}</i></Row> */}
                        </Modal.Title>
                    </Col>

                    <Col xl={12}>
                        {/* <hr style={{height:'10px', backgroundColor: bgc}}></hr> */}
                    </Col>

                    <br/>
                </Row>
            </Modal.Header>

            <Modal.Body id="modalBod" style={{backgroundColor: '#edf2f4'}}>
                <Row className="align-items-center justify-content-center">

                    <Col className="d-flex justify-content-center align-items-center" xl={12} lg={12} md={12} sm={12} xs={12} style={{fontSize:'100px'}}>
                        <img style={{height:'75px', width:'75px'}} src="./images/score.png" alt="score"></img>
                        {/* {score}<span style={{fontSize:'15px'}}>/10</span> */}
                    </Col>

                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Row className="justify-content-center">
                    {/* footer */}
                </Row>
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default BGModal
