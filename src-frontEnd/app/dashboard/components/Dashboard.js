import React, {Component} from "react";
import PropTypes from "prop-types";
import SidebarDashboard from "./SidebarDashboard";
import MainDashboard from "./MainDashboard";
import classNames from "classnames";
import MobileMenu from "../../../shared-components/MobileMenu";

class Dashboard extends Component {
    render() {
        const {props} = this;
        const {className, isOpenSidebar} = props;

        return (
            <div className={classNames('Dashboard', className, {collapsed: !isOpenSidebar})}>
                <MobileMenu/>
                <SidebarDashboard {...props}/>
                <MainDashboard {...props}/>
            </div>
        );
    }
}

Dashboard.propTypes = {
    basePath: PropTypes.string,
    isOpenSidebar: PropTypes.bool
};

export default Dashboard;