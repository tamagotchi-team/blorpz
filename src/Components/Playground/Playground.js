import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

function Playground(props) {
    const playActions = [
        `You play hide and seek with your blorp.`,
        "You take your blorp on a walk.",
        "You play patty-cake with your Blorp.",
        "You toss a ball around with your Blorp.",
        "You tickle your Blorp.",
        "You play tag with your Blorp.",
        `Your blorp does not want to play right now.`,
    ];

    const [play, setPlay] = useState(
        Math.floor(Math.random() * playActions.length - 1)
    );
    const [blorpz, setBlorp] = useState([]);
    const [playText, setPlayText] = useState(false);
    const [poo, setPoo] = useState(false);

    useEffect(() => {
        axios.get(`/api/blorp/${props.userReducer.user.user_id}`).then((res) => {
            setBlorp([...blorpz, ...res.data]);
        });
    }, [props.userReducer.user.user_id]);

    const feedBlorp = (index) => {
        blorpz[index].hunger = 10;
        setTimeout(() => {
            setPoo(true);
        }, 1000 * 10);
    };

    const playBlorp = (index) => {
        if (blorpz[index].happy >= 10) {
            setPlay(playActions.length - 1);
            setPlayText(true);
            setTimeout(
                () => {
                    setPlayText(false);
                },
                1000,
                60,
                5
            );
        } else {
            blorpz[index].happy += 2;
            console.log(blorpz[index].happy);
            setPlay(Math.floor(Math.random() * 2));
            setPlayText(true);
            setTimeout(
                () => {
                    setPlayText(false);
                },
                1000,
                60,
                60,
                5
            );
        }
    };

    const cleanPoo = () => {
        setPoo(false);
    };

    return (
        <div className="playground-screen">
            <div className="playground-container">
                {blorpz.map((blorp, index) => {
                    return (
                        <div key={index}>
                            <button
                                onClick={() => {
                                    feedBlorp(index);
                                }}
                            >
                                AButton
							</button>
                            <button
                                onClick={() => {
                                    playBlorp(index);
                                }}
                            >
                                Play with Blorp
							</button>
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
