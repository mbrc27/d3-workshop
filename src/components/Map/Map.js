import React, { Component } from 'react';
import { select } from "d3-selection";
import { geoPath, geoMercator } from "d3-geo";
import { withFauxDOM } from "react-faux-dom";

class Map extends Component {
    constructor(props) {
        super(props);
        const { scale } = props;
        const proj = geoMercator()
            .scale(scale);

        this.path = geoPath()
            .projection(proj);

        this.faux = this.props.connectFauxDOM("g", "chart");
    }

    componentDidMount() {
        this.updateMap();
    }

    componentWillUpdate(props) {
        const { scale } = props;
        const proj = geoMercator()
            .scale(scale);

        this.path = geoPath()
            .projection(proj);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.scale !== prevProps.scale) {
            this.updateMap()
        }
    }

    updateMap() {
        const { scale, data } = this.props;
        const proj = geoMercator()
            .scale(scale);

        this.path = geoPath()
            .projection(proj);

        select(this.faux)
            .selectAll(".country").remove();

        select(this.faux)
            .selectAll(".country")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", this.path)
            .attr("class", (d) => `country ${d.id}`)
            .attr("fill", "blue");

        this.props.animateFauxDOM(800);
    }

    render() {
        return this.props.chart;
    }
}

Map.defaultProps = {
    chart: "loading"
};

export default withFauxDOM(Map);