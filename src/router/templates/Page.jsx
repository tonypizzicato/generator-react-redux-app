import React, { Component } from 'react';
import { connect } from 'react-redux';

class <%= pageClassName %> extends Component {
    render() {
        return (
            <div>
                {this.props.children || <h1>Hello from <%= pagePathName %> page</h1>}
            </div>
        )
    }
}

function mapState(state) {
    return state.toJS();
}

export default connect(mapState)(<%= pageClassName %>);
