import ModalContent from "./modal";
import {useEffect, useRef} from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper";


// this is simple, just plots the map
function Map() {
    const overlayRef = useRef(null);
    const mapAreaParent = useRef(null);

    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return "wait";
            case Status.FAILURE:
                return "fail";
            case Status.SUCCESS:
                return <MapComponent center={{lat: 44, lng: -73}} zoom={5}/>;
            default:
                return null;
        }
    }

    let val =
        <div ref={mapAreaParent} className={"d-none d-md-flex row rec-map"}>
            <div className={"col map-popup"}>
                <div ref={overlayRef} className={"map-overlay"}></div>
                {/*<ModalContent overlayRef={overlayRef}/>*/}
                <Wrapper apiKey={process.env.REACT_APP_GOOGLE_KEY} render={render}/>

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

function MapComponent({center, zoom}) {
    const ref = useRef();
    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
        return () => {

        }
    }, [center, zoom]);
    return (
        <div id={"map"} className={"map"} ref={ref}>
            {/*<img src={"https://www.burningcompass.com/world/maps/world-map-hd.jpg"}/>*/}
        </div>
    );
}

export default Map;