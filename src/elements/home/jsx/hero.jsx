import "../css/hero.css";
import {NavLink} from "react-router-dom";

export default function Hero() {
    return (
        <div className={"hero"}>
            <div className={"container-fluid"}>
                <div className="row">
                    <div className="col d-flex justify-content-start align-items-center hero-parent">
                        <div className={"bg-img"}></div>

                        <div className={"container"}>
                            <div className={"col-12 col-md-7 col-lg-5 hero-content"}>
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

function GetStarted() {
    return (
        <NavLink to={"/recommendations"} id={"GetStarted"} className={"btn btn-outline-success w-100 py-3"}>
            <h3>Find your next adventure!</h3></NavLink>
        //equivalent to the below but for react router need to use Link
        // <a href="#" id="GetStarted" className="btn btn-outline-success">Personalize your Travel</a>
    );
}