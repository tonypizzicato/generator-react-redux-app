import React, { Component } from 'react';


class ApplicationContainer extends Component {
    render() {
        const { location, children } = this.props;

        return (
            <div>
                {React.createElement('div', {key: location.pathname}, children)}
            </div>
        )
    }
}

export default ApplicationContainer;
