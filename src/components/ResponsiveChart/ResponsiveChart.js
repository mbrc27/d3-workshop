import React, { Component } from 'react';

export default ChartComponent => (
    class ResponsiveChart extends Component {
        constructor(props) {
            super(props);

            this.state = {
                containerWidth: null,
            };

            this.fitParentContainer = this.fitParentContainer.bind(this);
        }

        componentDidMount() {
            this.fitParentContainer();
            window.addEventListener("resize", this.fitParentContainer);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.fitParentContainer);
        }

        fitParentContainer() {
            const { containerWidth } = this.state;

            const currentContainerWidth = this.chartContainer.getBoundingClientRect().width;

            if (containerWidth !== currentContainerWidth) {
                this.setState(state => ({
                    ...state,
                    containerWidth: currentContainerWidth
                }));
            }
        }

        render() {
            const { containerWidth } = this.state;
            const shouldRenderChart = containerWidth !== null;
            return (
                <div
                    ref={(el) => { this.chartContainer = el }}
                    className="Responsive-wrapper"
                >
                    {shouldRenderChart && <ChartComponent {...this.props} parentWidth={containerWidth} />}
                </div>
            );
        }
    }
);