import { useState, useEffect } from "react";
import './Details.css'

export default function Details(){
    const [details, setDetails] = useState([]);
    const [images, setImages] = useState([]);
    const [originalImage, setoriginalImage] = useState([]);
    const [alias, setalias] = useState([]);

    function reward(x){
        if(x.reward_text == null){
            return 'Reward not listed'
        } else if(x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.lastIndexOf('0') + 1))){
            return x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.lastIndexOf('0') + 1))
        } else {
            return x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.indexOf('$') + 2)) + ',000,000'
        }
    }

    function aliaschecker(x){
        if(x == null){
            return ' '
        } else {
            x.map(x => x + ', ')
        }
    }
    useEffect(() => {
        fetch('https://api.fbi.gov/@wanted-person/a6cb163f93fc40e6ad3d528ce53bc740')
            .then(res => res.json())
            .then(data => {
                setDetails(data)
                setImages(data.images)
                setoriginalImage(data.images[0].original)
                setalias(data.aliases)
                
            })
    },[])
    if(!details){
        return(<p>loading...</p>)
    } else {
    return(
        <>
            <div id='dcontainer'>
                <div id='details_card'>
                    <img id='detail_pic'src={originalImage}/>
                    <div id='alias'>
                        <p id='detail_name'>{details.title}</p>
                        <h3 id='alias_text'>{details.description}</h3>
                        <p id='alias_text' style={{'font-size': '20px'}}>{reward(details)}</p>
                        <p id='alias_text'>Also known as: {aliaschecker(alias)}</p>
                        <li id='alias_text'>{details.sex}</li>
                        <li id='alias_text'>{details.race}</li>
                        <li id='alias_text'>{details.weight}</li>
                        <li id='alias_text'>{details.hair} hair</li>
                        <li id='alias_text'>{details.eyes} eyes</li>
                        <p id='alias_text' style={{color: "red", 'font-size': '20px'}}>{details.warning_message}</p>
                    </div>
                </div>
            </div>
        </>
    )}
}