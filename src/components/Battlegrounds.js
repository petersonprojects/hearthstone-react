import React, { Component } from 'react';
import BGHero from './BGHero';
import SingleCard from './SingleCard';
import BGModal from './BGModal';
import {Row, Button, Col} from 'react-bootstrap';
import { gsap } from "gsap";
import {TweenMax, Linear, Power4} from "gsap"
// import {Linear} from "gsap/Linear"

import { ScrollToPlugin } from "gsap/ScrollToPlugin";


class Battlegrounds extends Component {

    constructor() {
        super()

        gsap.registerPlugin(ScrollToPlugin);
        // gsap.registerPlugin(Linear);

        // may need to make the key the card.slug so we can use e.target.id
        this.state = {
            cards:[],
            isExpanded: false,
            heroes: [],
            heroesImages: [],
            isOpen: false,
            cardID: '',
            timedOut: false,
            bg_hp_images: {

                "57944-a-f-kay": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/1965adb362bf6b755257f83274ba73f8334c73f923a8205042fc5a40418963c1.png',
                "64403-alakir": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/c40cc02b8b2531e0138b7fdda31d5d5b6e57b6c63e814a63b94f01273b647a27.png',
                "61488-alexstrasza": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/bf8553638c56539806005bcaabc404f851e22ce58d1997319548666e22f1cda5.png',
                "61910-aranna-starseeker": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/d27bc345a3fce28c5e7bea4f90a8651ba6ccf403f008442d8363eddf824777f5.png',
                "60362-arch-villain-rafaam": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/160f4191cd34976d88887be679fa91847fc0538310baa5f237bc4f1aa9823215.png',
                "58535-cthun": "https://static.wikia.nocookie.net/hearthstone_gamepedia/images/7/7d/Saturday_C%27Thuns%21%28389500%29.png",
                "62242-captain-eudora": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/27d0761244c47f2b35f0f3a99d10327a91e69eca76789c6fda2ffcf12bbdf097.png',
                "62266-captain-hooktusk": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/70c5ff4f22f8c1fbed954a94742334a80160b00d633570cca8df635b87a44145.png',
                "64475-chenvaala": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/1958a06268de863789ec248b9d22240d254e2af3cb640ef2844e00fa95a7bfc1.png',
                "59806-dancin-deryl": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/d6b481f2d2e3bcafd90c3363de0a805029249150a96e7b58d5586bdbdbf5e380.png',
                "60369-deathwing": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/1c21647cd5eef04d1721819e10a135da4f62233e198d379af9013204f71703b6.png',
                "60214-dinotamer-brann": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/8806e91e116dfb3b6e546643a263a43b54d590dfac53ce554e28611aabe8fe01.png',
                "57633-edwin-vancleef": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/1136e46936fa884ede15b0637632ee198790d419b5888d767fe4c3ec40c74b51.png',
                "60213-elise-starseeker": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/aaed696b228a55c85299633dfc6d910bca98d1dd60e98c149ddec2b86141bfcc.png',
                "63604-forest-warden-omu": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/29a58abb178b392d820866eb7d468af981c22386ee1ff49336938a00db732cec.png',
                "60372-fungalmancer-flurgl": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/75504d98dd69d62ae13868200e211fe6adf1dff7a6252dc8422b6964bd9a3b00.png',
                "57929-george-the-fallen": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/173dc2622050b80bd7f6fed376acd19bfd0264fde5d3861af2382a2cf9486697.png',
                "57634-illidan-stormrage": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/ceb023c75edc6b21f6b0d4275db1f29fb05cb684819c6a7da6abae2b89e403bb.png',
                "58534-infinite-toki": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/3fe1d70ec0dda261af093b239cf332cbf9eae69898304d69a653b91ae841c244.png',
                "63601-jandice-barov": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/acf096bd4e18c6eac9249b4b43b9976b41adcdd91303b770ec9af8cd27e9ae0a.png',
                "61912-kaelthas-sunstrider": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/155e8cb410f153d4dc13fa13ca21882f4f71217cc9e834b132c905d50f12c86d.png',
                "59814-king-mukla": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/02a635350f0b2fca5ce4ea6f0f0859f78724c93c088c44ad694b30fe61c228ae.png',
                "58044-lich-bazhial": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/52bb6a903b8c99f032f43898194e37e3483ab5ad4c758e59da5d8354a3bfb1f1.png',
                "63602-lord-barov": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/6e5333cf3c83f2caa1763f2563d0524859d93b7c26045cd525acf6c6add262c1.png',
                "59807-lord-jaraxxus": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/7650ad7555243d5c19c8b1f9e5ddf0003e0f29b3f9b2b14a2e61dbee58d8a2e8.png',
                "61914-maiev-shadowsong": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e83cf83c77fd315f9bcb52acd2864f0e4227e11e1c7182faf65c6f12cdd51c62.png',
                "61490-malygos": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/06bad2849df1389e807a7b66b2812645c41b3c903c656ac7879d0770c48f2e50.png',
                "60366-millhouse-manastorm": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e3a3a6989f9c6e73a5a4a8618f90d153886c0a474fec347d6664f3406a3dcd9c.png',
                "57946-millificent-manastorm": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/ff734bdd86608bbecaa0f759ac8833e4cc35431fa4b3217b844c3c258c08c959.png',
                "63319-mr-bigglesworth": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/013ecc82a881b21b9e649117bdc38df4f50137932497f555340efc35064b72c0.png',
                "66483-nzoth": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e38759d376a94fc9ee6ecf7cf0f9a569e13083136fd670e80a5fdc307778a2ec.png',
                "61489-nozdormu": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/4bafb88d1a98b1764d4a3b6a73b0ec201f371f2b34a655322778e9f83c064dd4.png',
                "57947-patches-the-pirate": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/71d54c4348b97c2bf81d980936ef6f11913c37dc658f1beecf0f774c5c78ce30.png',
                "59397-patchwerk": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/de85cf1bde1732a2d51a11a12e2ecac8268efed29c188d7faff49fae45e626e4.png',
                "59831-pyramad": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/64d62ffe20360ef65ac4c1424bd4ceecbcac828faea2bdc857b73988f0984417.png',
                "57892-ragnaros-the-firelord": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/ac6f93ab83bcb5be18d54eaaf3f12251cbde7cf6a77675b7904cc2a9b5157b9c.png',
                "64400-rakanishu": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/854aa9cdd43926e0852ef8dc79a87fb2b02f3f797eccba053c92711d6967606c.png',
                "60212-reno-jackson": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/bd143305e53bf24590b286386ab4e6ea480cf4b88ed11ddcc59a6fe557961072.png',
                "58027-shudderwock": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/034a8de87e35b44b19d2722f0573bcce11ffce9d20726d35efd7f3b2715a85ed.png',
                "64480-silas-darkmoon": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/ef226f1bc5f5c966b6355e30b2d2bbf6eea2bb1ca54122fcc4472a15236ce90c.png',
                "58435-sindragosa": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/bbb56ae5a579845b194abb470754011758ade6e376b5863f7d482c2484393caa.png',
                "60211-sir-finley-mrrgglton": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e4cf6e5f210962e4bdfb95e257e645ac4b0bf25444496708d0e841bc439d6823.png',
                "62268-skycapn-kragg": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/229f1204b020aef52e95de65bbadcd5e75f389d18289210306f433396976e294.png',
                "60367-tess-greymane": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/f15d63cf8c1b7ce9dacb8e156fb9ede7b4cf03c57aaa10c01ed5380becf31821.png',
                "59203-the-curator": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/fec41e36d2a4996ec8f97b6da0fc05a671c4d9382ff64fbaff351f76ef587883.png',
                "58021-the-great-akazamzarak": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/47f59d3bf931103ea6efe7678b170ee763555e4b4a3ac4c77d2460f27d32e69e.png',
                "58024-the-lich-king": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/1238939ad0e97321ec6fe1ba83e65039669e3714b12abe2d45b55ba3a0180d30.png',
                "57893-the-rat-king": 'https://static.wikia.nocookie.net/hearthstone_gamepedia/images/9/96/A_Tale_of_Kings%28211442%29.png',
                "66196-yshaarj": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/5029682643aff86094a4bdb8bf28d58849ba8b41f80035c8d0dd8239dc984927.png',
                "59805-yogg-saron-hopes-end": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/55c177f453599c029f4bc08d2aaf102717227475a5da99c53a60377a1f435eb6.png',
                "60370-ysera": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/af6ebcd94c714cd33bca25feb4ed84dc52b40b5e41fb4a9b0860b6ebb6ec31a9.png',
                "64485-zephrys-the-great": 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/70b9ec266795ef030ea87da2a48479db6fad8a7fda548b0dad17b665d789a05d.png',
                "67356-tickatus": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/235e56dba3de90dd33125615d66f7a8ee8da0707b841a1a316f01d63b3ccd8f7.png",
                "67553-greybough" : "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/d4dafbca3e8d0e27b33fc66d3c1779917c90db3e7e7fc64d89d5bc65c62e2583.png"

            }
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

        var tween = TweenMax.to("#animo2", 1, {
            rotation: 720,
            ease: Linear.easeNone,
            paused: true
        });

        TweenMax.fromTo(
            tween,
            1,
            { progress: 0 },
            { progress: 1, ease: Power4.easeInOut }
        );

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



        gsap.to("#fadeMe", {duration: 1.5, opacity: 1});
        gsap.to(window, {duration: 1, scrollTo: 350, ease: Power4.easeInOut});
        await gsap.to("#fadeMe2", {duration: 0.2, opacity: 1});
        await gsap.to(".fancyLine9", {duration: 0.2, opacity: 1});
    }

    // gsap

    componentDidUpdate = () => {


    }

    // jsx render

    loadView = () => {

        let jsx;

        jsx = this.state.heroes.map(hero => {
            return <BGHero image={hero.battlegrounds.image} triggerModal={this.triggerModal} key={hero.slug} id={hero.slug} alt={hero.name}/>
        })

        return jsx;
    }

    handleExpand = async (e) => {

        // making this a toggle
        console.log(e.pageY)
        let temp = parseInt(e.pageY)
        if(this.state.isExpanded === false)
        {
            this.setState({
                isExpanded: true
            })
        }
        else
        {
            this.setState({
                isExpanded: false
            })
        }

        let disNone = document.getElementById('fadeMe2');

        await gsap.to("#fadeMe2", {duration: 1,innerHTML: `<img height="30" width="30" id="loadButton" alt="loading" src="https://www.jettools.com/images/animated_spinner.gif"/>`});
        gsap.to(window, {duration: 0.8, scrollTo: temp - 125});
        await gsap.to("#fadeMe2", {duration: 1, opacity: 0,  ease: Power4.easeInOut, pointerEvents:'none'});


        // await gsap.to("");

        // write a ternary for this

    }

    loadMinions = () => {
        let jsx;

        let hrJSX = <Col className="px-0 mb-5" xl={12}>
            <hr className="fancyLine9" style={{opacity: 0}}/>
        </Col>;

        let ourReturn;

        let minions = this.state.cards.filter(card => {
            return card.battlegrounds.hero === false
        })

        if(this.state.isExpanded === true)
        {
            jsx = minions.map(minion => {
                return <SingleCard triggerModal={this.triggerModal} key={minion.slug} card={minion}/>
            })
        }

        else
        {
            jsx = null;
        }

        ourReturn = <>{hrJSX}{jsx}</>

        return ourReturn;
    }

    // modal functions

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

            // loop through this.state.bg_hp_images and filter to singleCard[0].slug
            let heroPower;
            if(this.state.bg_hp_images[singleCard[0].slug] === undefined)
            {
                heroPower = null;
            }
            else
            {
                heroPower = this.state.bg_hp_images[singleCard[0].slug]
            }

            // start of modal
            return <BGModal singleCard={singleCard[0]} tier={tier} heroPower={heroPower}
                                isOpen={this.state.isOpen} closeModal={this.closeModal}
                    />

        }
        else {return null;}
    }

    render() {
        // this.state.timedOut === true ? 
        return (
            <>

                <Row className="justify-content-center pt-4" style={{fontFamily:'Belwe'}}>
                    <img className="imageNoHover" id="animo2" src="https://d2q63o9r0h0ohi.cloudfront.net/images/battlegrounds/logo_battlegrounds-682fab532a5376210193d82b52e1f14335679369c3921b53d1933930c2898a8145b84cebabd201cd741c7e69495047be16cb8e8e5b89c1850996b4702a7d3076.png" alt="hearthstone react battlegrounds"/>
                </Row>

                <Row id="fadeMe" className="justify-content-center" style={{opacity: 0}}>
                    {this.loadView()}
                </Row>

                <Row className="justify-content-center pt-4 pb-4" style={{fontFamily:'Belwe'}}>
                    <Button id="fadeMe2" style={{opacity:0, backgroundColor: '#8a5a44'}} onClick={this.handleExpand}><span id="replace">Load Minions</span></Button>

                </Row>


                <Row className="justify-content-center" >
                    {this.loadMinions()}
                </Row>

                {this.generateUniqueModal()}
            </>
        )
    //     : (<><div className="mt-3 mb-3">
    //     <img style={{height:'200px', width:'200px'}} alt="loading" src="https://www.jettools.com/images/animated_spinner.gif"/>
    // </div></>)
    }
}

export default Battlegrounds
