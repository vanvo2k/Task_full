import React, {PureComponent} from "react"
import classNames from "classnames"

class Spinner extends PureComponent {
    render() {
        const {className} = this.props

        return (
            <div className={classNames(['Spinner', className])}/>
        )
    }
}

export default Spinner