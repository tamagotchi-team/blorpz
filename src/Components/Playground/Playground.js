import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { TimelineLite } from "gsap/all"

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function Playground(props) {
    const playActions = [
        "You play hide and seek with your blorp.",
        "You take your blorp on a walk.",
        "You play pattycake with your Blorp.",
        "You toss a ball around with your Blorp.",
        "You tickle your Blorp.",
        "You play tag with your Blorp.",
        "Your blorp does not want to play right now."
    ];
    const [blorpz, setBlorpz] = useState([]);
    const [play, setPlay] = useState(
        Math.floor(Math.random() * playActions.length - 1)
    );
    const [feed, setFeed] = useState(
        Math.floor(Math.random() * feedActions.length - 1)
    );
    const [playText, setPlayText] = useState(false);
    const [feedText, setFeedText] = useState(false);
    const [poo, setPoo] = useState(false);

    useEffect(() => {
        axios.get(`/api/blorp/${props.userReducer.user.user_id}`).then((res) => {
            setBlorpz([...blorpz, ...res.data]);
        });
    }, [props.userReducer.user.user_id]);

    useInterval(() => {
        let tempBlorpz = [...blorpz]
        // Your custom logic here
        console.log('hit interval set')
        tempBlorpz.forEach((element) => {
            if (element.hunger > 0) {
                element.hunger -= 1
                console.log(element.hunger);
            } else {
                element.hunger = 0
                console.log(element.hunger);
            } if (element.happy > 0) {
                element.happy -= 1
                console.log(element.happy);
            } else {
                element.happy = 0
                console.log(element.happy);
            }
        })
    
        setBlorpz([...tempBlorpz])
    }, 1000 * 5)

    const feedBlorp = (index) => {
        console.log(blorpz[index].hunger);
        blorpz[index].hunger = 10;
        console.log(blorpz[index].hunger);
        setFeed(Math.floor(Math.random() * feedActions.length - 1))
        setFeedText(true)
        setTimeout(() => {
            setFeedText(false)
        }, 1000 * 2);
        setTimeout(() => {
            setPoo(true);
        }, 1000 * 30);
    };

    const playBlorp = (index) => {
        console.log(blorpz[index].happy);
        if (blorpz[index].happy >= 10) {
            setPlay(playActions.length - 1);
            // console.log(blorpz[index].happy);
            setPlayText(true);
            setTimeout(() => {
                setPlayText(false);
            }, 1000 * 2);
        } else {
            blorpz[index].happy += 2;
            // console.log(blorpz[index].happy);
            setPlay(Math.floor(Math.random() * playActions.length - 1));
            setPlayText(true);
            setTimeout(() => {
                setPlayText(false);
            }, 1000 * 2);
        }
    };

    const cleanPoo = () => {
        setPoo(false);
        // console.log("hit poo", poo);
    };

    return (
        <div className="playground-screen">
            <div className="playground-container">
                {blorpz.map((blorp, index) => {
                    console.log(blorpz);
                    console.log(blorpz[index].hunger)
                    return (

                        <div className="progress-container" key={index}>
                            <div className='progress-bar-1' style={{ width: "400px", height: '50px', backgroundColor: "red" }}><div style={{ width: `${blorpz[index].hunger / 10 * 100}%`, height: '50px', backgroundColor: "green" }}></div></div>
                            <button
                                onClick={() => {
                                    feedBlorp(index);
                                }}
                            >
                                FEED
							</button>

                            <div style={{ width: "350px", height: '40px', backgroundColor: "red" }}><div style={{ width: `${blorpz[index].happy / 10 * 100}%`, height: '40px', backgroundColor: "green" }}></div></div>
                            <button
                                onClick={() => {
                                    playBlorp(index);
                                }}
                            >
                                Play with Blorp
							</button>

                            <div style={{ width: "350px", height: '40px', backgroundColor: "red" }}><div style={{ width: `${(blorpz[index].hunger + blorpz[index].happy) / 20 * 100}%`, height: '40px', backgroundColor: "green" }}></div></div>


                            {!feedText ? null : <div>{feedActions[feed]}</div>}
                            <img className="blorp-img" src={blorp.picture} />
                            {!playText ? null : <div>{playActions[play]}</div>}
                            <h1 className="blorp-name">{blorp.blorp_name}</h1>
                            <div id="poo">
                                {poo === false ? null : (
                                    <img
                                        src={
                                            "https://vignette.wikia.nocookie.net/tamagotchi/images/e/e2/Poop_large.png/revision/latest/scale-to-width-down/340?cb=20141219065412"
                                        }
                                        alt="poo"
                                        onClick={cleanPoo}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (reduxState) => {
    return {
        userReducer: reduxState.userReducer,
    };
};

export default connect(mapStateToProps)(Playground);
