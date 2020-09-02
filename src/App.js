import React, { Component } from 'react';
import { Row, Col, Container} from 'react-bootstrap'

class App extends Component {

  constructor() {
    super()

    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <>
        <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <a target="_blank" href="https://playhearthstone.com/en-us/"><img style={{width:'700px', height:'250px'}} src="./hearthstone.png"></img></a>
          </Col>
        </Row>

        <Row>
          <Col xl={12} className="d-flex justify-content-center" style={{fontFamily:'Belwe', fontSize:'1.5em'}}>
            <div>
              Become Legend with <b style={{color:'white', backgroundColor:'black'}}>Hearthstone</b><b style={{color:'lightskyblue', backgroundColor:'black'}}>React</b>
            </div>


          </Col>
          <Col xl={12}>
            <div className="d-flex justify-content-center mt-5" style={{fontFamily:'Belwe'}}>
              Click a cardback below to get started!
            </div>
          </Col>
        </Row>

        <Row className="mt-1">
          <a href="/cards"><img style={{width:'250px', height:'350px', marginLeft:'20px'}} src="./cardback2.png"></img></a>
          <a href="/cards"><img style={{width:'250px', height:'350px', marginLeft:'20px'}} src="./cardback3.png"></img></a>
          <a href="/cards"><img style={{width:'240px', height:'350px', marginLeft:'20px', marginTop:'8px', paddingBottom:'15px', paddingLeft:'5px',paddingRight:'5px'}} src="./cardback4.png"></img></a>
          <a href="/cards"><img style={{width:'250px', height:'350px', marginLeft:'20px'}} src="./cardback1.png"></img></a>
        </Row>

        </Container>

      </>
    )
  }
}

export default App


