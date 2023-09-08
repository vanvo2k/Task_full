import React, {Component} from "react"
import {Alert} from "reactstrap"
import PropTypes from "prop-types";

class AlertSuccess extends Component {
    render() {
        const {isAlert} = this.props;

        return (
            <div className="AlertCopySuccess">
                <div className="fixed-bottom">
                    <Alert color="primary" isOpen={isAlert}>Copied ASIN to clipboard.</Alert>
                </div>
            </div>
        );
    }
}

AlertSuccess.propTypes = {
    isAlert: PropTypes.bool.isRequired,
}


export default AlertSuccess;