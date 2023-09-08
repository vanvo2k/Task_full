import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"
import {UncontrolledTooltip} from "reactstrap"
import timeHuman from "../helpers/time/timeHuman"
import timeAgo from "../helpers/time/timeAgo"
import uuid from "uuid/v4"
import withViewport from "./withViewport"

class TimeAgo extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            id: uuid()
        }
    }

    render() {
        const {time, isMobile, formatTime, alternativeText} = this.props
        const {id} = this.state
        const ago = timeAgo(time)
        const human = timeHuman(time, formatTime)
        const tooltipText = alternativeText ? `${alternativeText}: ${human}` : human

        return (
            <Fragment>
                <span id={`TimeAgo-${id}`}>{ago}</span>

                {
                    !isMobile &&
                    <UncontrolledTooltip delay={300} placement="top" target={`#TimeAgo-${id}`}>
                        {tooltipText}
                    </UncontrolledTooltip>
                }
            </Fragment>
        )
    }
}

TimeAgo.defaultProps = {
    formatTime: ''
}

TimeAgo.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
    formatTime: PropTypes.string,
    alternativeText: PropTypes.string,
}

export default withViewport(TimeAgo)
