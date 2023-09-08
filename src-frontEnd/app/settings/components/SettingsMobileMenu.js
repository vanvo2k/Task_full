import React, {Component} from "react";
import PropTypes from "prop-types";
import OffCanvasMenu from "../../../shared-components/OffCanvasMenu";
import {injectIntl} from "react-intl";
import {NavLink} from "react-router-dom";
import getMessageText from "../../../helpers/i18n/getMessageText";

class SettingsMobileMenu extends Component {
    state = {
        isOpen: false
    };

    _getLanguageText(key, defaultMessage) {
        return getMessageText(this.props.intl)(`settings.${key}.title`, defaultMessage);
    }

    _handleClickMenu = (e) => {
        this.setState({
            isOpen: false
        });
    };

    _handleChangeMenu = (isOpen) => {
        this.setState({
            isOpen: !!isOpen
        });
    };

    render() {
        const {routes, base} = this.props;

        return (
            <div className="SettingsMobileMenu">
                <OffCanvasMenu changeOpen={this._handleChangeMenu} isOpen={this.state.isOpen}>
                    <ul className="Menu nav flex-column">
                        {
                            routes.map((route, index) => {
                                const {key, title} = route;

                                return (
                                    <li className="nav-item" key={index}>
                                        <NavLink
                                            className="nav-link"
                                            onClick={this._handleClickMenu}
                                            to={base + route.path}>{this._getLanguageText(key, title)}</NavLink>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </OffCanvasMenu>
            </div>
        );
    }
}

SettingsMobileMenu.propTypes = {
    history: PropTypes.object.isRequired,
    base: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
};

export default injectIntl(SettingsMobileMenu);