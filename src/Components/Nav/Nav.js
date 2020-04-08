import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../ducks/userReducer'
import { withRouter} from 'react-router-dom'

function Nav(props) {
    console.log(props)
    const [dropdown, setDropdown] = useState(false)

    useEffect(() => {
        if (!props.user.username) {
            props.history.push('/')
        }
    }, [props.user.username])

    const handleClick = () => {
        setDropdown(!dropdown)
    }

    const logoutClick = () => {
        props.logout()
    }



    return (

        <div>

            <h1>{props.user.username}</h1>

            <img src={'https://vignette.wikia.nocookie.net/tamagotchi/images/3/32/Marutchi.png/revision/latest?cb=20130906113534'}
                className="menu-button"
                onClick={handleClick}
                style={{ height: "60px", width: "60px" }}
            />
            {dropdown ? (
                <div className="nav-links">
                    <Link to='/playground/:blorp'><button>Playground</button></Link>
                    <Link to='/graveyard'><button>Graveyard</button></Link>
                    <button onClick={logoutClick}>Logout</button>
                </div>
            ) : (
                    null
                )}

        </div>
    )
}

const mapStateToProps = reduxState => {

    const { user } = reduxState.userReducer
    return { user }

};


export default connect(mapStateToProps, {logout})(withRouter(Nav))

