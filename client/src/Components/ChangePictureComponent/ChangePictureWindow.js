import React from "react";
import "./changePictureWindow.css";
const ChangePictureWindow = (props) => {
    return (
        <form onSubmit={props.submitEvent}>
            <div className="change-window">
                <p>Please Insert the URL of your picture</p>
                <input type="text" placeholder="URL" onChange={props.changedUrl} />
                <button type="submit">SET</button>

                {/* DOES NOT WORK */}
                <input type="file" name="myFile" />
                {/* DOES NOT WORK */}

            </div>
        </form>
    )
}
export default ChangePictureWindow