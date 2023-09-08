import React, {Component} from "react"
import PropTypes from "prop-types"

class CheckboxAnimated extends Component {
    render() {
        return (
            <div className="CheckboxAnimated">
                <input
                    {...this.props}
                    type="checkbox"/>
                <label/>
            </div>
        )
    }
}

CheckboxAnimated.propTypes = {
    onClicked: PropTypes.func,
    checked: PropTypes.bool,
}

export default CheckboxAnimated
