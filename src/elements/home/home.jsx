import Hero from "./jsx/hero";
import DestinationPOIInspiration from "./jsx/destination";
import {TravelGuide} from "./jsx/travelguide";
import CTA from "./jsx/cta";
import {useEffect} from "react";


// needdd to do this because cant render custom text otherwise
const TextFunction = ({text, pTag}) => {
    if (pTag) {
        return <p className={"b2"}>{text}</p>;
    } else {
        return <>{text}<br/></>
    }
}


// home page structure for components is defined here. this is rendered in App.js,
//     where react router takes care of dynamic rendering and setting URLs
export default function Home() {
    let content = "We specialize in creating personalized recommendations tailored to your interests, making it easy to find travel experiences that truly matter to you." +
        "\nmyTABA makes it easy to spend less time searching and more time discovering your next great adventure." +
        "\nFind out why myTABA is the best way to plan your next trip, and get ready to make unforgettable memories." +
        "\n"
    let text = [];
    content = content.split("\n");
    for (const [i, elem] of content.entries()) {
        text.push(<TextFunction text={elem}
                                pTag={true}
                                key={i + 1}/>);
    }
    let title = [];
    content = "Skip the endless hours planning your next trip." +
        "\nWe've already done it for you";
    for (const [i, elem] of content.split("\n").entries()) {
        title.push(<TextFunction text={elem}
                                 key={i + 1}/>);
    }
    return (
        <div id={"home"} key={""}>
            <Hero/>
            <DestinationPOIInspiration/>
            <CTA
                title={title}
                text={text}
                button={"Discover your next adventure"}/>
            <TravelGuide/>
            <CTA/>
        </div>
    );
}