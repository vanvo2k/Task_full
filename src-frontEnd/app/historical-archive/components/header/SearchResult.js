import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import formatThousandNumber from "../../../../helpers/common/formatThousandNumber";
import {FormattedMessage} from "react-intl";

class SearchResult extends Component {
    render() {
        const {className, totalSearchItems} = this.props;

        return (
            <div className={classNames(["SearchResult ml-auto", className])}>
                <span className="TotalSearchItems">{formatThousandNumber(totalSearchItems)} (<FormattedMessage id="general.products"/>)</span>
            </div>
        );
    }
}

SearchResult.propTypes = {
    totalItems: PropTypes.number,
    totalSearchItems: PropTypes.number
};


export default SearchResult;