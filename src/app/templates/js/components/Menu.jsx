import _ from 'lodash';
import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

/**
 * Side menu component
 */
class Menu extends Component {
    static propTypes = {
        items:       PropTypes.array.isRequired,
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
        e.preventDefault();

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
                {this.renderItems(this.props.items)}
                <span className="page-menu__pull-down">
                    Use Ctrl/Cmd+H to toggle Redux Dev Panel
                </span>
            </nav>
        )
    }

    renderItems = (items) => {
        return (
            <ul className="page-menu__list">
                {items.map(item => {
                    return (
                        <li className="page-menu__item" key={item.name}>
                            <a href={item.path} className="page-menu__link" onClick={this._onItemClick.bind(this, item.path)}>
                                <i className="page-menu__icon material-icons">{item.icon}</i>{item.label}
                            </a>
                            {item.items ? this.renderItems(item.items) : null}
                        </li>
                    )
                })}
            </ul>
        )

    };
}

export default Menu;