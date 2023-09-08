import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AuthServices from "../services/AuthServices"
import getEnv from "../helpers/common/getEnv"
import {Link} from "react-router-dom"
import classNames from 'classnames'

class LinkRedirectToAmazon extends Component {
    _handleClick = e => {
        e.preventDefault()
        if(this.props.isUserTrial && !this.props.isUserTrialCanSee){
            this.props.onUpgradePopup()
        }else{
        const {id} = this.props
        const hostAPI = getEnv('hostAPI');
        const token = AuthServices.getAccessToken();
        const link = hostAPI + `/v2/products/${id}/redirect?token=${token}`;

        window.open(link, '_blank')}
    }

    render() {
        const {id, children, className, title} = this.props
        const nodeChild = children ? children : <i/>
        const titleValidated = title ? title : 'View this item on Amazon.com'

        return (
            <Link
                className={classNames(className)}
                onClick={this._handleClick} to={`/a/items/${id}`}
                title={titleValidated}
                target="_blank">
                {nodeChild}
            </Link>
        )
    }
}

LinkRedirectToAmazon.defaultProps = {
    title: '',
    className: '',
    children: null
}

LinkRedirectToAmazon.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
}

export default LinkRedirectToAmazon