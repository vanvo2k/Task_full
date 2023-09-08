import React, {Component} from "react";
import PropTypes from "prop-types";

class TMResultsHeader extends Component {
    render() {
        return (
            <thead className="TMResultsHeader">
            <tr>
                <th>Trademark</th>
                <th>Serial Number</th>
                <th>Registration Number</th>
                <th>Status</th>
                <th>Type</th>
            </tr>
            </thead>
        );
    }
}

TMResultsHeader.propTypes = {
    any: PropTypes.any
};

export default TMResultsHeader;