import { useState, useEffect } from 'react'
import './index.css'

export default function Terror(){
    const [Terrorlist, setTerrorlist] = useState([]);

    function reward(Terrorlist){
        if(Terrorlist.reward_text == null){
            return 'Reward not listed'
        } else if(Terrorlist.reward_text.indexOf('million') != -1){
            return Terrorlist.reward_text.slice(Terrorlist.reward_text.indexOf('$'), (Terrorlist.reward_text.indexOf(' million'))) + ',000,000'
        } else {
            return Terrorlist.reward_text.slice(Terrorlist.reward_text.indexOf('$'), (Terrorlist.reward_text.lastIndexOf('0') + 1))
        }
    }
    
    useEffect(() => {
        fetch('https://api.fbi.gov/@wanted?sort_order=desc&poster_classification=terrorist')
            .then(res => res.json())
            .then(data => setTerrorlist(data.items))
    },[])
    return(
        <>
            <p id='title'>Most Wanted Terror</p>
            <div id='container'>
                {Terrorlist.map(x => {
                    return(
                        <div id='card'>
                            <img id='cardpic' src={x.images[0].original}/>
                            <p id='cardname'>{x.title}</p>
                            <p id='cardreward'>{reward(x)}</p>
                        </div>
                    )
                })}
                
            </div>
        </>
    )
}