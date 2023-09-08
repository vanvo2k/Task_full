import React, {Component} from "react";
import PropTypes from "prop-types";
import SidebarSettings from "./SidebarSettings";
import MainSettings from "./MainSettings";
import SettingsMobileMenu from "./SettingsMobileMenu";
import withViewport from "../../../shared-components/withViewport";

class SettingsPage extends Component {
    render() {
        const {match, routes, history, isMobile} = this.props;
        const {url} = match;

        return (
            <div className="SettingsPage">
                <SettingsMobileMenu history={history} base={url} routes={routes}/>
                {
                    !isMobile &&
                    <SidebarSettings history={history} base={url} routes={routes}/>
                }
                <MainSettings base={url} routes={routes}/>
            </div>
        );
    }
}

SettingsPage.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    routes: PropTypes.array,
    settings: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default withViewport(SettingsPage);
