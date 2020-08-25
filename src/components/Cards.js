
import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const Cards = () => {

    const [data, setData] = useState([]);

    // acts like componentDidMount as a react hook

    useEffect(()=>{

        async function fetchData(){

            let response = await fetch('/auth/bnet/');
            let fakeData = await response.json();

            console.log(fakeData)
    
        }
    
        fetchData();

    }, [])

    return (
    <>
        {data}
    </>
    )
}

export default Cards

