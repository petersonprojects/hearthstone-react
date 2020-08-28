
export const loadCards = (cards) => {

    console.log(cards)
    return {
        type: "LOAD_CARDS",
        data: cards
    }
}