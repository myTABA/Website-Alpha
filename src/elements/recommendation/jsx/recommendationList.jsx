import "../css/recommendations.css";
import Star from "./Star";
import {useEffect, useState} from "react";
import {ThumbsDownFilled, ThumbsDownUnfilled, ThumbsUpFilled, ThumbsUpUnfilled} from "../../../svgs/cSVG";

/**
 * Singular Recommendation Item
 * @param img image link
 * @param name name of POI
 * @param num number of POI in list, NOT REQUIRED
 * @param match match %
 * @param rating_star how many stars
 * @param rating_count number of votes
 * @param description description of the POI
 * @param itinerary_link link to redirect to onclick; NOT USED
 * @param tags list of tags
 * @returns {JSX.Element}
 * @constructor
 */
function RecItem({img, name, num, match, rating_star, rating_count, description, itinerary_link, tags}) {

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
    tags = tags ? tags : ["fun", "crazy"];

    let stars = [];
    for (let i = 1; i <= rating_star; i++) {
        // all lists that are appended to html require a unique key
        stars.push(<Star
            key={i}/>);
    }

    let val =
        // surround entire card in a clickable link
        // can do an onclick function and deal with the modal or make it a button and fix styles
        <div
            // data-bs-toggle={"modal"} data-bs-target={"#overlayContent"}
            className={"rec-item-navlink"}>
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
                    <div className={"rec-tag"} style={{margin: "1rem 0"}}>
                        <TagGen tags={tags}/>
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

/**
 * Tag Generator for POI
 * @param tags list of tags
 * @returns {JSX.Element}
 * @constructor
 */
function TagGen({tags}) {
    /**
     * Single tag elememt
     * @param tag text tag
     * @returns {JSX.Element}
     * @constructor
     */
    const Tag = ({tag}) => {
        return <>
            <span className={"badge bg-primary tag"}>{tag}</span>
        </>;
    };
    let val = [];
    for (const [i, e] of tags.entries()) {
        val.push(<Tag tag={e} key={i + 1}/>);
    }
    return <span>{val}</span>;
}

/**
 * Thumbs up like and dislike logic and render.
 * @returns {JSX.Element}
 * @constructor
 */
function LikeDislike() {
    const [faThumbsUp, setFaThumbsUp] = useState(false);
    const [faThumbsDown, setFaThumbsDown] = useState(false);

    const thumbsUpHandle = () => {
        setFaThumbsUp(!faThumbsUp);
        faThumbsDown ? setFaThumbsDown(!faThumbsDown) : false;
    };
    const thumbsDownHandle = () => {
        setFaThumbsDown(!faThumbsDown);
        faThumbsUp ? setFaThumbsUp(!faThumbsUp) : false;
    };

    return (
        <>
            {faThumbsUp ?
                <span onClick={thumbsUpHandle}>
                <ThumbsUpFilled/>
                </span> :
                <span onClick={thumbsUpHandle}>
                    <ThumbsUpUnfilled/>
                </span>
            }
            {faThumbsDown ?
                <span onClick={thumbsDownHandle}>
                    <ThumbsDownFilled/>
                </span>
                : <span onClick={thumbsDownHandle}>
                    <ThumbsDownUnfilled/>
                </span>
            }
        </>
    );
}

/**
 * AJAX call to google servers, could reuse this code somewhere in backend. Frontend cannot make calls to google's server.
 * @param gig
 * @returns {Promise<unknown>}
 */
const makeAJAXcall = (gig) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // using proxy server to circumvent the CORS issue atm
        const gKey = process.env.REACT_APP_GOOGLE_KEY;

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

/**
 * The left pane listing POIs
 * @param items_rec json list of recommended pois
 * @param items_must json list of must see pois
 * @returns {JSX.Element}
 * @constructor
 */
function RecommendationPane({items_rec, items_must}) {
    //items is an array of objects for populating the RecItems
    // we get the items object array from rec.jsx

    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(items_rec);
    }, [items_rec]);

    let val = <>
        <div className={"d-flex justify-content-center toggle"}>
            <div onClick={e => {
                const child = e.currentTarget.childNodes;
                if (child[0].className === "selected") {
                    child[1].className = "selected";
                    child[0].className = "";
                    setItems(items_must);
                } else {
                    child[0].className = "selected";
                    child[1].className = "";
                    setItems(items_rec);
                }
            }}>
                <span className={"selected"}>Recommended for you</span>
                <span className={""}>Must See</span>
            </div>
        </div>
        {items ? <RecommendationList items={items}/> : "Loading"}
    </>
    return val;

}

/**
 * The List for the POIs
 * @param items the items data that updates the list
 * @returns {JSX.Element}
 * @constructor
 */
function RecommendationList({items}) {
    const [val, setVal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (items) {
                const updatedVal = [];
                for (const [i, elem] of items.entries()) {    //similar to py's enumerate()

                    // need to make calls here for getting remaining data off gid
                    const ids = elem.ids;
                    try {
                        // const gData = await makeAJAXcall(ids.gig);
                        const gData = {};
                        // can update from the json itself, if it has. at the time i did this, this was not included in the data
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
            }
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