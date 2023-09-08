import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import PaginationItemsContainer from "./PaginationItemsContainer";
import ShowItemPerPage from "./ShowItemPerPage";
import withViewport from "../../../../shared-components/withViewport";

class ControlShowItems extends Component {
    render() {
        const {props} = this;

        return (
            <div className={classNames('TableItemsFooter clearfix container')}>
                <ShowItemPerPage {...props} />

                <PaginationItemsContainer {...props}/>
            </div>
        );
    }
}

ControlShowItems.propTypes = {
    pagination: PropTypes.object.isRequired,
    changePaginationNumber: PropTypes.func.isRequired,
    changePaginationPerPage: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    viewport: PropTypes.object.isRequired
};

export default withViewport(ControlShowItems);