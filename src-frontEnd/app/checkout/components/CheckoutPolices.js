import React, {Component} from 'react'
import {getUserLanguage} from "../../../services/LocaleServices"

class CheckoutPolices extends Component {
    render() {
        const language = getUserLanguage()

        if (language === 'vi') {
            return (
                <div className="CheckoutPolices">
                    Khi tiến hành thanh toán, bạn đã đồng ý chấp thuận các
                    <a href='https://spyamz.com/dieu-khoan-su-dung/' rel="noopener noreferrer"
                       target="_blank"> điều khoản sử dụng </a>
                    dịch vụ của SpyAMZ.
                </div>
            )
        }

        return (
            <div className="CheckoutPolices">
                By continuing to checkout, you have agreed to our
                <a href='https://spyamz.com/policies'
                   rel="noopener noreferrer" target="_blank"> Policies and Terms </a>
                of Service with SpyAMZ.
            </div>
        )
    }
}

export default CheckoutPolices
