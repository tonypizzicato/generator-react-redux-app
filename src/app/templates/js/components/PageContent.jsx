import React, { Component, PropTypes } from 'react';

/**
 * Page content container component
 */
class PageContent extends Component {
    render() {
        const { location, children } = this.props;

        return (
            <div className="page__content-pusher">
                <div className="page__content">
                    <div className="page__content-container">
                        {React.createElement('div', {key: location.pathname}, children)}
                    </div>
                </div>

            </div>
        )
    }
}

export default PageContent;