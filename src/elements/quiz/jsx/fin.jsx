import {NavLink} from "react-router-dom";

/**
 * Final State
 * @param changeState change state function
 * @returns {JSX.Element}
 * @constructor
 */
function Fin(changeState) {
    let val =
        <div className={"container"}>
            <div className={"row my-5"}>
                <span className={"text-center"}>
                <NavLink to={"/recommendations"} className={"btn btn-outline-primary"}>
                    <h3>
                        Explore your trip suggestions now!
                    </h3>
                </NavLink>
                </span>
            </div>
            <div className={"row"}>
                <h4 className={"text-center"}>
                    Want more accurate results?
                </h4>
                <h3 className={"sh text-center"}>
                    Rate 3 additional destinations
                </h3>
                <span className={"text-center my-4"}>
                    {/*change this to smth else, nothing to do here*/}
                <NavLink to={"/recommendations"} className={"btn btn-outline-secondary"}>
                    <h4>I want better results!</h4>
                </NavLink>
                </span>
            </div>
        </div>
    return val;
}

export default Fin;