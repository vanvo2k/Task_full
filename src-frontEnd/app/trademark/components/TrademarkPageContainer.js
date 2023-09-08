import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrademarkPage from './TrademarkPage'
import PropTypes from 'prop-types'
import { fetchListTradeMark, fetchTotalWarnings } from '../actions'
import { getListItems } from '../selectors'
import DocTitle from '../../../shared-components/DocTitle'
import { _getItemsData } from '../../search/selectors'
import { getUpgradePopupOpen } from '../selectors'
import { toggleUpgradePopup } from '../actions'

class TrademarkPageContainer extends Component {
    _timeoutNumber = null

    componentDidMount() {
        const { fetchListTradeMark } = this.props
        fetchListTradeMark()

        this._timeoutNumber = setInterval(() => {
            fetchListTradeMark()
        }, 30000)
    }

    componentWillUnmount() {
        if (this._timeoutNumber) {
            clearInterval(this._timeoutNumber)
        }
    }

    render() {
        const { props } = this

        return (
            <DocTitle title="Check trademark">
                <TrademarkPage {...props} />
            </DocTitle>
        )
    }
}

TrademarkPageContainer.propTypes = {
    fetchListTradeMark: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
    items: getListItems(state),
    isOpenUpgradePopup: getUpgradePopupOpen(state),
})

const mapDispatchToProps = {
    fetchListTradeMark,
    fetchTotalWarnings,
    toggleUpgradePopup,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrademarkPageContainer)
