import Hero from "./jsx/hero";
import DestinationPOIInspiration from "./jsx/destination";
import TravelGuide from "./jsx/travelguide";
import CTA from "./jsx/cta";

export default function Home() {
    return (
        <>
            <Hero/>
            <DestinationPOIInspiration/>
            <TravelGuide/>
            <CTA/>
        </>
    );
}