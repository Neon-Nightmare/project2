import { useContext, useState, useEffect } from "react";
import './Details.css'
import DetailsContext from "./DetailsContext";

export default function Details(){
    const {details} = useContext(DetailsContext)
    const [info, setinfo] = useState([]);
    const [images, setImages] = useState([]);
    const [originalImage, setoriginalImage] = useState([]);
    const [alias, setalias] = useState([]);
    const [name, setname] = useState([]);
    const [caution, setCaution] = useState([]);
    console.log(caution)
    console.log(details)
    console.log(originalImage)
    function reward(x){
        if(x.reward_text == null){
            return 'Reward not listed'
        } else if(x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.lastIndexOf('0') + 1))){
            return x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.lastIndexOf('0') + 1))
        } else {
            return x.reward_text.slice(x.reward_text.indexOf('$'), (x.reward_text.indexOf('$') + 2)) + ',000,000 Reward'
        }
    }

    function aliaschecker(x){
        if(x == null){
            return ' '
        } else {
            'Also known as: ' + x.map(x => x + ', ')
        }
    }

    function namefix(x){
        if(x.indexOf('-') != -1){
            return x.slice(x.title[0], x.title.indexOf(' -'))
        } else {
            return x
        }
    }

    function cautionchecker(x){
        // const one = x.replaceAll('<p>', '');
        // return one.replaceAll('</p>', '')
    }
    useEffect(() => {
        fetch(`https://api.fbi.gov/@wanted-person/${details}`)
            .then(res => res.json())
            .then(data => {
                setname(data.title)
                setinfo(data)
                setImages(data.images)
                setoriginalImage(data.images[0].original)
                setalias(data.aliases)
                setCaution(data.caution)
                
            });
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
                        <p id='detail_name'>{namefix(name)}</p>
                        <h3 id='alias_text'>{info.description}</h3>
                        <p id='alias_text' style={{'font-size': '20px'}}>{reward(info)}</p>
                        <p id='alias_text'>{aliaschecker(alias)}</p>
                        <p id='alias_text'>Identifying Traits:</p>
                            <p id='alias_text'>{info.sex}</p>
                            <p id='alias_text'>{info.race}</p>
                            <p id='alias_text'>{info.weight}</p>
                            <p id='alias_text'>{info.hair} hair</p>
                            <p id='alias_text'>{info.eyes} eyes</p>
                            <p id='alias_text'>{info.nationality}</p>
                        <p id='alias_text' style={{color: "red", 'font-size': '20px'}}>{info.warning_message}</p>
                    </div>
                    <p id='alias_text'>{cautionchecker(caution)}</p>
                </div>
            </div>
        </>
    )}
}