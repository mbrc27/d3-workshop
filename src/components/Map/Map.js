import React, { Component } from 'react';
import { geoPath, geoTransverseMercator, geoCentroid, geoBounds, geoMercator } from "d3-geo";
import shortid from "shortid";

class Map extends Component {
    constructor(props) {
        super(props);
        this.setPathAndProjection();
    }

    setPathAndProjection() {
        const { scale, data, width, height } = this.props;
        const center = geoCentroid(data);
        const bounds = geoBounds(data);
        const [[minX, minY], [maxX, maxY]] = bounds;
        console.log(minX, minY, maxX, maxY);
        // const plCenter = [19.27, 52.03];
        let proj = geoTransverseMercator()
            .translate([width * 1.5, height / 2])
            .center(center)
            .rotate([-19, 0])
            .scale(scale);

        let proj2 = geoMercator()
            .translate([width + 220, height / 2])
            .center(center)
            .rotate([-19, 0])
            .scale(scale / 1.7);

        this.path = geoPath()
            .projection(proj);

        this.pathWebMercator = geoPath()
            .projection(proj2);
    }

    // haversineFormulaCalculator() {
    //     const R = 6371; // km
    //     const dLat = (lat2 - lat1).toRad();
    //     const dLon = (lon2 - lon1).toRad();
    //     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     const d = R * c;
    //     return d;
    // }

    componentWillUpdate(props) {
        this.setPathAndProjection();
    }

    render() {
        const { features } = this.props.data;
        return (
            <g>
                {features.map(d => (
                    <path
                        key={shortid.generate()}
                        className={`voivodeship ${d.id}`}
                        d={this.pathWebMercator(d)}
                        fill="red"
                    />
                ))}
                {features.map(d => (
                    <path
                        key={shortid.generate()}
                        className={`voivodeship ${d.id}`}
                        d={this.path(d)}
                        fill="blue"
                        opacity="0.7"
                    />
                ))}
            </g>
        );
    }
}

export default Map;