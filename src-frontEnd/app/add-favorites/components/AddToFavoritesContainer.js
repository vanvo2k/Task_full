import React, {Component} from "react";
import {connect} from "react-redux";
import AddToFavorites from "./AddToFavorites";
import {getCurrentProductToAdd, isOpenPopupAddToFavorites} from "../selectors";
import {closePopup} from "../actions";

class AddToFavoritesContainer extends Component {
    render() {
        const {props} = this;

        return <AddToFavorites {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    productId: getCurrentProductToAdd(state),
    isOpen: isOpenPopupAddToFavorites(state)
});

const mapDispatchToProps = {
    closePopup
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToFavoritesContainer);