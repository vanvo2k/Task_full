import React, {PureComponent} from "react"
import {parseSearchQuery} from "../helpers/RouterHelper"
import getCookie from "../helpers/cookie/getCookie"
import setCookie from "../helpers/cookie/setCookie"
import {_countClick} from "../services/ReferralServices"
import getEnv from "../helpers/common/getEnv"

const _domain = getEnv('domain')

const _getRefId = () => {
    const value = getCookie('spz_ref_code') || ''
    if (value) return value
    const queries = parseSearchQuery()
    const {ref} = queries
    const newValue = ref || ''

    if (newValue) {
        setCookie('spz_ref_code', newValue, 45, _domain)
    }

    return newValue
}

class ReferralTracking extends PureComponent {
    state = {
        ref: _getRefId()
    }

    _referer = window.location.href

    componentDidMount() {
        const visitID = getCookie('spz_visit_id')
        const refCode = getCookie('spz_ref_code')
        if (!visitID && refCode) {
            console.log('count me')
            _countClick(this.state.ref, this._referer)
                .then(result => {
                    if (result.success) {
                        setCookie('spz_visit_id', result.data, 45, _domain)
                    } else {
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        const {ref} = this.state

        return <input value={ref} name="referral-id" readOnly hidden/>
    }
}

export default ReferralTracking
