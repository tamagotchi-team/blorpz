import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import grass from '../../assets/grass.png'

function Graveyard(props) {

    
    const [dead, setDead] = useState([])
    const memorialText = [
        `"I will ride eternal! Shiny and chrome!"`,
        `"I made a grave mistake."`,
        `"Avenge me."`,
        `"That damn Carol Baskin!"`,
        `"I put the fun in funeral."`,
        `"To die would be a great adventure."`,
        `"See you in hell."`,
        `"Et tu, Blorpe?"`,
        `"Yippee ki yay m@#*$!!"`,
        `"Peace out."`,
    ]

    const [epitaphText, setEpitaphText] = useState(
        Math.floor(Math.random() * memorialText.length)
    )

    useEffect(() => {
        axios.get(`/api/deadBlorpz/${props.userReducer.user.user_id}`).then(res => {
            setDead([...dead, ...res.data])
            console.log(res.data)
        })
        const audioElement = document.getElementsByClassName("audio-element")[0]
        audioElement.play()
    }, [props.userReducer.user.user_id])

    return (
        <div className="graveyard-screen">
            <audio className="audio-element" src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_07_-_Interception.mp3" type="audio/mp3">
                <source src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_07_-_Interception.mp3"></source>
            </audio>
            <div className="graveyard-container">
                {dead.map((dead, index) => {
                    return <div 
                        className='blorp-dead'
                        key={index}>
                            <p>{dead.blorp_name}</p>
                            <p>Age: {dead.age}</p>
                            <img 
                                className="dead-blorp-img"
                                src={dead.picture}
                                alt="dead blorp memorial image" />
                            <div id='memorial-text'>
                                {memorialText[Math.floor(Math.random() * memorialText.length)]}
                            </div>
                            <img src={grass} className='grass' alt='grass' />
                    </div>
                

                })}
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer,
    }
}

export default connect(mapStateToProps)(Graveyard)