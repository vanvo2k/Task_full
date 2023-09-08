import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchItemsRandom} from "../actions";
import {getItemsRandom} from "../selectors";
import ItemsRandom from "./ItemsRandom";

class ItemsRandomContainer extends Component {
    render() {
        const {props} = this;

        return <ItemsRandom {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    items: getItemsRandom(state)
});

const mapDispatchToProps = {
    fetchItemsRandom
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsRandomContainer);