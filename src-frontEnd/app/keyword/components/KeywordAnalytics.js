import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import KeywordFiltering from "./KeywordFiltering"
import KeywordResults from "./KeywordResults"
import moment from "moment"
import KeywordPagination from "./KeywordPagination"
import {Tooltip} from 'react-tippy';
import {injectIntl, FormattedMessage} from "react-intl"
import KeywordsTour from "./KeywordsTour"
import getMessageText from "../../../helpers/i18n/getMessageText";


class KeywordAnalytics extends Component {
    componentDidMount() {
        this.props.fetchOptions()
            .then(() => {
                this._initOptions()
            })
    }

    _getLanguageTooltipText(key, defaultValue = '') {
        return getMessageText(this.props.intl)(`keyword.tooltip.${key}`, defaultValue);
    }

    render() {
        const {options, selected, results, meta} = this.props

        const perPage = meta.get('limit')
        const total = meta.get('total')
        const currentPage = meta.get('page')
        const totalPage = meta.get('pages')
        const countOptions = options.get('count')

        return (
            <div className={classNames('KeywordAnalytics')}>
                <div className="container">
                    <KeywordsTour/>
                    <div className="PageTitle">
                    <span className="title"><FormattedMessage id="keyword.keywords_analytics"/></span>
                        <Tooltip disabled={false} popperOptions={{modifiers: {preventOverflow: {enabled: true, padding: -200}}}} className="tooltip-icon" position="right" 
                                title={this._getLanguageTooltipText('keywords_analytics')} arrow={true}>
                            <span className="icon ml-2">
                                    <img className="icon-exclamation-img" src="/assets/icons/exclamation-circle.svg" alt="exclamation" />
                            </span>
                        </Tooltip>
                    </div>

                    <KeywordFiltering onChangeOptions={this._handleChangeOptions} options={options}
                                      selected={selected}/>

                    <KeywordResults total={total} currentPage={currentPage} perPage={perPage}
                                    countOptions={countOptions}
                                    results={results}/>

                    <KeywordPagination
                        data={{
                            perPage,
                            total,
                            currentPage,
                            totalPage
                        }}
                        onChangePerPage={this._handleChangePaginationPerPage}
                        onChangePage={this._handleChangePaginationNumber}
                    />
                </div>
            </div>
        )
    }

    _triggerSearch() {
        const {selected, fetchListKeywords, meta} = this.props
        const currentPage = meta.get('page')
        const perPage = meta.get('limit')
        const {date, rank, term} = selected.toJS()
        const dateString = date.format('DD-MM-YYYY')

        fetchListKeywords({
            term,
            date: dateString,
            rank,
            page: currentPage,
            limit: perPage
        })
    }

    _handleChangePaginationPerPage = (perPage) => {
        this.props.changePaginationPerPage(perPage)
            .then(() => {
                this._triggerSearch()
            })
    }

    _handleChangePaginationNumber = (page) => {
        this.props.changePaginationNumber(page)
            .then(() => {
                this._triggerSearch()
            })
    }

    _handleChangeOptions = (options) => {
        this.props.changeSelectOptions(options)
            .then(() => {
                this._triggerSearch()
            })
    }

    _initOptions() {
        const {options, changeSelectOptions} = this.props

        const maxRank = options.get('maxRank')
        const defaultRank = maxRank.get(-1)
        const yesterday = moment().subtract(1, 'd')

        changeSelectOptions({
            rank: defaultRank,
            date: yesterday
        }).then(() => {
            this._triggerSearch()
        })
    }
}

KeywordAnalytics.propsTypes = {
    fetchOptions: PropTypes.func.isRequired,
    changeSelectOptions: PropTypes.func.isRequired,
    fetchListKeywords: PropTypes.func.isRequired,
    changePaginationNumber: PropTypes.func.isRequired,
    changePaginationPerPage: PropTypes.func.isRequired,
    options: PropTypes.object,
    selected: PropTypes.object,
    results: PropTypes.object,
    meta: PropTypes.object,
}

export default injectIntl(KeywordAnalytics)
