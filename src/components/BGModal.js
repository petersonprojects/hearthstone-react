import React from 'react';
import './BGModal.css';
import {Modal, Row, Col} from 'react-bootstrap';

// singleCard here is not an array with a single object, it is only a plain object
const BGModal = ({singleCard, tier, isOpen, closeModal, heroPower}) => {

    // 1 - 5
    let customScores = {

        "57944-a-f-kay": 3,
        "64403-alakir": 3,
        "61488-alexstrasza": 2,
        "61910-aranna-starseeker": 4,
        "60362-arch-villain-rafaam": 4,
        "58535-cthun": 5,
        "62242-captain-eudora": 2,
        "62266-captain-hooktusk": 1,
        "64475-chenvaala": 4,
        "59806-dancin-deryl": 3,
        "60369-deathwing": 1,
        "60214-dinotamer-brann": 3,
        "57633-edwin-vancleef": 2,
        "60213-elise-starseeker": 4,
        "63604-forest-warden-omu": 4,
        "60372-fungalmancer-flurgl": 4,
        "57929-george-the-fallen": 5,
        "57634-illidan-stormrage": 1,
        "58534-infinite-toki": 3,
        "63601-jandice-barov": 4,
        "61912-kaelthas-sunstrider": 3,
        "59814-king-mukla": 2,
        "58044-lich-bazhial": 4,
        "63602-lord-barov": 3,
        "59807-lord-jaraxxus": 1,
        "61914-maiev-shadowsong": 5,
        "61490-malygos": 4,
        "60366-millhouse-manastorm": 4,
        "57946-millificent-manastorm": 2,
        "63319-mr-bigglesworth": 2,
        "66483-nzoth": 4,
        "61489-nozdormu": 4,
        "57947-patches-the-pirate": 5,
        "59397-patchwerk": 1,
        "59831-pyramad": 3,
        "57892-ragnaros-the-firelord": 3,
        "64400-rakanishu": 4,
        "60212-reno-jackson": 4,
        "58027-shudderwock": 2,
        "64480-silas-darkmoon": 4,
        "58435-sindragosa": 3,
        "60211-sir-finley-mrrgglton": 5,
        "62268-skycapn-kragg": 3,
        "60367-tess-greymane": 2,
        "59203-the-curator": 4,
        "58021-the-great-akazamzarak": 5,
        "58024-the-lich-king": 4,
        "57893-the-rat-king": 3,
        "66196-yshaarj": 5,
        "59805-yogg-saron-hopes-end": 2,
        "60370-ysera": 5,
        "64485-zephrys-the-great": 5
    }


    let temp;
    heroPower === null ? temp = null: temp = <img style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}} src={heroPower}/>;

    let temp2;
    heroPower === null ? temp2 = '0px': temp2 = '-25px';

    return (
        <>
            <Modal  show={isOpen} onHide={closeModal} style={{fontFamily: 'Belwe'}}>
            <Row className="align-items-center justify-content-center backgroundStyle pt-3" style={{ width:'100%', borderTop:'20px'}}>

                <img className="imageNoHover" style={{height:'300px', width: '250px', display:'inline-block'}} src={singleCard.battlegrounds.image} alt="bg_image"/>

            </Row>
            

            <Row className="align-items-center justify-content-center backgroundStyle name pb-1 px-4 text-center" style={{marginTop: temp2}}>
                {singleCard.name}
            </Row>

            <Col className="px-0" xl={12} style={{ backgroundColor: '#faedcd'}}>
                <hr className="fancyLine9" />
            </Col>

            <Col id="modalBod" className="d-flex justify-content-center backgroundStyle pb-2 imageNoHover" xl={12} >
                {temp}
            </Col>

            <Col className="px-0" xl={12} style={{backgroundColor: '#faedcd'}}>
                <hr className="fancyLine9" />
            </Col>

            <Col className="d-flex justify-content-center align-items-center backgroundStyle pt-1 pb-3" xl={12} lg={12} md={12} sm={12} xs={12} style={{fontSize:'100px'}}>
                <img style={{height:'75px', width:'75px'}} src="./images/score.png" alt="score"></img>
                {customScores[singleCard.slug]}<span style={{fontSize:'20px'}}>/5</span>
            </Col>

            </Modal>
        </>
    )
}

export default BGModal
