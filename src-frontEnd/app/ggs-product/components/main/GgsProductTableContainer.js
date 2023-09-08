import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentLayout, getItemDetail, getPaginationControlData} from "../../selectors";
import {showItemDetail} from "../../actions";
import GgsProductTable from "./GgsProductTable";
import GgsProductGrid from "./GgsProductGrid";

class GgsProductTableContainer extends PureComponent {
    render() {
        const {props} = this;
        const {layout} = props;

        if (layout === 'grid') {
            return <GgsProductGrid {...props}/>
        }

        return (
            <GgsProductTable {...props}/>
        );
    }
}

GgsProductTableContainer.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number
};

const mapStateToProps = (state, props) => ({
    item: getItemDetail(state, props),
    pagination: getPaginationControlData(state),
    layout: getCurrentLayout(state)
});

const mapDispatchToProps = {
    showItemDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(GgsProductTableContainer);