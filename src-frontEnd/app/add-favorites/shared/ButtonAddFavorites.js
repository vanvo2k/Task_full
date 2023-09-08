import React, {PureComponent} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import classNames from "classnames"
import {FormattedMessage} from "react-intl"
import {requestAddToFavorites} from "../actions"

class ButtonAddFavorites extends PureComponent {
    _mounted = false

    componentDidMount() {
        this._mounted = true

        if (!this.props.enableShortcut) return
        document.addEventListener('keyup', this._handleKeyUp)
    }

    componentWillUnmount() {
        this._mounted = false

        if (!this.props.enableShortcut) return
        document.removeEventListener('keyup', this._handleKeyUp)
    }

    _handleKeyUp = (e) => {
        if (!this.props.enableShortcut) return
        const keyCodeS = 83
        const keyCodeF = 70
        if (!e.keyCode || (e.keyCode !== keyCodeS && e.keyCode !== keyCodeF)) return

        this._handleToggleLikeItem()
    }

    _handleToggleLikeItem() {
        this.props.requestAddToFavorites(this.props.id)
    }

    render() {
        const {forceShow} = this.props

        const styles = {}

        if (forceShow) {
            styles.opacity = 1
        }

        return (
            <div style={styles}
                 className={classNames('ButtonAddFavorites')}
                 onClick={this._handleToggleLikeItem.bind(this)}
                 title="Add to Favorite">
                <i className="fa fa-heart" aria-hidden="true"/>
            </div>
        )
    }
}

ButtonAddFavorites.defaultProps = {
    forceShow: false,
    enableShortcut: false
}

ButtonAddFavorites.propsTypes = {
    enableShortcut: PropTypes.bool,
    forceShow: PropTypes.bool,
    id: PropTypes.string.isRequired,
    requestAddToFavorites: PropTypes.func.isRequired,
}

const mapDisPatchToProps = {
    requestAddToFavorites
}

export default connect(null, mapDisPatchToProps)(ButtonAddFavorites)
