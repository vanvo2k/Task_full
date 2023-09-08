import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import formatThousandNumber from "../../../../helpers/common/formatThousandNumber"
import {_analyticKeyword} from "../../../../services/AnalyticsServices"
import ChartKeywordAnalytics from "./ChartKeywordAnalytics"
import {Collapse} from "reactstrap"

class AnalyticsKeyword extends Component {
    state = {
        isOpen: false,
        analytics: {},
        keyword: '',
        isCollapse: true
    }

    _delay = null
    _delayTimeout = 500

    componentDidMount() {
        this._onKeywordChange()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.keyword !== prevProps.keyword || this.props.searchType !== prevProps.searchType || prevProps.market !== this.props.market) {
            this._onKeywordChange()
        }
    }

    _onKeywordChange = () => {
        const {keyword} = this.props
        const isSearchBrand = keyword.trim().toLowerCase().indexOf('brand:') !== -1

        if (!keyword || isSearchBrand) {
            return this.setState({
                isOpen: false,
                analytics: {}
            })
        }

        this._delay && clearTimeout(this._delay)
        this._delay = setTimeout(() => {
            this._fetchAnalytics()
        }, this._delayTimeout)
    }

    _fetchAnalytics = () => {
        const {keyword, searchType, market} = this.props

        this.setState({
            keyword,
        })

        const isSearchBrand = keyword.trim().toLowerCase().indexOf('brand:') !== -1
        if (isSearchBrand) {
            this.setState({
                isOpen: false
            })
        } else {
            _analyticKeyword({keyword, searchType, market})
                .then(response => {
                    const {success, data} = response

                    if (success) {
                        this.setState({
                            isOpen: true,
                            analytics: data
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        isOpen: false,
                        analytics: {}
                    })
                })
        }
    }

    _toggle = () => {
        this.setState({
            isCollapse: !this.state.isCollapse
        })
    }

    render() {
        const {keyword, isOpen, analytics, isCollapse} = this.state
        const {total, rank, rankAvg, trending, status, score, totalHasRankLessThan500k} = analytics

        if (!total) {
            return null
        }

        const percentAble = !!total

        const percentHasRank = percentAble && rank.has ? (rank.has / total * 100) : 0
        const percentHasRankValidated = Number.isInteger(percentHasRank) ? percentHasRank : percentHasRank.toFixed(2)

        const _totalHasRankLessThan500k = totalHasRankLessThan500k ? totalHasRankLessThan500k : 0

        const {searchType, market} = this.props

        return (
            <div className={classNames("AnalyticsKeyword", {isOpen})}>
                <div className="Wrapper">
                    <div className="Title" onClick={this._toggle}>
                        <h5>Analytics <strong>{keyword}</strong></h5>
                        {
                            !isCollapse && <span className="fas fa-caret-down" title="Show analytic"/>
                        }
                        {
                            isCollapse && <span className="fas fa-caret-up" title="Hide analytic"/>
                        }
                    </div>
                    <Collapse isOpen={isCollapse}>
                        <ChartKeywordAnalytics searchType={searchType} keyword={keyword} market={market}/>

                        <div className="Details">
                            <div className="row">
                                <div className="col-2 Analytic">
                                    <b>Total</b>
                                    <div className="Value">
                                        <p>{formatThousandNumber(total)}</p>
                                    </div>
                                </div>
                                <div className="col-2 Analytic">
                                    <b>Alive</b>
                                    <div className="Value">
                                        <p>{formatThousandNumber(status.alive)}</p>
                                    </div>
                                    <h6>Dead: {formatThousandNumber(status.dead)}</h6>
                                </div>
                                <div className="col-2 Analytic">
                                    <b>Trending</b>
                                    <div className="Value">
                                        <p>{formatThousandNumber(trending.up + trending.down)}</p>
                                    </div>
                                    <h6>up/down: {formatThousandNumber(trending.up)}/{formatThousandNumber(trending.down)}</h6>
                                </div>
                                <div className="col-2 Analytic">
                                    <b>Has rank</b>
                                    <div className="Value">
                                        <p>{formatThousandNumber(rank.has)}</p>
                                    </div>
                                    <h6>({percentHasRankValidated}%)</h6>
                                </div>
                                <div className="col-2 Analytic">
                                    <b>{"Rank < 500k"}</b>
                                    <div className="Value">
                                        <p>{formatThousandNumber(_totalHasRankLessThan500k)}</p>
                                    </div>
                                </div>
                                <div className="col-2 Analytic">
                                    <b>Average Ranking</b>
                                    <div className="Value">
                                        <p>{formatThousandNumber(rankAvg)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className="Score">Score: <span className="text-success">{score}</span></div>
            </div>
        );
    }
}

AnalyticsKeyword.propTypes = {
    keyword: PropTypes.string.isRequired,
    searchType: PropTypes.string.isRequired,
    market: PropTypes.string.isRequired
}

export default AnalyticsKeyword