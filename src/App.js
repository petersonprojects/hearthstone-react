import React from 'react';


const App = (props) => {
  return (
    <>
      Splash screen
      <br/>
    </>
  )
}


// purpose is to map global state to a prop we can use inside react
// const mapStateToProps = (state) => {

//   return {
//     counter: state.counter
//   }

// }

// // dispatch is a function used as a conduit to pass stuff from react to redux
// const mapDispatchToProps = (dispatch) => {

//   return {
//     // use dispatch conduit and pass in the action creator (which returns an object)
//     onIncrement: ()=>dispatch(counterAction())
//   }

// }

export default App //connects App component to the provider

