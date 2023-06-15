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
                            <div className={"col-12 col-md-6"}>
                                <h1 className="text-justify">
                                    Plan the trip of your dreams - in minutes
                                </h1>
                                <h1 className="text-justify sh">
                                    Instant trip recommendations personalized just for you
                                </h1>
                                <p className="d-flex justify-content-start pt-4">
                                    <GetStarted/>
                                </p>
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
        <NavLink to={"/recommendations"} id={"GetStarted"} className={"btn btn-outline-success"}>
            <h3>Personalize your Trip Today</h3></NavLink>
        //equivalent to the below but for react router need to use Link
        // <a href="#" id="GetStarted" className="btn btn-outline-success">Personalize your Travel</a>
    );
}