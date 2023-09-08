import React, {Component} from "react"
import PropTypes from "prop-types"
import ItemTrademarkContainer from "./ItemTrademarkContainer"
import TrademarkHeading from "./TrademarkHeading"

class ListTradeMarks extends Component {
    _renderList() {
        const {items, triggerFetch,onUpgradePopup} = this.props

        return items.map((item, index) => {
            return <ItemTrademarkContainer
                triggerFetch={triggerFetch}
                index={index}
                key={item.get('_id')}
                item={item}
                onUpgradePopup={onUpgradePopup}/>
        })
    }

    render() {
        const {items} = this.props
        if (!items.size) {
            return null
        }

        const list = this._renderList()

        return (
            <div className="TrademarkList">
                {
                    <ul className="Table d-table">
                        <TrademarkHeading/>
                        {list}
                    </ul>
                }
            </div>
        )
    }
}

ListTradeMarks.propTypes = {
    items: PropTypes.object.isRequired,
    triggerFetch: PropTypes.func,
}

export default ListTradeMarks
