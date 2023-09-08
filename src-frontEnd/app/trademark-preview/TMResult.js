import React, {Component} from "react";
import PropTypes from "prop-types";

class TMResult extends Component {
    render() {
        const {serialNumber, regNumber, status, wordMark, url, type} = this.props.result;
        const urlValidated = url || `http://tsdr.uspto.gov/#caseNumber=${serialNumber}&caseType=SERIAL_NO&searchType=statusSearch`;

        return (
            <tr className="TMResult">
                <td>{wordMark}</td>
                <td><a target="_blank" href={urlValidated}>{serialNumber}</a></td>
                <td>{regNumber || '--'}</td>
                <td>{status}</td>
                <td>{type || 'Text'}</td>
            </tr>
        );
    }
}

TMResult.propTypes = {
    result: PropTypes.object.isRequired
};

export default TMResult;