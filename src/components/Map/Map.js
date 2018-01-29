import React, { Component } from 'react';
import { geoPath, geoMercator } from "d3-geo";
import shortid from "shortid";

class Map extends Component {
    constructor(props) {
        super(props);
        const { scale, width, height } = props;
        const proj = geoMercator()
            .translate([width / 2, height / 2])
            .scale(scale);

        this.path = geoPath()
            .projection(proj);
    }

    componentWillUpdate(props) {
        const { scale, width, height } = props;
        const proj = geoMercator()
            .translate([width / 2, height / 2])
            .scale(scale);

        this.path = geoPath()
            .projection(proj);
    }

    render() {
        const { features } = this.props.data;
        return (
            <g>
                {features.map(d => (
                    <path
                        key={shortid.generate()}
                        className={`country ${d.id}`}
                        d={this.path(d)}
                        fill="blue"
                    />
                ))}
            </g>
        );
    }
}

export default Map;