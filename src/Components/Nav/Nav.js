import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userReducer from '../../ducks/userReducer'

function Nav(props) {

    const [dropdown, setDropdown] = useState(false)

    const handleClick = () => {
        setDropdown(!dropdown)
    }

    return (
        <div>

            <img src={'https://vignette.wikia.nocookie.net/tamagotchi/images/3/32/Marutchi.png/revision/latest?cb=20130906113534'}
                className="menu-button"
                onClick={handleClick}
                style={{height: "60px", width: "60px"}}
            />
            {dropdown ? (
                <div className="nav-links">
                    <Link to='/playground/:blorp'><button>Playground</button></Link>
                    <Link to='/graveyard'><button>Graveyard</button></Link>
                    <Link to='/'><button>Logout</button></Link>
                </div>
            ) : (
                    null
                )}

        </div>
    )
}

export default Nav


