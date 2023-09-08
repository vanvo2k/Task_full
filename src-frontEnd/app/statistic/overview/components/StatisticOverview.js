import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import moment from "moment";
import {Line} from "react-chartjs-2";
import {Card, CardBody, CardFooter, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import Loading from "../../../../shared-components/Loading";

class StatisticOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1'
        };
    }

    _toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        this._triggerFetch();
    }

    _triggerFetch() {
        const {fetchStatisticOverview, showDays, fetchStatisticHasRank} = this.props;
        const from = moment().subtract(showDays - 1, 'day').format('DD-MM-YYYY');
        fetchStatisticOverview(from);
        fetchStatisticHasRank(from);
    }

    render() {
        const {className, statistic, showDays, loading, hasRank} = this.props;
        if (!statistic.size) {
            return null;
        }

        const data = this._getDataChart(statistic);
        const dataHasRank = this._getDataChart(hasRank);
        const legend = {
            display: false
        };

        return (
            <div className={classNames(['StatisticOverview', className])}>
                <Loading loading={loading}/>

                <Card>
                    <CardBody>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classNames({active: this.state.activeTab === '1'})}
                                    onClick={() => {
                                        this._toggle('1');
                                    }}
                                >
                                    New items
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classNames({active: this.state.activeTab === '2'})}
                                    onClick={() => {
                                        this._toggle('2');
                                    }}
                                >
                                    Has rank
                                </NavLink>
                            </NavItem>
                            <div className="AfterTabs"></div>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Line legend={legend} data={data}/>
                            </TabPane>

                            <TabPane tabId="2">
                                <Line legend={legend} data={dataHasRank}/>
                            </TabPane>
                        </TabContent>
                    </CardBody>
                    <CardFooter>
                        <ul className="ShowDays ButtonOptions">
                            <li
                                onClick={this._handleOnClickShowDays.bind(this, 7)}
                                className={classNames("Option", {active: showDays === 7})}>Last 7 days
                            </li>
                            <li
                                onClick={this._handleOnClickShowDays.bind(this, 14)}
                                className={classNames("Option", {active: showDays === 14})}>Last 14 days
                            </li>
                            <li
                                onClick={this._handleOnClickShowDays.bind(this, 30)}
                                className={classNames("Option", {active: showDays === 30})}>Last 30 days
                            </li>
                        </ul>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    _handleOnClickShowDays(days, e) {
        e.preventDefault();

        const {changeShowDays} = this.props;
        changeShowDays(days)
            .then(() => {
                this._triggerFetch();
            });
    }

    _getDataChart(statistic) {
        if (!statistic || !statistic.size) {
            return {
                datasets: [],
                labels: []
            };
        }

        const {theme} = this.props;
        const {primaryColor} = theme;

        const labels = statistic.map(stat => {
            const date = stat.get('date');
            const momentDate = moment(date, 'DD-MM-YYYY');

            return momentDate.format('DD');
        });

        const data = statistic.map(stat => {
            return stat.get('count');
        });

        const datasets = [
            {
                data: data.toJS(),
                label: 'Total items',
                borderColor: primaryColor,
                lineTension: 0.05,
                fill: false
            }
        ];

        return {
            datasets,
            labels: labels.toJS()
        }
    }

}

StatisticOverview.propTypes = {
    statistic: PropTypes.object,
    hasRank: PropTypes.object,
    loading: PropTypes.bool,
    showDays: PropTypes.number,
    theme: PropTypes.object,
    fetchStatisticOverview: PropTypes.func.isRequired,
    fetchStatisticHasRank: PropTypes.func.isRequired,
    changeShowDays: PropTypes.func.isRequired,
};

export default styled(StatisticOverview)`

`;