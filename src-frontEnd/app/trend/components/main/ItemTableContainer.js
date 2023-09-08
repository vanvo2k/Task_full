import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getItemDetail, getPaginationControlData} from "../../selectors";
import {showItemDetail} from "../../actions";
import ItemTable from "../../../search/components/main/ItemTable";
import {getCurrentLayout} from "../../../search/selectors";
import ItemGrid from "../../../search/components/main/ItemGrid";
import {requestAddToFavorites} from "../../../add-favorites/actions";
import { getUserScopes } from "../../../../selectors/UserSelectors";

class ItemTableContainer extends Component {
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
    requestAddToFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTableContainer);
