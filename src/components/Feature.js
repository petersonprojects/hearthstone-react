import React from 'react';
import requireAuth from '../requireAuth'

class Feature extends React.Component {
    

    render() {
        return (
            <h1>Feature Page - Protected</h1>
        );
    }
}




export default requireAuth(Feature)