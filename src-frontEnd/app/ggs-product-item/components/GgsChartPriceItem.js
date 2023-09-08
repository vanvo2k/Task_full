import React, {Component} from "react";
import PropTypes from "prop-types";
import {Line} from "react-chartjs-2";
import classNames from "classnames";
import timeHuman from "../../../helpers/time/timeHuman";
import {FormattedMessage} from "react-intl";


class GgsChartPriceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDays: 7
        };
    }

    render() {
        const {className, filtering} = this.props;
        const {showDays} = this.state;

        return (
            <div className={classNames('ChartPriceItem ChartHistory', className)}>
                {
                    filtering &&
                    <div className="ShowDays">
                        <button className={classNames("btn", {active: (showDays === 7)})}
                                onClick={this._onClickChangeFilter.bind(this, 7)}><FormattedMessage
                            id="item.last_week"/>
                        </button>
                        <button className={classNames("btn", {active: (showDays === 30)})}
                                onClick={this._onClickChangeFilter.bind(this, 30)}><FormattedMessage
                            id="item.last_month"/>
                        </button>
                        <button className={classNames("btn", {active: (showDays === -1)})}
                                onClick={this._onClickChangeFilter.bind(this, -1)}><FormattedMessage id="item.all"/>
                        </button>
                    </div>
                }

                {this._renderChart()}
            </div>
        );
    }

    _onClickChangeFilter(value, e) {
        const day = value || 7;

        this.setState({
            showDays: day
        });
    }

    _renderChart() {
        const data = this._getData();

        if (!data) {
            return (
                <div className="NoHistory text-center">
                    <h4>No price history.</h4>
                </div>
            );
        }

        const {height} = this.props;
        const legend = {
            display: true
        };

        return <Line
            height={height}
            legend={legend}
            data={data}/>;
    }

    _getData() {
        const {prices, historyDays, filtering} = this.props;
        const {showDays} = this.state;

        if (!prices || !prices.size) {
            return false;
        }

        const {size} = prices;

        let showDaysComputed = historyDays;
        if (filtering) {
            showDaysComputed = showDays;
        }

        let computedRanks = prices;
        if (showDaysComputed > 0 && showDaysComputed < size) {
            const start = size - showDaysComputed;

            computedRanks = prices.slice(start, size);
        }

        const labels = computedRanks.map(price => {
            return timeHuman(price.get('timestamp'), 'D/MM/YYYY', 0);
        });

        const dataMinPrice = computedRanks.map(price => {
            return price.get('minPrice');
        });

        const dataMaxPrice = computedRanks.map(price => {
            return price.get('maxPrice');
        });

        return {
            labels: labels.toJS(),
            datasets: [
                {
                    label: "Min Price history",
                    data: dataMinPrice.toJS(),
                    fill: false,
                    borderColor: "#37af56"
                }, {
                    label: "Max Price history",
                    data: dataMaxPrice.toJS(),
                    fill: false,
                    borderColor: "#ff443e"
                }
            ]
        };
    }
}

GgsChartPriceItem.defaultProps = {
    height: 100,
    historyDays: 0,
    filtering: false,
};

GgsChartPriceItem.propTypes = {
    prices: PropTypes.object,
    height: PropTypes.number,
    filtering: PropTypes.bool,
    historyDays: PropTypes.number
};

export default GgsChartPriceItem;