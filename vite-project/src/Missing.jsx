import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './index.css'

export default function Missing(){
    const [Missinglist, setMissinglist] = useState([]);

    Missinglist.forEach(x => console.log(x.title))

    function reward(Terrorlist){
        if(Terrorlist.reward_text == null){
            return 'Reward not listed'
        } else if(Terrorlist.reward_text.indexOf('million') != -1){
            return Terrorlist.reward_text.slice(Terrorlist.reward_text.indexOf('$'), (Terrorlist.reward_text.indexOf(' million'))) + ',000,000'
        } else {
            return Terrorlist.reward_text.slice(Terrorlist.reward_text.indexOf('$'), (Terrorlist.reward_text.lastIndexOf('0') + 1))
        }
    }

    function namefix(x){
        if(x.title.indexOf('-') != -1){
            return x.title.slice(x.title[0], x.title.indexOf(' -'))
        } else {
            return x.title
        }

    }
    
    useEffect(() => {
        fetch('https://api.fbi.gov/@wanted?pageSize=100&sort_order=desc&poster_classification=missing')
            .then(res => res.json())
            .then(data => setMissinglist(data.items))
    },[])
    return(
        <>
            <div id='links'>
                <Link to='/terror'>
                    <p id='title'>Terror</p>
                </Link>
                    <p id='title'>Missing</p>
                <Link to='/'>
                    <p id='title'>Most Wanted</p>
                </Link>
            </div>

            <div id='container'>
                {Missinglist.map(x => {
                    return(
                        <div id='card'>
                            <img id='cardpic' src={x.images[0].original}/>
                            <p id='cardname'>{namefix(x)}</p>
                            <p id='cardreward'>{reward(x)}</p>
                        </div>
                    )
                })}
                
            </div>
        </>
    )
}