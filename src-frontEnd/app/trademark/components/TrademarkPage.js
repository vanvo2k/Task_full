import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'
import { injectIntl } from 'react-intl'
import TrademarkPaginationContainer from './footer/TrademarkPaginationContainer'
import TMHeader from './header/TMHeader'
import TMResultsPreviewContainer from './preview/TMResultsPreviewContainer'
import ListTradeMarks from './main/ListTradeMarks'
import PageTitle from '../../../shared-components/PageTitle'
import TrademarkTour from './trademarkTour/TrademarkTour'
import getMessageText from '../../../helpers/i18n/getMessageText'
import UpgradePopup from '../../../shared-components/UpgradePopup'

class TrademarkPage extends Component {
    _onFetch = () => {
        const { fetchListTradeMark, fetchTotalWarnings } = this.props

        fetchListTradeMark()
        fetchTotalWarnings()
    }

    _getLanguageTooltipText(key, defaultValue = '') {
        return getMessageText(this.props.intl)(`trademark.tooltip.${key}`, defaultValue)
    }

    render() {
        const { items, isOpenUpgradePopup, toggleUpgradePopup } = this.props
        const data = JSON.parse(localStorage.getItem('com.marketify.tamz.profile'))
        const data2 = data.scopes[1];
        console.log("data--------------",data);
        return (
            <div>
                {!data2 ?(
                    <div>
                        <div class="Form_navigate">
                            <h1></h1>
                            <h3>Upgrade today with just $99 for unlimited access</h3>
                            <p>
                                Get unlimited access to all Advanced feature exclusively for PRO
                                package.
                            </p>
                            <a href="https://localhost:3000/pricing?plan=pro">
                                <button>Get PRO</button>
                            </a>
                        </div>
                        <div className="display_web"></div>
                    </div>
                ) : (
                    ''
                )}
                <div className="TrademarkPage">
                    <div className="container">
                        <TrademarkTour />
                        <div className="PageTitle">
                            <span className="title">Trademark</span>
                            <Tooltip
                                disabled={false}
                                popperOptions={{
                                    modifiers: {
                                        preventOverflow: { enabled: true, padding: -200 },
                                    },
                                }}
                                className="tooltip-icon"
                                position="right"
                                title={this._getLanguageTooltipText('trademark_title')}
                                arrow={true}
                            >
                                <span className="icon ml-2">
                                    <img
                                        className="icon-exclamation-img"
                                        src="/assets/icons/exclamation-circle.svg"
                                        alt="exclamation"
                                    />
                                </span>
                            </Tooltip>
                        </div>

                        <TMHeader
                            triggerFetch={this._onFetch}
                            onUpgradePopup={toggleUpgradePopup}
                        />

                        <ListTradeMarks
                            triggerFetch={this._onFetch}
                            items={items}
                            onUpgradePopup={toggleUpgradePopup}
                        />

                        <TrademarkPaginationContainer triggerFetch={this._onFetch} />

                        <TMResultsPreviewContainer onUpgradePopup={toggleUpgradePopup} />

                        <UpgradePopup
                            onUpgradePopup={toggleUpgradePopup}
                            isOpenUpgradePopup={isOpenUpgradePopup}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

TrademarkPage.propTypes = {
    items: PropTypes.object.isRequired,
    fetchListTradeMark: PropTypes.func.isRequired,
    fetchTotalWarnings: PropTypes.func.isRequired,
}

export default injectIntl(TrademarkPage)

