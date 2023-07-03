import "../css/recommendations.css";
import Recommendation from "../rec";
import Star from "./Star";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown as faThumbsDownSolid, faThumbsUp as faThumbsUpSolid} from "@fortawesome/free-solid-svg-icons";
import {faThumbsDown as faThumbsDownHollow, faThumbsUp as faThumbsUpHollow} from "@fortawesome/free-regular-svg-icons";
import {useEffect, useState} from "react";


function RecItem({img, name, num, match, rating_star, rating_count, description, itinerary_link}) {

    //placeholders and setting defaults
    // ❗❗ Only for testing ❗❗
    img = !img.startsWith("usa") ? img : "https://images.unsplash.com/photo-1452796651103-7c07fca7a2c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvb2tseW4lMjBicmlkZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
    name = name ? name : "Default Landmark";
    match = match ? match : "95";
    //just a complicated placeholder
    rating_star = rating_star ? rating_star : 2 + Math.floor(Math.random() * 3);
    rating_count = rating_count ? rating_count : Math.floor(Math.random() * 100000);
    description = description ? description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque turpis risus, fringilla a sagittis interdum, efficitur vitae odio. Aliquam erat volutpat. Aliquam aliquam semper urna, ac elementum tellus fringilla eu. Vestibulum facilisis consectetur quam. Morbi ac blandit ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";
    itinerary_link = itinerary_link ? itinerary_link : "#";

    let stars = [];
    for (let i = 1; i <= rating_star; i++) {
        // all lists that are appended to html require a unique key
        stars.push(<Star
            key={i}/>);
    }

    let val =
        // surround entire card in a clickable link
        // can do a onclick function and deal with the modal or make it a button and fix styles
        <div
            // data-bs-toggle={"modal"} data-bs-target={"#overlayContent"}
            className={"rec-item-navlink"}>
            {/*todo call a fx here which polls backend for data which renders the data on the modal div*/}
            {/*will most likely require js to handle this, cant call the react component here*/}
            <div className={"row rec-item"}>
                <div className={"col-12 col-md-6"}>
                    <div className={"rec-img"}>
                        <img src={img}/>
                    </div>
                </div>
                <div className={"col-12 col-md-6"}>
                    <div className={"rec-text"}>
                        <h3>{num}. {name}</h3>
                    </div>
                    <div className={"rec-match"}>
                        <span className={"badge bg-success"}>{match}% Match</span>
                    </div>
                    <div className={"rec-rating"}>
                        {stars} {rating_count} ratings
                    </div>
                    <div className={"rec-description"}>
                        {description}
                    </div>
                    <div className={"rec-add"}>
                        {/*todo click override based on screen size - js check screen size and render appropriately*/}
                        {/*<button type={"button"} className={"btn btn-primary"} data-bs-toggle={"modal"}*/}
                        {/*        data-bs-target={"#overlayContent"}>*/}
                        {/*    Add to itinerary*/}
                        {/*</button>*/}
                    </div>
                    <div className={"rec-like"}>
                        <LikeDislike/>
                    </div>
                </div>
            </div>
        </div>;
    return val;
}

function LikeDislike() {
    const [faThumbsUp, setFaThumbsUp] = useState(faThumbsUpHollow);
    const [faThumbsDown, setFaThumbsDown] = useState(faThumbsDownHollow);

    return (
        <>
            <FontAwesomeIcon icon={faThumbsUp} size={"2x"} color={"green"} onClick={(e) => {
                if (faThumbsUp === faThumbsUpHollow) {
                    setFaThumbsUp(faThumbsUpSolid);
                    // set code here to add this to the user profile
                    setFaThumbsDown(faThumbsDownHollow);
                } else {
                    setFaThumbsUp(faThumbsUpHollow);
                }
            }}/>
            <FontAwesomeIcon icon={faThumbsDown} size={"2x"} color={"red"} onClick={(e) => {
                e.preventDefault();
                if (faThumbsDown === faThumbsDownHollow) {
                    setFaThumbsDown(faThumbsDownSolid);
                    // set code here to remove from user profile
                    setFaThumbsUp(faThumbsUpHollow);
                } else {
                    setFaThumbsDown(faThumbsDownHollow);
                }
            }}/>
        </>
    );
}

const makeAJAXcall = (gig) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // using proxy server to circumvent the CORS issue atm
        const gKey = process.env.REACT_APP_GOOGLE_PLACES_KEY;

        const url = `/api/place/details/json?key=${gKey}&fields=rating&place_id=`;
        xhr.open("GET", url + gig);
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error(xhr.statusText));
            }
        };
        xhr.onerror = () => {
            reject(new Error("Error"));
        }
        xhr.send();
    });
};

function RecommendationPane({items}) {
    //items is an array of objects for populating the RecItems
    // we get the items object array from rec.jsx
    const [val, setVal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const updatedVal = [];
            for (const [i, elem] of items.entries()) {    //similar to py's enumerate()

                // need to make calls here for getting remaining data off gid
                const ids = elem.ids;
                try {
                    const gData = await makeAJAXcall(ids.gig);
                    updatedVal.push(
                        <RecItem
                            img={elem.imagelocs[0]}
                            name={elem.name}
                            num={i + 1}   //no need to specify number, this will automatically deal w it
                            match={elem.match}
                            rating_star={gData["result"] ? gData["result"]["rating"] : 2}
                            rating_count={elem.rating_count}
                            description={elem.descrh}
                            itinerary_link={gData["result"] ? gData["result"]["website"] : ""}
                            key={i + 1}/>
                    );
                } catch (e) {
                    console.log(e);
                }
            }
            setVal(updatedVal);
        };
        fetchData();
    }, [items]);
    return (
        <div className={"container-fluid"}>
            {val}
        </div>
    );
}

export default RecommendationPane;