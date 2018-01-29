import React, { Component } from 'react';
import { getData } from "../../api/data";
import Map from "../../components/Map/Map";
import ResponsiveChart from "../../components/ResponsiveChart/ResponsiveChart";

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }
    componentDidMount() {
        getData()
            .then((data) => {
                this.setState({ ...this.state, data });
            })
            .catch((error) => {
                this.setState(state => {
                    throw new Error(error);
                });
            });
    }

    render() {
        const { data } = this.state;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 920
        };
        if (!data) return <div>loading...</div>;
        return (
            <svg
                width={svgDimensions.width}
                height={svgDimensions.height}
            >
                <Map
                    width={svgDimensions.width}
                    height={svgDimensions.height}
                    scale={this.props.scale}
                    data={data}
                />
            </svg>
        );
    }
}

export default ResponsiveChart(Chart);