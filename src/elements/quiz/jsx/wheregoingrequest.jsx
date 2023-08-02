import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import "../css/wheregoingrequest.css";
import {toast} from "react-toastify";

/**
 * The request destination page
 * @param setState the setState function in its raw form. Does not update breadcrumbs.
 * @returns {JSX.Element}
 * @constructor
 */
const WhereGoingRequest = ({setState}) => {
    // setstate is to change the state when the destination is requested, special case;
    let val =
        <>
            <div className={"row my-5"}>
                <div className={"d-flex justify-content-center"}>
                    <div className={"input-group"}>
                        <span className={"input-group-text"}>
                            <FontAwesomeIcon icon={faSearch} size={"2x"} color={"gray"}/>
                        </span>
                        <input type={"text"} className={"form-control"} placeholder={"Where do you want to go?"}/>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"d-flex justify-content-center"}>
                    <button className={"btn btn-outline-primary"} type={"button"} onClick={e=>{
                        toast('add functionality');
                        setState({
                            props:{
                                title: "Thanks for the suggestion!",
                                title_info:"While you are here, check out our other destinations",
                                id: "menu1",
                                type: "wheregoing"
                            }
                        });
                    }}>
                        <h4>Submit</h4>
                    </button>
                </div>
            </div>
        </>
    return val;
};

export default WhereGoingRequest;