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

    componentDidUpdate() {
        if (this.props.open) {
            document.body.addEventListener("mouseup", this._onDocumentClick, false);
        } else {
            document.body.removeEventListener("mouseup", this._onDocumentClick, false);
        }
    }

    _onItemClick = (pathname, e) => {
        e.stopPropagation();

        this.props.onItemClick(pathname);

        this._shift();
    };

    _onDocumentClick = (e) => {
        if (!ReactDom.findDOMNode(this).contains(e.target)) {
            this._shift();
        }
    };

    _shift = () => {
        if (this.props.open) {
            console.log('_shift')
            this.props.onShift();
        }
    };

    render() {
        const cls = cx('page-menu', {
            'page-menu_active_yes': this.props.open
        });

        return (
            <nav className={cls}>
                <span className="page-menu__shift" onTouchTap={this._shift}>
                    <i className="material-icons">close</i>
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