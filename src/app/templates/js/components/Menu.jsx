import _ from 'lodash';
import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

/**
 * Side menu component
 */
class Menu extends Component {
    static propTypes = {
        open:        PropTypes.bool,
        onItemClick: PropTypes.func,
        onShift:     PropTypes.func
    };

    static defaultProps = {
        open:        false,
        onItemClick: _.noop,
        onShift:     _.noop
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            document.addEventListener("click", this._onDocumentClick, false);
        } else {
            document.removeEventListener("click", this._onDocumentClick, false);
        }
    }

    _onItemClick = (pathname, e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();

        this.props.onItemClick(pathname);

        if (this.props.open) {
            this._shift();
        }
    };

    _onDocumentClick = (e) => {
        if (this.props.open && !ReactDom.findDOMNode(this).contains(e.target)) {
            this._shift();
        }
    };

    _shift = () => {
        this.props.onShift();
    };

    render() {
        const cls  = cx('page-menu', {
            'page-menu_active_yes': this.props.open
        });
        const icon = this.props.open ? 'filter_center_focus' : 'crop_free';

        return (
            <nav className={cls}>
                <span className="page-menu__shift" onTouchTap={this._shift}>
                    <i className="material-icons">{icon}</i>
                </span>
                <h2 className="page-menu__label">Sidebar</h2>
                <ul className="page-menu__list">
                    <li className="page-menu__item">
                        <a className="page-menu__link" onTouchTap={this._onItemClick.bind(this, '/home')}>
                            <i className="page-menu__icon material-icons">home</i>Home
                        </a>
                    </li>
                    <li className="page-menu__item">
                        <a className="page-menu__link" onTouchTap={this._onItemClick.bind(this, '/dash')}>
                            <i className="page-menu__icon material-icons">data_usage</i>Data Management
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Menu;