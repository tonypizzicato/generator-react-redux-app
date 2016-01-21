import _ from 'lodash';
import cx from 'classnames';
import path from 'path';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router'

import Menu from './components/Menu.jsx';
import MenuIcon from './components/MenuIcon.jsx';
import PageContent from './components/PageContent.jsx';

import actions from './actions';

import routes from '../../config/routes.json';

/**
 * Map routes config file to menu items
 *
 * @param {String} name
 * @returns {*}
 */
const mapRoutes = function (name) {
    const route = this[name];

    const item = {...route, name}

    if (_.isPlainObject(route.routes)) {
        item.items = Object.keys(route.routes)
            .map(subrouteName => {
                route.routes[subrouteName].path = path.join(route.path, route.routes[subrouteName].path);

                return subrouteName;
            })
            .map(mapRoutes, route.routes);
    }

    return item;
};

/**
 * Map routes config to menu items
 *
 * @type {Array}
 */
const menuItems = Object.keys(routes).map(mapRoutes, routes);

class ApplicationContainer extends Component {
    onMenuItem = (pathname) => {
        this.props.dispatch(routeActions.push(pathname));
    };

    onMenuShift = () => {
        this.props.dispatch(actions.ui.toggleMenu());
    };

    render() {
        const cls = cx('page', {
            'page__pushed_yes': this.props.menuOpened
        });

        return (
            <div className={cls}>
                <Menu items={menuItems}
                      open={this.props.menuOpened}
                      onItemClick={this.onMenuItem}
                      onShift={this.onMenuShift}/>

                <MenuIcon onClick={this.onMenuShift}/>

                <PageContent {...this.props}/>
            </div>
        )
    }
}

function mapState(state) {
    return {
        menuOpened: state.get('ui').get('menuOpened')
    }
}

export default connect(mapState)(ApplicationContainer);
