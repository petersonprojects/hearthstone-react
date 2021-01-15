import React, { Component } from 'react';
import BGHero from './BGHero';
import {Row} from 'react-bootstrap';

class Battlegrounds extends Component {

    constructor() {
        super()

        this.state = {
            cards:[],
            heroes: [],
            heroesImages: []
        }
    }

    getToken = async () => {

        let token;
        await fetch('http://localhost:3000/api')
        .then(res => res.json())
        .then(data => {
            token = data.aToken
        })
        .catch(err => console.log(err))

        return token

    }

    componentDidMount = async () => {

        let token = await this.getToken()

        let cardsArr = [];
        
        for(let i = 1; i <= 5; i++)
        {
            await fetch(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&page=${i}&access_token=${token}`)
            .then(res => res.json())
            .then(data => {
                cardsArr.push(...data.cards)
            })
        }

        // filter down to heroes
        let bgHeroes = cardsArr.filter(card => {
            return card.battlegrounds.hero === true
        })

        //filter down further to their images
        let heroImages = bgHeroes.map(heroObj => {
            return heroObj.battlegrounds.imageGold
        })

        this.setState({
            cards: cardsArr,
            heroes: bgHeroes,
            heroesImages: heroImages
        })

    }

    loadView = () => {

        let jsx;

        jsx = this.state.heroes.map(hero => {
            return <BGHero image={hero.battlegrounds.image} key={hero.slug} id={hero.slug} alt={hero.name}/>
        })

        return jsx;
    }

    render() {
        return (
            <>
                <Row className="justify-content-center" style={{fontFamily:'Belwe'}}>
                    <h1>Battlegrounds</h1>
                </Row>

                <Row className="justify-content-center">
                    {this.loadView()}
                </Row>
            </>
        )
    }
}

export default Battlegrounds
