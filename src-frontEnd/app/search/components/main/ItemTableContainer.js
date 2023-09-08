import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ItemTable from "./ItemTable";
import {getCurrentLayout, getItemDetail, getPaginationControlData} from "../../selectors";
import {showItemDetail} from "../../actions";
import ItemGrid from "./ItemGrid";
import { getUserScopes } from "../../../../selectors/UserSelectors";


class ItemTableContainer extends PureComponent {
    render() {
        const {props} = this;
        const {layout} = props;
        if (layout === 'grid') {
            return <ItemGrid {...props}/>
        }

        return (
            <ItemTable {...props}/>
        );
    }
}

ItemTableContainer.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number
};

const mapStateToProps = (state, props) => ({
    item: getItemDetail(state, props),
    pagination: getPaginationControlData(state),
    layout: getCurrentLayout(state),
    userScope:getUserScopes(state)
});

const mapDispatchToProps = {
    showItemDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTableContainer);