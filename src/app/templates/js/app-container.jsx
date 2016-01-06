import React, { Component } from 'react';


class ApplicationContainer extends Component {
    render() {
        const { location, children } = this.props;

        return (
            <div>
                {React.createElement('div', {key: location.pathname, style: this.getStyles().transitioned}, children)}
            </div>
        )
    }

    getStyles() {
        return {
            transitioned: {
                backfaceVisibility: 'hidden',
                transform:          'translate3d(0, 0, 0)'
            }
        }
    }
}

export default ApplicationContainer;
