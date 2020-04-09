import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


function Playground(props) {

    const [blorpz, setBlorp] = useState([])
    const [poo, setPoo] = useState(true)

    useEffect(() => {
        axios.get(`/api/blorp/${props.userReducer.user.user_id}`)
            .then(res => {
                setBlorp([...blorpz, ...res.data])
            })
    }, [props.userReducer.user.user_id])


    const feedBlorp = (index) => {
        console.log(blorpz[index].hunger)
        blorpz[index].hunger = 10
        console.log(blorpz[index].hunger)
    }

    const playBlorp = () => {

    }

    const cleanPoo = () => {
        setPoo(false)
        console.log('hit poo', poo)
    }

    
    console.log(props.blorpz)
    return (


        <div className="playground-screen">
            <div className="playground-container">
                {blorpz.map((blorp, index) => {
                    console.log(blorpz)
                    return <div
                        key={index}
                        >
                        <button
                            onClick={() => {
                                feedBlorp(index)
                            }}
                        >AButton</button>
                        <img
                            className="blorp-img"
                            src={blorp.picture}
                        />

                          <h1 className="blorp-name">{blorp.blorp_name}</h1> 

                        <div id="poo">
                            { poo === false 
                            ? null
                            : <img src={'https://vignette.wikia.nocookie.net/tamagotchi/images/e/e2/Poop_large.png/revision/latest/scale-to-width-down/340?cb=20141219065412'} 
                                alt="poo" 
                                onClick={cleanPoo} /> }
                        </div>

                    </div>
                })} 
               
            </div>
        </div >
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer,

    }
}

export default connect(mapStateToProps)(Playground)