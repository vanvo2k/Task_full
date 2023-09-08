import React, {Component} from "react"
import ReferralLink from "./ReferralLink"
import {_getReferralLink} from "../../../../../services/ReferralServices"

class ReferralsLinkContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            link: '',
            base: '',
            code: ''
        }
    }

    componentDidMount() {
        this._fetchReferralLink()
    }

    _handleChangeRefCode = (code) => {
        this.setState({
            code,
        })
    }


    _fetchReferralLink = () => {
        _getReferralLink()
            .then(result => {
                if (result.success) {
                    const {link, base, code} = result.data

                    this.setState({
                        link,
                        base,
                        code
                    })
                }
            })
    }

    render() {
        return (
            <ReferralLink
                {...this.state}
                onUpdateLink={this._fetchReferralLink}
                onChangeRefCode={this._handleChangeRefCode}/>
        )
    }
}

export default ReferralsLinkContainer