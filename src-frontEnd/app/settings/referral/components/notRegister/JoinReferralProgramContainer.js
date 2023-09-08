import React, {Component} from 'react';
import JoinReferralProgramPage from "./JoinReferralProgramPage";
import {_requestReferralRegistration} from "../../../../../services/ReferralServices";
import {ERROR} from "../constants";

class JoinReferralProgramContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            isSendingRequest: false,
        };
        this._changeReferralStatus = this._changeReferralStatus.bind(this);
    }

    _changeReferralStatus() {
        this.setState({
            isSendingRequest: true,
        })
        _requestReferralRegistration()
            .then(result => {
                if (result.success) {
                    this.setState({
                        errorMessage: result.message,
                        isSendingRequest: false,
                    })
                    this.props.onChangeReferralStatus(result.data.status);
                } else {
                    this.setState({
                        errorMessage: result.message,
                        isSendingRequest: false,
                    })
                }
            }).catch(err => {
            console.log(err);
            this.setState({
                isSendingRequest: false,
            })
            this.props.onChangeReferralStatus(ERROR);
        })
    }


    render() {
        return (
            <JoinReferralProgramPage
                onChangeReferralStatus={this._changeReferralStatus}
                errorMessage={this.state.errorMessage}
                isSendingRequest={this.state.isSendingRequest}/>
        );
    }
}

export default JoinReferralProgramContainer;