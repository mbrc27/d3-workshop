import React, { Component } from 'react';
import { geoPath, geoTransverseMercator, geoCentroid } from "d3-geo";
import shortid from "shortid";

class Map extends Component {
    constructor(props) {
        super(props);
        const { scale, width, height, data } = props;
        const center = geoCentroid(data);
        const proj = geoTransverseMercator()
            .translate([width * 2, height / 2])
            .center(center)
            .rotate([-20, 0])
            .scale(scale);

        this.path = geoPath()
            .projection(proj);
    }

    componentWillUpdate(props) {
        const { scale, width, height } = props;
        const proj = geoTransverseMercator()
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
                        className={`voivodeship ${d.id}`}
                        d={this.path(d)}
                        fill="blue"
                    />
                ))}
            </g>
        );
    }
}

export default Map;