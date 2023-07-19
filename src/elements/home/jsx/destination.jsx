import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import "../css/destination.css";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Adventure, Cultural, FoodDrink, Outdoors, Refresh, Relaxation, Sport} from "../../../svgs/cSVG";

function LittleObjects({img, name, isVisible}) {

    // this variable below is a little tricky
    // read below to understand
    isVisible = isVisible ? "" : "d-none";

    return (
        <div className={"lilobj d-flex justify-content-center " + isVisible} onClick={e => {
            const svg = e.currentTarget.querySelector("div.card-img-top > svg");
            const text = e.currentTarget.querySelector("p.card-text");
            const chgColor = (svg, text) => {
                svg.style.color = "var(--extra2)";
                text.style.color = "var(--extra2)";
                text.style.textDecoration = "underline";
            };

            const resetColor = (svg, text) => {
                svg.style.color = "var(--black)";
                text.style.color = "var(--black)";
                text.style.textDecoration = "none";
            };

            if (text.style.color === "var(--extra2)") {
                resetColor(svg, text);
            } else {
                chgColor(svg, text);
            }

            if (text.innerText === "Refresh") {
                document.querySelectorAll("div.lilobj").forEach(e => {
                    resetColor(e.querySelector("div.card-img-top > svg"),
                        e.querySelector("p.card-text"));
                });
            }
        }}>
            <div className="card">
                <div className={"card-img-top text-center"}>
                    {img}
                </div>
                <p className="card-text text-center">{name}</p>
            </div>
        </div>
    );
}

function BigObjects({url, img, name, location}) {
    img = img ? img : 'https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg';
    name = name ? name : 'POI Name';
    location = location ? location : 'POI Location';
    return (
        <div className="col-12 col-md-4 col-lg-3 bigobj m-0">
            <NavLink to={url} target={"_blank"}>
                <div className="card">
                    <img className="card-img-top"
                         src={img} height={"100em"}/>
                    <div className="card-body">
                        <h3 className="card-title">
                            {name}
                        </h3>
                        <h3 className="card-text sh">
                            {location}
                        </h3>
                    </div>
                </div>
            </NavLink>
        </div>
    );
}

export default function DestinationPOIInspiration() {

    // this is all code for littleobjs
    // here is what we're doing.
    //     we need to figure out the screen size.
    //     for small screens, we display limited littleobjs
    //
    // hence, we get window width. BUT, it would only get it once, so if window resizes, rip.
    //     so, i've written a function for recalculating everything on window resize.
    //     if the window size is greater than 768px(tablet screen), then the variable display is set, else reset
    //
    // the top 4 filters are always visible, so they're set as visibility true,
    //     for others we set them dynamically based on value of display
    // this means for small screens, all other filters are not displayed.

    function getWindowWidth() {
        return window.innerWidth;
    }

    const [screenWidth, setScreenWidth] = useState(getWindowWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(getWindowWidth());
        }

        // on resize, handler is called which just sets the screen width to current width.
        //     this is pretty redundant code which a browser tackles on its own
        // what this means is that when user resizes screen, we read current screen width and set it
        // this is important because the screen size variables won't automatically set the display variable
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const display = screenWidth >= 768;

    // get data from bff
    const data = [
        {
            name: "Tokyo",
            location: "Japan",
            img: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            url: "https://visitjapan.com",
        },
        {
            name: "Great Wall of China",
            location: "China",
            img: "https://plus.unsplash.com/premium_photo-1673002094064-0d4dddd980d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            url: "",
        },
        {
            name: "Taj Mahal",
            location: "India",
            img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            url: "",
        },
        {
            name: "Houses",
            location: "Italy",
            img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXRhbHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            url: "",
        },
        {
            name: "Lion of Singapore",
            location: "Singapore",
            img: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2Fwb3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
            url: "",
        },
        {
            name: "Mount Rushmore",
            location: "United States of America",
            img: "https://images.unsplash.com/photo-1592610687683-41d676fcda72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnQlMjBydXNobW9yZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
            url: "",
        },
        {
            name: "Safari",
            location: "",
            img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWZyaWNhfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
            url: "",
        },
        {
            name: "Eiffel Tower",
            location: "Paris",
            img: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnJhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
            url: "",
        },
    ];
    const max_items = data.length;
    console.log(max_items);
    console.log(screenWidth);
    // append only 3 of the total data objects to the generator
    let initialInitialRender;
    if (screenWidth < 768) {
        initialInitialRender = 1;
    } else if (screenWidth < 992) {
        initialInitialRender = 3;
    } else {
        initialInitialRender = 4;
    }
    const initialRenderItems = max_items > initialInitialRender ? initialInitialRender : max_items;
    const [tdata, setTdata] = useState(data.slice(0, initialRenderItems));
    // create a state to keep track of number of elements that have been rendered + 1 (for index of next)
    const [items, setItems] = useState(initialRenderItems);
    // to render the see more button
    const [hasMoreItems, setHasMoreItems] = useState(max_items > initialRenderItems);

    return (
        <div className={"destinationInspiration my-5"}>
            <div className="container">
                <div className="row my-5">
                    <h2>Not sure where to go?<br/>Get Inspired</h2>
                </div>
                <div className="row my-2">
                    <div className={"col d-flex"}>
                        <LittleObjects
                            img={<FoodDrink/>}
                            isVisible={true}
                            name={"Food & Drink"}/>
                        <LittleObjects
                            img={<Cultural/>}
                            isVisible={true}
                            name={"Cultural"}/>
                        <LittleObjects
                            img={<Adventure/>}
                            isVisible={true}
                            name={"Adventurous"}/>
                        <LittleObjects
                            img={<Outdoors/>}
                            isVisible={true}
                            name={"Outdoorsy"}/>
                        <LittleObjects
                            img={<Sport/>}
                            isVisible={true}
                            name={"Sporty"}/>
                        <LittleObjects
                            img={<Relaxation/>}
                            isVisible={true}
                            name={"Relaxation"}/>
                        <LittleObjects
                            img={<Refresh/>}
                            isVisible={true}
                            name={"Refresh"}/>
                    </div>
                </div>
                <div className="row my-2">
                    <BigObjGenerator
                        data={tdata}/>
                </div>
                <div className={"row my-2 d-flex justify-content-center"}>
                    <div
                        className={`col m-0 d-flex align-items-center
                        justify-content-center ${hasMoreItems ? "" : "d-none"}`}>
                        <button className="btn btn-outline-primary" style={{padding: "1rem 2rem"}}
                                onClick={(e) => {
                                    const screenWidth = window.innerWidth;
                                    const [tablet, desktop] = [768, 992];
                                    let render_items;
                                    // is phone width, so only one item per row
                                    if (screenWidth < tablet) {
                                        render_items = 1;
                                    }
                                    // is tablet width so 3 items per row
                                    else if (screenWidth < desktop) {
                                        render_items = 3;
                                    }
                                    // is desktop width so 4 items per row
                                    else if (screenWidth >= desktop) {
                                        render_items = 4;
                                    }
                                    // checking for exceeding the total data we have
                                    if (render_items + items >= max_items) {
                                        setHasMoreItems(false);
                                        setTdata(data);
                                    } else {
                                        setTdata(data.slice(0, items + render_items));
                                    }
                                    // update the items rendered
                                    setItems(items + render_items);
                                }}>

                            <h3 className="text-center">
                                Load another row
                            </h3>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

const BigObjGenerator = ({data}) => {
    // data from bff;

    let val = [];
    for (const [i, datum] of data.entries()) {
        val.push(
            <BigObjects
                name={datum.name}
                url={datum.url}
                img={datum.img}
                location={datum.location}
                key={i + 1}
            />
        );
    }
    return val;
};

