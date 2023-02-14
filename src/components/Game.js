import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "../App";
import HandCards from "./HandCards";

const Game = ({user}) => {

    const account = useContext(AccountContext);

    const SERVER_URL = "http://localhost:8080/accounts"

    const {id} = useParams();

    const [opponent, setOpponent] = useState("");

    useEffect(() => {
        fetch(`${SERVER_URL}/${id}`)
        .then(response => response.json())
        .then(data => setOpponent(data));
    }, [id])

    const [opponentDeck, setOpponentDeck] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/cards/account/${id}/deck`)
        .then(response => response.json())
        .then(data => setOpponentDeck(data));
    }, [id])

    const [userDeck, setUserDeck] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/cards/account/${account.id}/deck/shuffle`)
        .then(response => response.json())
        .then(data => setUserDeck(data));
    }, [id, account])

    const [userHand, setUserHand] = useState([]);
    const [opponentHand, setOpponentHand] = useState([]);

    useEffect(() => {
        if (userDeck) {
            setUserHand(userDeck.slice(0, 5));
        }
        if (opponentDeck) {
            setOpponentHand(opponentDeck.slice(0,5));
        }
    }, [id, userDeck, account])
    
    return ( 
        <>
            <p>{opponent.trainerTitle} {opponent.username} VS {account.trainerTitle} {account.username}</p>
            <div>
                <HandCards cards={opponentHand}/>
                <HandCards cards={userHand}/>
            </div>
           
            {console.log(opponentHand)}
            {console.log(userHand)}
        </>
    );
}
 
export default Game;