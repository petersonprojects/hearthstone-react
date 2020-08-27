
// can I make the cards api call here?

const initialState = {
    counter: 0,
    cards: []
}

const reducer = (state = initialState, action) => {


    switch(action.type)
    {
        case "INCREMENT":
            return {
                ...state,
                counter: state.counter + 1
            }
        default:
            return state;
    }

}

export default reducer;