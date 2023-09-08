import React, {Component} from "react"
import {FormattedMessage} from "react-intl"

class TrademarkHeading extends Component {
    render() {
        return (
            <li className="TableRow TableHeading d-table-row">
                <div className="TableCell d-table-cell ">#</div>
                <div className="TableCell d-table-cell Keywords"><FormattedMessage id="tm.keywords"/></div>
                <div className="TableCell d-table-cell Warnings"><FormattedMessage id="tm.warnings"/></div>
                <div className="TableCell d-table-cell Status"><FormattedMessage id="tm.status"/></div>
                <div className="TableCell d-table-cell Updated"><FormattedMessage id="tm.updated"/></div>
                <div className="TableCell d-table-cell Actions"><FormattedMessage id="tm.actions"/></div>
            </li>
        );
    }
}

export default TrademarkHeading
