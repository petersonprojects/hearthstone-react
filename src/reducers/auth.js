const init_state = {
    authenticated: "",
    errorMessage: ""
}

let auth = (state = init_state, action) => {

    switch(action.type){
        case "AUTH_USER":
            return{
                ...state,
                authenticated: action.payload
            }
        case "AUTH_ERROR":
            return{
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }

    return state
}


export default auth;