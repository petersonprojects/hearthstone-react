import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form' //reduxForm higher order component
import {connect} from 'react-redux'
import {compose} from 'redux'
import * as action from '../../actions'
class Signup extends Component {

    onSubmit = (formProps) => {
        console.log(formProps)
        //dispatch action to update global state

        this.props.signup(formProps, ()=>{
            console.log('signup was successful');
            this.props.history.push('/feature')
        })
      }

    render() {

        const {handleSubmit} = this.props

        return (

            <form onSubmit={handleSubmit(this.onSubmit)}>

                <fieldset>
                    <label>Email</label>
                    <Field 
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>

                <fieldset>
                    <label>Password</label>
                    <Field 
                        name="password"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                    
                </fieldset>

                <div>{this.props.errorMessage}</div>

                <button>Sign Up</button>


            </form>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage
    }
}


export default compose(connect(mapStateToProps, action),
reduxForm({form: 'signup'}))(Signup)