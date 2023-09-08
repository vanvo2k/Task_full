import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const _separateText = (text) => {
    return (text + '').trim().split(/\.\s|,\s|\s|:\s|;\s|!\s|\?\s/g)
}

class HighlightedText extends Component {
    _maxCount = 0

    _handleClick = (e) => {
        this.props.onClick && this.props.onClick(e)
    }

    render() {
        const texts = this._getTexts()
        const {_maxCount} = this
        const clickable = this.props.texts && this.props.texts.length

        return (
            <div onClick={this._handleClick} className={classNames("HighlightedText", {clickable})}>
                {
                    texts.map(({text, count}, index) => {
                        const noTrade = !count
                        const opacity = (count + _maxCount) / (_maxCount * 2)
                        const style = noTrade ? {} : {opacity}

                        return (
                            <span
                                className={classNames({noTrade})}
                                key={index} style={style}>{text} </span>
                        )
                    })
                }
            </div>
        )
    }

    _getTexts() {
        const {text, texts} = this.props
        const strings = _separateText(text)

        return strings.map(string => {
            let count = 0
            const lowerString = (string + '').toLowerCase()

            texts.forEach(t => {
                const ts = _separateText((t + '').toLowerCase())

                if (ts.indexOf(lowerString) !== -1) {
                    count += 1
                }
            })

            if (count > this._maxCount) {
                this._maxCount = count
            }

            return {
                text: string,
                count,
            }
        })
    }
}

HighlightedText.propTypes = {
    text: PropTypes.string.isRequired,
    texts: PropTypes.array.isRequired,
    onClick: PropTypes.func
}

export default HighlightedText
