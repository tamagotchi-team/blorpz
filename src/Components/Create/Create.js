import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import userReducer from '../../ducks/userReducer'

<<<<<<< HEAD
function Create(props){
    const user_id = props.userReducer.user.user_id
=======
function Create() {

>>>>>>> master
    const [name, setName] = useState('')
    const [hunger, setHunger] = useState(Math.floor(Math.random() * 10))
    const [awake, setAwake] = useState(true)
    const [happy, setHappy] = useState(Math.floor(Math.random() * 10))
    const [poo, setPoo] = useState(1)
    const [age, setAge] = useState(0)
    const [alive, setAlive] = useState(true)

<<<<<<< HEAD
    const createBlorp = (name, hunger, awake, happy, poo, age, alive) => {
        console.log(user_id, name, hunger, awake, happy, poo, age, alive)
        axios.post(`/api/blorp/${user_id}`, (name, hunger, awake, happy, poo, age, alive))
=======
    const createBlorp = (user_id, name, hunger, awake, happy, poo, age, alive) => {
        axios.post(`/api/blorp/${user_id}`, (name, hunger, awake, happy, poo, age, alive))
        setName('')
        setHunger(Math.floor(Math.random() * 10))
        setAwake(true)
        setHappy(Math.floor(Math.random() * 10))
        setPoo(1)
        setAge(0)
        setAlive(true)

>>>>>>> master
    }

    return (
        < div >
            <p>Name your new Blorp!</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createBlorp(name, hunger, awake, happy, poo, age, alive)
                }}
            >
                <input
                    placeholder="Enter Blorp Name Here"
                    id="name"
                    value={name}
                    onChange={(e) => {
<<<<<<< HEAD
                        console.log(name)
                    setName(e.target.value)
                }}
=======
                        setName(e.target.value)
                    }}
>>>>>>> master
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