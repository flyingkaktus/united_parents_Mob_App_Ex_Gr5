import React from "react";
import Database from "../data/db";



function Content(props) {
    const modifyContent = () => 
    {
        var dbref = new Database;
        let desc = prompt("Please enter the text you want to change.");
        dbref.writeContentData(props.idx, props.title, desc);
        
    }
    return (       
        <div className = "home-content1">
                        <h2>{props.title}</h2>
            <p>{props.desc}</p>
        <button className="btn" id="span1" onClick={modifyContent}>
        <span className="">Modify Content</span>
        </button>

       </div>
    );
}

export default Content;