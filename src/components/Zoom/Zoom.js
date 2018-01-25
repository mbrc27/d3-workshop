import React from 'react';
import "./Zoom.css";

const Zoom = ({ zoomIn, zoomOut }) => {
    return (
        <div className="zoom">
            <button
            className="zoom__button zoom__buttom--in"
                onClick={zoomIn}
            >
                +
            </button>
            <button
            className="zoom__button zoom__buttom--out"
                onClick={zoomOut}
            >
                -
            </button>
        </div>
    );
};

export default Zoom;