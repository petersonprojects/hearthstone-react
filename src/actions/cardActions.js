import axios from 'axios';

export let searchAction = (value) => {

    return {
        type: "SEARCH",
        data: value
    }
}


export const loadCards = () => {

    return async (dispatch) => {

        var accessToken;
        // first make a call to localhost:3000/api to receive an oauth token as a response
        // need to make this async
        await fetch('http://localhost:3000/api')
        .then(res => res.json())
        .then(data => {
            console.log(data.aToken)
            accessToken = data.aToken
        })
        .catch(err => console.log(err))
    

        // working! using proxy
        // console.log(accessToken);

        try{

            // api calls
            let cards = [];
            let mult = 1;

            for(let page = 1;page <= 71;page++)
            {
                let response = await axios.get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&page=${page}&access_token=${accessToken}`)

                cards.push(...response.data.cards);

                if(page === 17 * mult)
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