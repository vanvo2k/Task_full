import React, {Component} from "react"
import PropTypes from "prop-types"

class TMTotalWarnings extends Component {
    render() {
        const {total} = this.props

        if (!total) {
            return null
        }

        return (
            <span className="TMTotalWarnings">
                {total}
            </span>
        )
    }
}

TMTotalWarnings.propTypes = {
    total: PropTypes.number,
    fetchTotalWarnings: PropTypes.func,
}

export default TMTotalWarnings
