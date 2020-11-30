import axios from 'axios'
   // email, password
    // send to our server
    // server send back jwt

    // return {
    //     type: "AUTH_USER",
    //     payload: data
    // }


export const signup = (formProps, callback) =>  async dispatch => {
        try{
            // api call
            let response = await axios.post('/signup', formProps)

            console.log(response.data.token)

            dispatch({type: "AUTH_USER", payload: response.data.token})
            // dispatch to recuder the action
            localStorage.setItem("token", response.data.token)
            callback()
        }
        catch(e){
            // console.log("error in use")
            dispatch({type: "AUTH_ERROR", payload: "email is in use"})
        }
    }



export const signin = (formProps, callback) => {
    // login
    // email, password
    // api to our server
    // jwt\\

    return async (dispatch) => {
        try{
            let response = await axios.post('/signin', formProps)
            dispatch({type: "AUTH_USER", payload: response.data.token})
            localStorage.setItem("token", response.data.token)
            callback()
        }
        catch(e){
            dispatch({type: "AUTH_ERROR", payload: "Invalid login credentials"})
        }
    }
    // return{
    //     type: "AUTH_USER",
    //     payload: data
    // }

}

export const signout = () => {
    // remove the jwt from global state
    localStorage.removeItem('token');
    return {
        type: "AUTH_USER",
        payload: ''
        
    }

}
