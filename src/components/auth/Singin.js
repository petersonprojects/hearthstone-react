import React from 'react';
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux';
import * as actions from '../../actions'
import {compose} from 'redux'

class Signin extends React.Component {

    onSubmit = (formProps) => {
        //call our action creator
        // navigate to a protected page
      console.log(formProps)
      this.props.signin(formProps, ()=>{
          this.props.history.push('/feature');
      })
    }
    
    // handleSubmit = (formProps) => {
    //     console.log(formProps)
    // }

    render() {
        const {handleSubmit} = this.props // coming from redux forms

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

                <button>Sign In</button>


            </form>
        );
    }
}

let mapStateToProps = (state) => {
  return{
      errorMessage: state.auth.errorMessage
  }
}


export default compose(connect(mapStateToProps, actions),
reduxForm({form: 'signin'})
)(Signin)