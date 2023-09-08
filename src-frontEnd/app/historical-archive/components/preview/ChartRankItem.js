import React, {Component} from "react";
import PropTypes from "prop-types";
import {Line} from "react-chartjs-2";
import classNames from "classnames";
import timeHuman from "../../../../helpers/time/timeHuman";
import moment from "moment";

class ChartRankItem extends Component {
    state = {
        showDays: 7
    }

    _onClickChangeFilter = (value, e) => {
        const day = value || 7

        this.setState({
            showDays: day
        });
    }

    render() {
        const {className} = this.props;
        const {showDays} = this.state;

        return (
            <div className={classNames('ChartRankItem ChartHistory', className)}>
                <div className="ShowDays">
                    <button className={classNames("btn", {active: (showDays === 7)})}
                            onClick={this._onClickChangeFilter.bind(this, 7)}>
                        7 days
                    </button>
                    <button className={classNames("btn", {active: (showDays === 30)})}
                            onClick={this._onClickChangeFilter.bind(this, 30)}>
                        30 days
                    </button>
                    <button className={classNames("btn", {active: (showDays === -1)})}
                            onClick={this._onClickChangeFilter.bind(this, -1)}>
                        All
                    </button>
                </div>

                {this._renderChart()}
            </div>
        )
    }

    _renderChart = () => {
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

        return <Line data={data}
                     legend={legend}
                     height={height}/>;
    }

    _getData = () => {
        const {ranks, historicalDate} = this.props;
        const {showDays} = this.state

        const temp = historicalDate.get('temp')
        const date = temp.get('date')

        if (!ranks || !ranks.size) {
            return false;
        }

        const historicalDay = date ? new Date(date.split('-').reverse().join('-'))
            : moment().subtract(1, 'd').toDate()

        let start = 0;
        let indexOfLastDay = 0
        let ranksArray = ranks.toJS()
        const size = ranksArray.length

        for (let i = 0; i < size; i++) {
            const time = new Date(ranksArray[i].timestamp);
            if (time > historicalDay) {
                indexOfLastDay = i;
                break;
            }
        }

        if (showDays > 0 && showDays < indexOfLastDay + 1) {
            start = indexOfLastDay - showDays + 1
        }

        const finalData = ranks.slice(start, indexOfLastDay + 1)

        const labels = finalData.map(rank => {
            return timeHuman(rank.get('timestamp'), 'DD/MM/YYYY', 0)
        });

        const data = finalData.map(rank => {
            return rank.get('rank')
        })

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
        }
    }

}

ChartRankItem.defaultProps = {
    height: 100,
    loading: false
}

ChartRankItem.propTypes = {
    ranks: PropTypes.object,
    height: PropTypes.number,
    loading: PropTypes.bool
}

export default ChartRankItem