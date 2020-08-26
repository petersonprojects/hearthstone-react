
import React from 'react'

const SingleCard = ({card}) => {
    return (
    <>
        <div id={card.slug} key={card.slug}>
            <p>{card.name}</p>
            <img src={card.image}></img>
        </div>
    </>
    )
}

export default SingleCard
