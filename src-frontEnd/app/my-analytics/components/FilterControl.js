import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";

class FilterControl extends Component {
    render() {
        const {status, type, rank, timeAvailable, price} = this.props;

        return (
            <div className="FilterControl">
                <strong>Filter: </strong>

                <div className="Type TagItem">
                    <span className="Label">Status</span>
                    <span><FormattedMessage id={`searchItem.filter.status.${status}`}/></span>
                </div>

                <div className="Status TagItem">
                    <span className="Label">Type</span>
                    <span><FormattedMessage id={`searchItem.filter.type.${type}`}/></span>
                </div>

                <div className="Rank TagItem">
                    <span className="Label">Rank</span>
                    <span>{rank.from ? rank.from : 1} to {rank.to ? rank.to : '+∞'}</span>
                </div>

                <div className="TimeAvailable TagItem">
                    <span className="Label">Time available</span>
                    <span>{timeAvailable.from ? timeAvailable.from : 'past'} to {timeAvailable.to ? timeAvailable.to : 'today'}</span>
                </div>

                <div className="Price TagItem">
                    <span className="Label">Price</span>
                    <span>{price.from ? `$${price.from}` : 0} to {price.to ? `$${price.to}` : '+∞'}</span>
                </div>
            </div>
        );
    }
}

FilterControl.propTypes = {
    status: PropTypes.string,
    type: PropTypes.string,
    alive: PropTypes.string,
    rank: PropTypes.object,
    timeAvailable: PropTypes.object,
    price: PropTypes.object,
};

export default FilterControl;