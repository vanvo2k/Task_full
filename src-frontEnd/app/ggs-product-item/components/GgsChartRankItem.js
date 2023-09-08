import React, {Component} from "react";
import PropTypes from "prop-types";
import {Line} from "react-chartjs-2";
import classNames from "classnames";
import timeHuman from "../../../helpers/time/timeHuman";
import {FormattedMessage} from "react-intl";


class GgsChartRankItem extends Component {
    state = {
        showDays: 7
    };

    render() {
        const {className, filtering} = this.props;
        const {showDays} = this.state;

        return (
            <div className={classNames('ChartRankItem ChartHistory', className)}>
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
        const {loading} = this.props;

        if (!data) {
            if (loading) {
                return null;
            }

            return (
                <div className="NoHistory text-center">
                    <h4>No rank history</h4>
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
        const {ranks, historyDays, filtering} = this.props;
        const {showDays} = this.state;

        if (!ranks || !ranks.size) {
            return false;
        }

        const {size} = ranks;

        let showDaysComputed = historyDays;
        if (filtering) {
            showDaysComputed = showDays;
        }

        let computedRanks = ranks;
        if (showDaysComputed > 0 && showDaysComputed < size) {
            const start = size - showDaysComputed;

            computedRanks = ranks.slice(start, size);
        }

        const labels = computedRanks.map(rank => {
            return timeHuman(rank.get('timestamp'), 'DD/MM/YYYY', 0);
        });

        const data = computedRanks.map(rank => {
            return rank.get('rank');
        });

        return {
            labels: labels.toJS(),
            datasets: [
                {
                    label: "Rank history",
                    data: data.toJS(),
                    fill: false,
                    borderColor: '#03A9F4'
                }
            ]
        };
    }
}

GgsChartRankItem.defaultProps = {
    height: 100,
    historyDays: 0,
    filtering: false,
    loading: false
};

GgsChartRankItem.propTypes = {
    ranks: PropTypes.object,
    height: PropTypes.number,
    filtering: PropTypes.bool,
    loading: PropTypes.bool,
    historyDays: PropTypes.number,
};

export default GgsChartRankItem;