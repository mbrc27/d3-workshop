import React, { Component } from 'react';
import { geoPath, geoMercator } from "d3-geo";


class Map extends Component {
    constructor(props) {
        super(props);
        const { scale } = props;
        const proj = geoMercator()
            .scale(scale);

        this.path = geoPath()
            .projection(proj);
    }

    componentWillUpdate(props) {
        const { scale } = props;
        const proj = geoMercator()
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
                        key={d.id}
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