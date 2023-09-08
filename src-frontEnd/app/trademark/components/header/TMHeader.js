import React, {Component} from "react"
import PropTypes from "prop-types"
import TMSortControlContainer from "./TMSortControlContainer"
import TMStatisticContainer from "./TMStatisticContainer"
import FormCreateTrademarkContainer from "./FormCreateTrademarkContainer"

class TMHeader extends Component {
    render() {
        const {triggerFetch, onUpgradePopup} = this.props

        return (
            <div className="TMHeader d-flex">
                <FormCreateTrademarkContainer onUpgradePopup={onUpgradePopup}/>
                <TMSortControlContainer triggerFetch={triggerFetch}/>

                <TMStatisticContainer/>
            </div>
        )
    }
}

TMHeader.propTypes = {
    triggerFetch: PropTypes.func.isRequired
}

export default TMHeader
