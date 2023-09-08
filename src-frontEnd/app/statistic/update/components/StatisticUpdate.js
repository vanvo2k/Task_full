import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import {Card, CardBody, Progress, Row} from "reactstrap";
import formatThousandNumber from "../../../../helpers/common/formatThousandNumber";
import {FormattedMessage} from "react-intl";

class StatisticUpdate extends Component {
    componentDidMount() {
        this._setupRefresh();
    }

    componentWillUnmount() {
        if (this.intevalRefresh) {
            clearInterval(this.intevalRefresh);
        }
    }

    _triggerFetch() {
        const {fetchStatisticUpdate} = this.props;
        const now = moment();
        const utcOffset = now.utcOffset();

        const utcTime = utcOffset >= 0 ? now.subtract(utcOffset, 'minute') : now.add(Math.abs(utcOffset), 'minute');
        const date = utcTime.format('DD-MM-YYYY');

        return fetchStatisticUpdate(date);
    }

    render() {
        const {className, statistic} = this.props;

        if (!statistic.size) {
            return null;
        }

        const {total, hasRankAll, updated, crawled, available, deleted, alive} = statistic.toJS();
        const percentHasRank = hasRankAll / alive * 100;
        const percentUpdated = updated / alive * 100;

        return (
            <div className={classNames(['StatisticUpdate', className])}>
                <div className="Count">
                    <Row className="align-items-stretch Wrapper">
                        <div className="Box col-xl-2 col-md-4 col-6">
                            <Card className="Total">
                                <CardBody>
                                    <img src="/assets/images/alive.png" alt=""/>
                                    <div className="Label">
                                        {<FormattedMessage id="statistic.alive"/>}
                                    </div>
                                    <div className="Number">{formatThousandNumber(alive)}</div>
                                    <div className="Number-small">
                                        {formatThousandNumber(total)} {" "}
                                        (<FormattedMessage id="statistic.total"/>)
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="Box col-xl-2 col-md-4 col-6">
                            <Card className="Rank">
                                <CardBody>
                                <img src="/assets/images/hasrank.png" alt=""/>
                                    <div className="Label">
                                        <FormattedMessage id="statistic.has_rank"/>
                                    </div>
                                    <div
                                        className="Number">{formatThousandNumber(hasRankAll)}
                                        <span className="Percent">
                                            {percentHasRank.toFixed(2)}%
                                        </span>
                                    </div>
                                </CardBody>
                                {/* <Progress style={{height: '5px'}} animated color="rank" value={percentHasRank}/> */}
                            </Card>
                        </div>

                        <div className="Box col-xl-2 col-md-4 col-6">
                            <Card className="Updated">
                                <CardBody>
                                <img src="/assets/images/updated.png" alt=""/>
                                    <div className="Label">
                                        <FormattedMessage id="statistic.updated"/>
                                    </div>
                                    <div className="Number">{formatThousandNumber(updated)}
                                    </div>
                                </CardBody>
                                {/* <Progress style={{height: '5px'}} animated color="updated" value={percentUpdated}/> */}
                            </Card>
                        </div>

                        <div className="Box col-xl-2 col-md-4 col-6">
                            <Card className="New">
                                <CardBody>
                                <img src="/assets/images/newtoday.png" alt=""/>
                                    <div className="Label">
                                        <FormattedMessage id="statistic.new"/>
                                    </div>
                                    <div className="Number">{formatThousandNumber(available)}</div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="Box col-xl-2 col-md-4 col-6">
                            <Card className="Added">
                                <CardBody>
                                <img src="/assets/images/addedtoday.png" alt=""/>
                                    <div className="Label">
                                        <FormattedMessage id="statistic.added"/>
                                    </div>
                                    <div className="Number">{formatThousandNumber(crawled)}</div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="Box col-xl-2 col-md-4 col-6">
                            <Card className="Deleted">
                                <CardBody>
                                <img src="/assets/images/deletedtoday.png" alt=""/>
                                    <div className="Label">
                                        <FormattedMessage id="statistic.deleted"/>
                                    </div>
                                    <div className="Number">{formatThousandNumber(deleted)}</div>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }

    _setupRefresh() {
        this._triggerFetch();

        this.intevalRefresh = setInterval(() => {
            this._triggerFetch()
                .catch(error => {
                    clearInterval(this.intevalRefresh);
                });
        }, 5000);
    }
}

StatisticUpdate.propTypes = {
    statistic: PropTypes.object,
    loading: PropTypes.bool,
    theme: PropTypes.object,
    fetchStatisticUpdate: PropTypes.func.isRequired,
};

export default StatisticUpdate;