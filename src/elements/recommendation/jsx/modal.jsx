import Star from "./Star";
import {useEffect, useRef} from "react";
import modal from "bootstrap/js/src/modal";

// todo create unique id for all elements and link them to modal where it is rendered via props

function ModalContent({overlayRef}) {

    // define the modal element that needs to be checked
    const mapModal = useRef(null);
    // define the element that needs to be manipulated
    // useEffect(() => {
    //     const show = () => {
    //         if (overlayRef.current) {
    //             overlayRef.current.style.zIndex = 1;
    //         }
    //     }
    //     const hide = () => {
    //         if (overlayRef.current) {
    //             overlayRef.current.style.zIndex = -1;
    //         }
    //     }
    //
    //     // instead of using react states i used eventlisteneers cause the usestate was getting complicated
    //     if (mapModal) {
    //         mapModal.current.addEventListener("show.bs.modal", show);
    //         mapModal.current.addEventListener("hide.bs.modal", hide);
    //     }
    //     return () => {
    //         if (mapModal) {
    //             // when done, unlink the event listeners
    //             mapModal.current.removeEventListener("show.bs.modal", show);
    //             mapModal.current.removeEventListener("hide.bs.modal", hide);
    //         }
    //     }
    // }, []);
    let val =
        <div ref={mapModal} id={"overlayContent"} className={"modal fade"} tabIndex={-1} data-bs-backdrop={"false"}>
            <div className={"modal-dialog modal-xl"}>
                <div className={"modal-content"}>
                    {/*<div className={"modal-header"}>*/}
                    {/*    <button className={"btn-close"} data-bs-dismiss={"modal"} type={"button"}/>*/}
                    {/*</div>*/}
                    <div className={"modal-body"}>
                        <CloseButton/>
                        {/*this is where the entire modal body is*/}
                        <div className={"container-fluid"}>
                            <div className={"row"}>
                                <div className={"col-2 side-img"}>
                                    <img
                                        src={"https://images.unsplash.com/photo-1452796651103-7c07fca7a2c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvb2tseW4lMjBicmlkZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"}/>
                                </div>
                                {/*this is the second half of the screen, the non image part*/}
                                <div className={"col"}>
                                    <div className={"row"}>

                                        <div className={"col-4"}>
                                            {/*this is the text content*/}
                                            <div className={"row"}>
                                                <Description/>
                                            </div>
                                            <div className={"row"}>
                                                <Timings/>
                                            </div>
                                        </div>
                                        <div className={"col"}>
                                            <div className={"row mb-3"}>
                                                <Map/>
                                            </div>
                                            <div className={"row my-3"}>
                                                <div className={"col"}>
                                                    <Ratings/>
                                                </div>
                                                <div className={"col"}>
                                                    <Nearby/>
                                                </div>
                                            </div>
                                            <div className={"row my-3"}>
                                                <Reviews/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;


    return val;
}

function Map() {
    let val =
        <div className={"map-img"}>
            <img src={"https://www.burningcompass.com/world/maps/world-map-hd.jpg"}/>
        </div>;
    return val;
}

function Ratings() {
    let val =
        <div className={"container-fluid"}>
            <div className={"row"}>
                <h1>4.7</h1>
            </div>
            <div className={"star-rating-modal"}>
                <Star/><Star/><Star/> xx,xxx ratings
            </div>
            <div className={"rating-bars"}>
                <p>bar</p>
                <p>bar</p>
                <p>bar</p>
                <p>bar</p>
                <p>bar</p>
            </div>
        </div>;
    return val;
}

function Nearby() {
    let val =
        <>
            <p>
                Nearby Places:
            </p>
            <div className={"modal-nearby-images"}>
                <div className={"container-fluid"}>
                    <div className={"row my-2"}>
                        <div className={"col px-1"}>
                            <img
                                src={"https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"}/>
                        </div>
                        <div className={"col px-1"}>
                            <img
                                src={"https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"}/>
                        </div>
                    </div>
                    <div className={"row my-2"}>
                        <div className={"col px-1"}>
                            <img
                                src={"https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"}/>
                        </div>
                        <div className={"col px-1"}>
                            <img
                                src={"https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    return val;
}

function Reviews() {
    let val =
        <>
            <p>Reviews:</p>
            <Review/>
            <Review/>
            <Review/>
        </>
    return val;
}

function Review() {
    let val =
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-2 modal-review-pfp"}>
                    <img
                        src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"}/>
                </div>
                <div className={"col"}>
                    <div>
                    <span>
                        <Star/><Star/><Star/><Star/><Star/>
                    </span>
                        <span>Name</span>
                        <span>Verified</span>
                    </div>
                    <div>
                        Lorem ipsum blablarquoh k23kru y2r bj gjue rgw3r 732r2 r2oy 7 4527giuyr lrilW YRG Q7R GU FBB
                        yjf3yrt7yr7i bfkh
                    </div>
                </div>
            </div>

        </div>;
    return val;
}

function Timings() {
    let val =
        <>
            <div className={"col mt-3"}>

                <div className={"row my-1"}>
                    <p className={"recommendedTime"}>
                        Recommended time to spend: 2 hours
                    </p>
                </div>
                <div className={"row my-1"}>
                    <p className={"bestDay"}>
                        Best days to visit: Wednesday & Thursday
                    </p>
                </div>
                <div className={"row my-1"}>
                    <div className={"hrs"}>
                        <div>
                            <h5>Hours:</h5>
                        </div>
                        <p>
                            Sunday&emsp;8.30AM-4PM
                        </p>
                        <p>
                            Sunday&emsp;8.30AM-4PM
                        </p>
                        <p>
                            Sunday&emsp;8.30AM-4PM
                        </p>
                        <p>
                            Sunday&emsp;8.30AM-4PM
                        </p>
                        <p>
                            Sunday&emsp;8.30AM-4PM
                        </p>
                        <p>
                            Sunday&emsp;8.30AM-4PM
                        </p>
                        <p>
                            Sunday&emsp;8.30AM-4PM
                        </p>
                    </div>
                </div>
                <div className={"row my-1"}>
                    <p className={"dayChart"}>
                        <img
                            src={"https://images.unsplash.com/photo-1669399213378-2853e748f217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhciUyMGNoYXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"}/>
                    </p>
                </div>

            </div>
        </>
    return val;
}

function Description({name, num, match, rating_star, rating_count, description}) {

    name = name ? name : "Default Landmark";
    match = match ? match : "95";
    //just a complicated placeholder
    rating_star = rating_star ? rating_star : Math.floor(Math.random() * 5);
    rating_count = rating_count ? rating_count : Math.floor(Math.random() * 100000);
    description = description ? description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque turpis risus, fringilla a sagittis interdum, efficitur vitae odio. Aliquam erat volutpat. Aliquam aliquam semper urna, ac elementum tellus fringilla eu. Vestibulum facilisis consectetur quam. Morbi ac blandit ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

    let stars = [];
    for (let i = 1; i <= rating_star; i++) {
        stars.push(<Star
            key={i}/>);
    }

    let val =
        <div className={"col"}>
            <div className={"rec-text"}>
                <h4>{num}. {name}</h4>
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
        </div>;
    return val;
}

function CloseButton() {
    let val =

        <span id={"closebtn"}>
                <button type={"button"} className={"btn btn-secondary"} data-bs-dismiss={"modal"}>
                    <i className={"btn-close btn-close-white"}/>Close
                </button>
        </span>;
    return val;
}

export default ModalContent;
// for mobile, take whole screen, force d-block on this?
//expandable cards, force disable on large screens? d-lg-none