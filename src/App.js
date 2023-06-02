import 'bootstrap/dist/css/bootstrap.css';
import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/js/bootstrap.min";
import "./App.css";
import Hero from "./elements/home/jsx/hero";
import Navbar from "./elements/home/jsx/navbar";
import DestinationPOIInspiration from './elements/home/jsx/destination';
import CTA from "./elements/home/jsx/cta";
import Footer from "./elements/home/jsx/footer";
import TravelGuide from "./elements/home/jsx/travelguide";
import {useEffect} from "react";
import RecApp from "./elements/recommendation/recApp";

export default function App() {
    return (
        <>
            <Navbar/>
            {/*<Hero />*/}
            {/*<DestinationPOIInspiration />*/}
            {/*<TravelGuide/>*/}
            {/*<CTA*/}
            {/*title={"Feature"}*/}
            {/*text={"Now"}*/}
            {/*button={"Call to Action"}/>*/}
            {/*/!*component for debugging*!/*/}
            {/*/!*<RandomBootstrapComponent/>*!/*/}
            <RecApp/>
            <Footer/>

        </>
    );
}
function RandomBootstrapComponent() {
    useEffect(() => {
        // Initialize any Bootstrap JavaScript functionality here

        // Example: Toggle collapse functionality
        $(".collapse-button").click(function () {
            $(".collapse-content").collapse("toggle");
        });
    }, []);

    return (
        <div>
            <button type="button" className="btn btn-primary collapse-button">
                Toggle Collapse
            </button>

            <div className="collapse collapse-content">
                <div className="card card-body">
                    This is a collapsible content.
                </div>
            </div>
        </div>
    );
}