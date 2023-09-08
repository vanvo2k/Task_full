import React, {Component} from "react"
import ReferralStatistic from "./ReferralStatistic"
import {_getReferralStatistic} from "../../../../../services/ReferralServices"
import * as RealtimeServices from "../../../../../services/ws/RealtimeServices"

class ReferralStatisticContainer extends Component {
    state = {
        clicks: 0,
        referrals: 0,
        pending: 0,
        earned: 0,
        paid: 0,
    }

    componentDidMount() {
        this._fetchStatistic()
        RealtimeServices.subscribe('affiliate-statistic-changed', this._handleChangeStatistics)
    }

    componentWillUnmount() {
        RealtimeServices.unsubscribe('affiliate-statistic-changed', this._handleChangeStatistics)
    }

    _handleChangeStatistics = () => {
        this._fetchStatistic()
    }

    _fetchStatistic = () => {
        _getReferralStatistic()
            .then(result => {
                const {success, data} = result

                if (success) {
                    const {clicks, conversions, pending, earned, paid} = data

                    this.setState({
                        clicks: clicks || 0,
                        referrals: conversions || 0,
                        pending: pending || 0,
                        earned: earned || 0,
                        paid: paid || 0,
                    })
                }
            })
    }

    render() {
        return (
            <ReferralStatistic {...this.state}/>
        )
    }
}

export default ReferralStatisticContainer
