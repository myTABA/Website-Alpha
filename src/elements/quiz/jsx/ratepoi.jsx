import '../css/ratepoi.css';
import axios from "axios";
import React, {useEffect, useState} from "react";
const RatePoi = ({state, changeState}) => {
    console.log(state);

    const [content, setContent] = useState({
        imgsrc: "",
        name: "",
        tags: [],
        desc: ""
    });


    useEffect(() => {
        const dataPromise = getData(state.props.id);
        dataPromise.then(e => {
            console.log('promise called');
            const v = e.data;
            setContent({
                name: v.features[0].properties.name,
                tags: v.features[0].properties.kinds.split(','),
                //todo other data comes here
            });
        });
    }, [state.props.id]);
    //only call the axios when ID changes

    let val =
        <div className={"container my-5"}>
            <div className={"row"}>
                <div className={"col-12 col-md image"}>
                    <img
                        // replace with content.imgsrc
                        src={''}/>
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
                        //post req is made directly on id, i.e. 1,2,3,4,5
                        const elems = document.getElementsByName("likert");
                        elems.forEach(e => {
                            if (e.checked) {
                                const val = parseInt(e.id.slice(1));
                                axios.post(`http://localhost:4000/quiz/interest-level-action/${menupoinumber}`, {
                                    interest: val
                                }).then().catch(e => console.log(e));
                            }
                        });
                        if (id !== "menupoi5") {
                            const new_id = id.substring(0, id.length - 1) + (parseInt(id.at(id.length - 1)) + 1);
                            changeState(new_id);
                        }else {

                        }

                    }}>Submit
                    </button>
                </div>
            </div>
        </div>;
    return val;
};

function getData(i) {
    i = parseInt(i[i.length-1])-1;
    console.log(i);

    if (i === 0) {
        return axios.get("http://localhost:4000/quiz/type-action").then(e => {
            return e;
        }).catch(e => {
            console.log(e);
        });
    } else {
        return axios.get(`http://localhost:4000/quiz/interest-level-action/${i}`).then(e => {
            console.log(`next req ${i}`);
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