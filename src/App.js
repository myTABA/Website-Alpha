import {
    ClerkProvider,
    RedirectToSignIn,
    SignedIn,
    SignedOut,
    SignIn,
    SignUp,
} from "@clerk/clerk-react";
import "./App.css";
import Navbar from "./elements/home/jsx/navbar";
import Footer from "./elements/home/jsx/footer";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./elements/home/home";
import Recommendation from "./elements/recommendation/rec";
import Travel from "./elements/travelguide/jsx/travel";
import Profile from "./elements/profile/jsx/profile";
import ReactGA from "react-ga4";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quiz from "./elements/quiz/quiz";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing pubkey");
}
const clerkPubKey = String(process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);
const GoogleTrackingID = "G-YHPBPQ0B73";
ReactGA.initialize(GoogleTrackingID);

export default function App() {
    const navigate = useNavigate();

    // ReactGA.send({hitType: "pageview",page: window.location.pathname})

    return (
        <>
            <ClerkProvider
                publishableKey={clerkPubKey}
                navigate={(to) => navigate(to)}
                appearance={{
                    layout: {
                        logoImageUrl: "https://mytaba.com/assets/images/image01.svg?v=c07231be",
                        logoPlacement: "inside",
                        socialButtonsPlacement: "bottom",
                        socialButtonsVariant: "blockButton"
                    }
                }}>
                <Navbar/>
                <Routes>

                    <Route path={'/'} element={<Home/>}/>

                    <Route path={"/sign-in/*"} element={<SignIn routing={"path"} path={"/sign-in"}/>}/>
                    <Route path={"/sign-up/*"} element={<SignUp routing={"path"} path={"/sign-up"}/>}/>

                    {/*add recommendations as protected*/}
                    <Route path={'/recommendations'} element={
                        <>
                            <Recommendation/>
                            {/*<SignedIn>*/}
                            {/*    <Recommendation/>*/}
                            {/*</SignedIn>*/}
                            {/*<SignedOut>*/}
                            {/*    <RedirectToSignIn/>*/}
                            {/*</SignedOut>*/}
                        </>
                    }/>

                    <Route path={'/profile'} element={
                        <>
                            <SignedIn><Profile/></SignedIn>
                            <SignedOut><RedirectToSignIn/></SignedOut>
                        </>
                    }/>
                    <Route path={"/travel-guides"} element={<Travel/>}/>
                    <Route path={"/quiz"} element={<Quiz/>}/>

                </Routes>
                <Footer/>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </ClerkProvider>
        </>
    );
}
