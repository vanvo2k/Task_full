import React, {PureComponent} from "react"
import Spinner from "./Spinner"

class PreLoading extends PureComponent {
    render() {
        const {isLoading, error} = this.props

        if (isLoading) {
            return <Spinner/>
        } else if (error) {
            return <div>Sorry, there was a problem loading the page.</div>
        }
        else {
            return null
        }
    }
}

export default PreLoading
