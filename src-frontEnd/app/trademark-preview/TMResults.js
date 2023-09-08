import React, {Component} from "react";
import PropTypes from "prop-types";
import TMResult from "./TMResult";
import TMResultsHeader from "./TMResultsHeader";
import {Table} from "reactstrap";

class TMResults extends Component {
    render() {
        const {results} = this.props;

        if (!results || !results.length) {
            return (
                <div className="TMResults">
                    No result.
                </div>
            );
        }

        return (
            <Table className="TMResults table-striped">
                <TMResultsHeader/>

                <tbody>
                {
                    results.map((result, index) => {
                        return <TMResult key={index} result={result}/>;
                    })
                }
                </tbody>
            </Table>
        );
    }
}

TMResults.propTypes = {
    results: PropTypes.array.isRequired,
};

export default TMResults;