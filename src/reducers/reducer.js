
// can I make the cards api call here?


const initialState = {
    counter: 1,
    cards:[]
}

const reducer = (state = initialState, action) => {


    switch(action.type)
    {
        case "INCREMENT":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "LOAD_CARDS":
            return{
                ...state,
                cards: action.data
            }
        default:
            return state;
    }

}

export default reducer;