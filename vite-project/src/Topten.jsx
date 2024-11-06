import './index.css'
import { Link } from "react-router-dom";
import React,{ useContext, useEffect, useState} from "react";
import DetailsContext from "./DetailsContext";

export default function Topten(){
    const [ten, setTopten] = useState([]);
    const {details, setDetails} = useContext(DetailsContext)
    ten.forEach(x => console.log(x.subjects))

    function reward(x){
        if(x.reward_text == null){
            return 'Reward not listed'
        } else if(x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.lastIndexOf('0') + 1))){
            return x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.lastIndexOf('0') + 1))
        } else {
            return x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.indexOf('$') + 2)) + ',000,000'
        }
    }
    useEffect(() => {
        fetch('https://api.fbi.gov/@wanted?poster_classification=ten')
            .then(res => res.json())
            .then(data => setTopten(data.items))

    }, [])

    return(
        <>  <div id='links'>
                <Link to='/terror'>
                    <p id='title'>Terror</p>
                </Link>
                <p id='title'>Most Wanted</p>
                <Link to='/missing'>
                    <p id='title'>Missing</p>
                </Link>
            </div>
            <div id='container'>
                {ten.map(x => {
                    return(
                        <div id='card'>
                            <Link to='/details' details={details}>
                                <img id='cardpic' src={x.images[0].original} onClick={() => {setDetails(x.uid)}}/>
                            </Link>
                            <p id='cardname'>{x.title}</p>
                            <p id='cardreward'>{reward(x)}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}