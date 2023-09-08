import React, {Component} from "react"
import PropTypes from "prop-types"

class OrderTotal extends Component {
    render() {
        const {isFree, total, discount, couponAvailable} = this.props

        return (
            <div className="OrderTotal text-right">
                {
                    !isFree && discount > 0 && couponAvailable &&
                    <div className="Discount">
                        <span className="Label">Discount:</span>
                        <span className="Value">- ${discount}</span>
                    </div>
                }

                <div className="Total">
                    <span className="Label">Total:</span>
                    <span className="Value">${total}</span>
                </div>
            </div>
        )
    }
}

OrderTotal.propTypes = {
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    method: PropTypes.string.isRequired,
    isFree: PropTypes.bool.isRequired,
    couponAvailable: PropTypes.bool.isRequired,
}

export default OrderTotal
