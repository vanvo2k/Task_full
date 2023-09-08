import React, {Component} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Spinner from "../../../shared-components/Spinner"
import getHistory from "../../../store/getHistory"

class SubscribePlan extends Component {
    render() {
        return (
            <div className={classNames("SubscribePlan")}>
                <Spinner/>
            </div>
        )
    }

    componentDidMount() {
        const {setPlanSubscribe, plan, coupon} = this.props
        const history = getHistory()
        const {search} = history.location
        setPlanSubscribe(plan, coupon)
            .then(() => {
                history.push('/checkout' + search)
            })
    }
}

SubscribePlan.propTypes = {
    coupon: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    setPlanSubscribe: PropTypes.func.isRequired,
}

export default SubscribePlan
