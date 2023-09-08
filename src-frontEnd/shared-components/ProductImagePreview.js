import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import {getLinkImageBestQuality} from "../helpers/AmazonHelpers"

class ProductImagePreview extends Component {
    _handleClick = e => {
        const {disableLink} = this.props

        if (disableLink) {
            e.preventDefault()
        }
    }

    render() {
        const {cropped, image, link, name, disableLink} = this.props
        const img = <img src={getLinkImageBestQuality(image)} alt={name || link}/>
        const classes = classNames("ProductImagePreview", {cropped}, {noThumbnail: !image})

        if (disableLink) {
            return (
                <div
                    style={{backgroundImage: 'url(' + image + ')'}}
                    className={classes}>
                    {img}
                </div>
            )
        }

        return (
            <a
                onClick={this._handleClick}
                className={classes}
                style={{backgroundImage: 'url(' + image + ')'}}
                target="blank"
                href={link}>
                {img}
            </a>
        )
    }
}

ProductImagePreview.defaultProps = {
    cropped: false,
    name: '',
    disableLink: false,
    link: '',
}

ProductImagePreview.propTypes = {
    disableLink: PropTypes.bool,
    cropped: PropTypes.bool,
    name: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string.isRequired,
}

export default ProductImagePreview
