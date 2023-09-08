import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchItemsTopRising} from "../actions";
import ItemsTopRising from "./ItemsTopRising";
import {getItemsTopRising} from "../selectors";

class ItemsTopRisingContainer extends Component {
    render() {
        const {props} = this;

        return <ItemsTopRising {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    items: getItemsTopRising(state)
});

const mapDispatchToProps = {
    fetchItemsTopRising
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsTopRisingContainer);