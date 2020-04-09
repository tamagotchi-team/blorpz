import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


function Playground(props) {

    const [blorpz, setBlorp] = useState([])

    useEffect(() => {

        console.log(props.userReducer.user.user_id)
        axios.get(`/api/blorp/${props.userReducer.user.user_id}`)
            .then(res => {
                setBlorp([...blorpz, ...res.data])
            })
    }, [props.userReducer.user.user_id])

    const feedBlorp = () => {

        Xander is a loser

        a loser

        that loses
    }

    const playBlorp = () => {
<<<<<<< HEAD
        // I am
        // putting
        // some
        // stuff
        // here
=======

>>>>>>> master
    }

    const poopBlorp = () => {
        //I'm putting poo in here!
        //poo
        //another poo
    }

    return (
        <div>
            <div>
                {blorpz.map((blorp, index) => {
                    return <div
                        key={index}
                    >

                        <img
                            src={blorp.picture}
                        />

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

export default connect(mapStateToProps)(Playground)