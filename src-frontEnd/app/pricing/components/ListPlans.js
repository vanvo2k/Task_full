import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, Row} from "reactstrap";
import styled from "styled-components";
import classNames from "classnames";
import PlanCardContainer from "./PlanCardContainer";

class ListPlans extends Component {
    render() {
        const {plans, className} = this.props;

        return (
            <div className={classNames(["ListPlans"], className)}>
                <Row className="justify-content-center">
                    {
                        plans.map((id, index) => {
                            return (
                                <Col xs={12} md={4} key={index}>
                                    <PlanCardContainer id={id}/>
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
        );
    }
}

ListPlans.propTypes = {
    plans: PropTypes.object.isRequired
};

export default styled(ListPlans)`
&.ListPlans {
    
}
`;