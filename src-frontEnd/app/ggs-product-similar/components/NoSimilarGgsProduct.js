import React, {Component} from "react"
import {FormattedMessage} from "react-intl"

class NoSimilarGgsProduct extends Component {
    render() {
        return (
            <div className="NoSimilarProduct">
                <FormattedMessage id="similarProducts.no_product"/>
            </div>
        )
    }
}

export default NoSimilarGgsProduct
