import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import {Card, CardBody, CardHeader} from "reactstrap";
import {Pie} from "react-chartjs-2";
import getProductTypeText from "../../../helpers/amazon/getProductTypeText";

class StatisticItemTypes extends Component {
    intevalRefresh = null;

    componentDidMount() {
        this.props.fetchStatisticItemTypes();

        this.intevalRefresh = setInterval(() => {
            this.props.fetchStatisticItemTypes()
                .catch(() => {
                    clearInterval(this.intevalRefresh);
                });
        }, 60000);
    }

    componentWillUnmount() {
        if (this.intevalRefresh) {
            clearInterval(this.intevalRefresh);
        }
    }

    render() {
        const {data, className} = this.props;

        const total = data.get('total');
        if (!data || !data.size || !total) {
            return null;
        }

        const statistic = data.get('statistic');

        return (
            <Card className={classNames(["StatisticItemTypes", className])}>
                <CardHeader>Products by types</CardHeader>
                <CardBody>
                    {
                        this._renderChart(statistic)
                    }
                </CardBody>
            </Card>
        );
    }

    _getColors() {
        return [
            '#26A69A',
            '#AB47BC',
            '#5C6BC0',
            '#66BB6A',
            '#EF5350',
            '#F5C842',
            '#60F542',
            '#4275F5',
            '#D142F5',
            '#F54278',
            '#42F5AA',
        ];
    }

    _onClickPie(element) {
        const {data, history} = this.props;

        const {_index} = element;
        if (Number.isInteger(_index)) {
            const key = data.getIn(['statistic', _index, 'key']);

            if (key) {
                const redirect = `/a/items?advanced=true&page=1&searchType=all_words&sortByField=rank&status=alive&type=${key}`;
                history.push(redirect);
            }
        }
    }

    _renderChart(data) {
        const dataIterators = data.toJS()
        const labels = dataIterators.map(({ key }) => getProductTypeText(key))

        const dataset = data.map(item => item.get('count'));

        const dataChart = {
            labels,
            datasets: [{
                data: dataset.toJS(),
                backgroundColor: this._getColors()
            }]
        };

        const onElementsClick = ([element]) => {
            if (!element) {
                return;
            }

            this._onClickPie(element);
        };

        const legend = {
            display: true,
            position: 'top',
            fullWidth: true
        };

        return <Pie onElementsClick={onElementsClick} legend={legend} data={dataChart}/>;
    }
}

StatisticItemTypes.propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    fetchStatisticItemTypes: PropTypes.func.isRequired
};

export default styled(StatisticItemTypes)`

`;
