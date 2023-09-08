import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Col, Container, Row} from "reactstrap";
import StatisticOverviewContainer from "../overview/components/StatisticOverviewContainer";
import StatisticUpdateContainer from "../update/components/StatisticUpdateContainer";
import StatisticRankRangesContainer from "./StatisticRankRangesContainer";
import StatisticItemTypesContainer from "./StatisticItemTypesContainer";
import ItemsTopRaisingContainer from "./ItemsTopRisingContainer";
import ItemsTopRankingContainer from "./ItemsTopRankingContainer";
import ItemsRandomContainer from "./ItemsRandomContainer";
import ItemsStatisticTour from "./ItemsStatisticTour"

class ItemsStatistic extends Component {
    render() {
        return (
            <Container className={classNames('ItemsStatistic')}>
                <ItemsStatisticTour/>
                <StatisticUpdateContainer/>

                <div className="StatisticProduct">
                    <Row>
                        <Col sm={12} lg={7}>
                            <StatisticOverviewContainer/>
                        </Col>

                        {/* <Col sm={12} lg={4}>
                            <StatisticRankRangesContainer/>
                        </Col> */}

                        <Col sm={12} lg={5}>
                            <StatisticItemTypesContainer/>
                        </Col>
                    </Row>
                </div>

                <div className="ListFeaturedProduct">
                    <Row>
                        {/* <Col md={12} xl={4}>
                            <ItemsRandomContainer/>
                        </Col> */}

                        <Col md={12} xl={6}>
                            <ItemsTopRaisingContainer/>
                        </Col>

                        <Col md={12} xl={6}>
                            <ItemsTopRankingContainer/>
                        </Col>
                    </Row>
                </div>

            </Container>
        );
    }
}

ItemsStatistic.propTypes = {
    any: PropTypes.any
};

export default ItemsStatistic;