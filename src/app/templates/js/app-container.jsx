import cx from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-router/lib/actionCreators';

import Menu from './components/Menu.jsx';
import PageContent from './components/PageContent.jsx';

import actions from './actions';

class ApplicationContainer extends Component {

    onMenuItem = (pathname) => {
        this.props.dispatch(push(pathname));
    };

    onMenuShift = () => {
        this.props.dispatch(actions.toggleMenu());
    };

    render() {
        const cls = cx('page', {
            'page__pushed_yes': this.props.menuOpened
        });

        return (
            <div className={cls}>
                <Menu open={this.props.menuOpened}
                      onItemClick={this.onMenuItem}
                      onShift={this.onMenuShift}/>

                <PageContent {...this.props}/>
            </div>
        )
    }
}

function mapState(state) {
    return {
        menuOpened: state.get('menuOpened')
    }
}

export default connect(mapState)(ApplicationContainer);
