import "../css/hero.css";
import {NavLink} from "react-router-dom";
import Website_Andulasia from "../../../videos/Website_Andalusia.mp4";
import Website_Architecture from "../../../videos/Website_Architecture.mp4";
import Website_Beach from "../../../videos/Website_Beach.mp4";
import Website_Church from "../../../videos/Website_Church.mp4";
import Website_Japan from "../../../videos/Website_Japan.mp4";
// import Website_Mountain from "../../../videos/Website_Mountain.mp4";
import Website_Waterfall from "../../../videos/Website_Waterfall.mp4";
import {useEffect, useRef, useState} from "react";

const vids = [
    Website_Andulasia,
    Website_Beach,
    Website_Church,
    Website_Japan,
    // Website_Mountain,
    Website_Architecture,
    Website_Waterfall,
];

/**
 * The hero component, brings together every other element together.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Hero() {
    // create video indexer state and the reference to elem
    const [cIndex, setCindex] = useState(0);
    const videoRef = useRef(null);

    /**
     * Increment the index to view next video.
     * Overflow issue: Ideally in Java, we avoid this, because running for long enough causes overflow. However, in JS, this number is MASSIVE.
     */
    function nextVid() {
        setCindex((cIndex + 1) % vids.length);
    }

    useEffect(() => {
        videoRef.current.addEventListener("ended", nextVid);

    }, [cIndex]);

    useEffect(() => {
        videoRef.current.src = vids[cIndex];
        // videoRef.current.play();
    }, [cIndex]);

    return (
        <div className={"hero"}>
            <div className={"container-fluid"}>
                <div className="row">
                    <div className="col d-flex justify-content-start align-items-center hero-parent">
                        <div className={"bg-img"}>
                            <video id={"hero-video"} ref={videoRef} autoPlay={true} loop={false} muted={true}>
                                <source src={vids[cIndex]} type={"video/mp4"}/>
                            </video>
                        </div>

                        <div className={"container"}>
                            <div className={"col-12 col-md-7 col-lg-6 hero-content"}>
                                <h1 className="text-justify">
                                    Plan the trip of your<br/> dreams - in minutes.
                                </h1>
                                <h1 className="text-justify sh">
                                    Instant trip recommendations<br/> personalized just for you
                                </h1>
                                <div className="pt-4">
                                    <GetStarted/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Just a button.
 * @returns {JSX.Element}
 * @constructor
 */
function GetStarted() {
    return (
        <NavLink to={"/quiz"} id={"GetStarted"} className={"btn btn-outline-primary w-100 py-3"}>
            <h3>Find your next adventure!</h3></NavLink>
        //equivalent to the below but for react router need to use Link
        // <a href="#" id="GetStarted" className="btn btn-outline-success">Personalize your Travel</a>
    );
}