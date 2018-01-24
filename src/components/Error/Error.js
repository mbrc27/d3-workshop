import React, { PureComponent } from 'react';

class Error extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        this.setState(state => ({ ...state, hasError: true }));
        console.error(error);
        console.error(info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    Error! Someting went wrong
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export default Error;