import '../css/ratepoi.css';
import axios from "axios";
import React, {useEffect, useState} from "react";

const tarr = ["https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"]
let i = 0;
const RatePoi = ({state, changeState}) => {
    console.log(state);

    const [content, setContent] = useState({
        imgsrc: "",
        name: "",
        tags: [],
        desc: ""
    });


    useEffect(() => {
        const dataPromise = getData();
        dataPromise.then(e => {
            console.log('promise called');
            const v = e.data;
            setContent({
                name: v.features[0].properties.name,
                tags: v.features[0].properties.kinds.split(','),
            });
        });
    }, [state.props.id]);
    //only call the axios when ID changes

    console.log(i);
    let val =
        <div className={"container my-5"}>
            <div className={"row"}>
                <div className={"col-12 col-md image"}>
                    <img
                        // replace with content.imgsrc
                        src={tarr[i]}/>
                </div>
                <div className={"col-12 col-md info"}>
                    <h3>{content.name}</h3>
                    <div className={"tags"}>
                        <TagMaker tags={content.tags}/>
                    </div>
                    <div className={"b3 desc"}>
                        {content.desc}
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col rating"}>

                    {state.props.id}
                    <div className={"d-flex justify-content-center"}>
                        <div className={"form-check form-check-inline"}>
                            <input className={"form-check-input"} type={"radio"} id={"i-2"} name={"likert"}/>
                            <label className={"form-check-label"} htmlFor={"i-2"}>Not at all<br/>Interested</label>
                        </div>
                        <div className={"form-check form-check-inline"}>
                            <input className={"form-check-input"} type={"radio"} id={"i-1"} name={"likert"}/>
                            <label className={"form-check-label"} htmlFor={"i-1"}>Somewhat<br/>Interested</label>
                        </div>
                        <div className={"form-check form-check-inline"}>
                            <input className={"form-check-input"} type={"radio"} id={"i0"} name={"likert"}/>
                            <label className={"form-check-label"} htmlFor={"i0"}>Moderately<br/>Interested</label>
                        </div>
                        <div className={"form-check form-check-inline"}>
                            <input className={"form-check-input"} type={"radio"} id={"i1"} name={"likert"}/>
                            <label className={"form-check-label"} htmlFor={"i1"}>Very<br/>Interested</label>
                        </div>
                        <div className={"form-check form-check-inline"}>
                            <input className={"form-check-input"} type={"radio"} id={"i2"} name={"likert"}/>
                            <label className={"form-check-label"} htmlFor={"i2"}>Extremely<br/>Interested</label>
                        </div>
                    </div>

                </div>
            </div>
            <div className={"row"}>
                <div className={"col d-flex justify-content-center"}>
                    <button type={"button"} className={"btn btn-outline-primary"} onClick={e => {
                        console.log(state.props);
                        const id = state.props.id;
                        console.log(id);
                        const menupoinumber = state.props.id.split("").reverse().join("")[0];
                        if (id !== "menupoi5") {
                            const elems = document.getElementsByName("likert");
                            elems.forEach(e => {
                                if (e.checked) {
                                    const val = parseInt(e.id.slice(1));
                                    axios.post(`http://localhost:4000/quiz/interest-level-action/${menupoinumber}`, {
                                        interest: val
                                    }).then().catch(e => console.log(e));
                                }
                            });
                            const new_id = id.substring(0, id.length - 1) + (parseInt(id.at(id.length - 1)) + 1);
                            changeState(new_id);
                        }
                    }}>Submit
                    </button>
                </div>
            </div>
        </div>;
    return val;
};

function getData() {
    if (i === 0) {
        return axios.get("http://localhost:4000/quiz/type-action").then(e => {
            i++;
            return e;
        }).catch(e => {
            console.log(e)
        });
    } else {
        return axios.get(`http://localhost:4000/quiz/interest-level-action/${i}`).then(e => {
            console.log(`next req ${i}`);
            i++;
            return e;
        }).catch(e => console.log(e));
    }
}

function TagMaker({tags}) {
    return tags.map((tag, i) => (
        <div key={i + 1} className={"badge bg-secondary"}>
            {tag}
        </div>
    ));
}

export default RatePoi;

//todo deal with what happens when you reach element 5