import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import "../css/destination.css";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

function LittleObjects({img, name, isVisible}) {

    // set defaults
    // ❗❗ Only for testing ❗❗
    img = img ? img : 'https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg';
    name = name ? name : 'Icon Name';
    // this variable below is a little tricky
    // read below to understand
    isVisible = isVisible ? "" : "d-none";

    return (
        <div className={"col lilobj " + isVisible}>
            <div className="card">
                <img className={"card-img-top"}
                     src={img}/>
                <p className="card-text text-center" style={{fontSize: .5 + "em"}}>{name}</p>
            </div>
        </div>
    );
}

function BigObjects({url, img, name, location}) {
    img = img ? img : 'https://cdn.britannica.com/46/154246-050-7C72E12F/view-Rome.jpg';
    name = name ? name : 'POI Name';
    location = location ? location : 'POI Location';
    return (
        <div className="col-12 col-md-4 col-lg-3 bigobj p-2 m-0">
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
    // the top 4 filters are always visible, so theyre set as visibility true,
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
        // this is imporant because the screen size variables wont automatically set the display variable
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const display = screenWidth >= 768;

    return (
        <div className={"destinationInspiration my-5"}>
            <div className="container">
                <div className="row my-2">
                    <h2>Not sure where to go?<br/>Get Inspired</h2>
                </div>
                <div className="row my-2">
                    <LittleObjects
                        img={"https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnJhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"}
                        isVisible={true}/>
                    <LittleObjects
                        img={"https://images.unsplash.com/photo-1543039625-14cbd3802e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}
                        isVisible={true}/>
                    <LittleObjects
                        img={"https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b3V0ZG9vcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}
                        isVisible={true}/>
                    <LittleObjects
                        img={"https://images.unsplash.com/photo-1420582282039-a6d11404cb66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3V0ZG9vcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}
                        isVisible={true}/>
                    <LittleObjects
                        img={"https://images.unsplash.com/photo-1445108771252-d1cc31a02a3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3V0ZG9vcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}
                        isVisible={display}/>
                    <LittleObjects
                        img={"https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}
                        isVisible={display}/>
                    <LittleObjects
                        img={"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}
                        isVisible={display}/>
                    <LittleObjects
                        isVisible={display}/>
                    <LittleObjects
                        isVisible={display}/>
                    <LittleObjects
                        isVisible={display}/>
                    <LittleObjects
                        isVisible={false}/>
                    <div className="col lilobj">
                        <div className="card">
                            <FontAwesomeIcon icon={faBars} size={"xl"}/>
                            <p className="card-text text-center" style={{fontSize: .5 + "em"}}>{"Filter"}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <BigObjects
                        name={"Tokyo"}
                        location={"Japan"}
                        img={'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60'}
                        url={"https://visitjapan.com"}/>
                    <BigObjects
                        name={"Great wall of China"}
                        location={"China"}
                        img={"https://plus.unsplash.com/premium_photo-1673002094064-0d4dddd980d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpbmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}/>
                    <BigObjects
                        name={"Taj Mahal"}
                        location={"India"}
                        img={"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}/>
                    <BigObjects
                        name={"Houses"}
                        location={"Italy"}
                        img={"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXRhbHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}/>
                    <BigObjects
                        name={"Singaporean Lion"}
                        location={"SIngapore"}
                        img={"https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2Fwb3JlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"}/>
                    <BigObjects
                        name={"Mount Rushmore"}
                        location={"United States"}
                        img={"https://images.unsplash.com/photo-1592610687683-41d676fcda72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnQlMjBydXNobW9yZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}/>
                    <BigObjects
                        name={"Safari"}
                        location={"Africa"}
                        img={"https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWZyaWNhfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"}/>
                    <BigObjects
                        name={"Eiffel Tower"}
                        location={"Paris"}
                        img={"https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnJhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"}/>
                </div>
            </div>
        </div>
    );
}

