import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import actions from '../../actions';

class <%= pageClassName %> extends Component {

    componentDidMount() {
        this.props.fetch();
    }

    render() {
        return (
            <div>
                <h1>Hello from <%= pagePathName %> page</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Value<i className="material-icons" onClick={this.props.add}>add</i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.<%= entityName %>.items.map(item => {
                            return (
                                <tr key={item["id"]}>
                                    <td>{item["id"]}</td>
                                    <td>{item["value"]}<i className="material-icons" onClick={this.props.remove.bind(null, item["id"])}>close</i></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapState(state) {
    return {
        <%= entityName %>: state.get('<%= entityName %>').toJS()
    }
}

function mapDispatch(dispatch) {
    return bindActionCreators({
        fetch:  actions.<%= entityName %>.fetch,
        add:    actions.<%= entityName %>.add,
        remove: actions.<%= entityName %>.remove
    }, dispatch);
}

export default connect(mapState, mapDispatch)(<%= pageClassName %>);
