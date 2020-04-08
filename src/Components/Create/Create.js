import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import userReducer from '../../ducks/userReducer'

function Create(props) {

    let blorpPicture = ['https://vignette.wikia.nocookie.net/tamagotchi/images/1/11/Mametchi_anime_large.png/revision/latest?cb=20130920042009', 'https://vignette.wikia.nocookie.net/tamagotchi/images/2/2b/Kuchipatchi_anime.PNG/revision/latest/scale-to-width-down/350?cb=20110918052545', 'https://vignette.wikia.nocookie.net/tamagotchi/images/9/98/Mimitchi_anime.PNG/revision/latest?cb=20150118162441', 'https://vignette.wikia.nocookie.net/tamagotchi/images/2/23/Kiki_anime.png/revision/latest?cb=20150130225113', 'https://vignette.wikia.nocookie.net/tamagotchi/images/b/b8/Kuro.png/revision/latest?cb=20150131001626', 'https://vignette.wikia.nocookie.net/tamagotchi/images/3/33/Anime_spacytchi.PNG/revision/latest/scale-to-width-down/350?cb=20120502054708', 'https://vignette.wikia.nocookie.net/tamagotchi/images/8/8d/Lovelitchi_anime.PNG/revision/latest?cb=20170729032254', 'https://vignette.wikia.nocookie.net/tamagotchi/images/0/03/Himespetchi_anime.png/revision/latest?cb=20120131150427', 'https://vignette.wikia.nocookie.net/tamagotchi/images/7/7f/Orene_anime.png/revision/latest?cb=20150131004747', 'https://vignette.wikia.nocookie.net/tamagotchi/images/6/61/Neenetchi_anime_artwork.png/revision/latest/scale-to-width-down/180?cb=20141002020213']

    const user_id = props.userReducer.user.user_id
    const [name, setName] = useState('')
    const [hunger, setHunger] = useState(Math.floor(Math.random() * 10))
    const [awake, setAwake] = useState(true)
    const [happy, setHappy] = useState(Math.floor(Math.random() * 10))
    const [poo, setPoo] = useState(1)
    const [age, setAge] = useState(0)
    const [alive, setAlive] = useState(true)
    const [picture, setPicture] = useState(blorpPicture[Math.floor(Math.random() * 9)])


    const createBlorp = (name, picture, hunger, awake, happy, poo, age, alive) => {
        console.log(user_id, name, hunger, awake, happy, poo, age, alive, picture)
        axios.post(`/api/blorp/${user_id}`, { name, picture, hunger, awake, happy, poo, age, alive })
        setName('')
        setHunger(Math.floor(Math.random() * 10))
        setAwake(true)
        setHappy(Math.floor(Math.random() * 10))
        setPoo(1)
        setAge(0)
        setAlive(true)
        setPicture(blorpPicture[Math.floor(Math.random() * 9)])
    }

    return (
        < div >
            <p>Name your new Blorp!</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createBlorp(name, picture, hunger, awake, happy, poo, age, alive)

                }}
            >
                <input
                    placeholder="Enter Blorp Name Here"
                    id="name"
                    value={name}
                    onChange={(e) => {
                        console.log(name)
                        setName(e.target.value)
                    }}
                />
                <button>Create Blorp!</button>
            </form>
        </div >
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }

}

export default connect(mapStateToProps)(Create)