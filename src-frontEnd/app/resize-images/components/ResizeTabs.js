import React, {Component} from "react";
import PropTypes from "prop-types";
import {Nav, NavItem, NavLink} from "reactstrap";

class ResizeTabs extends Component {
    _handleClickChangeType = (e, type) => {
        if (type === this.props.type) {
            return;
        }

        this.props.onChangeType(type);
    };

    render() {
        const {type} = this.props;

        return (
            <div className="ResizeTabs text-center">
                <Nav className="Navs d-flex justify-content-center" pills>
                    <NavItem>
                        <NavLink
                            onClick={(e) => this._handleClickChangeType(e, 't-shirt')}
                            active={type === 't-shirt'}>T-Shirt (4500x5400)</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={(e) => this._handleClickChangeType(e, 'hoodie')}
                            active={type === 'hoodie'}>Hoodie (4500x4050)</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

ResizeTabs.defaultProps = {
    type: 't-shirt'
};

ResizeTabs.propTypes = {
    type: PropTypes.string,
    onChangeType: PropTypes.func.isRequired,
};

export default ResizeTabs;