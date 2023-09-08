import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

class SortByControl extends Component {
    render() {
        const {field, order} = this.props;

        return (
            <div className="SortByControl">
                <strong>Sort: </strong>

                <span className="Field TagItem">
                    <span className="Label">By</span>
                    <span><FormattedMessage id={`searchItem.sort.field.${field}`}/></span>
                </span>

                {
                    !!order &&
                    <div className="Order TagItem">
                        <span className="Label">Order</span>
                        <span>{order}</span>
                    </div>
                }
            </div>
        );
    }
}

SortByControl.propTypes = {
    field: PropTypes.string,
    order: PropTypes.string,
};

export default SortByControl;