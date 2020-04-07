import React, { useState } from 'react'
import { logout, register, login } from "../../ducks/userReducer";
<<<<<<< HEAD
import { connect } from 'react-redux'
=======
import {connect} from 'react-redux'
import Landing from '../Landing/Landing'
>>>>>>> master

function Auth(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleUsername = (event) => {

        setUsername(event.target.value);
    };

    const handlePassword = (event) => {

        setPassword(event.target.value)
    }

    const registerUser = (event) => {

        event.preventDefault()
        props.register(username, password);
        setUsername('')
        setPassword('')
    };

    const loginUser = event => {

        event.preventDefault()
        props.login(username, password)
        setUsername('')
        setPassword('')
    }
    return (
        <div className="login-screen">
            <div className="login-container">
                <input className="login"
                    placeholder="Enter Username"
                    onChange={handleUsername}
                />
                <input className='login'
                    placeholder='Enter Password'
                    type="password"
                    onChange={handlePassword}
                />
                <div className="button-container">
                    <button className="login-button" onClick={loginUser}>Login</button>
                    <button className="register-button" onClick={registerUser}>Register</button>
                </div>
            </div>
            <Landing />
        </div>
    )
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState.userReducer
    }

}

export default connect(mapStateToProps, { register, login, logout })(Auth)