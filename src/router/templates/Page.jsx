import React, { Component } from 'react';

class <%= pageClassName %> extends Component {
    render() {
        return (
            <div>
                {this.props.children || <h1>Hello from <%= pagePathName %> page</h1>}
            </div>
        )
    }
}

export default <%= pageClassName %>;
