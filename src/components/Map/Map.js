import React from 'react';
import { geoPath, geoMercator } from "d3-geo";

import React, { Component } from 'react';

class Map extends Component {
    componentDidMount() {
        const proj = geoMercator();
        this.path = geoPath()
        .projection(proj);
    }
    render() {
        this.props.data.map(d => {

        });
        return (
            <g>
                {this.props.data.map(d => {
                    <path
                        class={`country ${ d.id }`}
                        d={this.path(d)}
                        fill="blue"
                    />
                })}
            </g>
        );
    }
}

export default Map;