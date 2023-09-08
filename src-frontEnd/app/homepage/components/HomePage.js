import React, {Component} from "react"
import {Button, Col, Container, Jumbotron, Row} from "reactstrap"
import {Link, Redirect} from "react-router-dom"
import PropTypes from "prop-types"
import classNames from "classnames"
import CountTotalItem from "./CountTotalItem"
import {FormattedMessage} from "react-intl"
import StatisticUpdateContainer from "../../statistic/update/components/StatisticUpdateContainer"
import StatisticOverviewContainer from "../../statistic/overview/components/StatisticOverviewContainer"
import StatisticItemTypesContainer from "../../statistic/components/StatisticItemTypesContainer"
import StatisticRankRangesContainer from "../../statistic/components/StatisticRankRangesContainer"
import {parseSearchQuery} from "../../../helpers/RouterHelper"

class HomePage extends Component {
    render() {
        const {isAuthenticated, className, totalItems} = this.props

        if (isAuthenticated) {
            return <Redirect to={"/a"}/>
        }

        return (
            <div className={classNames('Home overflow', className)}>
                <Jumbotron>
                    <h1 className="display-3"><FormattedMessage id="homePage.welcome"/></h1>

                    <p className="Description">
                        <FormattedMessage id="homePage.more"/>
                        {' '}
                        <CountTotalItem total={totalItems}/>
                        {' '}
                        <FormattedMessage id="homePage.more_end"/>
                    </p>

                    <hr className="my-4"/>
                    <p className="lead">
                        <Button color="primary" tag={Link} to="/login">
                            <FormattedMessage id="homePage.explore"/>
                        </Button>
                    </p>
                </Jumbotron>

                <Container fluid>
                    <StatisticUpdateContainer/>

                    <Row>
                        <Col md={4}>
                            <StatisticOverviewContainer/>
                        </Col>

                        <Col md={4}>
                            <StatisticRankRangesContainer/>
                        </Col>

                        <Col md={4}>
                            <StatisticItemTypesContainer/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    componentDidMount() {
        const {v} = parseSearchQuery()

        this.props.fetchTotalItems(v || '')
    }
}

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fetchTotalItems: PropTypes.func,
    totalItems: PropTypes.number
}

export default HomePage