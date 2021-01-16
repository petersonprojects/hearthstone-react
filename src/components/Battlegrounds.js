import React, { Component } from 'react';
import BGHero from './BGHero';
import SingleCard from './SingleCard';
import BGModal from './BGModal';
import {Row} from 'react-bootstrap';

class Battlegrounds extends Component {

    constructor() {
        super()

        this.state = {
            cards:[],
            heroes: [],
            heroesImages: [],
            isOpen: false,
            cardID: ''
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
        }, ()=> console.log(this.state.cards))

    }

    loadView = () => {

        let jsx;

        jsx = this.state.heroes.map(hero => {
            return <BGHero image={hero.battlegrounds.image} triggerModal={this.triggerModal} key={hero.slug} id={hero.slug} alt={hero.name}/>
        })

        return jsx;
    }

    loadMinions = () => {
        let jsx;

        let minions = this.state.cards.filter(card => {
            return card.battlegrounds.hero === false
        })

        console.log(minions)

        jsx = minions.map(minion => {
            return <SingleCard triggerModal={this.triggerModal} key={minion.slug} card={minion}/>
        })

        return jsx;
    }

    openModal = () => {
        this.setState({
            isOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }

    triggerModal = (e) => {
        this.setState({
            cardID: e.target.id
        })
        this.openModal()
    }

    generateUniqueModal = () => {
        let health = 0;
        let attack = 0;

        let singleCard = this.state.cards.filter(card => {
            return card.slug === this.state.cardID
        })

        if(this.state.isOpen === true)
        {

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

            let tier = parseInt(singleCard[0].battlegrounds.tier) || 'Hero';

            // if(singleCard[0].health === undefined || singleCard[0].health === null)
            // {
            //     jsxModalHP =  <Modal.Title><img style={{height:'60px', width:'60px'}} src="./images/mana_crystal.png" alt="hi"/> {singleCard[0].manaCost}</Modal.Title>
            // }
            // // otherwise display mana cost health and attack
            // else
            // {
            //     jsxModalHP = <>
            //     <Modal.Title><img style={{height:'60px', width:'60px'}} src="./images/mana_crystal.png" alt="hi"/>{singleCard[0].manaCost}</Modal.Title>
            //     <Modal.Title><img style={{height:'60px', width:'50px', marginLeft:'40px', marginRight: '5px'}} src="./images/attack.png" alt="hi"/>{singleCard[0].attack}</Modal.Title>
            //     <Modal.Title><img style={{height:'60px', width:'45px', marginLeft:'40px', marginRight: '5px'}} src="./images/health.png" alt="hi"/>{singleCard[0].health}</Modal.Title></>
            // }

            let cardImage = singleCard[0].image
            // start of modal
            return <BGModal singleCard={singleCard[0]} cardImage={cardImage} tier={tier}
                                attack={attack} health={health}
                                isOpen={this.state.isOpen} closeModal={this.closeModal}
                    />

        }
        else {return null;}
    }

    render() {
        return (
            <>
                <Row className="justify-content-center" style={{fontFamily:'Belwe'}}>
                    <h1>Battlegrounds</h1>
                </Row>

                <Row className="justify-content-center">
                    {this.loadView()}
                    {this.loadMinions()}
                </Row>

                {this.generateUniqueModal()}
            </>
        )
    }
}

export default Battlegrounds
