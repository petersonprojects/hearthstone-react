import React, { Component } from 'react';
import {connect} from 'react-redux';

//HOC

export default (ChildComponent)=>{
    class ComposedComponent extends Component{

        componentDidMount = () => {
            this.isAuthenticated();
        }

        componentDidUpdate() {
            this.isAuthenticated();
        }

        isAuthenticated = () =>{
            if(!this.props.auth){
                this.props.history.push('/')
            }
        }
        

        render(){
            return (
                <ChildComponent {...this.props}/>
            )
        }
    }

    let mapStateToProps = (state) => {
        return{
            auth: state.auth.authenticated
        }
    }
    
    return connect(mapStateToProps, null)(ComposedComponent)
}