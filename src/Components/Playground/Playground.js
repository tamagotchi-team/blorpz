import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { TimelineLite } from "gsap/all"

function useInterval(callback, delay) {

    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

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
        "Your blorp is asleep. You decide not to wake him up.",
        "Your blorp does not want to play right now."
    ];
    const feedActions = [
        "You feed your Blorp a cookie.",
        "You feed your Blorp a sandwich.",
        "You feed your Blorp a slice of pizza.",
        "You feed your Blorp a bagel.",
        "You feed your Blorp some cereal.",
        "You feed your Blorp some ice cream.",
        "Your blorp is asleep. You decide not to wake him up.",
        "Your blorp does not want to eat right now."
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
    const [background, setBackground] = useState('https://www.wallpaperflare.com/static/320/774/377/pixel-art-sun-grass-clouds-wallpaper.jpg')

    useEffect(() => {
        const audioElement = document.getElementsByClassName("audio-element")[0]
        audioElement.play()
        axios.get(`/api/blorp/${props.userReducer.user.user_id}`).then((res) => {
            setBlorpz([...blorpz, ...res.data]);
        });
    }, [props.userReducer.user.user_id]);

    useInterval(() => {
        let tempBlorpz = [...blorpz]
        tempBlorpz.forEach((element) => {
            if (element.hunger > 0) {
                element.hunger -= 1
            } else {
                element.hunger = 0
            } if (element.happy > 0) {
                element.happy -= 1
            } else {
                element.happy = 0
            }
            if (element.hunger === 0 && element.happy === 0) {
                element.alive = false
                saveBlorp(element.hunger, element.awake, element.happy, element.age, element.alive)
                props.history.push('/create')
            }
        })
        setBlorpz([...tempBlorpz])
    }, 1000 * 3)

    useInterval(() => {
        let tempBlorpz = [...blorpz]
        tempBlorpz.forEach((element) => {
            element.age++
        })
        setBlorpz([...tempBlorpz])
    }, 1000 * 60 * 1)

    useInterval(() => {
        let tempBlorpz = [...blorpz]

        tempBlorpz.forEach((element) => {
            if (element.awake === true) {
                element.awake = false
                setTimeout(() => {
                    element.awake = true
                }, 1000 * 60 * 1)
            }
        })
        setBlorpz([...tempBlorpz])
    }, 1000 * 60 * 5)

    const feedBlorp = (index) => {
        if (blorpz[index].awake === false) {
            setFeed(feedActions.length - 2)
            setFeedText(true)
            setTimeout(() => {
                setFeedText(false)
            }, 1000 * 2);
        } else if (blorpz[index].hunger >= 10) {
            setFeed(feedActions.length - 1)
            setFeedText(true)
            setTimeout(() => {
                setFeedText(false)
            }, 1000 * 2);
        } else {
            blorpz[index].hunger = 10;
            setFeed(Math.floor(Math.random() * feedActions.length - 2))
            setFeedText(true)
            setTimeout(() => {
                setFeedText(false)
            }, 1000 * 2);
            setTimeout(() => {
                setPoo(true);
            }, 1000 * 30);
        }
    };

    const playBlorp = (index) => {
        if (blorpz[index].awake === false) {
            setPlay(playActions.length - 2)
            setPlayText(true)
            setTimeout(() => {
                setPlayText(false)
            }, 1000 * 2);
        } else if (blorpz[index].happy >= 10) {
            setPlay(playActions.length - 1);
            setPlayText(true);
            setTimeout(() => {
                setPlayText(false);
            }, 1000 * 2);
        } else {
            blorpz[index].happy += 2;
            setPlay(Math.floor(Math.random() * playActions.length - 2));
            setPlayText(true);
            setTimeout(() => {
                setPlayText(false);
            }, 1000 * 2);
        }
    };

    const id = blorpz.find((blorp, index) => {
        return blorp.alive === true
    })


    const saveBlorp = (hunger, awake, happy, age, alive) => {
        axios.put(`/api/blorp/${id.blorp_id}`, { hunger, awake, happy, age, alive })
            .then((res) => {
            })
            .catch(err => console.log(err))
    }

    const cleanPoo = () => {
        setPoo(false);
    };

    return (
        <div className="playground-screen" style={{ backgroundImage: `url(${background})` }}>
            <audio className="audio-element" src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Good_Old_Neon/This_Is_the_News/Good_Old_Neon_-_10_-_Video_Game_Soundtrack.mp3" type="audio/mp3">
                <source src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Good_Old_Neon/This_Is_the_News/Good_Old_Neon_-_10_-_Video_Game_Soundtrack.mp3"></source>
            </audio>
            <div className="playground-container">
                {blorpz.map((blorp, index) => {
                    return (
                        <div className="progress-container" key={index}>
                            <div>
                                <h3 className="title">Hunger</h3>
                                <div className='progress-bar-1' style={{ width: "350px", height: '40px', backgroundColor: "#5E4444", marginBottom: 12, fontFamily: `'Indie Flower', cursive` }}><div style={{ width: `${blorpz[index].hunger / 10 * 100}%`, backgroundColor: `${blorpz[index].hunger < 3 ? '#AA1212' : '#6FCC4E'}`, height: '40px' }}></div></div>
                                <h3 className="title">Happiness</h3>
                                <div style={{ width: "350px", height: '40px', backgroundColor: "#5E4444", marginBottom: 12 }}><div style={{ width: `${blorpz[index].happy / 10 * 100}%`, backgroundColor: `${blorpz[index].happy < 3 ? '#AA1212' : '#6FCC4E'}`, height: '40px' }}></div></div>
                                <h3 className="title">Life</h3>
                                <div style={{ width: "350px", height: '40px', backgroundColor: "#5E4444", marginBottom: 12 }}><div style={{ width: `${(blorpz[index].hunger + blorpz[index].happy) / 20 * 100}%`, height: '40px', backgroundColor: `${blorpz[index].hunger + blorpz[index].happy < 4 ? '#AA1212' : '#6FCC4E'}`, height: '40px' }}></div></div>

                                <div className="blorp-age" onClick={() => {
                                        setBackground(background === "https://www.wallpaperflare.com/static/320/774/377/pixel-art-sun-grass-clouds-wallpaper.jpg" ? "https://pbs.twimg.com/media/C4TkyIrWYAADSyy.png" : "https://www.wallpaperflare.com/static/320/774/377/pixel-art-sun-grass-clouds-wallpaper.jpg")

                                    }}>Age: {blorpz[index].age}

                                </div>
                            </div>
                            <div className="blorp-info">
                                <div className="blorpz-container">
                                    {!feedText ? null : <div>{feedActions[feed]}</div>}
                                    <img className="blorp-img" src={blorp.picture} style={{ alignSelf: "center" }} />
                                    {!playText ? null : <div>{playActions[play]}</div>}
                                    <h3 className="blorp-name" style={{ alignSelf: "center" }}>{blorp.blorp_name}</h3></div>
                                <div>
                                    {poo === false ? null : (
                                        <img className='poo-img'
                                            src={
                                                "https://vignette.wikia.nocookie.net/tamagotchi/images/e/e2/Poop_large.png/revision/latest/scale-to-width-down/340?cb=20141219065412"
                                            }
                                            alt="poo"
                                            onClick={cleanPoo}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="button-container">
                                <button className="playground-button"
                                    onClick={() => {
                                        feedBlorp(index);
                                    }}
                                >
                                    FEED BLORP
                                </button>
                                <button className="playground-button"
                                    onClick={() => {
                                        playBlorp(index);
                                    }}
                                >
                                    Play with Blorp
                                </button>
                                <button className="playground-button"
                                    onClick={() => {
                                        saveBlorp(id.hunger, id.awake, id.happy, id.age, id.alive)
                                    }}
                                >
                                    Save
                                </button>
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


