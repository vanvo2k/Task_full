import React, {Component} from 'react'
import {getViewPort, addViewportSubscriber, removeViewportSubscriber} from "../services/ViewportServices"

export default ComposedComponent => class WithViewport extends Component {
    static displayName = 'withViewport(' + (ComposedComponent.displayName || ComposedComponent.name) + ')'

    state = {
        viewport: getViewPort()
    }

    _mounted = false

    componentDidMount() {
        this._mounted = true
        addViewportSubscriber(this._handleOnViewportChange)
    }

    componentWillUnmount() {
        this._mounted = false
        removeViewportSubscriber(this._handleOnViewportChange)
    }

    _handleOnViewportChange = () => {
        if (!this._mounted) {
            return
        }

        this.setState({
            viewport: getViewPort()
        })
    }

    render() {
        const {viewport} = this.state
        const {props} = this

        return <ComposedComponent {...props} {...viewport}/>
    }
}
