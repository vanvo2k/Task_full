import React, {Component} from "react"
import PropTypes from "prop-types"

class PageTitle extends Component {
    render() {
        const {title} = this.props

        return (
            <h1 className="PageTitle">{title}</h1>
        )
    }
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
}

export default PageTitle
