import React, {Component} from "react"
import PropTypes from "prop-types"
import DocTitle from "../../../shared-components/DocTitle"
import {FormattedMessage, injectIntl} from "react-intl"
import ResizeTabs from "./ResizeTabs"
import classNames from "classnames"
import {changeQuerySearch, parseSearchQuery} from "../../../helpers/RouterHelper"
import ShowWithLanguage from "../../../shared-components/ShowWithLanguage"
import ResizeImagesTour from "./ResizeImagesTour"

class ResizeImagesPage extends Component {
    state = {
        currentType: this._getDefaultType()
    }

    _getDefaultType() {
        const {history} = this.props
        const types = ['t-shirt', 'hoodie']

        const {type} = parseSearchQuery(history)

        if (type && types.indexOf(type) !== -1) {
            return type
        }

        return 't-shirt'
    }

    _handleOnChangeType = (type) => {
        this.setState({
            currentType: type
        })

        const {history} = this.props
        changeQuerySearch(history)({type})
    }

    _getLinkIframe(type) {
        const mapTypes = {
            't-shirt': {
                w: 4500,
                h: 5400
            },
            hoodie: {
                w: 4500,
                h: 4050
            }
        }

        const {w, h} = mapTypes[type] || {w: 4500, h: 5400}

        return `https://bulkresizephotos.com/?resize_type=exact&resize_value=${w}&secondary_resize_value=${h}&extension=png&quality_level=1&preserve_aspect_ratio=true&transparent_background=true&background_color=ffffff&skip_resize_settings=true&min_mode=true`
    }

    render() {
        const {currentType} = this.state
        const tshirtlink = this._getLinkIframe('t-shirt')
        const hoodieLink = this._getLinkIframe('hoodie')
        const data = JSON.parse(localStorage.getItem('com.marketify.tamz.profile'))
        const data2 = data.scopes[1] // if(data2 && data2=="trademark")
        return (
            
            <div>
            {data2 && data2 == 'trademark' ? (
                    <div>
                        <div class="Form_navigate">
                            <h1></h1>
                            <h3>Upgrade plan for unlimited access</h3>
                            <p>
                                Get unlimited access to all Advanced feature exclusively for PRO
                                package.
                            </p>
                            <a href="https://merch.spyamz.com/pricing?plan=pro">
                                <button>See Plans</button>
                            </a>
                        </div>
                        <div className="display_web"></div>
                    </div>
                ) : (
                    ''
                )}
            <DocTitle title="PNG Resizer for MBA">
                <div className="ResizeImagesPage">
                    <div className="container">
                        <ResizeImagesTour/>
                        <div className="PageTitle"><FormattedMessage id="resizer.title"/></div>

                        <div className="Guide text-center">
                            <FormattedMessage id="resizer.guide"/>
                        </div>

                        <div className="Main">
                            <ResizeTabs type={currentType} onChangeType={this._handleOnChangeType}/>

                            <div className={classNames("Iframes", currentType)}>
                                <iframe
                                    scrolling="no"
                                    className={classNames("Iframe", {active: currentType === 't-shirt'})}
                                    title="Resize images" src={tshirtlink}
                                    frameBorder="0"/>
                                <iframe
                                    scrolling="no"
                                    className={classNames("Iframe", {active: currentType === 'hoodie'})}
                                    title="Resize images" src={hoodieLink}
                                    frameBorder="0"/>
                            </div>
                        </div>

                        <div className="Footer text-center">
                            <ShowWithLanguage lang="vi">
                                <FormattedMessage defaultMessage="" id="resizer.ps"/>
                            </ShowWithLanguage>
                        </div>
                    </div>
                </div>
            </DocTitle>
        </div>
        )
    }
}

ResizeImagesPage.propTypes = {
    history: PropTypes.object,
    intl: PropTypes.object
}

export default injectIntl(ResizeImagesPage)
