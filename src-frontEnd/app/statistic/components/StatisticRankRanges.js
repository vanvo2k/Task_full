import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import {Card, CardHeader, Table} from "reactstrap";
import {Link} from "react-router-dom";
import formatThousandNumber from "../../../helpers/common/formatThousandNumber";

class StatisticRankRanges extends Component {
    componentDidMount() {
        this.props.fetchStatisticRankRanges();
    }

    render() {
        const {statistic, className} = this.props;
        const ranges = statistic.get('ranges');
        const total = statistic.get('total');

        if (!total) {
            return null;
        }

        return (
            <Card className={classNames(["StatisticRankRanges", className])}>
                <CardHeader>Products by rank</CardHeader>

                <Table>
                    <tbody>
                    {
                        ranges.map((range, index) => {
                            const from = range.get('from');
                            const to = range.get('to');

                            const fromText = formatThousandNumber(from);
                            const toText = to ? ` to ${formatThousandNumber(to)}` : '+';
                            const noRank = range.get('noRank');
                            const count = range.get('count');
                            const percent = count / total * 100;
                            const textRange = noRank ? 'No rank' : `${fromText}${toText}`;

                            const toSearch = to ? to : '';
                            const fromSearch = noRank ? 100000000 : from;

                            return (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to={`/a/items?from=${fromSearch}&to=${toSearch}&page=1&sortByField=rank&status=alive&advanced=true`}>{textRange}</Link>
                                    </td>
                                    <td>{range.get('count')} ({percent.toFixed(3)}%)</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </Card>
        );
    }
}

StatisticRankRanges.propTypes = {
    statistic: PropTypes.object.isRequired,
    fetchStatisticRankRanges: PropTypes.func.isRequired
};

export default styled(StatisticRankRanges)`

`;