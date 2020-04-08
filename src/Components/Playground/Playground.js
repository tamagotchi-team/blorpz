import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


function Playground(props) {

    const [blorpz, setBlorp] = useState([])

    useEffect(() => {
        let id = props.userReducer.user.user_id
        console.log(id)
        axios.get(`/api/blorp/${id}`)
            .then(res => {
                setBlorp([...blorpz, ...res.data])
            })
    }, [])


    return (
        <div>
            <div>
                {blorpz.map((blorp, index) => {
                    return <img
                        src={blorp.picture}
                    />
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

export default connect(mapStateToProps)(Playground)