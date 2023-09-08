import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {displayAlert, closeAlert} from "../actions";
import {_getASIN} from "../../../services/ProductServices";

class ButtonCopyToClipboard extends Component {
    _handleCopy = () => {
    if(this.props.isUserTrial && !this.props.isUserTrialCanSee){
        this.props.onUpgradePopup()
    }else{
        _getASIN(this.props.id)
        .then(response => {
            const {data, success} = response;
            if (success) {
                navigator.clipboard.writeText(data)
                    .then(() => {
                        this.props.displayAlert();

                        setTimeout(() => {
                            this.props.closeAlert();
                        }, 1500)
                    })
                    .catch(() => {
                        console.log('copy error');
                    })
            }
        })
    } 
    };

    render() {
        return (
            <div className="ButtonCopyToClipboard" onClick={this._handleCopy}>
                <span title="Copy ASIN to clipboard">
                    <i className="linear-copy"/>
                </span>
            </div>

        )
    }
}

ButtonCopyToClipboard.propTypes = {
    id: PropTypes.string.isRequired,
    displayAlert: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    displayAlert,
    closeAlert
}

export default connect(null, mapDispatchToProps)(ButtonCopyToClipboard)