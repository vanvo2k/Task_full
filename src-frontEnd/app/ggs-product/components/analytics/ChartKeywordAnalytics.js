import React, {Component} from "react"
import PropTypes from "prop-types"
import {Line} from 'react-chartjs-2'
import {_analyticKeywordWithHistogram} from "../../../../services/AnalyticsServices"
import moment from "moment"

class ChartKeywordAnalytics extends Component {
    state = {
        dataChart: {},
        total: 0
    }

    componentDidMount() {
        this._fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.keyword !== this.props.keyword || this.props.searchType !== prevProps.searchType || prevProps.market !== this.props.market) {
            this._fetchData()
        }
    }

    _fetchData = () => {
        const {keyword, searchType, market} = this.props

        _analyticKeywordWithHistogram(keyword, searchType, market)
            .then(response => {
                const {success, data} = response

                if (success) {
                    const {total, deleted, available} = data

                    this.setState({
                        total,
                        dataChart: {
                            deleted: this._parseData(deleted, (({count}) => -count)),
                            available: this._parseData(available, (({count}) => count))
                        }
                    })
                }
            })
    }

    _parseData = (data, mapper) => {
        const values = data.map(mapper)

        const {length} = values

        if (length <= 30) {
            const defaultArr = []

            for (let i = 0; i <= 30 - length; i++) {
                defaultArr.push(0)
            }

            return [].concat(defaultArr, values)
        }

        return values
    }

    _getLabels = () => {
        const labels = []
        for (let i = 30; i >= 0; i--) {
            labels.push(moment().subtract(i, 'day').format('DD-MM-YYYY'))
        }

        return labels
    }

    render() {
        const {total, dataChart} = this.state
        if (!total) {
            return null
        }

        const availableData = dataChart.available || []
        const deletedData = dataChart.deleted || []

        const data = {
            labels: this._getLabels(),
            datasets: [{
                label: 'Available',
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',

                fill: true,
                data: availableData,
            }, {
                label: 'Deleted',
                borderColor: '#ff443e',
                backgroundColor: 'rgba(255, 68, 62, 0.5)',
                fill: true,
                data: deletedData,
            }]
        };

        return (
            <div className="ChartKeywordAnalytics">
                <div className="row">
                    <div className="col-8 Chart">
                        <Line
                            height={100}
                            data={data}/>
                    </div>
                </div>
            </div>
        )
    }
}

ChartKeywordAnalytics.propTypes = {
    keyword: PropTypes.string,
    searchType: PropTypes.string,
    market: PropTypes.string
}

export default ChartKeywordAnalytics
