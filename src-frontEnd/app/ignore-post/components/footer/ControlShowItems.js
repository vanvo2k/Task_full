import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PaginationItemsContainer from "./PaginationItemsContainer";

class ControlShowItems extends Component {
    render() {
        const {props} = this;
        const {className} = props;

        return (
            <div className={classNames('TableItemsFooter clearfix', className)}>
                <PaginationItemsContainer {...props}/>
            </div>
        );
    }
}

ControlShowItems.propTypes = {
    pagination: PropTypes.object.isRequired,
    changePaginationNumber: PropTypes.func.isRequired,
    changePaginationPerPage: PropTypes.func.isRequired,
};

export default ControlShowItems;