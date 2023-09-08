import React, {PureComponent} from "react";
import {UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styled from "styled-components";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";

class DropdownHeader extends PureComponent {
    render() {
        const {profile, className, isAdmin} = this.props;

        return (
            <UncontrolledDropdown className={classNames(['DropdownAccountHeader', className])}>
                <DropdownToggle
                    tag="span"
                    caret>
                    <img className="avatar" src={profile.get('avatar')}
                         alt="avatar"/> {profile.get('name')}
                </DropdownToggle>

                <DropdownMenu right>
                    {
                        isAdmin &&
                        <DropdownItem tag={Link} to="/admin"><FormattedMessage id="header.admin"/></DropdownItem>
                    }

                    {
                        isAdmin &&
                        <DropdownItem tag={Link} to="/admin/membership"><FormattedMessage id="header.set_membership"/></DropdownItem>
                    }
                    <DropdownItem tag={Link} to="/settings/billing"><FormattedMessage id="header.billing"/></DropdownItem>
                    <DropdownItem tag={Link} to="/settings"><FormattedMessage id="header.settings"/></DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem onClick={this._handleClickLogOut.bind(this)}><FormattedMessage id="header.sign_out"/></DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    _handleClickLogOut() {
        this.props.logOut();
    }
}

DropdownHeader.propTypes = {
    profile: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default styled(DropdownHeader)`
&.DropdownAccountHeader {
    .dropdown-toggle {
        display: inline-block;
    }
}

.dropdown-toggle {
    cursor: pointer;

    .avatar {
        width: auto;
        height: 40px;
        border-radius: 50%;
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.6), 0 1px 1px rgba(0, 0, 0, 0.1);
        z-index: 999;
    }
}
`;