import './index.css'
export default function Topten({ten}){

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

    return(
        <>  
            <p id='title'>Most Wanted</p>
            <div id='container'>
                {ten.map(x => {
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