import React, { useEffect, useState } from 'react';
import { TimelineLite } from "gsap/all"
import './landing.css'


function Landing(props) {

    const [tl] = useState(new TimelineLite({ paused: false }));
    let blorpzTitle = null;
    let blorpOne = null;
    let blorpTwo = null;
    let blorpThree = null;
    let blorpFour = null;
    let playTitle = null;

    useEffect(() => {
        tl
            .to(blorpzTitle, .75, { x: 500 })
            .from(blorpzTitle, .75, { rotation: 180, ease: "elastic.out(1, 0.25)", x: -1000 })
            .from(blorpOne, .25, { y: 0 })
            .from(blorpOne, .75, { rotation: 180, ease: "elastic.out(1, 0.25)", x: 1000 })
            .from(blorpTwo, 0.25, { x: 1000 })
            .from(blorpTwo, .75, { rotation: 180, ease: "elastic.out(1, 0.25)", y: 300 })
            .from(blorpThree, .25, { x: -1000 })
            .from(blorpThree, .75, { rotation: 0, ease: "elastic.out(1, 0.25)", y: 300 })
            .from(blorpFour, .25, { x: 500 })
            .from(blorpFour, .75, { rotation: 180, ease: "elastic.out(1, 0.25)", y: -300 })
            .from(playTitle, .75, { ease: "bounce(.5, 0.25)", x: -900 })
    }, [])


    return (
        <div className="landing-container">
            <div className="animation-bumper">
            </div>
            <div
                ref={event => playTitle = event}
            >
                <p className="play-title ">
                    Raise Your Blorp Today! +18
                </p>
            </div>
            <div className="top-img">
                <img
                    ref={event => blorpOne = event}
                    src="https://vignette.wikia.nocookie.net/tamagotchi/images/1/11/Mametchi_anime_large.png/revision/latest?cb=20130920042009"
                    width="250"
                    height="250"
                />
                <img
                    ref={event => blorpFour = event}
                    src="https://vignette.wikia.nocookie.net/tamagotchi/images/2/2b/Kuchipatchi_anime.PNG/revision/latest/scale-to-width-down/350?cb=20110918052545"
                    width="250"
                    height="250"
                />
            </div>
            <div
                ref={event => blorpzTitle = event}
            >
                <p className="blorpz-title">
                    BLORPZ
                </p>
            </div>
            <div className="top-img">
                <img
                    ref={event => blorpTwo = event}
                    src="https://vignette.wikia.nocookie.net/tamagotchi/images/0/03/Himespetchi_anime.png/revision/latest?cb=20120131150427"
                    width="250"
                    height="250"
                />
                <img
                    ref={event => blorpThree = event}
                    src='https://vignette.wikia.nocookie.net/tamagotchi/images/3/33/Anime_spacytchi.PNG/revision/latest/scale-to-width-down/350?cb=20120502054708'
                    width="250"
                    height="250"
                /></div>
        </div>
    );
}

export default Landing;