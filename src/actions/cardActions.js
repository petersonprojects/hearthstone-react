import axios from 'axios';

export let searchAction = (value) => {

    return {
        type: "SEARCH",
        data: value
    }
}


export const loadCards = (accessToken) => {

    return async (dispatch) => {

        try{

            // api calls
            let cards = [];
            // let setCards = [];
            let mult = 1;

            // for(let i = 1; i< 5; i++)
            // {
            //     let response = await axios.get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=madness-at-the-darkmoon-faire&page=${i}&access_token=${accessToken}`)

            //     setCards.push(...response.data.cards);
            // }



            for(let page = 1;page <= 72;page++)
            {
                let response = await axios.get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=${page}&access_token=${accessToken}`)

                cards.push(...response.data.cards);

                // setCards.forEach(card => {
                //     if(!cards.includes(card))
                //     {
                //         cards.push(card)
                //     }
                // })

                if(page === 18 * mult)
                {
                    dispatch({type:"LOAD_CARDS", data: cards})
                    mult = mult + 1;
                }

            }

        }
        catch(e){
            console.log(e)
        }

    }
}