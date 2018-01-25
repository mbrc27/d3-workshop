import React from 'react';
import "./Scale.css";

const Scale = ({ scale }) => {
    return (
        <div className="scale">
            1:{scale}
        </div>
    );
};

export default Scale;