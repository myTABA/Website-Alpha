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
                                <p className="text-justify">
                                    <b>You won't plan a trip without our recommendations again</b>
                                </p>
                                <p className="text-justify">
                                    Discover unique points of interest and personalised activities in just 2 minutes.
                                    All for free
                                </p>
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
        <NavLink to={"/recommendations"} id={"GetStarted"} className={"btn btn-outline-success"}>Personalise your Trip
            Today</NavLink>
        //equivalent to the below but for react router need to use Link
        // <a href="#" id="GetStarted" className="btn btn-outline-success">Personalise your Travel</a>
    );
}