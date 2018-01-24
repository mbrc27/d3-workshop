import React, { Component } from 'react';
import { getData } from "../../api/data";

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
        const { margins } = this.props;
        const svgDimensions = { width: 800, height: 500 };

        if (!data) return <div>loading...</div>;
        return (
            <svg
                width={svgDimensions.width} height={svgDimensions.height}
            />
        );
    }
}

export default Chart;