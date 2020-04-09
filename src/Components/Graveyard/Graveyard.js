import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

function Graveyard(props) {

    const [dead, setDead] = useState([])

    useEffect(() => {
        axios.get(`/api/deadBlorpz/${props.userReducer.user.user_id}`).then(res => {
            setDead([...dead, ...res.data])
        })
    }, [props.userReducer.user.user_id])


    return (
        <div className="graveyard-screen">
            <div className="graveyard-container">
                {dead.map((dead, index) => {
                    return <div
                        
                        key={index}>
                        <img 
                        className="dead-blorp"
                        src={dead.picture} />
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