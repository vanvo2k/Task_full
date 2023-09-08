import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

class TMStatistic extends Component {
    componentDidMount() {
        const { userScope, changeTotalTrial, changeTotalTradeMark } = this.props
        const isUserTrial =
            userScope.size <= 1 ||
            (userScope.includes('trial') &&
                !userScope.includes('admin') &&
                !userScope.includes('mod')) ||
            false
        const isUserTrademark =
            userScope.size <= 1 ||
            (userScope.includes('trademark') &&
                !userScope.includes('admin') &&
                !userScope.includes('mod')) ||
            false
        const dataAccount = JSON.parse(localStorage.getItem('com.marketify.tamz.profile'))
        if (dataAccount.scopes[1] == 'trial' || dataAccount.scopes[1] == 'trademark') {
            if (isUserTrial) {
                changeTotalTrial()
            }
            if (isUserTrademark) {
                changeTotalTradeMark()
            }
        }

        // console.log('anhthicem', this.props)
    }

    componentDidUpdate() {
        const { userScope, changeTotalTrial, changeTotalTradeMark } = this.props
        const isUserTrial =
            userScope.size <= 1 ||
            (userScope.includes('trial') &&
                !userScope.includes('admin') &&
                !userScope.includes('mod')) ||
            false
        const isUserTrademark =
            userScope.size <= 1 ||
            (userScope.includes('trademark') &&
                !userScope.includes('admin') &&
                !userScope.includes('mod')) ||
            false
        const dataAccount = JSON.parse(localStorage.getItem('com.marketify.tamz.profile'))
        if (dataAccount.scopes[1] == 'trial' || dataAccount.scopes[1] == 'trademark') {
            if (isUserTrial) {
                changeTotalTrial()
            }
            if (isUserTrademark) {
                changeTotalTradeMark()
            }
        }
        // console.log('anhkthicem', this.props)
    }

    render() {
        const { data } = this.props
        let { total, max } = data.toJS()
        const remain = Math.abs(max - total)
        console.log(max, ' --------------------max')
        console.log(total, ' ----------------------------total')
        console.log(remain, ' ----------------------remain')
        const dataTrademark = JSON.parse(localStorage.getItem('com.marketify.tamz.profile'))
        // Trademark
        // if(dataTrademark.scopes[1]=="trademark"){
        //   max=99999;
        // }else if(dataTrademark.scopes[1]=="trial"){
        //   max=5;
        // }else{
        //   max=100;
        // }
        // Trial
        // const see=max-total;
        // dataTrademark.scopes[1]=="trademark"?remain=see:remain;

        return (
            <div className="TMStatistic ml-auto">
                {dataTrademark && dataTrademark.scopes[1] == 'trademark' ? (
                    <div>
                        {total} <FormattedMessage id="tm.count_keywords" /> - Unlimit keys.
                    </div>
                ) : (
                    <div>
                        {total} <FormattedMessage id="tm.count_keywords" /> - {remain}
                        <FormattedMessage id="tm.count_left" />.
                    </div>
                )}
            </div>
        )
    }
}

TMStatistic.propTypes = {
    data: PropTypes.object.isRequired,
}

export default TMStatistic
