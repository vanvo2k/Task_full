import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getItemDetail, getListItems} from "../../selectors";
import ModalShowItemDetail from "./ModalShowItemDetail";

class ItemDetailContainer extends Component {
    render() {
        const {props} = this;

        const {item, id} = props;
        if (!item || !id) {
            return null;
        }

        return (
            <ModalShowItemDetail {...props}/>
        );
    }
}

ItemDetailContainer.propTypes = {
    id: PropTypes.string,
    index: PropTypes.number
};

const mapStateToProps = (state, props) => ({
    item: getItemDetail(state, props),
    items: getListItems(state)
});

export default connect(mapStateToProps)(ItemDetailContainer);
