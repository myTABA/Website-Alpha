import ModalContent from "./modal";
import {useEffect, useRef} from "react";

// this is simple, just plots the map
function Map() {
    const overlayRef = useRef(null);
    const mapAreaParent =useRef(null);
    let val =
        <div ref={mapAreaParent} className={"d-none d-md-flex row rec-map"}>
            <div className={"col map-popup"}>
                <div ref={overlayRef} className={"map-overlay"}></div>
                {/*<ModalContent overlayRef={overlayRef}/>*/}
                <div className={"map"}>
                    <img src={"https://www.burningcompass.com/world/maps/world-map-hd.jpg"}/>
                </div>
            </div>
        </div>;

    // useEffect(()=>{
    //     if(mapAreaParent.current){
    //         let w = mapAreaParent.current.clientWidth;
    //         let h = mapAreaParent.current.clientHeight;
    //         overlayRef.current.style.clientHeight =h;
    //         overlayRef.current.style.clientHeight =w;
    //     }
    // });

    return val;

    // todo on click, display the blacked out div and display the modal which would be a normal div
}

export default Map;