import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class SwitchLayout extends Component {
    render() {
        const {layout} = this.props;

        return (
            <div className="SwitchLayout">
                <div className="Options d-flex">
                    <div
                        onClick={this._handleClick.bind(this, 'grid')}
                        className={classNames("Option Grid", {active: layout === 'grid'})}>
                        <i className="ion-grid"/>
                    </div>
                    <div
                        onClick={this._handleClick.bind(this, 'list')}
                        className={classNames("Option List", {active: layout === 'list'})}>
                        <i className="ion-navicon-round"/>
                    </div>
                </div>
            </div>
        );
    }

    _handleClick(layout, e) {
        this.props.switchLayout(layout)
            .then(() => {
                this.props.saveUserSettings({
                    layoutListing: layout
                });
            });
    }
}

SwitchLayout.propTypes = {
    layout: PropTypes.string,
    switchLayout: PropTypes.func.isRequired,
    saveUserSettings: PropTypes.func.isRequired,
};

export default SwitchLayout;