import React from "react";
import './Popup.css';

function Popup(props){
    return (props.trigger) ? (
        <div className="container">
            <div popup-inner>
                <button className="close-button">Close</button>
                {props. children}
            </div>
        </div>
    ) : "";
}