import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

class Icon extends Component {
    render() {
        const {props} = this
        const {width, height, style, className} = props

        const key = this._getKey()
        const url = this._getUrl()
        const _style = {
            background: `url('${url}') no-repeat center center`,
            backgroundSize: 'cover',
            width: width,
            height: height,
            content: '',
            display: 'inline-block'
        }

        const computedStyle = {..._style, style}
        const propsComputed = {style: computedStyle, ...props}

        return (
            <i {...propsComputed} className={classNames("Icon", className, `Icon-${key}`)}/>
        )
    }

    _getKey() {
        const {name, prefix, suffix} = this.props

        let key = ''
        if (prefix) {
            key += prefix + '-'
        }

        key += name

        if (suffix) {
            key += '-' + suffix
        }

        return key
    }

    _getUrl() {
        const {ext, dir} = this.props
        const key = this._getKey()

        return dir + key + '.' + ext
    }
}

Icon.defaultProps = {
    prefix: '',
    suffix: '',
    ext: 'svg',
    dir: '/assets/icons/',
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    ext: PropTypes.string,
    dir: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

export default Icon
