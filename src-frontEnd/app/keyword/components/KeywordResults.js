import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import {Link} from "react-router-dom"
import {FormattedMessage, injectIntl, defineMessages} from "react-intl"
import {arrayFromSize} from "../../../helpers/common/array"


class KeywordResults extends Component {
    _getWordCountText(key) {
        const {intl} = this.props

        const messages = defineMessages({
            count: {
                id: `keyword.count.${key}`
            }
        })

        return intl.formatMessage(messages.count)
    }

    render() {
        const {results, countOptions, total} = this.props

        if (!results.size || !countOptions) {
            return null
        }

        return (
            <div className={classNames('KeywordResults', {NoResult: !total})}>
                {
                    !total ?
                        <div className="text-center">
                            <strong><FormattedMessage id="keyword.keywords_no_result"/></strong>
                        </div> :
                        <div className="Wrapper">
                            {
                                this._renderColumnIndex()
                            }

                            {
                                countOptions.map(length => {
                                    return this._renderColumnKeyword(length)
                                })
                            }
                        </div>
                }
            </div>
        )
    }

    _renderColumnIndex() {
        const {perPage, currentPage} = this.props
        const arr = arrayFromSize(perPage)

        return (
            <div className="OrderColumn">
                <div className="Header">#</div>

                <div className="Body">
                    {
                        arr.map((item, index) => {
                            const order = (currentPage - 1) * perPage + index + 1

                            return (
                                <div key={index} className="Index">{order}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    _renderColumnKeyword = (length) => {
        const {results} = this.props
        const result = results.find(result => result.get('count') === length)

        if (!result) {
            return null
        }

        const docs = result.get('docs')

        return (
            <div key={length} className="KeywordColumn">
                <div className="Header">
                    <span className="Text">{this._getWordCountText(length)}</span>
                    <span className="Number"><FormattedMessage id="general.count"/></span>
                </div>

                <div className="Body">
                    {
                        docs.map((doc, index) => {
                            return this._renderWord(doc, length, `${length}-${index}`)
                        })
                    }
                </div>
            </div>
        )
    }

    _renderWord(doc, countWord, index) {
        if (!doc || !doc.size) {
            return (
                <div className="Item" key={index}>
                    <span className={`Text Count-${countWord}`}/>
                    <span className={`Number Count-${countWord}`}/>
                </div>
            )
        }

        const word = doc.get('word')
        const count = doc.get('count')

        return (
            <div className="Item" key={index}>
                    <span className={`Text Count-${countWord}`}>
                    <Link
                        to={`/a/items?term=${encodeURIComponent(word)}&searchType=same_order&page=1&sortByField=rank`}>
                        {word}
                    </Link>
                </span>
                <span className={`Number Count-${countWord}`}><span>{count}</span></span>
            </div>
        )
    }
}

KeywordResults.propTypes = {
    results: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    countOptions: PropTypes.object,
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    total: PropTypes.number,
}

export default injectIntl(KeywordResults)
