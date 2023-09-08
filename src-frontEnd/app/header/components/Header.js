import React, {Component} from "react";
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";
import DropdownHeader from "./DropdownHeader";
import ShowWithLanguage from "../../../shared-components/ShowWithLanguage";
import {FormattedMessage} from "react-intl";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            test: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {props} = this;
        const {isAuthenticated, className, location} = props;
        const linkHomePage = isAuthenticated ? '/a' : '/';

        const {pathname} = location;
        const isShow = (pathname + '').indexOf('/settings/') !== -1
            || (pathname + '').indexOf('/admin') !== -1
            || (pathname + '').indexOf('/pricing') !== -1
            || (pathname + '').indexOf('/checkout') !== -1
            || (pathname + '').indexOf('/resize') !== -1;

        if (isAuthenticated && !isShow) {
            return null;
        }

        return (
            <div id="header" className={classNames(["Header", className])}>
                <Navbar color="faded"
                        className="navbar-expand-lg"
                        light
                        expand>
                    <NavbarToggler onClick={this.toggle}/>
                    <NavbarBrand tag={Link} to={linkHomePage}>
                        <img src="/assets/images/logo-v1.png" height="40" alt="Logo"/>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <ShowWithLanguage lang="vi">
                                <NavItem>
                                    <a className="nav-link" target="_blank"
                                       rel="noopener noreferrer"
                                       href="https://spyamz.com/gioi-thieu-cong-cu-spyamz/">
                                        <FormattedMessage id="header.demo"/>
                                    </a>
                                </NavItem>
                            </ShowWithLanguage>
                            <NavItem>
                                <a className="nav-link" target="_blank"
                                   rel="noopener noreferrer"
                                   href="https://affiliate.spyamz.com">
                                    <FormattedMessage id="header.affiliate"/>
                                </a>
                            </NavItem>
                            {
                                !isAuthenticated &&
                                <NavItem>
                                    <NavLink tag={Link} to="/pricing">
                                        <FormattedMessage id="header.pricing"/>
                                    </NavLink>
                                </NavItem>
                            }
                            {!isAuthenticated ?
                                <Button className="btn-outline-primary" tag={Link} to="/login">
                                    <FormattedMessage id="header.sign_in"/>
                                </Button>
                                : <DropdownHeader {...props}/>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

Header.propTypes = {
    profile: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default styled(Header)`
&.Header {
    position: relative;
    z-index: 20;

    .navbar-nav {
        .nav-link {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
}
`;