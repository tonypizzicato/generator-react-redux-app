import React, { Component } from 'react';

class Application extends Component {
    render() {
        return (
            <div>
                <h1>Hello <%= appName %></h1>
            </div>
        )
    }
}

export default Application;
