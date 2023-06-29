import {TravelCard} from "../../home/jsx/travelguide";
import "../../home/css/travelguide.css";

export default function Travel() {
    const cards = [
        {
            img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"
        },
        {
            img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
        },
        {
            img: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG91dGRvb3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
        },
        {
            img: "https://plus.unsplash.com/premium_photo-1677151193419-9be7a26c02cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
        },
        {}
    ];
    let val =
        <div className={"container"}>
            <div className={"row my-2"}>
                <div className={"col"}>
                    <h3>Travel Guides</h3>
                </div>
            </div>
            <div className={"row"}>
                <TravelGenerator cards={cards}/>
            </div>
        </div>;
    return <div className={"travelGuide my-5"}>{val}</div>;
}

const TravelGenerator = ({cards}) => {
    let val = [];
    for (const [i, card] of cards.entries()) {
        val.push(
            <div className={"col-12 col-md-4 col-lg-3 p-2 m-0"}>
                <TravelCard
                    img={card.img}
                    location={card.location}
                    key={i + 1}/>
            </div>
        );
    }
    return val;
}