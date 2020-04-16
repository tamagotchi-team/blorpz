import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

function Graveyard(props) {

    const [dead, setDead] = useState([])

    useEffect(() => {
        const audioElement = document.getElementsByClassName("audio-element")[0]
        audioElement.play()
        axios.get(`/api/deadBlorpz/${props.userReducer.user.user_id}`).then(res => {
            setDead([...dead, ...res.data])
            console.log(res.data)
        })
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
                            <img 
                                className="dead-blorp-img"
                                src={dead.picture}
                                alt="dead blorp memorial image" />
                            <p>Age: {dead.age}</p>
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