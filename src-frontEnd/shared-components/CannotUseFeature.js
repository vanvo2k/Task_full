import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import {Link} from "react-router-dom"
import withViewport from "./withViewport"
import {_freeTrialAvailable} from "../services/payments/PaymentServices"
import {FormattedMessage} from "react-intl"

class CannotUseFeature extends PureComponent {
    static trialAvailable = true
    static _fetch = false
    
    state = {
        show: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true
            })
        }, 200)
        // this._fetchAvailableTrial()
    }

    _fetchAvailableTrial() {
        if (CannotUseFeature._fetch) {
            return
        }

        CannotUseFeature._fetch = true

        _freeTrialAvailable()
            .then(response => {
                const {success, data} = response
                
                if (success) {
                    CannotUseFeature.trialAvailable = data
                    this.setState({
                        trial: data
                    })
                }
            })
    }

    render() {
        const {show} = this.state
        const {className, demoImage, isMobile} = this.props
        const styles = {}
        if (demoImage) {
            const name = isMobile ? 'mobile-' + demoImage : demoImage
            styles.background = `url('/assets/demos/${name}') top center no-repeat`
        }
//pop-all
        // const {trialAvailable} = CannotUseFeature

        const trialAvailable = false
        const planText = trialAvailable ? 'trial' : 'pro'

        // let planText = "pro";
        // const data=JSON.parse(localStorage.getItem("com.marketify.tamz.profile"));
        // console.log("7777777", data);
        // if(data.scopes[1]=="trial" || data.scopes[1]=="trademark"){
        //     planText="trial_trademark";
        // }else{
        //     planText="pro";
        // }
        return (
            <div style={styles}
                 className={classNames("CannotUseFeature text-center", className, {show}, {trialAvailable})}>
                <div className="Wrapper">
                    <div className="Inner">
                        <h2><FormattedMessage id={`upgrade.${planText}.title`}/></h2>

                        <p className="Description"><FormattedMessage id={`upgrade.${planText}.description`}/></p>

                        <div className="Actions">
                            <Link
                                to={`/pricing?plan=${trialAvailable ? 'trial' : 'pro'}`}
                                className="btn btn-success">
                                <FormattedMessage id={`upgrade.${planText}.upgrade`}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CannotUseFeature.propTypes = {
    demoImage: PropTypes.string,
    isMobile: PropTypes.bool.isRequired,
}

export default withViewport(CannotUseFeature)
