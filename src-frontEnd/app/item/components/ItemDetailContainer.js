import React, {Component} from "react";
import {connect} from "react-redux";
import ItemDetail from "./ItemDetail";
import {fetchItemDetail} from "../actions";
import {getItemDetail} from "../selectors";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";

class ItemDetailContainer extends Component {
    render() {
        const {props} = this;
        const {match} = props;
        const {params} = match;
        const {itemId} = params;

        return (
            <EnsureLoggedInContainer>
                <ItemDetail id={itemId} {...props}/>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({
    item: getItemDetail(state)
});

const mapDispatchToProps = {
    fetchItemDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailContainer);