import React, {PureComponent} from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import Spinner from "./Spinner"

class Loading extends PureComponent {
    render() {
        const {className, loading} = this.props

        return (
            <div className={classNames('LoadingComponent', {loading}, className)}>
                <div className="Middle">
                    <Spinner/>
                </div>
            </div>
        )
    }
}

Loading.defaultProps = {
    loading: true
}

Loading.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default Loading
