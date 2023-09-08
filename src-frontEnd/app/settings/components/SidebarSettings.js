import React, {Component} from "react";
import PropTypes from "prop-types";
import {Nav, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import UserMenuContainer from "../../../shared-containers/UserMenuContainer";
import {injectIntl} from "react-intl";
import getMessageText from "../../../helpers/i18n/getMessageText";

class SidebarSettings extends Component {
    _getLanguageText(key, defaultMessage) {
        return getMessageText(this.props.intl)(`settings.${key}.title`, defaultMessage);
    }

    render() {
        const {routes, base, history} = this.props;
        const {pathname} = history.location;

        return (
            <div className="SideBarSettings">
                <div className="TopSidebar">
                    <Link className="Logo" title="Merch by SpyAMZ" to="/a">
                    </Link>
                    <Nav vertical>
                        {
                            routes.map((route, index) => {
                                const {path, key, title} = route;
                                const active = pathname === (base + path);

                                return (
                                    <NavItem className={active ? "active" : ""} key={index}>
                                        <NavLink tag={Link}
                                                 to={base + route.path}>{this._getLanguageText(key, title)}</NavLink>
                                    </NavItem>
                                );
                            })
                        }
                    </Nav>
                </div>
                <UserMenuContainer/>
            </div>


        );
    }
}

SidebarSettings.propTypes = {
    routes: PropTypes.array.isRequired,
    base: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
};

export default injectIntl(SidebarSettings);