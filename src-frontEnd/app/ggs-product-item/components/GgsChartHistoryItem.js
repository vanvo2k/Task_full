import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Col} from "reactstrap";
import {FormattedMessage} from "react-intl";
import GgsChartRankItem from "./GgsChartRankItem";
import GgsChartPriceItem from "./GgsChartPriceItem";


class GgsChartHistoryItem extends Component {
    state = {
        showDays: 7
    };

    render() {
        const {ranks, prices, height} = this.props;
        const {showDays} = this.state;

        return (
            <div className="ChartHistoryItem">
                {
                    (!!ranks.size || !!prices.size) &&
                    <div className="ShowDays ButtonOptions">
                        <button className={classNames("btn Option", {active: (showDays === 7)})}
                                onClick={this._onClickChangeFilter.bind(this, 7)}><FormattedMessage id="item.last_week"/>
                        </button>
                        <button className={classNames("btn Option", {active: (showDays === 30)})}
                                onClick={this._onClickChangeFilter.bind(this, 30)}><FormattedMessage id="item.last_month"/>
                        </button>
                        <button className={classNames("btn Option", {active: (showDays === -1)})}
                                onClick={this._onClickChangeFilter.bind(this, -1)}><FormattedMessage id="item.all"/>
                        </button>
                    </div>
                }

                <div className="row">
                    <Col xs={12} sm={6}>
                        <GgsChartRankItem
                            height={height}
                            historyDays={showDays}
                            filtering={false}
                            ranks={ranks}/>
                    </Col>

                    <Col xs={12} sm={6}>
                        <GgsChartPriceItem
                            height={height}
                            historyDays={showDays}
                            filtering={false}
                            prices={prices}/>
                    </Col>
                </div>
            </div>
        );
    }

    _onClickChangeFilter(value, e) {
        const day = value || 7;

        this.setState({
            showDays: day
        });
    }
}

GgsChartHistoryItem.defaultProps = {
    height: 100,
    historyDays: 0,
    filtering: false,
};

GgsChartHistoryItem.propTypes = {
    ranks: PropTypes.object,
    prices: PropTypes.object,
    height: PropTypes.number,
    filtering: PropTypes.bool,
    historyDays: PropTypes.number
};

export default GgsChartHistoryItem;