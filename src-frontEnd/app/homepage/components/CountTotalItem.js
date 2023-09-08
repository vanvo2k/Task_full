import React, {Component} from "react";
import PropTypes from "prop-types";
import CountUp from 'react-countup';
import classNames from "classnames";
import styled from "styled-components";

class CountTotalItem extends Component {
    render() {
        const {total, className} = this.props;

        if (total <= 0) {
            return (
                <span className={classNames(['CountUp', className])}>0</span>
            );
        }

        return (
            <CountUp className={classNames(['CountUp', className])}
                     suffix="+"
                     duration={1}
                     useGrouping
                     separator=","
                     start={parseInt(total / 10, 10)} end={total}/>
        );
    }
}

CountTotalItem.propTypes = {
    total: PropTypes.number.isRequired
};

export default styled(CountTotalItem)`
`;