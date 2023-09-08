import React, {Component} from "react"
import PropTypes from "prop-types"

class ShowOnViewport extends Component {
    render() {
        const {children} = this.props

        return children
    }
}

ShowOnViewport.defaultProps = {
    minWidth: 0
}

ShowOnViewport.propTypes = {
    maxWidth: PropTypes.number,
}

export default ShowOnViewport
