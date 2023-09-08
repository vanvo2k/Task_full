import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getUserScopes, isAdmin} from "../selectors/UserSelectors"
import CannotUseFeature from "../shared-components/CannotUseFeature"

class CanUseFeatureContainer extends Component {
    render() {
        const {props} = this
        const {scopes, feature, alternatively, alternative, isAdmin, children, noAlert, page} = props;
        // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        // console.log(props);
        if (page) { // not found page
            if (page === 'historical-archive' && scopes.indexOf('trial') !== -1) {
                return <CannotUseFeature {...props}/>
            }
        }

        if (isAdmin) {
            return children
        }

        const alt = alternative || alternatively || ''

        if (alt && scopes.indexOf(alt) !== -1) {
            return children
        }
        
        if (Array.isArray(feature) && feature.length) {
            feature.forEach(_feature => {
                if (scopes.indexOf(_feature) !== -1) {
                    return children
                }
            })
        }

        if (scopes.indexOf(feature) !== -1) {
            return children
        }

        if (noAlert) {
            return null
        }

        return <CannotUseFeature {...props}/>
    }
}

CanUseFeatureContainer.defaultProps = {
    demoImage: '/assets/demos/dashboard.jpg',
    noAlert: false,
    alt: '',
    alternative: ''
}

const mapStateToProps = (state, props) => ({
    scopes: getUserScopes(state),
    isAdmin: isAdmin(state)
})

const mapDispatchToProps = {}

CanUseFeatureContainer.propTypes = {
    noAlert: PropTypes.bool,
    demoImage: PropTypes.string,
    feature: PropTypes.string.isRequired,
    alternatively: PropTypes.string,
    alternative: PropTypes.string,
    children: PropTypes.node.isRequired,
    scopes: PropTypes.object,
    isAdmin: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(CanUseFeatureContainer)
