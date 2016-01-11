import _ from 'lodash';
import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

class MenuIcon extends Component {

    static propTypes = {
        onClick:   PropTypes.func,
        className: PropTypes.string
    };

    static defaultProps = {
        onClick:   _.noop,
        className: ''
    };

    _onClick = e => {
        e.stopPropagation();

        this.props.onClick();
    };

    render() {
        const cls = cx('menu-icon', this.props.className);

        return (
            <span className={cls} onTouchTap={this._onClick}>
                <i className="menu-icon__icon material-icons">dehaze</i>
            </span>
        )
    }
}

export default MenuIcon;