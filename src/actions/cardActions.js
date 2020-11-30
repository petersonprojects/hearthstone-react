import axios from 'axios';

export let searchAction = (value) => {

    return {
        type: "SEARCH",
        data: value
    }
}


export const loadCards = () => {

    return async (dispatch) => {

        try{

            // api calls
            let cards = [];
            let mult = 1;

            for(let page = 1;page <= 70;page++)
            {
                let response = await axios.get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=${page}&access_token=USOls9dRJqmUcbnQpw215C5T78tvD9k7Yv`)

                cards.push(...response.data.cards);

                if(page === 17 * mult)
                {
                    dispatch({type:"LOAD_CARDS", data: cards})
                    mult = mult + 1;
                }

                console.log(cards)
            }

        }
        catch(e){
            console.log(e)
        }

    }
}