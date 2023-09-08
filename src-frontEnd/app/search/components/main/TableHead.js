import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";


class TableHead extends PureComponent {
    render() {
        const {layout} = this.props;

        if (layout === 'grid') {
            return null;
        }

        return (
            <li className="TableHead d-table-row">
                <div className="TableCell text-center d-table-cell">#</div>
                <div className="TableCell text-center d-table-cell"><FormattedMessage id="general.rank"/></div>
                <div className="TableCell text-center d-table-cell"><FormattedMessage id="general.thumbnail"/></div>
                <div className="TableCell text-center d-table-cell"><FormattedMessage id="general.information"/></div>
                <div className="TableCell text-center d-table-cell"><FormattedMessage id="general.price"/></div>
                <div className="TableCell text-center d-table-cell"><FormattedMessage id="general.rank_history"/></div>
            </li>
        );
    }
}

TableHead.propTypes = {
    layout: PropTypes.string
};

export default TableHead;