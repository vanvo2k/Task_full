import React, {Component} from "react";
import PropTypes from "prop-types";
import {Redirect, Route, Switch} from "react-router-dom";

class MainSettings extends Component {
    render() {
        const {routes, base} = this.props;

        return (
            <div className="MainSettings overflow">
                <div className="Wrapper">
                    <Switch>
                        {
                            routes.map((route, index) => {
                                return (
                                    <Route key={index} path={base + route.path} component={route.content}/>
                                );
                            })
                        }

                        <Redirect from={base} to="/settings/profile"/>
                    </Switch>
                </div>
            </div>
        );
    }
}

MainSettings.propTypes = {
    routes: PropTypes.array.isRequired,
    base: PropTypes.string.isRequired,
};

export default MainSettings;