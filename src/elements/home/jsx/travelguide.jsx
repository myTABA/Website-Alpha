import "../css/travelguide.css";

export default function TravelGuide() {
    let val =
        <div className={"container"}>
            <div className={"row my-2"}>
                <div className={"col"}>
                    <h3>Travel Guides</h3>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard
                        img={"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}/>
                </div>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard
                        img={"https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}/>
                </div>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard
                        img={"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}/>
                </div>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard
                        img={"https://plus.unsplash.com/premium_photo-1677151193419-9be7a26c02cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"}/>
                </div>
            </div>
        </div>;

    return (
        <div className={"travelGuide my-5"}>
            {val}
        </div>
    );

}

function TravelCard({location, img}) {
    if (!img) {
        img = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";
    }
    if (!location) {
        location = "Location";
    }

    return (
        <div className={"card travel"}>
            <div className={"card-body"}>
                <div className={"travel-img card-img-top"}>
                    <img src={img} className={"card-img-top"}></img>
                </div>
                <div className={"travel-text"}>
                    {location}
                </div>
            </div>
        </div>
    );
}